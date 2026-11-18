// Turns a docs MDX file into plain Markdown for agents: the `.md` copy of
// every page (scripts/markdown.mts), /llms-full.txt, and the Copy Markdown
// button. JSX that only renders in the browser becomes Markdown:
// <ComponentPreview> is replaced by its example's source, token palettes
// by tables, and the component gallery by a list of links.
import type { Code, RootContent, Table, TableRow } from 'mdast';
import type {
  MdxJsxAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { parse as parseYaml } from 'yaml';
import { vitalThemeCssVars } from '../../../registry/vital-theme-vars';
import { previewSources } from '../components/previews/__sources__';
import * as tokenData from '../components/tokens/data';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs');

type Frontmatter = { title?: string; description?: string };

export function splitFrontmatter(source: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
  if (!match) return { frontmatter: {}, body: source };
  return {
    frontmatter: (parseYaml(match[1]) ?? {}) as Frontmatter,
    body: source.slice(match[0].length),
  };
}

/**
 * Markdown for one docs page, starting with its title and description.
 * `notice` goes right below them, such as the note that a zh-TW page is
 * still in English.
 */
export function mdxToMarkdown(
  source: string,
  notice?: string,
): string {
  const { frontmatter, body } = splitFrontmatter(source);
  const tree = remark().use(remarkMdx).use(remarkGfm).parse(body);
  tree.children = transformChildren(tree.children);
  const markdown = remark()
    .use(remarkGfm)
    .data('settings', {
      bullet: '-',
      emphasis: '_',
      listItemIndent: 'one',
      rule: '-',
    })
    .stringify(tree)
    .trim();

  const head = [`# ${frontmatter.title ?? ''}`.trim()];
  if (frontmatter.description)
    head.push(`> ${frontmatter.description}`);
  if (notice) head.push(notice);
  return `${[...head, markdown].filter(Boolean).join('\n\n')}\n`;
}

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

function transformChildren<T extends RootContent>(nodes: T[]): T[] {
  return nodes.flatMap((node) => transformNode(node) as T[]);
}

function transformNode(node: RootContent): RootContent[] {
  switch (node.type) {
    case 'mdxjsEsm':
    case 'mdxFlowExpression':
    case 'mdxTextExpression':
      return [];
    case 'mdxJsxFlowElement':
    case 'mdxJsxTextElement':
      return transformJsx(node);
    case 'heading': {
      // Fumadocs custom heading ids: `## Title [#id]`.
      const last = node.children.at(-1);
      if (last?.type === 'text') {
        last.value = last.value.replace(/\s*\[#[^\]]+\]$/, '');
      }
      break;
    }
  }
  if ('children' in node) {
    (node as { children: RootContent[] }).children =
      transformChildren(node.children as RootContent[]);
  }
  return [node];
}

function transformJsx(node: JsxElement): RootContent[] {
  const name = node.name ?? '';

  if (name === 'ComponentPreview') {
    const example = stringAttr(node, 'name');
    const entry = example ? previewSources[example] : undefined;
    if (!entry) {
      throw new Error(
        `<ComponentPreview name="${example ?? ''}">: no example exports that name in src-v2/**/examples`,
      );
    }
    return [
      {
        type: 'code',
        lang: 'tsx',
        value: entry.source,
      } satisfies Code,
    ];
  }

  if (name === 'Callout') {
    const title = stringAttr(node, 'title');
    const children = transformChildren(
      node.children as RootContent[],
    );
    return [
      {
        type: 'blockquote',
        children: [
          ...(title
            ? [
                {
                  type: 'paragraph' as const,
                  children: [
                    {
                      type: 'strong' as const,
                      children: [
                        { type: 'text' as const, value: title },
                      ],
                    },
                  ],
                },
              ]
            : []),
          ...(children as never[]),
        ],
      },
    ];
  }

  if (name === 'ComponentGallery') {
    const base = stringAttr(node, 'base') ?? '/docs/components';
    const items = expressionAttr(node, 'items') as string[];
    return [
      {
        type: 'list',
        ordered: false,
        spread: false,
        children: items.map((slug) => {
          const url = `${base}/${slug}`;
          const { title, description } = pageFrontmatter(url);
          return {
            type: 'listItem',
            spread: false,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'link',
                    url,
                    children: [
                      { type: 'text', value: title ?? slug },
                    ],
                  },
                  ...(description
                    ? [
                        {
                          type: 'text' as const,
                          value: `: ${description}`,
                        },
                      ]
                    : []),
                ],
              },
            ],
          };
        }),
      },
    ];
  }

  if (name.endsWith('Palette')) {
    return [tokenTable(expressionAttr(node, 'tokens'))];
  }

  // Layout wrappers (<div>, <Tabs>, …) keep their content; elements that
  // only render a demo (such as the example screens) drop out.
  return transformChildren(node.children as RootContent[]);
}

