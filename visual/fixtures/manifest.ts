// Lists every docs example (src-v2/**/examples/*.tsx) the fixture app and
// the screenshot test render. IDs keep the format of the Storybook stories
// the examples replaced, so screenshots stay comparable with old baselines:
// the title that folder's story file had, and the export name without the
// folder prefix and `Example` suffix (SelectMultipleExample in
// components/select → v2-components-select--multiple).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

export type FixtureEntry = {
  id: string;
  /** import.meta.glob key, relative to visual/fixtures/load.ts */
  file: string;
  exportName: string;
};

const here = import.meta.dirname;
const srcDir = join(here, '..', '..', 'src-v2');
const entries: FixtureEntry[] = [];
const globKey = (path: string) => relative(here, path);

// Story titles that aren't `Components/<PascalCase folder>`, by folder
// under src-v2.
const titles: Record<string, string> = {
  icons: 'Icons/Gallery',
  'components/input/input': 'Components/Input/Input',
  'components/input/input-group': 'Components/Input/InputGroup',
  'components/input/number-input': 'Components/Input/NumberInput',
  'components/input/password-input': 'Components/Input/PasswordInput',
  'blocks/data-table': 'Blocks/DataTable',
  'blocks/sidebar-cloud-01': 'Blocks/Sidebar/Cloud/01 - Flat',
  'blocks/sidebar-cloud-02':
    'Blocks/Sidebar/Cloud/02 - Inline Submenus',
  'blocks/sidebar-cloud-03':
    'Blocks/Sidebar/Cloud/03 - Dropdown Submenus',
  'blocks/sidebar-cloud-04':
    'Blocks/Sidebar/Cloud/04 - Secondary Nav',
  'blocks/sidebar-cloud-05':
    'Blocks/Sidebar/Cloud/05 - Header Actions',
  'blocks/sidebar-cloud-06':
    'Blocks/Sidebar/Cloud/06 - Collapsible Submenus',
  'blocks/table-pagination': 'Blocks/Table Pagination',
};

// Same rules as Storybook's toId(title, startCase(exportName)).
const words = (name: string) =>
  name
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/([0-9])([A-Za-z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
const sanitize = (part: string) =>
  part
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const toId = (title: string, exportName: string) =>
  `${sanitize(title)}--${sanitize(words(exportName))}`;

const toPascal = (name: string) =>
  name.replace(/(^|-)(\w)/g, (_, __, char: string) =>
    char.toUpperCase(),
  );

for (const file of readdirSync(srcDir, {
  recursive: true,
}) as string[]) {
  const path = join(srcDir, file);

  const example = file.match(/^(.*\/)?([\w-]+)\/examples\/\w+\.tsx$/);
  if (example) {
    const folder = `${example[1] ?? ''}${example[2]}`;
    const pascal = toPascal(example[2]);
    const title = titles[folder] ?? `Components/${pascal}`;
    const source = readFileSync(path, 'utf-8');
    for (const [, exportName] of source.matchAll(
      /export function (\w+Example)\b/g,
    )) {
      const storyExport =
        exportName
          .replace(new RegExp(`^${pascal}`), '')
          .replace(/Example$/, '') || 'Default';
      entries.push({
        id: toId(`V2/${title}`, storyExport),
        file: globKey(path),
        exportName,
      });
    }
  }
}

const seen = new Map<string, FixtureEntry>();
for (const entry of entries) {
  const other = seen.get(entry.id);
  if (other) {
    throw new Error(
      `${entry.id} is both ${other.file} (${other.exportName}) and ${entry.file} (${entry.exportName}). Rename one of them.`,
    );
  }
  seen.set(entry.id, entry);
}

entries.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(
  join(here, 'manifest.json'),
  `${JSON.stringify(entries, null, 2)}\n`,
);
console.log(`Wrote ${entries.length} fixtures`);
