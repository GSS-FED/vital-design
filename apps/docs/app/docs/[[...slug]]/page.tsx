import { findNeighbour } from 'fumadocs-core/server';
import type { TableOfContents } from 'fumadocs-core/server';
import { Callout } from 'fumadocs-ui/components/callout';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFile } from 'node:fs/promises';
import type { FC } from 'react';
import { MdxPre } from '~/components/docs/MdxPre';
import { TitleActions } from '~/components/docs/TitleActions';
import { ComponentPreview } from '~/components/preview/ComponentPreview';
import {
  CalendarDatePickerPreview,
  CalendarDropdownCaptionPreview,
  CalendarLocaleFormatterPreview,
  CalendarLocalePreview,
  CalendarPreview,
  CalendarRangePreview,
} from '~/components/previews/CalendarPreview';
import {
  ComboboxMultiplePreview,
  ComboboxPreview,
} from '~/components/previews/ComboboxPreview';
import {
  DialogPreview,
  DialogSizesPreview,
} from '~/components/previews/DialogPreview';
import {
  SheetNonModalPreview,
  SheetPreview,
  SheetSidesPreview,
} from '~/components/previews/SheetPreview';
import { SidebarCloud01Preview } from '~/components/previews/SidebarCloud01Preview';
import { SidebarCloud02Preview } from '~/components/previews/SidebarCloud02Preview';
import { SidebarCloud03Preview } from '~/components/previews/SidebarCloud03Preview';
import { SidebarCloud04Preview } from '~/components/previews/SidebarCloud04Preview';
import { SidebarCloud05Preview } from '~/components/previews/SidebarCloud05Preview';
import { SidebarCloud06Preview } from '~/components/previews/SidebarCloud06Preview';
import {
  SidebarFloatingPreview,
  SidebarInsetPreview,
  SidebarPreview,
} from '~/components/previews/SidebarPreview';
import {
  SplitButtonDefaultPreview,
  SplitButtonPreview,
} from '~/components/previews/SplitButtonPreview';
import { TablePaginationPreview } from '~/components/previews/TablePaginationPreview';
import {
  TimePickerCustomHeightPreview,
  TimePickerHoursMinutesPreview,
  TimePickerInPopoverPreview,
  TimePickerPreview,
  TimePickerStepsPreview,
} from '~/components/previews/TimePickerPreview';
import { type DocsLocale } from '~/lib/i18n';
import { source } from '~/lib/source';
import { hasZhTranslation } from '~/lib/translation-file';

// fumadocs-mdx generates body, toc, etc. from CompiledMDXProperties, but
// the base PageData type in fumadocs-core doesn't declare them. Cast to access.
interface CompiledPageData {
  title?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: FC<any>;
  toc: TableOfContents;
  full?: boolean;
}

const REGISTRY_BASE_URL = 'https://vittal.design/r';

// Docs slug is not the registry item name for these nested block pages.
const REGISTRY_ITEM_BY_SLUG: Record<string, string> = {
  'blocks/sidebar/cloud/flat': 'sidebar-cloud-01',
  'blocks/sidebar/cloud/inline-submenus': 'sidebar-cloud-02',
  'blocks/sidebar/cloud/dropdown-submenus': 'sidebar-cloud-03',
  'blocks/sidebar/cloud/secondary-nav': 'sidebar-cloud-04',
  'blocks/sidebar/cloud/header-actions': 'sidebar-cloud-05',
  'blocks/sidebar/cloud/collapsible-submenus': 'sidebar-cloud-06',
};

async function loadRawMarkdown(
  absolutePath: string,
): Promise<string | undefined> {
  if (!absolutePath) return undefined;
  try {
    return await readFile(absolutePath, 'utf-8');
  } catch {
    return undefined;
  }
}

