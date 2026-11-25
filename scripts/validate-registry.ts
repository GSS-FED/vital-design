#!/usr/bin/env tsx

/**
 * Registry validation script for CI.
 * Checks registry.json integrity and verifies registry:build output.
 *
 * Exit codes:
 *   0 - All checks passed
 *   1 - One or more checks failed
 */
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { fileURLToPath } from 'url';
import { registry as registrySource } from '../registry/index';
import type { RegistryItem } from '../registry/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');
const PUBLIC_REGISTRY_DIR = path.join(ROOT_DIR, 'public', 'r');

interface Registry {
  $schema: string;
  $registry?: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

let hasErrors = false;

function error(msg: string): void {
  console.error(`  ✗ ${msg}`);
  hasErrors = true;
}

function ok(msg: string): void {
  console.log(`  ✓ ${msg}`);
}

function section(title: string): void {
  console.log(`\n[${title}]`);
}

// ── Load registry.json ────────────────────────────────────────────────────────

section('Loading registry.json');

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`registry.json not found at ${REGISTRY_PATH}`);
  process.exit(1);
}

let registry: Registry;
try {
  registry = JSON.parse(
    fs.readFileSync(REGISTRY_PATH, 'utf-8'),
  ) as Registry;
  ok(`Parsed ${registry.items.length} items`);
} catch (e) {
  console.error(`Failed to parse registry.json: ${String(e)}`);
  process.exit(1);
}

// ── Check 1: File existence ───────────────────────────────────────────────────

section('Check 1: File existence');

for (const item of registry.items) {
  if (!item.files) continue;
  for (const file of item.files) {
    const filePath = path.join(ROOT_DIR, file.path);
    if (!fs.existsSync(filePath)) {
      error(`[${item.name}] Missing file: ${file.path}`);
    }
  }
}

if (!hasErrors) {
  ok('All referenced files exist');
}

// ── Check 2: registryDependencies prefix ─────────────────────────────────────

section('Check 2: registryDependencies @vital-design/ prefix');

for (const item of registry.items) {
  if (!item.registryDependencies?.length) continue;
  for (const dep of item.registryDependencies) {
    if (!dep.startsWith('@vital-design/')) {
      error(
        `[${item.name}] "${dep}" must use @vital-design/ prefix → "@vital-design/${dep}"`,
      );
    }
  }
}

const prefixErrorsBefore = hasErrors;
if (!hasErrors) {
  ok('All registryDependencies use @vital-design/ prefix');
} else if (prefixErrorsBefore) {
  // errors already counted above
}

// ── Check 3: registry:build output ───────────────────────────────────────────

section('Check 3: registry:build output');

console.log('  Running pnpm run registry:build...');

try {
  execSync('pnpm run registry:build', {
    cwd: ROOT_DIR,
    stdio: 'pipe',
  });
  ok('registry:build completed successfully');
} catch (e) {
  error(`registry:build failed: ${String(e)}`);
  process.exit(1);
}

// Count expected output files: one JSON per item + registry.json index
const expectedFileCount = registry.items.length + 1; // items + registry.json

if (!fs.existsSync(PUBLIC_REGISTRY_DIR)) {
  error(`public/r/ directory does not exist after build`);
} else {
  const builtFiles = fs
    .readdirSync(PUBLIC_REGISTRY_DIR, { recursive: true })
    .filter((f) => String(f).endsWith('.json'));

  if (builtFiles.length < expectedFileCount) {
    error(
      `Expected at least ${expectedFileCount} JSON files in public/r/, found ${builtFiles.length}`,
    );
  } else {
    ok(
      `public/r/ contains ${builtFiles.length} JSON files (expected ≥ ${expectedFileCount})`,
    );
  }
}

// ── Check 4: npm dependencies ─────────────────────────────────────────────────

section('Check 4: npm dependencies');

const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'),
) as Record<
  'dependencies' | 'devDependencies',
  Record<string, string>
>;
const developedOn: Record<string, string | undefined> = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

// Consumers already have React.
const PROVIDED = new Set(['react', 'react-dom']);
// Listed by convention on every item that calls cn() (see AGENTS.md).
const LISTED_BY_CONVENTION = new Set(['cn']);

let dependencyErrors = 0;
function dependencyError(msg: string): void {
  error(msg);
  dependencyErrors += 1;
}

for (const item of registrySource.items as RegistryItem[]) {
  const listed = new Map(
    (item.dependencies ?? []).map(
      (spec): [string, string | undefined] => {
        const at = spec.indexOf('@', 1);
        return at === -1
          ? [spec, undefined]
          : [spec.slice(0, at), spec.slice(at + 1)];
      },
    ),
  );

  for (const [name, range] of listed) {
    if (range !== undefined && range !== developedOn[name]) {
      dependencyError(
        `[${item.name}] "${name}@${range}" must match package.json (${developedOn[name] ?? 'not listed'}), the version this repo tests`,
      );
    }
  }

  const sources = (item.files ?? []).filter(
    (file) =>
      /\.tsx?$/.test(file.path) &&
      fs.existsSync(path.join(ROOT_DIR, file.path)),
  );
  if (!sources.length) continue;

  const imported = new Set(
    sources.flatMap((file) =>
      ts
        .preProcessFile(
          fs.readFileSync(path.join(ROOT_DIR, file.path), 'utf-8'),
        )
        .importedFiles.map(({ fileName }) => fileName)
        .filter((name) => !/^(\.|@\/)/.test(name))
        .map((name) =>
          name
            .split('/')
            .slice(0, name.startsWith('@') ? 2 : 1)
            .join('/'),
        ),
    ),
  );

  for (const name of imported) {
    if (!listed.has(name) && !PROVIDED.has(name)) {
      dependencyError(
        `[${item.name}] imports "${name}" but does not list it in dependencies`,
      );
    }
  }
  for (const name of listed.keys()) {
    if (!imported.has(name) && !LISTED_BY_CONVENTION.has(name)) {
      dependencyError(
        `[${item.name}] lists "${name}" but none of its files import it`,
      );
    }
  }
}

if (!dependencyErrors) {
  ok('Listed npm packages match imports and package.json ranges');
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log('');
if (hasErrors) {
  console.error(
    'Registry validation FAILED. Fix the errors above and retry.',
  );
  process.exit(1);
} else {
  console.log('Registry validation PASSED.');
  process.exit(0);
}