function findAttr(
  node: JsxElement,
  name: string,
): MdxJsxAttribute | undefined {
  return node.attributes.find(
    (attr): attr is MdxJsxAttribute =>
      attr.type === 'mdxJsxAttribute' && attr.name === name,
  );
}

function stringAttr(
  node: JsxElement,
  name: string,
): string | undefined {
  const value = findAttr(node, name)?.value;
  return typeof value === 'string' ? value : undefined;
}

// Evaluates `items={['a', 'b']}` (a literal) or `tokens={primaryTokens}`
// (an export of components/tokens/data.ts).
function expressionAttr(node: JsxElement, name: string): unknown {
  const value = findAttr(node, name)?.value;
  const expression =
    typeof value === 'object' ? value?.value.trim() : '';
  if (expression && /^[A-Za-z_$][\w$]*$/.test(expression)) {
    const data = (tokenData as Record<string, unknown>)[expression];
    if (data !== undefined) return data;
  }
  if (expression?.startsWith('[')) {
    return JSON.parse(
      expression.replace(/'/g, '"').replace(/,\s*]$/, ']'),
    );
  }
  throw new Error(
    `<${node.name} ${name}={${expression ?? ''}}>: cannot turn this into Markdown`,
  );
}

const themeVars = vitalThemeCssVars as {
  light: Record<string, string>;
  dark: Record<string, string>;
};

function tokenTable(tokens: unknown): Table {
  const entries = tokens as Record<string, string>[];
  const keys = [...new Set(entries.flatMap(Object.keys))];
  const withValues = entries.some(
    (entry) => entry.name?.replace(/^--/, '') in themeVars.light,
  );
  const header = [
    ...keys.map((key) => key[0].toUpperCase() + key.slice(1)),
    ...(withValues ? ['Light', 'Dark'] : []),
  ];

  const row = (cells: string[], code: boolean): TableRow => ({
    type: 'tableRow',
    children: cells.map((value) => ({
      type: 'tableCell',
      children: value
        ? [
            code
              ? { type: 'inlineCode', value }
              : { type: 'text', value },
          ]
        : [],
    })),
  });

  return {
    type: 'table',
    children: [
      row(header, false),
      ...entries.map((entry) => {
        const key = entry.name?.replace(/^--/, '') ?? '';
        const light = themeVars.light[key] ?? '';
        const dark = themeVars.dark[key] ?? light;
        return row(
          [
            ...keys.map((k) => entry[k] ?? ''),
            ...(withValues ? [light, dark] : []),
          ],
          true,
        );
      }),
    ],
  };
}

/** Title and description of the page at a docs URL, in its locale. */
function pageFrontmatter(url: string): Frontmatter {
  const zh = url.startsWith('/zh-tw/');
  const slug = url.replace(/^(\/zh-tw)?\/docs\/?/, '');
  const base = slug ? path.join(CONTENT_ROOT, slug) : CONTENT_ROOT;
  const candidates = [
    ...(zh
      ? [`${base}.zh-tw.mdx`, path.join(base, 'index.zh-tw.mdx')]
      : []),
    `${base}.mdx`,
    path.join(base, 'index.mdx'),
  ];
  const file = candidates.find((candidate) => existsSync(candidate));
  if (!file) throw new Error(`No docs page for ${url}`);
  return splitFrontmatter(readFileSync(file, 'utf-8')).frontmatter;
}
