'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxHeader,
  ComboboxItem,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxSearchBar,
  ComboboxTagsValue,
  ComboboxTrigger,
} from '@/components/combobox/Combobox';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const frameworks: Option[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
  { label: 'Ember', value: 'ember' },
  { label: 'Backbone', value: 'backbone' },
];

export function ComboboxMultipleExample() {
  const [value, setValue] = useState<Option[]>(
    frameworks.slice(0, 4),
  );

  return (
    <Combobox
      autoHighlight
      multiple
      items={frameworks}
      itemToStringLabel={(item: Option | null) => item?.label ?? ''}
      itemToStringValue={(item: Option | null) => item?.value ?? ''}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxTrigger
        nativeButton={false}
        render={<div />}
        className="w-72"
        aria-label="Open frameworks"
      >
        <ComboboxTagsValue
          maxDisplayCount={2}
          placeholder="Search frameworks"
        />
      </ComboboxTrigger>
      <ComboboxContent emptyText="No results">
        <ComboboxHeader>
          <ComboboxSearchBar placeholder="Search frameworks" />
        </ComboboxHeader>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.value} value={item}>
              <ComboboxItemCheckbox />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
