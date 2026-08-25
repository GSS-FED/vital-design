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
import { notFound } from 'next/navigation';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { FC } from 'react';
import { MdxPre } from '~/components/docs/MdxPre';
import { TitleActions } from '~/components/docs/TitleActions';
import { ComponentPreview } from '~/components/preview/ComponentPreview';
import {
  AlertCustomContentPreview,
  AlertPreview,
  AlertWithIconPreview,
} from '~/components/previews/AlertPreview';
import {
  CalendarDatePickerPreview,
  CalendarDropdownCaptionPreview,
  CalendarLocaleFormatterPreview,
  CalendarLocalePreview,
  CalendarPreview,
  CalendarRangePreview,
} from '~/components/previews/CalendarPreview';
import {
  CheckboxPreview,
  CheckboxStatesPreview,
} from '~/components/previews/CheckboxPreview';
import {
  ChipPreview,
  ChipStatesPreview,
} from '~/components/previews/ChipPreview';
import {
  CollapsiblePreview,
  CollapsibleProductDetailsPreview,
} from '~/components/previews/CollapsiblePreview';
import {
  ComboboxMultiplePreview,
  ComboboxPreview,
} from '~/components/previews/ComboboxPreview';
import {
  DialogPreview,
  DialogSizesPreview,
} from '~/components/previews/DialogPreview';
import {
  RadioGroupPreview,
  RadioGroupVerticalPreview,
} from '~/components/previews/RadioGroupPreview';
import {
  ScrollAreaFadePreview,
  ScrollAreaPreview,
} from '~/components/previews/ScrollAreaPreview';
import {
  SearchBarDisabledPreview,
  SearchBarPreview,
} from '~/components/previews/SearchBarPreview';
import {
  SelectMultiplePreview,
  SelectPreview,
} from '~/components/previews/SelectPreview';
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
  SliderDisabledPreview,
  SliderMinMaxPreview,
  SliderPreview,
  SliderRangePreview,
  SliderStepPreview,
  SliderVerticalPreview,
} from '~/components/previews/SliderPreview';
import {
  SplitButtonDefaultPreview,
  SplitButtonPreview,
} from '~/components/previews/SplitButtonPreview';
import {
  SwitchDisabledPreview,
  SwitchInvalidPreview,
  SwitchPreview,
} from '~/components/previews/SwitchPreview';
import {
  TabsBorderedPreview,
  TabsPillPreview,
  TabsPreview,
  TabsVerticalPreview,
} from '~/components/previews/TabsPreview';
import {
  TagColorsPreview,
  TagPreview,
  TagRemovablePreview,
  TagSolidPreview,
} from '~/components/previews/TagPreview';
import {
  TimePickerCustomHeightPreview,
  TimePickerHoursMinutesPreview,
  TimePickerInPopoverPreview,
  TimePickerPreview,
  TimePickerStepsPreview,
} from '~/components/previews/TimePickerPreview';
import { source } from '~/lib/source';

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

const REGISTRY_BASE_URL =
  'https://bizform.vikosmos.com/vittal-design/r';

async function loadRawMarkdown(
  slug: string[] | undefined,
): Promise<string | undefined> {
  const segments = slug ?? [];
  const contentRoot = path.join(process.cwd(), 'content', 'docs');
  const candidates =
    segments.length === 0
      ? [path.join(contentRoot, 'index.mdx')]
      : [
          path.join(contentRoot, ...segments) + '.mdx',
          path.join(contentRoot, ...segments, 'index.mdx'),
        ];
  for (const candidate of candidates) {
    try {
      return await readFile(candidate, 'utf-8');
    } catch {
      // try next candidate
    }
  }
  return undefined;
}

function registryUrlFor(
  slug: string[] | undefined,
): string | undefined {
  if (!slug || slug.length !== 2) return undefined;
  const [section, name] = slug;
  if (section !== 'components' && section !== 'blocks')
    return undefined;
  return `${REGISTRY_BASE_URL}/${name}.json`;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const slug = (await params).slug;
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as CompiledPageData;
  const MDX = data.body;
  const neighbours = findNeighbour(source.pageTree, page.url);
  const [rawMarkdown, registryUrl] = [
    await loadRawMarkdown(slug),
    registryUrlFor(slug),
  ];

  return (
    <DocsPage
      toc={data.toc}
      full={data.full}
      footer={{ items: neighbours }}
    >
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <TitleActions
        rawMarkdown={rawMarkdown}
        registryUrl={registryUrl}
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
            AlertPreview,
            AlertWithIconPreview,
            AlertCustomContentPreview,
            CalendarPreview,
            CalendarRangePreview,
            CalendarDropdownCaptionPreview,
            CalendarLocalePreview,
            CalendarLocaleFormatterPreview,
            CalendarDatePickerPreview,
            ChipPreview,
            ChipStatesPreview,
            CollapsiblePreview,
            CollapsibleProductDetailsPreview,
            ComboboxPreview,
            ComboboxMultiplePreview,
            DialogPreview,
            DialogSizesPreview,
            SelectPreview,
            SelectMultiplePreview,
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
            SwitchPreview,
            SwitchDisabledPreview,
            SwitchInvalidPreview,
            CheckboxPreview,
            CheckboxStatesPreview,
            RadioGroupPreview,
            RadioGroupVerticalPreview,
            TagPreview,
            TagColorsPreview,
            TagSolidPreview,
            TagRemovablePreview,
            TabsPreview,
            TabsBorderedPreview,
            TabsPillPreview,
            TabsVerticalPreview,
            SearchBarPreview,
            SearchBarDisabledPreview,
            ScrollAreaPreview,
            ScrollAreaFadePreview,
            SplitButtonPreview,
            SplitButtonDefaultPreview,
            SliderPreview,
            SliderRangePreview,
            SliderDisabledPreview,
            SliderStepPreview,
            SliderMinMaxPreview,
            SliderVerticalPreview,
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

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  const data = page.data as unknown as CompiledPageData;
  return {
    title: data.title,
    description: data.description,
  };
}
