#!/usr/bin/env tsx
import { mkdirSync, readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import SD from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';

// Ensure output directory exists
mkdirSync(resolve('src-v2/styles/tokens'), { recursive: true });

// Light sources only. `tokens/dark/` is applied later as overrides for
// the same names. Style Dictionary deep-merges every JSON file, so a
// second file with the same path would replace the light value, and a
// `dark.*` path would emit `--dark-*` into :root.
const LIGHT_SOURCE_DIRS = [
  'tokens/primitive',
  'tokens/semantic',
  'tokens/component',
];
const DARK_COLOR_FILE = 'tokens/dark/colors.json';
const REFERENCE = /^\{([^{}]+)\}$/;

type Json = Record<string, unknown>;

function isRecord(value: unknown): value is Json {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function walkColorTokens(
  node: Json,
  path: string[],
  into: Map<string, string>,
) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || !isRecord(child)) continue;
    const next = [...path, key];
    if (typeof child.$value === 'string') {
      into.set(next.join('.'), child.$value);
      continue;
    }
    walkColorTokens(child, next, into);
  }
}

function readColorFile(file: string): Map<string, string> {
  const json = JSON.parse(readFileSync(file, 'utf8')) as Json;
  const into = new Map<string, string>();
  walkColorTokens(json, [], into);
  return into;
}

function readLightColors(): Map<string, string> {
  const into = new Map<string, string>();
  for (const dir of LIGHT_SOURCE_DIRS) {
    const files = readdirSync(dir)
      .filter((name) => name.endsWith('.json'))
      .sort();
    for (const name of files) {
      for (const [path, value] of readColorFile(join(dir, name))) {
        into.set(path, value);
      }
    }
  }
  return into;
}

function sameColor(a: string, b: string): boolean {
  return (
    a.replace(/\s+/g, '').toLowerCase() ===
    b.replace(/\s+/g, '').toLowerCase()
  );
}

function darkValueFor(
  tokenPath: string,
  raw: string | undefined,
  dark: Map<string, string>,
): string | undefined {
  if (raw) {
    const reference = REFERENCE.exec(raw.trim());
    if (reference) return dark.get(reference[1]);
  }
  return dark.get(tokenPath);
}

const lightColors = readLightColors();
const darkColors = readColorFile(DARK_COLOR_FILE);

for (const tokenPath of darkColors.keys()) {
  if (!lightColors.has(tokenPath)) {
    throw new Error(
      `Dark token "${tokenPath}" has no light token. Remove it from ${DARK_COLOR_FILE}.`,
    );
  }
}

