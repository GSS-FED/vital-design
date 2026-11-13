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

type PaintNode = {
  name: string;
  attributes: Record<string, string>;
};

const isPaint = (value: string | undefined) =>
  value != null && value !== 'none' && !value.startsWith('url(');

// Every painted colour becomes currentColor; "none" stays "none", so outline
// shapes keep their empty fill. The root fill defaults to currentColor (SVG's
// default fill is black), so sources with unpainted shapes still render.
// When every stroked child carries the same stroke-width (Figma exports), it is
// hoisted onto the root so one strokeWidth prop changes the whole icon.
// linecap / linejoin stay where the source put them.
// A shape with no fill or stroke of its own or from an ancestor would render
// blank (e.g. a Figma export whose colour was stripped), so it fails the build.
const SHAPES = new Set([
  'path',
  'circle',
  'ellipse',
  'line',
  'polygon',
  'polyline',
  'rect',
]);

const normalizeIconPaint = {
  name: 'normalizeIconPaint',
  fn: () => {
    const childStrokeWidths: PaintNode[] = [];
    let rootStrokes = false;
    let strokeWithoutWidth = false;
    const painted = new WeakMap<object, boolean>();
    return {
      element: {
        enter: (node: PaintNode, parent: object) => {
          const { attributes } = node;
          painted.set(
            node,
            node.name === 'svg'
              ? attributes.fill !== 'none' ||
                  isPaint(attributes.stroke)
              : isPaint(attributes.fill) ||
                  isPaint(attributes.stroke) ||
                  (painted.get(parent) ?? false),
          );
          if (SHAPES.has(node.name) && !painted.get(node)) {
            throw new Error(`<${node.name}> has no fill or stroke`);
          }
          if (node.name === 'svg') {
            childStrokeWidths.length = 0;
            rootStrokes =
              isPaint(attributes.stroke) ||
              attributes['stroke-width'] != null;
            strokeWithoutWidth = false;
            for (const attr of [
              'preserveAspectRatio',
              'overflow',
              'style',
            ]) {
              delete attributes[attr];
            }
            if (attributes.fill !== 'none')
              attributes.fill = 'currentColor';
            if (isPaint(attributes.stroke))
              attributes.stroke = 'currentColor';
            return;
          }
          if (isPaint(attributes.fill))
            attributes.fill = 'currentColor';
          if (isPaint(attributes.stroke)) {
            attributes.stroke = 'currentColor';
            if (attributes['stroke-width'] == null)
              strokeWithoutWidth = true;
          }
          if (attributes['stroke-width'] != null) {
            childStrokeWidths.push(node);
          }
        },
        exit: (node: PaintNode) => {
          if (
            node.name !== 'svg' ||
            childStrokeWidths.length === 0 ||
            rootStrokes ||
            strokeWithoutWidth
          ) {
            return;
          }
          const widths = new Set(
            childStrokeWidths.map(
              (child) => child.attributes['stroke-width'],
            ),
          );
          if (widths.size !== 1) {
            console.warn(
              `Keep per-shape stroke-width; values differ: ${[...widths].join(', ')}`,
            );
            return;
          }
          const width = [...widths][0];
          for (const child of childStrokeWidths) {
            delete child.attributes['stroke-width'];
          }
          node.attributes['stroke-width'] = width;
        },
      },
    };
  },
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
    'aria-hidden': 'true',
  },
  svgoConfig: {
    multipass: true,
    plugins: [
      // Rewrite paint before preset-default, which may drop or merge the
      // source's paint attributes before this plugin sees them.
      normalizeIconPaint,
      {
        name: 'preset-default',
        params: {
          overrides: {
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

async function generateIcon(entry: Entry): Promise<Entry | null> {
  const svg = await readFile(entry.svgPath, 'utf8');
  if (svg.trim() === '') {
    console.warn(`Skip empty SVG ${relative(ROOT, entry.svgPath)}`);
    return null;
  }
  const tsx = await transform(svg, svgrConfig, {
    componentName: entry.component,
  }).catch((error: Error) => {
    throw new Error(
      `${relative(ROOT, entry.svgPath)}: ${error.message}`,
    );
  });
  const outPath = join(OUT_DIR, `${entry.component}.tsx`);
  await writeFile(outPath, tsx, 'utf8');
  return entry;
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
  const generated = (
    await Promise.all(entries.map(generateIcon))
  ).filter((entry): entry is Entry => entry != null);
  await writeBarrels(generated);
  console.log(`Generated ${generated.length} icons:`);
  for (const entry of generated) {
    console.log(`  src-v2/icons/${entry.component}.tsx`);
  }
  console.log(`  src-v2/icons/index.tsx`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