function registryUrlFor(
  slug: string[] | undefined,
): string | undefined {
  if (!slug || slug.length === 0) return undefined;
  const [section] = slug;
  if (section !== 'components' && section !== 'blocks')
    return undefined;

  const item =
    REGISTRY_ITEM_BY_SLUG[slug.join('/')] ??
    (slug.length === 2 ? slug[1] : undefined);
  if (!item) return undefined;
  return `${REGISTRY_BASE_URL}/${item}.json`;
}

export async function DocsContentPage({
  locale,
  slug,
}: {
  locale: DocsLocale;
  slug?: string[];
}) {
  const page = source.getPage(slug, locale);
  if (!page) notFound();

  const data = page.data as unknown as CompiledPageData;
  const MDX = data.body;
  const neighbours = findNeighbour(
    source.getPageTree(locale),
    page.url,
  );
  const translated = locale === 'en' || hasZhTranslation(slug);
  const [rawMarkdown, registryUrl] = [
    await loadRawMarkdown(page.absolutePath),
    registryUrlFor(slug),
  ];

  return (
    <DocsPage
      toc={
        // Changelog: list only months (##) and entries (###), not the
        // #### sections inside each entry.
        slug?.join('/') === 'changelog'
          ? data.toc.filter((item) => item.depth <= 3)
          : data.toc
      }
      full={data.full}
      footer={{ items: neighbours }}
    >
      {!translated ? (
        <Callout title="尚未翻譯">
          此頁尚無繁體中文，以下為英文原文。
        </Callout>
      ) : null}
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <TitleActions
        rawMarkdown={rawMarkdown}
        registryUrl={registryUrl}
        locale={locale}
      />
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            pre: MdxPre,
            Callout,
            Step,
            Steps,
            Tab,
            Tabs,
            TypeTable,
            ComponentPreview,
            CalendarPreview,
            CalendarRangePreview,
            CalendarDropdownCaptionPreview,
            CalendarLocalePreview,
            CalendarLocaleFormatterPreview,
            CalendarDatePickerPreview,
            ComboboxPreview,
            ComboboxMultiplePreview,
            DialogPreview,
            DialogSizesPreview,
            SheetPreview,
            SheetSidesPreview,
            SheetNonModalPreview,
            SidebarPreview,
            SidebarInsetPreview,
            SidebarFloatingPreview,
            SidebarCloud01Preview,
            SidebarCloud02Preview,
            SidebarCloud03Preview,
            SidebarCloud04Preview,
            SidebarCloud05Preview,
            SidebarCloud06Preview,
            TablePaginationPreview,
            SplitButtonPreview,
            SplitButtonDefaultPreview,
            TimePickerPreview,
            TimePickerHoursMinutesPreview,
            TimePickerStepsPreview,
            TimePickerCustomHeightPreview,
            TimePickerInPopoverPreview,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <DocsContentPage locale="en" slug={slug} />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParamsFor('en');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metadataFor('en', slug);
}

export function staticParamsFor(locale: DocsLocale) {
  return source
    .generateParams()
    .filter((entry) => entry.lang === locale)
    .map(({ slug }) => ({ slug }));
}

export async function metadataFor(
  locale: DocsLocale,
  slug: string[] | undefined,
): Promise<Metadata> {
  const page = source.getPage(slug, locale);
  if (!page) notFound();
  const data = page.data as unknown as CompiledPageData;
  const translated = locale === 'en' || hasZhTranslation(slug);
  const enUrl = source.getPage(slug, 'en')?.url;
  const zhUrl = hasZhTranslation(slug)
    ? source.getPage(slug, 'zh-tw')?.url
    : undefined;

  const languages: Record<string, string> = {};
  if (enUrl) languages.en = enUrl;
  if (zhUrl) languages['zh-TW'] = zhUrl;

  return {
    title: data.title,
    description: data.description,
    alternates:
      translated && zhUrl
        ? { languages }
        : enUrl
          ? { canonical: enUrl }
          : undefined,
    robots:
      locale === 'zh-tw' && !translated
        ? { index: false, follow: true }
        : undefined,
  };
}
