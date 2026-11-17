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

export function AutocompleteInlineAutocompleteExample() {
  return (
    <Autocomplete<Tag>
      items={tags}
      itemToStringValue={(tag) => tag.value}
      mode="both"
      openOnInputClick
    >
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Search tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Type com..." />
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
  );
}
