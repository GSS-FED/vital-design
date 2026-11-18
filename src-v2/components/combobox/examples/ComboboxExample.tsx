'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxHeader,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxItemText,
  ComboboxList,
  ComboboxSearchBar,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/combobox/Combobox';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const countries: Option[] = [
  { label: 'Taiwan', value: 'tw' },
  { label: 'Japan', value: 'jp' },
  { label: 'Singapore', value: 'sg' },
  { label: 'South Korea', value: 'kr' },
];

export function ComboboxExample() {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <Combobox
      autoHighlight
      items={countries}
      itemToStringLabel={(item: Option | null) => item?.label ?? ''}
      itemToStringValue={(item: Option | null) => item?.value ?? ''}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxTrigger className="w-60" aria-label="Open countries">
        <ComboboxValue placeholder="Search countries" />
      </ComboboxTrigger>
      <ComboboxContent emptyText="No results">
        <ComboboxHeader>
          <ComboboxSearchBar placeholder="Search countries" />
        </ComboboxHeader>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.value} value={item}>
              <ComboboxItemText>{item.label}</ComboboxItemText>
              <ComboboxItemCheck />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
