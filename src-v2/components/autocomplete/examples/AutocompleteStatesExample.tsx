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

const tags = ['feature', 'fix', 'bug', 'docs'];

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'With value', props: { defaultValue: 'feature' } },
  {
    label: 'Long value',
    props: {
      defaultValue: 'a long search query that does not fit the input',
    },
  },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: {}, invalid: true },
];

export function AutocompleteStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Autocomplete<string> items={tags} {...props}>
            <AutocompleteInputGroup aria-invalid={invalid}>
              <AutocompleteIcon />
              <AutocompleteInput
                aria-label={`${label} search`}
                placeholder="Search tags"
              />
              <AutocompleteClear />
              <AutocompleteTrigger />
            </AutocompleteInputGroup>
            <AutocompleteContent emptyText="No tags found.">
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteContent>
          </Autocomplete>
        </div>
      ))}
    </div>
  );
}
