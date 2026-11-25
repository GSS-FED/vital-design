#!/usr/bin/env tsx

/**
 * Installs every registry item into one new project outside the repo, the way
 * a consumer would (`shadcn add`, npm's latest versions), then type-checks and
 * builds it. Catches new releases of packages the registry does not pin.
 *
 * All items share one project, so a package one item forgot to list can be
 * supplied by another; registry:validate checks the lists per item.
 *
 * Reads public/r, so run `pnpm run registry:smoke`, which builds it first.
 */
import { execFile } from 'child_process';
import * as fs from 'fs';
import { createServer } from 'http';
import type { AddressInfo } from 'net';
import * as os from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { registry } from '../registry/index';

const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const { devDependencies } = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'),
) as { devDependencies: Record<string, string> };

// The project's own toolchain, on the ranges this repo develops on, so a
// failure points at a registry dependency.
const pick = (names: string[]) =>
  Object.fromEntries(
    names.map((name) => [name, devDependencies[name]]),
  );

const server = createServer((req, res) => {
  const file = path.join(
    ROOT_DIR,
    'public/r',
    path.basename(req.url ?? ''),
  );
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(fs.readFileSync(file));
});
await new Promise<void>((resolve) => {
  server.listen(0, '127.0.0.1', resolve);
});
const { port } = server.address() as AddressInfo;

const dir = fs.mkdtempSync(
  path.join(os.tmpdir(), 'vital-registry-smoke-'),
);

const files: Record<string, unknown> = {
  'package.json': {
    name: 'registry-smoke',
    private: true,
    type: 'module',
    dependencies: pick(['react', 'react-dom']),
    devDependencies: pick([
      '@tailwindcss/vite',
      '@types/react',
      '@types/react-dom',
      'tailwindcss',
      'typescript',
      'vite',
    ]),
  },
  'tsconfig.json': {
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      types: ['vite/client'],
      paths: { '@/*': ['./src/*'] },
    },
    include: ['src'],
  },
  'components.json': {
    $schema: 'https://ui.shadcn.com/schema.json',
    style: 'new-york',
    rsc: false,
    tsx: true,
    tailwind: {
      config: '',
      css: 'src/index.css',
      baseColor: 'neutral',
      cssVariables: true,
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks',
    },
    registries: {
      '@vital-design': `http://127.0.0.1:${port}/{name}.json`,
    },
  },
  'vite.config.ts': `import tailwindcss from '@tailwindcss/vite';
export default {
  plugins: [tailwindcss()],
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
};
`,
  'index.html':
    '<script type="module" src="/src/main.tsx"></script>\n',
  'src/index.css': '@import "tailwindcss";\n',
  // Bundle every installed file, so a missing package or export fails.
  'src/main.tsx': `import './index.css';
console.log(import.meta.glob(['./**/*.{ts,tsx}', '!./main.tsx'], { eager: true }));
`,
};
fs.mkdirSync(path.join(dir, 'src'));
for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(
    path.join(dir, name),
    typeof content === 'string' ? content : JSON.stringify(content),
  );
}

// pnpm passes its settings down as npm_* variables; the project uses npm.
const env = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) => !key.toLowerCase().startsWith('npm_'),
  ),
);

async function run(
  label: string,
  command: string,
  args: string[],
): Promise<boolean> {
  try {
    await promisify(execFile)(command, args, {
      cwd: dir,
      env: { ...env, CI: '1' },
      maxBuffer: 64 * 1024 * 1024,
    });
    console.log(`  ✓ ${label}`);
    return true;
  } catch (e) {
    const { stdout, stderr, message } = e as Error & {
      stdout?: string;
      stderr?: string;
    };
    console.error(`  ✗ ${label}`);
    console.error(
      [stdout, stderr].filter(Boolean).join('\n') || message,
    );
    return false;
  }
}

// registry:base items are for `shadcn init`, not `shadcn add`.
const names = registry.items
  .filter((item) => item.type !== 'registry:base')
  .map((item) => `@vital-design/${item.name}`);
const bin = (name: string) =>
  path.join(dir, 'node_modules/.bin', name);

console.log(`Installing ${names.length} registry items in ${dir}`);

let passed = false;
try {
  const installed =
    (await run('npm install', 'npm', [
      'install',
      '--no-audit',
      '--no-fund',
    ])) &&
    (await run(
      'shadcn add',
      path.join(ROOT_DIR, 'node_modules/.bin/shadcn'),
      ['add', ...names, '--yes', '--overwrite'],
    ));
  if (installed) {
    const { dependencies } = JSON.parse(
      fs.readFileSync(path.join(dir, 'package.json'), 'utf-8'),
    ) as { dependencies: Record<string, string> };
    console.log(
      Object.entries(dependencies)
        .map(([name, range]) => `    ${name} ${range}`)
        .join('\n'),
    );
    // Run both: tsc finds changed types, the build finds missing exports.
    const types = await run('tsc', bin('tsc'), ['--noEmit']);
    const build = await run('vite build', bin('vite'), [
      'build',
      '--logLevel',
      'error',
    ]);
    passed = types && build;
  }
} finally {
  server.close();
  fs.rmSync(dir, { recursive: true, force: true });
}

console.log(
  passed ? 'Registry smoke PASSED.' : 'Registry smoke FAILED.',
);
process.exit(passed ? 0 : 1);
