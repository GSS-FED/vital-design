'use client';

import { SearchBar } from '@/components/search-bar/SearchBar';

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Filled', props: { defaultValue: 'Vital Design' } },
  {
    label: 'Long value',
    props: {
      defaultValue: 'A long search query that does not fit the field',
    },
  },
  { label: 'Disabled', props: { disabled: true } },
];

export function SearchBarStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_17.5rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <SearchBar
            aria-label={label}
            placeholder="Search..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
