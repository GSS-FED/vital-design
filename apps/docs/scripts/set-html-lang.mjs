import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), 'out', 'zh-tw');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    const html = await readFile(full, 'utf8');
    const next = html.replace(
      '<html lang="en"',
      '<html lang="zh-TW"',
    );
    if (next !== html) await writeFile(full, next);
  }
}

await walk(root);
