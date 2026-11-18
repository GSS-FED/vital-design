'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/autocomplete/Autocomplete';
import { Button } from '@/components/button/Button';
import { useState } from 'react';

type Tag = {
  id: string;
  value: string;
};

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

export function AutocompleteSubmitSearchExample() {
  const [query, setQuery] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const submitted = data.get('query');
        setQuery(typeof submitted === 'string' ? submitted : '');
      }}
    >
      <Autocomplete<Tag> items={tags} name="query" submitOnItemClick>
        <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
          Search and submit
          <AutocompleteInputGroup>
            <AutocompleteIcon />
            <AutocompleteInput placeholder="Search tags" />
            <AutocompleteClear />
            <AutocompleteTrigger />
          </AutocompleteInputGroup>
        </label>
        <AutocompleteContent emptyText="No tags found.">
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
      <Button type="submit">Submit</Button>
      {query !== null ? (
        <p className="text-sm text-grayscale-opacity-600">
          Submitted: {query}
        </p>
      ) : null}
    </form>
  );
}
