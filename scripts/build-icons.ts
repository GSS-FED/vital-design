import { type Config, transform } from '@svgr/core';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE_DIR = join(ROOT, 'src-v2/icons/_source');
const OUT_DIR = join(ROOT, 'src-v2/icons');

const SOURCE_FOLDERS = ['custom', 'fontawesome'] as const;

function kebabToPascal(name: string): string {
  return name
    .split('-')
    .map((p) =>
      p.length === 0 ? p : p[0].toUpperCase() + p.slice(1),
    )
    .join('');
}

function componentName(svgFile: string): string {
  const base = svgFile.replace(/\.svg$/, '');
  return `${kebabToPascal(base)}Icon`;
}

const svgrTemplate: Config['template'] = (variables, { tpl }) => {
  return tpl`
${variables.imports};

export const ${variables.componentName} = (props: SVGProps<SVGSVGElement>) => (
  ${variables.jsx}
);
`;
};

const svgrConfig: Config = {
  jsxRuntime: 'automatic',
  typescript: true,
  expandProps: 'end',
  template: svgrTemplate,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  svgProps: {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true',
  },
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    black: 'currentColor',
    '#fff': 'currentColor',
    '#ffffff': 'currentColor',
    white: 'currentColor',
  },
  svgoConfig: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            mergePaths: false,
            removeUselessStrokeAndFill: false,
            convertPathData: false,
          },
        },
      },
      'removeDimensions',
      {
        name: 'removeAttrs',
        params: { attrs: ['data-.*', '(class|id)'] },
      },
      {
        name: 'removeAttrs',
        params: { attrs: '.*:fill:(?!currentColor|none).+' },
      },
    ],
  },
};

type Entry = { svgPath: string; svgFile: string; component: string };

async function listSources(): Promise<Entry[]> {
  const entries: Entry[] = [];
  for (const folder of SOURCE_FOLDERS) {
    const dir = join(SOURCE_DIR, folder);
    const files: string[] = await readdir(dir).catch(
      () => [] as string[],
    );
    for (const svgFile of files.filter((f) => f.endsWith('.svg'))) {
      entries.push({
        svgPath: join(dir, svgFile),
        svgFile,
        component: componentName(svgFile),
      });
    }
  }
  entries.sort((a, b) => a.component.localeCompare(b.component));
  return entries;
}

async function generateIcon(entry: Entry): Promise<string> {
  const svg = await readFile(entry.svgPath, 'utf8');
  const tsx = await transform(svg, svgrConfig, {
    componentName: entry.component,
  });
  const outPath = join(OUT_DIR, `${entry.component}.tsx`);
  await writeFile(outPath, tsx, 'utf8');
  return relative(ROOT, outPath);
}

async function writeBarrels(entries: Entry[]) {
  const sorted = [...entries].sort((a, b) =>
    a.component.localeCompare(b.component),
  );
  const indexLines = sorted.map(
    (e) => `export { ${e.component} } from './${e.component}';`,
  );
  await writeFile(
    join(OUT_DIR, 'index.tsx'),
    indexLines.join('\n') + '\n',
    'utf8',
  );
}

async function main() {
  const entries = await listSources();
  if (entries.length === 0) {
    console.error('No SVG sources found in', SOURCE_DIR);
    process.exit(1);
  }
  const written = await Promise.all(entries.map(generateIcon));
  await writeBarrels(entries);
  console.log(`Generated ${written.length} icons:`);
  for (const path of written) console.log(`  ${path}`);
  console.log(`  src-v2/icons/index.tsx`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
