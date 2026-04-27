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
import { CascaderPreview } from '~/components/previews/CascaderPreview';
import {
  CheckboxPreview,
  CheckboxStatesPreview,
} from '~/components/previews/CheckboxPreview';
import {
  ChipPreview,
  ChipStatesPreview,
} from '~/components/previews/ChipPreview';
import {
  ComboboxMultiplePreview,
  ComboboxPreview,
} from '~/components/previews/ComboboxPreview';
import {
  DialogPreview,
  DialogSizesPreview,
} from '~/components/previews/DialogPreview';
import {
  ListOverflowPreview,
  ListPreview,
} from '~/components/previews/ListPreview';
import {
  MaskNoOverflowPreview,
  MaskPreview,
} from '~/components/previews/MaskPreview';
import {
  RadioGroupPreview,
  RadioGroupVerticalPreview,
} from '~/components/previews/RadioGroupPreview';
import {
  SearchBarDisabledPreview,
  SearchBarPreview,
} from '~/components/previews/SearchBarPreview';
import {
  SelectMultiplePreview,
  SelectPreview,
} from '~/components/previews/SelectPreview';
import {
  SplitButtonDefaultPreview,
  SplitButtonPreview,
} from '~/components/previews/SplitButtonPreview';
import {
  SwitchDisabledPreview,
  SwitchPreview,
} from '~/components/previews/SwitchPreview';
import {
  TagColorsPreview,
  TagPreview,
  TagRemovablePreview,
  TagSolidPreview,
} from '~/components/previews/TagPreview';
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
            ChipPreview,
            ChipStatesPreview,
            ComboboxPreview,
            ComboboxMultiplePreview,
            DialogPreview,
            DialogSizesPreview,
            SelectPreview,
            SelectMultiplePreview,
            SwitchPreview,
            SwitchDisabledPreview,
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
            SplitButtonPreview,
            SplitButtonDefaultPreview,
            CascaderPreview,
            ListPreview,
            ListOverflowPreview,
            MaskPreview,
            MaskNoOverflowPreview,
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
