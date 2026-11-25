# SplitButton

> A split action built from ButtonGroup with a primary action and a separate toggle trigger.

## Preview

```tsx
import { SplitButton } from '@/components/ui/SplitButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useState } from 'react';

export function SplitButtonExample() {
  const [lastAction, setLastAction] = useState('Nothing saved yet');

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <SplitButton
          theme="primary"
          size="lg"
          onClick={() => setLastAction('Saved')}
          splitRender={<DropdownMenuTrigger />}
        >
          Save
        </SplitButton>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setLastAction('Saved as draft')}
          >
            Save as draft
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLastAction('Saved and published')}
          >
            Save and publish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-sm text-grayscale-opacity-700">
        {lastAction}
      </p>
    </div>
  );
}
```

## Usage

Put `SplitButton` inside a `DropdownMenu` and pass `splitRender={<DropdownMenuTrigger />}`. The chevron becomes the menu trigger: it opens the menu, positions it, supports the keyboard, and flips while the menu is open. The main button keeps its own `onClick`.

The menu is anchored to the chevron. Set `align="end"` so its right edge lines up with the right edge of the SplitButton.

## With Icon

Pass an icon as a child with `data-icon="inline-start"`. Install or import the icon separately from SplitButton.

```tsx
import { SplitButton } from '@/components/ui/SplitButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';

export function SplitButtonWithIconExample() {
  return (
    <DropdownMenu>
      <SplitButton
        theme="primary"
        splitRender={<DropdownMenuTrigger />}
      >
        <MagnifyingGlassIcon data-icon="inline-start" />
        Search
      </SplitButton>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Search files</DropdownMenuItem>
        <DropdownMenuItem>Search issues</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Chevron Label

The chevron's accessible name defaults to `More options`. Set `splitLabel` to describe what the menu holds, or to translate it:

```tsx
<SplitButton splitLabel="More save options" splitRender={<DropdownMenuTrigger />}>
  Save
</SplitButton>
```

## Controlled Chevron

For a popup that is not a `DropdownMenu`, control the chevron yourself with `open` and `splitOnClick`. `open` flips the chevron and switches its name between `Expand options` and `Collapse options`.

```tsx
import { SplitButton } from '@/components/ui/SplitButton';
import { useState } from 'react';

export function SplitButtonControlledChevronExample() {
  const [open, setOpen] = useState(false);

  return (
    <SplitButton
      theme="default"
      size="lg"
      open={open}
      splitOnClick={() => setOpen((value) => !value)}
    >
      Save
    </SplitButton>
  );
}
```

## Themes

`theme` takes the same values as `Button`.

```tsx
import { SplitButton } from '@/components/ui/SplitButton';

export function SplitButtonThemesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton theme="primary">Primary</SplitButton>
      <SplitButton theme="default">Default</SplitButton>
      <SplitButton theme="success">Success</SplitButton>
      <SplitButton theme="info">Info</SplitButton>
      <SplitButton theme="warning">Warning</SplitButton>
      <SplitButton theme="alarm">Alarm</SplitButton>
      <SplitButton theme="dangerous">Dangerous</SplitButton>
    </div>
  );
}
```

## Sizes

`size="lg"` adds the themed drop shadow and hover lift; `size="md"`
is the compact variant without shadow.

```tsx
import { SplitButton } from '@/components/ui/SplitButton';

export function SplitButtonSizesExample() {
  return (
    <div className="flex items-center gap-3">
      <SplitButton theme="primary" size="md">
        Medium
      </SplitButton>
      <SplitButton theme="primary" size="lg">
        Large
      </SplitButton>
    </div>
  );
}
```

## States

`open` shows the chevron in its open state. `disabled` disables both segments; add `focusableWhenDisabled` to keep them in the tab order.

```tsx
import { SplitButton } from '@/components/ui/SplitButton';

const states = [
  { label: 'Default', props: {} },
  { label: 'Open', props: { open: true } },
  { label: 'Disabled', props: { disabled: true } },
];

export function SplitButtonStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <SplitButton theme="primary" {...props}>
            Save
          </SplitButton>
          <SplitButton theme="default" {...props}>
            Save
          </SplitButton>
        </div>
      ))}
    </div>
  );
}
```

## Props

| Prop                    | Type                                                                                   | Default          | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `open`                  | `boolean`                                                                              | —                | Puts the chevron in its open state. Leave unset with `splitRender`                                 |
| `splitRender`           | `ReactElement`                                                                         | —                | Renders the chevron as another element, usually `<DropdownMenuTrigger />`                          |
| `splitLabel`            | `string`                                                                               | `'More options'` | Accessible name of the chevron. With `open`, defaults to `'Expand options'` / `'Collapse options'` |
| `theme`                 | `'primary' \| 'default' \| 'success' \| 'info' \| 'warning' \| 'alarm' \| 'dangerous'` | `'default'`      | Color theme (matches `Button`)                                                                     |
| `size`                  | `'md' \| 'lg'`                                                                         | `'md'`           | Button size                                                                                        |
| `onClick`               | `(e: MouseEvent) => void`                                                              | —                | Handler for the main button area                                                                   |
| `splitOnClick`          | `(e: MouseEvent) => void`                                                              | —                | Handler for the arrow trigger                                                                      |
| `focusableWhenDisabled` | `boolean`                                                                              | `false`          | Keeps keyboard focus on the button when disabled styling is applied                                |
| `disabled`              | `boolean`                                                                              | `false`          | Disables the entire button                                                                         |
