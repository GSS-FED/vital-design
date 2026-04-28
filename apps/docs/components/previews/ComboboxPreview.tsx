'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxHeader,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxSearchBar,
  ComboboxTagsValue,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/combobox/Combobox';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: 'Taiwan', value: 'tw' },
  { label: 'Japan', value: 'jp' },
  { label: 'Singapore', value: 'sg' },
  { label: 'South Korea', value: 'kr' },
];

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

function itemToStringLabel(item: Option | null) {
  return item?.label ?? '';
}

function itemToStringValue(item: Option | null) {
  return item?.value ?? '';
}

function uniqueOptions(items: Option[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.value)) return false;

    seen.add(item.value);
    return true;
  });
}

export function ComboboxPreview() {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <ComponentPreview>
      <Combobox
        items={options}
        itemToStringLabel={itemToStringLabel}
        itemToStringValue={itemToStringValue}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
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
    </ComponentPreview>
  );
}

export function ComboboxMultiplePreview() {
  const [value, setValue] = useState<Option[]>(
    frameworks.slice(0, 4),
  );

  return (
    <ComponentPreview>
      <Combobox
        multiple
        items={frameworks}
        itemToStringLabel={itemToStringLabel}
        itemToStringValue={itemToStringValue}
        value={value}
        onValueChange={(nextValue) =>
          setValue(uniqueOptions(nextValue))
        }
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
    </ComponentPreview>
  );
}
