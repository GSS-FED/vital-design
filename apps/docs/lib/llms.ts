import { readFileSync } from 'node:fs';
import type { ReactNode } from 'react';
import { mdxToMarkdown } from '~/lib/markdown';
import { source } from '~/lib/source';

const OPTIONAL_URLS = new Set([
  '/docs/getting-started/migration-guide',
]);

const SKIP_URLS = new Set(['/llms.txt']);

const PAGE_REGISTRY_ITEMS: Record<string, string[]> = {
  '/docs/getting-started/design-lint': ['vital-design-lint'],
  '/docs/components/icons': ['icon-<name>', 'vital-icons'],
  '/docs/components/input': [
    'input',
    'password-input',
    'input-group',
  ],
  '/docs/blocks/sidebar/cloud/flat': ['sidebar-cloud-01'],
  '/docs/blocks/sidebar/cloud/inline-submenus': ['sidebar-cloud-02'],
  '/docs/blocks/sidebar/cloud/dropdown-submenus': [
    'sidebar-cloud-03',
  ],
  '/docs/blocks/sidebar/cloud/secondary-nav': ['sidebar-cloud-04'],
  '/docs/blocks/sidebar/cloud/header-actions': ['sidebar-cloud-05'],
  '/docs/blocks/sidebar/cloud/collapsible-submenus': [
    'sidebar-cloud-06',
  ],
};

function registryItemsForUrl(url: string): string[] {
  const mapped = PAGE_REGISTRY_ITEMS[url];
  if (mapped) return mapped;

  if (url.startsWith('/docs/components/')) {
    const slug = url.slice('/docs/components/'.length);
    if (slug && !slug.includes('/')) return [slug];
  }

  if (url.startsWith('/docs/blocks/')) {
    const slug = url.slice('/docs/blocks/'.length);
    if (slug && !slug.includes('/')) return [slug];
  }

  return [];
}

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
  const items = registryItemsForUrl(page.url);
  const registryTag =
    items.length > 0
      ? `(${items.map((item) => `\`@vital-design/${item}\``).join(', ')})`
      : '';
  const description = descriptions.get(page.url);
  const detail = [registryTag, description].filter(Boolean).join(' ');
  return detail
    ? `- [${title}](${page.url}.md): ${detail}`
    : `- [${title}](${page.url}.md)`;
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
  for (const page of source.getPages('en')) {
    const description = (page.data as { description?: string })
      .description;
    if (description) descriptions.set(page.url, description);
  }
  return descriptions;
}

function urlsInOrder(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => {
    if (node.type === 'separator') return [];
    if (node.type === 'page') return [node.url];
    return [
      ...(node.index ? [node.index.url] : []),
      ...urlsInOrder(node.children),
    ];
  });
}

/** Every English docs page as Markdown, in sidebar order. */
export function buildLlmsFull(): string {
  const pages = new Map(
    source.getPages('en').map((page) => [page.url, page]),
  );
  return urlsInOrder(source.getPageTree('en').children as TreeNode[])
    .flatMap((url) => {
      const page = pages.get(url);
      if (!page) return [];
      return mdxToMarkdown(
        readFileSync(page.absolutePath, 'utf-8'),
        `Source: https://vittal.design${url}`,
      );
    })
    .join('\n');
}

type DocsTree = ReturnType<typeof source.getPageTree>;

