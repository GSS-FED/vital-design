// One-shot codemod: for every `export function FooPreview()` block in
// apps/docs/components/previews/*.tsx, inject `name="FooPreview"` on the
// FIRST `<ComponentPreview` opening tag inside it (unless name= already
// exists). Safe to re-run.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const previewsDir = join(__dirname, '..', 'components', 'previews');

const files = readdirSync(previewsDir).filter(
  (f) => f.endsWith('.tsx') && !f.startsWith('_'),
);

let touched = 0;
for (const file of files) {
  const path = join(previewsDir, file);
  let raw = readFileSync(path, 'utf-8');
  const original = raw;

  // Per export function block, inject name= into the first <ComponentPreview ...> opening tag.
  raw = raw.replace(
    /(export\s+function\s+(\w+Preview)\s*\([^)]*\)\s*\{[\s\S]*?)(<ComponentPreview\b)([^>]*)>/g,
    (_match, head, fnName, tagOpen, tagAttrs) => {
      if (/\bname=/.test(tagAttrs)) {
        return `${head}${tagOpen}${tagAttrs}>`;
      }
      return `${head}${tagOpen} name="${fnName}"${tagAttrs}>`;
    },
  );

  if (raw !== original) {
    writeFileSync(path, raw);
    touched += 1;
  }
}

console.log(`Updated ${touched} preview files.`);
