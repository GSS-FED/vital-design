// Lists every fixture the app can render, with the same IDs Storybook gives
// them, so screenshots line up with the Storybook baseline:
// - src-v2 stories, parsed with Storybook's own CSF indexer (titlePrefix V2)
// - src-v2/components/<name>/examples/*.tsx, rendered directly, under the ID
//   the generated <Name>.examples.stories.tsx would have.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { storyNameFromExport, toId } from 'storybook/internal/csf';
import { loadCsf } from 'storybook/internal/csf-tools';

export type FixtureEntry = {
  id: string;
  kind: 'story' | 'example';
  /** import.meta.glob key, relative to visual/fixtures/load.ts */
  file: string;
  exportName: string;
};

const here = import.meta.dirname;
const srcDir = join(here, '..', '..', 'src-v2');
const entries: FixtureEntry[] = [];
const globKey = (path: string) => relative(here, path);

const toPascal = (name: string) =>
  name.replace(/(^|-)(\w)/g, (_, __, char: string) =>
    char.toUpperCase(),
  );

for (const file of readdirSync(srcDir, {
  recursive: true,
}) as string[]) {
  const path = join(srcDir, file);

  if (file.endsWith('.stories.tsx')) {
    const csf = loadCsf(readFileSync(path, 'utf-8'), {
      fileName: path,
      makeTitle: (title?: string) => `V2/${title}`,
    }).parse();
    for (const [exportName, story] of Object.entries(csf._stories)) {
      entries.push({
        id: story.id,
        kind: 'story',
        file: globKey(path),
        exportName,
      });
    }
  }

  const example = file.match(
    /^components\/([\w-]+)\/examples\/\w+\.tsx$/,
  );
  if (example) {
    const pascal = toPascal(example[1]);
    const source = readFileSync(path, 'utf-8');
    for (const [, exportName] of source.matchAll(
      /export function (\w+Example)\b/g,
    )) {
      const storyExport =
        exportName
          .replace(new RegExp(`^${pascal}`), '')
          .replace(/Example$/, '') || 'Default';
      entries.push({
        id: toId(
          `V2/Components/${pascal}/Examples`,
          storyNameFromExport(storyExport),
        ),
        kind: 'example',
        file: globKey(path),
        exportName,
      });
    }
  }
}

entries.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(
  join(here, 'manifest.json'),
  `${JSON.stringify(entries, null, 2)}\n`,
);
console.log(`Wrote ${entries.length} fixtures`);
