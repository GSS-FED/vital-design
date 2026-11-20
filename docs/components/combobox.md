# Combobox

> An input picker for searching and selecting one or many options.

## Preview

```tsx
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
} from '@/components/ui/Combobox';
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
```

## Usage

Use `Combobox` when the picker renders an input: search, autocomplete, or removable chips.

Keep `Combobox` as the root when the popup is a searchable value picker. If only the trigger changes, customize `ComboboxTrigger`; do not wrap the combobox in `DropdownMenu`.

## Multiple

Add `multiple` and render the selection with `ComboboxTagsValue`. `maxDisplayCount` collapses the rest into a `+N` chip.

```tsx
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
} from '@/components/ui/Combobox';
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
```

## Tag Picker with Footer

A tag picker composed from existing parts: read-only pills and `ComboboxOverflowChip` in the trigger, removable `ComboboxChip`s with a `ComboboxInput` in the popup header, and a `Button` footer. The input lives inside the popup; the trigger stays the anchor.

```tsx
import { Button } from '@/components/ui/Button';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxHeader,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxOverflowChip,
  ComboboxTrigger,
} from '@/components/ui/Combobox';
import { GearIcon } from '@/components/icons/GearIcon';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const tags: Option[] = Array.from({ length: 24 }, (_, index) => ({
  label: `Tag ${index + 1}`,
  value: `tag-${index + 1}`,
}));

export function ComboboxTagPickerWithFooterExample() {
  const [value, setValue] = useState<Option[]>(tags.slice(0, 12));
  const visibleChips = value.slice(0, 3);
  const overflowCount = value.length - visibleChips.length;

  return (
    <Combobox
      autoHighlight
      multiple
      items={tags}
      itemToStringLabel={(item: Option | null) => item?.label ?? ''}
      itemToStringValue={(item: Option | null) => item?.value ?? ''}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxTrigger className="h-11 w-90" aria-label="Open tags">
        {value.length === 0 ? (
          <span className="min-w-0 flex-1 truncate text-grayscale-opacity-400">
            Select tags
          </span>
        ) : (
          <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {visibleChips.map((item) => (
              <span
                key={item.value}
                className="inline-flex h-5 shrink-0 items-center rounded-full bg-grayscale-opacity-700 px-2.5 text-xs leading-5 text-background"
              >
                {item.label}
              </span>
            ))}
            {overflowCount > 0 ? (
              <ComboboxOverflowChip>
                +{overflowCount}
              </ComboboxOverflowChip>
            ) : null}
          </span>
        )}
      </ComboboxTrigger>
      <ComboboxContent className="max-h-120 py-0">
        <ComboboxHeader className="border-b border-grayscale-opacity-300 px-3 pt-3 pb-2">
          <ComboboxChips className="flex max-h-44 flex-wrap items-center gap-2 overflow-x-hidden overflow-y-auto">
            {value.map((item) => (
              <ComboboxChip key={item.value}>
                <span className="min-w-0 truncate">{item.label}</span>
                <ComboboxChipRemove
                  aria-label={`Remove ${item.label}`}
                />
              </ComboboxChip>
            ))}
            <ComboboxInput
              placeholder="Search tags"
              className="h-5 min-w-32 flex-1"
            />
          </ComboboxChips>
        </ComboboxHeader>
        <ComboboxList className="py-2">
          {(item: Option) => (
            <ComboboxItem
              key={item.value}
              value={item}
              className="pr-5"
            >
              <ComboboxItemCheckbox />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No matching tags</ComboboxEmpty>
        <div className="flex items-center justify-center border-t border-grayscale-opacity-300 pt-2 pb-3">
          <Button
            variant="ghost"
            theme="default"
            className="text-grayscale-opacity-600 [&_[data-icon]]:size-4.5"
          >
            <GearIcon data-icon="inline-start" />
            Manage tags
          </Button>
        </div>
      </ComboboxContent>
    </Combobox>
  );
}
```

## States

```tsx
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
} from '@/components/ui/Combobox';

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
```

## When to Choose What

| Need                                 | Use                   |
| ------------------------------------ | --------------------- |
| Flat single or multiple value picker | `Select`              |
| Searchable picker or tag picker      | `Combobox`            |
| Hierarchical path picker             | `Command` + `Popover` |
| Command menu with callbacks          | `DropdownMenu`        |

Use named exports for shadcn-style imports:

```tsx
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxContent,
  ComboboxHeader,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxOverflowChip,
  ComboboxSearchBar,
  ComboboxTagsValue,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/Combobox';
```

## Props

### Combobox

`Combobox` is `BaseCombobox.Root`. Use the Base UI root props such as `items`, `value`, `onValueChange`, `multiple`, `disabled`, `itemToStringLabel`, and `itemToStringValue`.

### ComboboxTrigger

Styled shell for the selected value. Use `nativeButton={false}` with `render={<div />}` when rendering removable tags inside it.

### ComboboxSearchBar

Popup search input for the combobox list. It renders `BaseCombobox.Input`, so filtering remains owned by Base UI.

### ComboboxTagsValue

Preset value renderer for multiple comboboxes. It renders selected values as removable chips, supports `maxDisplayCount`, and shows the hidden count as `+N`.

### ComboboxContent

| Prop                    | Type                                                   | Default                        | Description                                           |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | ----------------------------------------------------- |
| `emptyText`             | `ReactNode`                                            | —                              | Empty state content                                   |
| `listClassName`         | `string`                                               | —                              | Classes for the list element                          |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | Alignment relative to the anchor                      |
| `alignOffset`           | `number`                                               | `0`                            | Offset along the alignment axis                       |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                     | Preferred side of the anchor                          |
| `sideOffset`            | `number`                                               | `4`                            | Distance from the anchor                              |
| `anchor`                | `RefObject \| Element \| …`                            | —                              | Custom positioning anchor (defaults to the trigger)   |
| `arrowPadding`          | `number`                                               | `5`                            | Minimum space between the arrow and the popup's edges |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'none' }` | How the popup flips or shifts to avoid collisions     |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`         | Area the popup is kept inside                         |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                            | Space kept from the edge of the collision boundary    |
| `disableAnchorTracking` | `boolean`                                              | `false`                        | Stop following layout shifts of the anchor            |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                   | CSS `position` of the positioner                      |
| `sticky`                | `boolean`                                              | `false`                        | Keep the popup in view after the anchor scrolls out   |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | —                              | Custom portal container (defaults to `document.body`) |
| `keepMounted`           | `boolean`                                              | `false`                        | Keep the popup in the DOM while closed                |

### ComboboxItem

`ComboboxItem` is `BaseComboboxItem` with Vittal Design row styling. Compose it with `ComboboxItemText`, `ComboboxItemCheck`, or `ComboboxItemCheckbox`.
