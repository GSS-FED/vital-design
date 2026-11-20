# Select

> A dropdown for choosing one or many options from a flat list.

## Preview

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/ui/Select';
import { useState } from 'react';

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function SelectExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select items={items} value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select an option" />
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
  );
}
```

## Usage

`Select` is a thin styled wrapper around Base UI Select. The root is `BaseSelect.Root`; layout belongs to the parent wrapper.

Use `Select` for flat value picking. If the trigger needs custom visuals, keep `Select` as the root and customize `SelectTrigger`; do not move the picker into `DropdownMenu`.

## Multiple

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheckbox,
  SelectItemText,
  SelectTrigger,
} from '@/components/ui/Select';
import { useState } from 'react';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export function SelectMultipleExample() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <div className="w-60">
      <Select
        multiple
        items={frameworks}
        value={values}
        onValueChange={setValues}
      >
        <SelectTrigger placeholder="Select options" />
        <SelectContent>
          {frameworks.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemCheckbox />
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

Use `Combobox` for searchable pickers, autocomplete, or removable chip values.

## When to Choose What

| Need                                 | Use                   |
| ------------------------------------ | --------------------- |
| Flat single or multiple value picker | `Select`              |
| Searchable picker or tag picker      | `Combobox`            |
| Hierarchical path picker             | `Command` + `Popover` |
| Command menu with callbacks          | `DropdownMenu`        |

## Exports

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemCheck,
  SelectItemCheckbox,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
```

## With Grouped Items

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/Select';
import { useState } from 'react';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const vegetables = [
  { label: 'Carrot', value: 'carrot' },
  { label: 'Broccoli', value: 'broccoli' },
];

export function SelectGroupedExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select
        items={[...fruits, ...vegetables]}
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger placeholder="Select food" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## With Icons

Put an icon before `SelectItemText` in each item.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/ui/Select';
import { BellIcon } from '@/components/icons/BellIcon';
import { InboxIcon } from '@/components/icons/InboxIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { useState } from 'react';

const channels = [
  { label: 'Notifications', value: 'notifications', Icon: BellIcon },
  { label: 'Inbox', value: 'inbox', Icon: InboxIcon },
  { label: 'Profile', value: 'profile', Icon: UserIcon },
];

export function SelectIconExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select items={channels} value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select a page" />
        <SelectContent>
          {channels.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <item.Icon className="size-4 shrink-0 text-grayscale-opacity-700" />
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemCheck />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

## States

Disable the whole select with `disabled` on `Select`, and mark an invalid value with `aria-invalid` on `SelectTrigger`. Long values truncate with an ellipsis.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/ui/Select';

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
```

## Props

`Select` accepts Base UI `Select.Root` props. Pass `items` when you want `SelectValue` to render labels instead of raw values.

### SelectContent

`SelectContent` is a composite of Portal + Positioner + Popup. Positioning props go to the Positioner; `portalContainer` goes to the Portal.

| Prop                    | Type                                                   | Default                        | Description                                               |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | --------------------------------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | Alignment relative to the anchor                          |
| `alignItemWithTrigger`  | `boolean`                                              | `false`                        | Overlap the trigger so the selected item lines up with it |
| `alignOffset`           | `number`                                               | `0`                            | Offset along the alignment axis                           |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                     | Preferred side of the anchor                              |
| `sideOffset`            | `number`                                               | `4`                            | Distance from the anchor                                  |
| `anchor`                | `RefObject \| Element \| …`                            | —                              | Custom positioning anchor (defaults to the trigger)       |
| `arrowPadding`          | `number`                                               | `5`                            | Minimum space between the arrow and the popup's edges     |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'none' }` | How the popup flips or shifts to avoid collisions         |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`         | Area the popup is kept inside                             |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                            | Space kept from the edge of the collision boundary        |
| `disableAnchorTracking` | `boolean`                                              | `false`                        | Stop following layout shifts of the anchor                |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                   | CSS `position` of the positioner                          |
| `sticky`                | `boolean`                                              | `false`                        | Keep the popup in view after the anchor scrolls out       |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | —                              | Custom portal container (defaults to `document.body`)     |

### SelectTrigger

| Prop          | Type        | Default | Description                               |
| ------------- | ----------- | ------- | ----------------------------------------- |
| `placeholder` | `ReactNode` | `''`    | Placeholder text when nothing is selected |

### SelectItem

| Prop       | Type               | Default | Description        |
| ---------- | ------------------ | ------- | ------------------ |
| `value`    | `string \| number` | —       | Item value         |
| `children` | `ReactNode`        | —       | Item content       |
| `disabled` | `boolean`          | `false` | Disables this item |

Use `<SelectItemText>`, `<SelectItemCheck>`, and `<SelectItemCheckbox>` inside items for the visual affordance you need.
