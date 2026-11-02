import { existsSync } from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs');

export function zhTranslationPath(
  slug: string[] | undefined,
): string | undefined {
  const segments = slug ?? [];
  const candidates =
    segments.length === 0
      ? [path.join(CONTENT_ROOT, 'index.zh-tw.mdx')]
      : [
          path.join(
            CONTENT_ROOT,
            ...segments.slice(0, -1),
            `${segments[segments.length - 1]}.zh-tw.mdx`,
          ),
          path.join(CONTENT_ROOT, ...segments, 'index.zh-tw.mdx'),
        ];

  return candidates.find((file) => existsSync(file));
}

export function hasZhTranslation(
  slug: string[] | undefined,
): boolean {
  return zhTranslationPath(slug) !== undefined;
}