function darkOverrides(
  colorTokens: TransformedToken[],
): [string, string][] {
  const overrides: [string, string][] = [];
  for (const token of colorTokens) {
    const tokenPath = token.path.join('.');
    if (!lightColors.has(tokenPath)) {
      throw new Error(
        `Built token "${tokenPath}" is missing from the light token sources.`,
      );
    }
    const dark = darkValueFor(
      tokenPath,
      lightColors.get(tokenPath),
      darkColors,
    );
    if (!dark || sameColor(dark, String(token.$value))) continue;
    overrides.push([token.name, dark]);
  }
  return overrides;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isColor(token: TransformedToken): boolean {
  return token.$type === 'color';
}

function quoteValue(v: string): string {
  return v.includes("'") ? `"${v}"` : `'${v}'`;
}

// ── Config ────────────────────────────────────────────────────────────────────

const sd = new SD({
  log: { verbosity: 'silent' },
  source: LIGHT_SOURCE_DIRS.map((dir) => `${dir}/**/*.json`),
  hooks: {
    transforms: {
      // Drops a leading `theme.` segment from semantic shadcn tokens so they
      // emit unprefixed names (e.g. `theme.primary` → `--primary`). This lets
      // semantic slots coexist with primitive scales like `--primary-500` in a
      // single Style Dictionary tree without path collision.
      'name/vital-kebab': {
        type: 'name',
        transitive: true,
        transform: (token) => {
          const parts =
            token.path[0] === 'theme'
              ? token.path.slice(1)
              : token.path;
          return parts.join('-');
        },
      },
    },
    formats: {
      // :root keeps light values. .dark overrides the same custom
      // properties. @theme inline maps each --color-* once, so utilities
      // follow whichever value is active.
      'css/vital-tokens': ({ dictionary }) => {
        const colorTokens = dictionary.allTokens.filter(isColor);
        const nonColorTokens = dictionary.allTokens.filter(
          (t) => !isColor(t),
        );
        const dark = darkOverrides(colorTokens);

        const rootVars = colorTokens
          .map((t) => `  --${t.name}: ${t.$value};`)
          .join('\n');

        const darkVars = dark
          .map(([name, value]) => `  --${name}: ${value};`)
          .join('\n');

        const themeColorMappings = colorTokens
          .map((t) => `  --color-${t.name}: var(--${t.name});`)
          .join('\n');

        const themeNonColorVars = nonColorTokens
          .map((t) => `  --${t.name}: ${t.$value};`)
          .join('\n');

        return [
          '/* Auto-generated by Style Dictionary. Do not edit manually. */',
          '/* Run `pnpm registry:build` to regenerate. */',
          '',
          ':root {',
          rootVars,
          '}',
          '',
          '.dark {',
          darkVars,
          '}',
          '',
          '@theme inline {',
          themeColorMappings,
          themeNonColorVars,
          '}',
          '',
        ].join('\n');
      },

      // theme = non-colors, light = every color, dark = overrides only.
      'typescript/vital-theme-vars': ({ dictionary }) => {
        const colorTokens = dictionary.allTokens.filter(isColor);
        const nonColorTokens = dictionary.allTokens.filter(
          (t) => !isColor(t),
        );
        const dark = darkOverrides(colorTokens);

        const lightEntries = colorTokens
          .map(
            (t) =>
              `    '${t.name}': ${quoteValue(String(t.$value))},`,
          )
          .join('\n');

        const darkEntries = dark
          .map(
            ([name, value]) => `    '${name}': ${quoteValue(value)},`,
          )
          .join('\n');

        const themeEntries = nonColorTokens
          .map(
            (t) =>
              `    '${t.name}': ${quoteValue(String(t.$value))},`,
          )
          .join('\n');

        return [
          '// This file is auto-generated by Style Dictionary.',
          '// Do not edit manually — run `pnpm registry:build` to regenerate.',
          '',
          'export const vitalThemeCssVars = {',
          '  theme: {',
          themeEntries,
          '  },',
          '  light: {',
          lightEntries,
          '  },',
          '  dark: {',
          darkEntries,
          '  },',
          '} as const;',
          '',
        ].join('\n');
      },
    },
  },
  platforms: {
    css: {
      transforms: ['name/vital-kebab'],
      buildPath: 'src-v2/styles/tokens/',
      files: [
        { format: 'css/vital-tokens', destination: 'generated.css' },
      ],
    },
    registry: {
      transforms: ['name/vital-kebab'],
      buildPath: 'registry/',
      files: [
        {
          format: 'typescript/vital-theme-vars',
          destination: 'vital-theme-vars.ts',
        },
      ],
    },
  },
});

const availablePlatforms = ['css', 'registry'] as const;
type BuildPlatform = (typeof availablePlatforms)[number];

const requestedPlatforms = process.argv.slice(2);

if (requestedPlatforms.length > 0) {
  for (const platform of requestedPlatforms) {
    if (!availablePlatforms.includes(platform as BuildPlatform)) {
      throw new Error(`Unknown token build platform: ${platform}`);
    }
  }

  for (const platform of requestedPlatforms) {
    await sd.buildPlatform(platform);
  }
} else {
  await sd.buildAllPlatforms();
}

console.log('✔ tokens built');
