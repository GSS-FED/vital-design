// Writes a Markdown copy of every docs page next to its HTML URL, for
// agents and the Copy Markdown button:
//   /docs/components/button      → public/docs/components/button.md
//   /zh-tw/docs/components/button → public/zh-tw/docs/components/button.md
// The site is a static export, so these are files rather than a route or
// an `Accept: text/markdown` rewrite. Untranslated zh-TW pages get the
// English text, as the HTML page does. Output is gitignored; run after
// previews:sources and changelog:build, which generate files it reads.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { mdxToMarkdown } from '../lib/markdown';

const docsRoot = join(__dirname, '..');
const contentDir = join(docsRoot, 'content', 'docs');
const publicDir = join(docsRoot, 'public');

const UNTRANSLATED =
  '> **尚未翻譯**：此頁尚無繁體中文，以下為英文原文。';

for (const generated of ['docs', 'docs.md', 'zh-tw']) {
  rmSync(join(publicDir, generated), {
    recursive: true,
    force: true,
  });
}

function write(url: string, markdown: string) {
  const file = join(publicDir, `${url}.md`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, markdown);
}

let count = 0;
for (const file of (
  readdirSync(contentDir, { recursive: true }) as string[]
).sort()) {
  if (!file.endsWith('.mdx') || file.endsWith('.zh-tw.mdx')) continue;

  const slug = file
    .replace(/\.mdx$/, '')
    .replace(/(^|\/)index$/, '')
    .split('/')
    .filter(Boolean);
  const url = ['/docs', ...slug].join('/');
  const en = readFileSync(join(contentDir, file), 'utf-8');
  const zhFile = join(
    contentDir,
    file.replace(/\.mdx$/, '.zh-tw.mdx'),
  );

  try {
    write(url, mdxToMarkdown(en));
    write(
      `/zh-tw${url}`,
      existsSync(zhFile)
        ? mdxToMarkdown(readFileSync(zhFile, 'utf-8'))
        : mdxToMarkdown(en, UNTRANSLATED),
    );
  } catch (error) {
    throw new Error(
      `content/docs/${file}: ${(error as Error).message}`,
    );
  }
  count += 1;
}

console.log(
  `Wrote ${count} pages × 2 locales of Markdown into public/`,
);
