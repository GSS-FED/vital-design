'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
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

export function AutocompleteLimitedResultsExample() {
  return (
    <Autocomplete<Tag>
      items={tags}
      itemToStringValue={(tag) => tag.value}
      limit={4}
      openOnInputClick
    >
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Limit results to 4
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Search tags" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent>
        <AutocompleteStatus>
          Keep typing to narrow the result list.
        </AutocompleteStatus>
        <AutocompleteList>
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteList>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
      </AutocompleteContent>
    </Autocomplete>
  );
}
