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

// Transformer: detect npm/npx commands and annotate code nodes with
// __npm__, __yarn__, __pnpm__, __bun__ props for a package manager tab UI.
function rehypePackageManagerAnnotation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'code') return;
      const firstChild = node.children[0];
      if (firstChild?.type !== 'text') return;
      const raw: string = firstChild.value;
      if (
        !raw.trim().startsWith('npm ') &&
        !raw.trim().startsWith('npx ')
      )
        return;

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

      node.properties = node.properties ?? {};
      node.properties['__npm__'] = raw;
      node.properties['__yarn__'] = yarn;
      node.properties['__pnpm__'] = pnpm;
      node.properties['__bun__'] = bun;
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
      rehypePackageManagerAnnotation,
    ],
  },
});
