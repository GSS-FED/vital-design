'use client';

import { useDocsSearch } from 'fumadocs-core/search/client';
import type { SortedResult } from 'fumadocs-core/server';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useMemo } from 'react';

async function initOrama(locale?: string) {
  const { create } = await import('@orama/orama');

  if (locale === 'zh-tw') {
    const { createTokenizer } = await import(
      '@orama/tokenizers/mandarin'
    );
    return create({
      schema: { _: 'string' },
      components: {
        tokenizer: createTokenizer(),
      },
    });
  }

  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

export function DocsSearchDialog({
  open,
  onOpenChange,
}: SharedProps) {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    locale,
    initOrama,
  });
  const items = useMemo<SortedResult[] | null>(() => {
    if (query.data === 'empty' || query.data === undefined)
      return null;
    return query.data;
  }, [query.data]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      open={open}
      onOpenChange={onOpenChange}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
