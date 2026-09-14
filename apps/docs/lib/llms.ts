import type { ReactNode } from 'react';
import { source } from '~/lib/source';

const OPTIONAL_URLS = new Set([
  '/docs/getting-started/migration-guide',
]);

const SKIP_URLS = new Set(['/llms.txt']);

type TreePage = {
  type: 'page';
  name: ReactNode;
  url: string;
};

type TreeFolder = {
  type: 'folder';
  name: ReactNode;
  index?: TreePage;
  children: TreeNode[];
};

type TreeNode =
  | TreePage
  | TreeFolder
  | { type: 'separator'; name: ReactNode };

function asText(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(asText).join('');
  }
  if (value && typeof value === 'object' && 'props' in value) {
    const children = (value as { props?: { children?: unknown } })
      .props?.children;
    return asText(children);
  }
  return '';
}

function formatLink(
  page: TreePage,
  prefix: string[],
  descriptions: Map<string, string>,
): string {
  const name = asText(page.name);
  const title =
    prefix.length > 0 ? `${prefix.join(' / ')} / ${name}` : name;
  const description = descriptions.get(page.url);
  return description
    ? `- [${title}](${page.url}): ${description}`
    : `- [${title}](${page.url})`;
}

function collectPages(
  nodes: TreeNode[],
  prefix: string[],
  descriptions: Map<string, string>,
  primary: string[],
  optional: string[],
): void {
  for (const node of nodes) {
    if (node.type === 'separator') continue;

    if (node.type === 'page') {
      if (SKIP_URLS.has(node.url)) continue;
      const line = formatLink(node, prefix, descriptions);
      if (OPTIONAL_URLS.has(node.url)) optional.push(line);
      else primary.push(line);
      continue;
    }

    const nextPrefix = [...prefix, asText(node.name)];
    if (node.index && !SKIP_URLS.has(node.index.url)) {
      const line = formatLink(node.index, nextPrefix, descriptions);
      if (OPTIONAL_URLS.has(node.index.url)) optional.push(line);
      else primary.push(line);
    }
    collectPages(
      node.children,
      nextPrefix,
      descriptions,
      primary,
      optional,
    );
  }
}

function descriptionMap(): Map<string, string> {
  const descriptions = new Map<string, string>();
  for (const page of source.getPages()) {
    const description = (page.data as { description?: string })
      .description;
    if (description) descriptions.set(page.url, description);
  }
  return descriptions;
}

export function withExternalLlmsLink(
  tree: typeof source.pageTree,
): typeof source.pageTree {
  return {
    ...tree,
    children: tree.children.map((node) =>
      node.type === 'page' && node.url === '/llms.txt'
        ? { ...node, external: true }
        : node,
    ),
  };
}

export function buildLlmsIndex(): string {
  const descriptions = descriptionMap();
  const sections: { heading: string; links: string[] }[] = [];
  const optional: string[] = [];

  for (const node of source.pageTree.children as TreeNode[]) {
    if (node.type === 'separator') continue;

    if (node.type === 'page') {
      if (SKIP_URLS.has(node.url)) continue;
      const line = formatLink(node, [], descriptions);
      if (OPTIONAL_URLS.has(node.url)) optional.push(line);
      else {
        const last = sections.at(-1);
        if (last?.heading === 'Docs') last.links.push(line);
        else sections.push({ heading: 'Docs', links: [line] });
      }
      continue;
    }

    const heading = asText(node.name);
    const links: string[] = [];
    if (node.index && !SKIP_URLS.has(node.index.url)) {
      const line = formatLink(node.index, [], descriptions);
      if (OPTIONAL_URLS.has(node.index.url)) optional.push(line);
      else links.push(line);
    }
    collectPages(node.children, [], descriptions, links, optional);
    if (links.length > 0) sections.push({ heading, links });
  }

  const parts = [
    '# Vital Design',
    '',
    '> React 18 component library with TypeScript and Tailwind CSS 4.',
    '> New work lives in `src-v2/` and is installed from the shadcn-compatible registry.',
    '',
    'Important notes:',
    '',
    '- Install components with `npx shadcn@latest add @vital-design/<name>`.',
    '  Registry: `https://bizform.vikosmos.com/vittal-design/r/{name}.json`',
    '- `@fed/vital-design` on npm is the legacy `src/` surface. Do not use it for new components.',
    '- Import icons from exact paths (`@/icons/SearchIcon`), not a barrel.',
    '- `Button` / `SplitButton` take icons as children with `data-icon="inline-start"` or `data-icon="inline-end"`. There is no `icon` prop.',
    '',
  ];

  for (const section of sections) {
    parts.push(`## ${section.heading}`, '', ...section.links, '');
  }

  if (optional.length > 0) {
    parts.push('## Optional', '', ...optional, '');
  }

  return parts.join('\n').trimEnd() + '\n';
}
