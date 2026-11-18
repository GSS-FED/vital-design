'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/autocomplete/Autocomplete';

type TagGroup = {
  value: string;
  items: string[];
};

const groups: TagGroup[] = [
  {
    value: 'Work',
    items: ['feature', 'fix', 'bug', 'internal'],
  },
  {
    value: 'Components',
    items: ['autocomplete', 'combobox', 'select', 'tooltip'],
  },
];

export function AutocompleteGroupedExample() {
  return (
    <Autocomplete<TagGroup> items={groups} openOnInputClick>
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Search grouped tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="e.g. autocomplete" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent emptyText="No tags found.">
        {(group: TagGroup) => (
          <AutocompleteGroup key={group.value} items={group.items}>
            <AutocompleteGroupLabel>
              {group.value}
            </AutocompleteGroupLabel>
            {group.items.map((item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
