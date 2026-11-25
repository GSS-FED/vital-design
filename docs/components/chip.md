# Chip

> A toggleable pill component for filters, tags, and multi-select options.

## Preview

```tsx
import { Chip } from '@/components/ui/Chip';
import { useState } from 'react';

export function ChipExample() {
  const [selected, setSelected] = useState(true);

  return (
    <Chip selected={selected} onChange={setSelected}>
      Urgent
    </Chip>
  );
}
```

## Usage

`Chip` is controlled: keep `selected` in state and update it from `onChange`, which receives the next selected value.

## With Icon

Pass an icon to `icon` to render it before the label.

```tsx
import { Chip } from '@/components/ui/Chip';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { useState } from 'react';

export function ChipIconExample() {
  const [selected, setSelected] = useState(true);

  return (
    <Chip
      selected={selected}
      onChange={setSelected}
      icon={<FlagIcon className="size-3" />}
    >
      Urgent
    </Chip>
  );
}
```

## States

```tsx
import { Chip } from '@/components/ui/Chip';
import { FlagIcon } from '@/components/icons/FlagIcon';

const states = [
  { label: 'Selected', selected: true },
  { label: 'Unselected', selected: false },
];

export function ChipStatesExample() {
  return (
    <div className="grid grid-cols-[auto_auto_auto] items-center justify-items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, selected }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Chip selected={selected}>Urgent</Chip>
          <Chip
            selected={selected}
            icon={<FlagIcon className="size-3" />}
          >
            Urgent
          </Chip>
        </div>
      ))}
    </div>
  );
}
```

When `selected` is `true`, the chip renders with a primary blue background and text. When `false`, it renders with a grayscale style.

## Multiple Chips (Filter Group)

A common pattern is a group of chips acting as mutually exclusive filters:

```tsx
const filters = ['All', 'Active', 'Inactive', 'Pending'];
const [selected, setSelected] = useState('All');

{
  filters.map((filter) => (
    <Chip
      key={filter}
      selected={selected === filter}
      onChange={() => setSelected(filter)}
    >
      {filter}
    </Chip>
  ));
}
```

## Props

| Prop        | Type                          | Default | Description                                     |
| ----------- | ----------------------------- | ------- | ----------------------------------------------- |
| `children`  | `ReactNode`                   | —       | Chip label content                              |
| `selected`  | `boolean`                     | —       | **Required.** Controls the selected state       |
| `onChange`  | `(selected: boolean) => void` | —       | **Required.** Called when the chip is clicked   |
| `icon`      | `ReactNode`                   | —       | Optional icon rendered to the left of the label |
| `className` | `string`                      | —       | Additional CSS classes                          |
| `style`     | `CSSProperties`               | —       | Inline styles                                   |
