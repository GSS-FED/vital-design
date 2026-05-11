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
import type { FC } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';
import {
  AlertCustomContentPreview,
  AlertPreview,
  AlertWithIconPreview,
} from '~/components/previews/AlertPreview';
import {
  CalendarCJKLocalePreview,
  CalendarDatePickerPreview,
  CalendarDropdownCaptionPreview,
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();

  const data = page.data as unknown as CompiledPageData;
  const MDX = data.body;
  const neighbours = findNeighbour(source.pageTree, page.url);

  return (
    <DocsPage
      toc={data.toc}
      full={data.full}
      footer={{ items: neighbours }}
    >
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
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
            CalendarCJKLocalePreview,
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
