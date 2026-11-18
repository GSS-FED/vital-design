'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  {
    label: 'A long option label that does not fit the trigger',
    value: 'long',
  },
];

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Selected', props: { defaultValue: '1' } },
  { label: 'Long value', props: { defaultValue: 'long' } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: {}, invalid: true },
];

export function SelectStatesExample() {
  return (
    <div className="grid grid-cols-[auto_12.5rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Select items={items} {...props}>
            <SelectTrigger
              aria-invalid={invalid}
              placeholder="Select an option"
            />
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemCheck />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