export function withExternalLlmsLink(tree: DocsTree): DocsTree {
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

  for (const node of source.getPageTree('en')
    .children as TreeNode[]) {
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
    if (heading === 'Registry') {
      links.push(
        '- [Registry Manifest](/r/registry.json): Machine-readable JSON catalog of all UI components, blocks, hooks, icons, and theme items.',
        '- [Item JSON Endpoint](/r/button.json): Pattern `/r/{name}.json` returning exact TypeScript source, prop types, variants, and `registryDependencies` for any item.',
        '- [Base Bundle](/r/vital-design-base.json): (`@vital-design/vital-design-base`) One-command setup installing `vital-theme`, `utils`, and `vital-icons`.',
        '- [Theme Tokens](/r/vital-theme.json): (`@vital-design/vital-theme`) CSS variables and Tailwind v4 `@theme` tokens.',
        '- [Design Lint Policy](/r/vital-design-lint.json): (`@vital-design/vital-design-lint`) Oxlint + `@shadcn/lint` policy enforcing Vital Design theme tokens.',
        '- [Hooks — useDebounceValue](/r/use-debounce-value.json): (`@vital-design/use-debounce-value`) Debounce value hook with configurable delay.',
        '- [Hooks — useIsMobile](/r/use-is-mobile.json): (`@vital-design/use-is-mobile`) Viewport mobile breakpoint (768px) hook.',
      );
    }
    if (links.length > 0) sections.push({ heading, links });
  }

  const parts = [
    '# Vittal Design',
    '',
    '> React 19 component library built with TypeScript, Tailwind CSS 4, and Base UI primitives.',
    '> New components and blocks live in `src-v2/` and are distributed via a shadcn-compatible registry (`@vital-design`).',
    '',
    '## Agent Guide',
    '',
    '- **Markdown pages**: Every docs page is also Markdown at its URL plus `.md`, as linked below (`/zh-tw/docs/<page>.md` for Traditional Chinese). Examples appear as their full source with registry import paths. `/llms-full.txt` joins every English page into one file.',
    '- **Install via shadcn CLI**: Add `"@vital-design": "https://vittal.design/r/{name}.json"` under `"registries"` in `components.json`, start the loaded global CSS file with `@import \'tailwindcss\';` and `@import \'tw-animate-css\';`, then run `npx shadcn@latest add --yes @vital-design/<name>`.',
    '- **Source of truth for props & source code**: Fetch `/r/{name}.json` (e.g. `https://vittal.design/r/button.json`) for the exact TypeScript source, exported parts, `data-slot` attributes, CVA variants, and dependencies. Fetch `https://vittal.design/r/registry.json` to list every published item and `icon-*` glyph.',
    '- **Legacy package boundary**: `@fed/vital-design` on npm is the legacy v1 (`src/`) surface. Do not use it for new components.',
    '- **Named exports & exact paths**: All v2 components and icons use named exports. Import from exact file paths — consumer apps: `@/components/ui/<PascalName>` and `@/components/icons/<IconName>`; library repo (`src-v2/`): `@/components/<dir>/<PascalName>` and `@/icons/<IconName>`. Never use barrel imports.',
    '- **Base UI `render` prop (no `asChild`)**: Triggers (`DialogTrigger`, `DropdownMenuTrigger`, `PopoverTrigger`, `TooltipTrigger`, `SheetTrigger`, `CollapsibleTrigger`) and `LinkButton` take `render={<Element />}` instead of Radix `asChild`.',
    '- **Button, LinkButton, and SplitButton**:',
    '  - Pass icons or `<Spinner />` as children marked with `data-icon="inline-start"` or `data-icon="inline-end"`. There is no `icon` prop.',
    '  - Sizes are `md`, `lg`, `icon-md`, and `icon-lg`.',
    '  - Color is controlled by `theme` (`primary`, `default`, `success`, `info`, `warning`, `alarm`, `dangerous`), while `variant` is `default`, `text`, or `ghost` (`text` and `ghost` do not accept `dangerous`; use `alarm`). `variant="ghost"` defaults to `theme="primary"`; pass `theme="default"` for a quiet neutral action.',
    '  - Use `LinkButton` (from `Button.tsx`) for links styled as buttons (`<LinkButton variant="text" render={<Link href="/settings" />}>`). Never use `<Button nativeButton={false} render={<a />}>`, which adds `role="button"`.',
    '  - `SplitButton` has no built-in menu (`open` + `splitOnClick`). For an action with a menu, compose `ButtonGroup` + `Button` + `DropdownMenu` with the trigger rendered as an `icon-md` `Button`.',
    '- **Selection & form callbacks**:',
    '  - Selection split: `Select` = flat single/multi value picker (pass `items={{ label, value }[]}` so the closed trigger renders labels), `Combobox` = searchable value picker, `Autocomplete` = free-form text input with suggestions, `Command` + `Popover` = hierarchical path picker or command palette, `DropdownMenu` = action menu (closes on pick).',
    "  - `Checkbox` uses `checked: boolean`, `indeterminate: boolean`, and `onCheckedChange: (checked: boolean) => void` (never pass `'indeterminate'` to `checked`).",
    '  - `PasswordInput` and `SearchBar` pass `(value: string)` to `onChange`; `Input` and `Textarea` pass the DOM change event; `NumberInput` uses `value: number | null` and `onValueChange`.',
    '- **Tokens & styling**: Use Vital Design token utilities (`bg-primary-500`, `text-grayscale-opacity-900`, `border-grayscale-opacity-200`) merged with `cn()`. Target internal parts via `data-slot`.',
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
