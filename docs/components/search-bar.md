# SearchBar

> A search input with an icon. Supports instant onChange and explicit onSearch (Enter / icon click).

## Preview

```tsx
import { SearchBar } from '@/components/ui/SearchBar';
import { useState } from 'react';

export function SearchBarExample() {
  const [lastSearch, setLastSearch] = useState('');

  return (
    <div className="flex flex-col items-center gap-2">
      <SearchBar
        aria-label="Search"
        isSearchIconClickable
        placeholder="Search..."
        width="280px"
        onSearch={setLastSearch}
      />
      {lastSearch && (
        <p className="text-sm text-grayscale-opacity-500">
          Searched: <strong>{lastSearch}</strong>
        </p>
      )}
    </div>
  );
}
```

## Usage

`onChange` fires on every keystroke with the current value. `onSearch` fires when the user presses Enter, or clicks the search icon when `isSearchIconClickable` is set. The example above shows the last submitted query.

## States

Use `disabled` to disable the search bar. Long values truncate with an ellipsis.

```tsx
import { SearchBar } from '@/components/ui/SearchBar';

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
```

## Props

| Prop                    | Type                      | Default | Description                                       |
| ----------------------- | ------------------------- | ------- | ------------------------------------------------- |
| `value`                 | `string`                  | —       | Controlled value                                  |
| `defaultValue`          | `string`                  | —       | Uncontrolled initial value                        |
| `placeholder`           | `string`                  | —       | Placeholder text                                  |
| `onChange`              | `(value: string) => void` | —       | Called on every keystroke                         |
| `onSearch`              | `(value: string) => void` | —       | Called when Enter is pressed or icon is clicked   |
| `isSearchIconClickable` | `boolean`                 | `false` | Makes the search icon trigger `onSearch` on click |
| `disabled`              | `boolean`                 | `false` | Disables the input                                |
| `width`                 | `string`                  | —       | Custom width (e.g., `'300px'`)                    |
| `className`             | `string`                  | —       | Classes for the InputGroup shell                  |
| `style`                 | `CSSProperties`           | —       | Inline styles for the InputGroup shell            |

Every other `<input>` prop (`id`, `name`, `aria-label`, `autoFocus`,
`inputMode`, `enterKeyHint`, `onBlur`, …) is forwarded to the inner input, and
`ref` points at that input.

## Controlled vs uncontrolled

Pass `value` when something outside the component owns the query — a URL search
param, a "clear all filters" button, or a suggestion chip that fills the field.
Pass `defaultValue` instead when the input itself is the only source of truth
and `onChange` just feeds a request. Setting both makes `defaultValue` inert.

```tsx
// Controlled: the query string owns the value, so clearing it clears the input
<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={(value) => router.push(`?q=${value}`)}
/>
```
