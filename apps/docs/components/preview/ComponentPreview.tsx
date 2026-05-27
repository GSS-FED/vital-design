'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { type ReactNode, useState } from 'react';
import { previewSources } from '~/components/previews/__sources__';
import { CopySourceButton } from './CopySourceButton';

type Align = 'center' | 'start' | 'stretch';

const alignClass: Record<Align, string> = {
  center: 'items-center justify-center',
  start: 'items-start justify-start flex-col',
  stretch: 'items-stretch justify-stretch flex-col',
};

type ComponentPreviewProps = {
  children: ReactNode;
  className?: string;
  /**
   * Source-map key matching one of the exported preview function names in
   * `apps/docs/components/previews/*.tsx`. When omitted, only the rendered
   * preview is shown (no Code tab).
   */
  name?: string;
  align?: Align;
  /** Legacy: when false, align="start". */
  centered?: boolean;
  /** Tailwind class for the preview panel min-height. */
  minHeight?: string;
};

export function ComponentPreview({
  children,
  name,
  align,
  centered = true,
  minHeight = 'min-h-[20rem]',
}: ComponentPreviewProps) {
  const resolvedAlign: Align =
    align ?? (centered ? 'center' : 'start');
  const entry = name ? previewSources[name] : undefined;
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  if (!entry) {
    return (
      <div
        className={`not-prose my-6 flex flex-wrap gap-4 rounded-xl border border-grayscale-opacity-200 bg-white p-8 ${minHeight} ${alignClass[resolvedAlign]}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="not-prose group/preview my-6 flex flex-col gap-2">
      <BaseTabs.Root
        value={tab}
        onValueChange={(v) => setTab(v as 'preview' | 'code')}
      >
        <BaseTabs.List className="inline-flex w-fit items-center gap-1 rounded-lg bg-grayscale-opacity-100 p-1 text-sm">
          <BaseTabs.Tab
            value="preview"
            className="cursor-pointer rounded-md px-3 py-1 font-medium text-grayscale-opacity-700 outline-none transition-colors hover:text-grayscale-opacity-900 data-[active]:bg-white data-[active]:text-grayscale-opacity-900 data-[active]:shadow-sm"
          >
            Preview
          </BaseTabs.Tab>
          <BaseTabs.Tab
            value="code"
            className="cursor-pointer rounded-md px-3 py-1 font-medium text-grayscale-opacity-700 outline-none transition-colors hover:text-grayscale-opacity-900 data-[active]:bg-white data-[active]:text-grayscale-opacity-900 data-[active]:shadow-sm"
          >
            Code
          </BaseTabs.Tab>
        </BaseTabs.List>
      </BaseTabs.Root>

      <div className="relative overflow-hidden rounded-xl border border-grayscale-opacity-200 bg-white">
        {tab === 'preview' ? (
          <div
            className={`flex flex-wrap gap-4 p-8 ${minHeight} ${alignClass[resolvedAlign]}`}
          >
            {children}
          </div>
        ) : (
          <div className="relative">
            <CopySourceButton source={entry.source} />
            <div
              className="max-h-[28rem] overflow-auto bg-grayscale-100 p-4 font-mono text-[13px] leading-6 [&_pre]:!m-0 [&_pre]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
