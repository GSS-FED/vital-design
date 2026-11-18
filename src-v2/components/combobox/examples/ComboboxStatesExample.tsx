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

type Option = {
  label: string;
  value: string;
};

const countries: Option[] = [
  { label: 'Taiwan', value: 'tw' },
  { label: 'Japan', value: 'jp' },
  { label: 'Singapore', value: 'sg' },
];

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Selected', props: { defaultValue: countries[0] } },
  { label: 'Disabled', props: { disabled: true } },
  {
    label: 'Disabled, selected',
    props: { defaultValue: countries[0], disabled: true },
  },
];

export function ComboboxStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Combobox
            items={countries}
            itemToStringLabel={(item: Option | null) =>
              item?.label ?? ''
            }
            itemToStringValue={(item: Option | null) =>
              item?.value ?? ''
            }
            {...props}
          >
            <ComboboxTrigger aria-label={`${label} country`}>
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
        </div>
      ))}
    </div>
  );
}
