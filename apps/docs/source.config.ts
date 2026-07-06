import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options } from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';

const prettyCodeOptions: Options = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
};

// Transformer: walk the post-shiki tree, reconstruct the raw code from
// tokenized text nodes, and stamp data-* props on the parent <pre>. Runs
// AFTER rehype-pretty-code, so we can't rely on a single text child.
function rehypeCodeAnnotation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function collectText(node: any): string {
    if (node.type === 'text') return node.value;
    if (!Array.isArray(node.children)) return '';
    return (
      node.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => collectText(c))
        .join('')
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'pre') return;
      const code = node.children?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c: any) => c.type === 'element' && c.tagName === 'code',
      );
      if (!code) return;
      // After pretty-code, code has tokenized line/span children. We
      // reconstruct the raw text by walking them. Lines are usually wrapped
      // in <span data-line>; collectText flattens to a single string with
      // newlines preserved because each line span gets its own break.
      const raw: string = collectText(code).trimEnd();
      if (!raw) return;

      node.properties = node.properties ?? {};
      node.properties['data-raw'] = raw;

      const trimmed = raw.trim();
      if (trimmed.startsWith('npm ') || trimmed.startsWith('npx ')) {
        const yarn = raw
          .replace(/^npm install -D /gm, 'yarn add -D ')
          .replace(/^npm install /gm, 'yarn add ')
          .replace(/^npx /gm, 'yarn dlx ');
        const pnpm = raw
          .replace(/^npm install -D /gm, 'pnpm add -D ')
          .replace(/^npm install /gm, 'pnpm add ')
          .replace(/^npx /gm, 'pnpm dlx ');
        const bun = raw
          .replace(/^npm install -D /gm, 'bun add -D ')
          .replace(/^npm install /gm, 'bun add ')
          .replace(/^npx /gm, 'bunx ');

        node.properties['data-npm'] = raw;
        node.properties['data-yarn'] = yarn;
        node.properties['data-pnpm'] = pnpm;
        node.properties['data-bun'] = bun;
      }
    });
  };
}

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      rehypeCodeAnnotation,
    ],
  },
});
