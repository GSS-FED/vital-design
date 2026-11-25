# Table of Contents

> A compact rail of section ticks that expands into the full list of headings on hover or focus.

## Preview

```tsx
import {
  TableOfContents,
  type TableOfContentsItem,
} from '@/components/ui/TableOfContents';

const items: TableOfContentsItem[] = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting started', level: 2 },
  { id: 'install', label: 'Install', level: 3 },
  { id: 'configure', label: 'Configure', level: 3 },
  { id: 'theme', label: 'Theme', level: 3 },
  { id: 'tokens', label: 'Tokens', level: 3 },
  { id: 'icons', label: 'Icons', level: 3 },
  { id: 'fonts', label: 'Fonts', level: 3 },
  { id: 'dark-mode', label: 'Dark mode', level: 3 },
  { id: 'components', label: 'Components', level: 1 },
  { id: 'inputs', label: 'Inputs', level: 2 },
  { id: 'button', label: 'Button', level: 3 },
  { id: 'checkbox', label: 'Checkbox', level: 3 },
  { id: 'select', label: 'Select', level: 3 },
  { id: 'switch', label: 'Switch', level: 3 },
];

export function TableOfContentsExample() {
  return (
    <div className="flex min-h-100 w-full items-start justify-between gap-8">
      <div className="max-w-sm space-y-2 text-sm leading-5 text-grayscale-opacity-600">
        <p className="font-medium text-grayscale-opacity-800">
          Hover the rail on the right →
        </p>
        <p>
          The rail expands into the full list on hover or keyboard
          focus, and collapses when the pointer or focus leaves.
        </p>
      </div>
      <TableOfContents items={items} defaultValue="install" />
    </div>
  );
}
```

## Installation

After [configuring the registry](/docs/getting-started/installation), install Table of Contents:

```bash
npx shadcn@latest add @vital-design/table-of-contents
```

## Usage

Pass the page's headings as `items`. Each item renders a tick on the rail: level 1 is the longest, level 3 the shortest. The active item's tick turns primary.

At rest only the rail shows. Hovering it, or moving keyboard focus into it, opens a panel with every label; the panel closes when the pointer or focus leaves. You don't need to pass `expanded` for this.

Each item links to `#<id>` unless you give it an `href`. Clicking an item makes it active; set the starting one with `defaultValue`.

## Left Side

Set `side="left"` when the rail sits on the left of the content. The ticks align left and the panel opens to the right.

```tsx
import {
  TableOfContents,
  type TableOfContentsItem,
} from '@/components/ui/TableOfContents';

const items: TableOfContentsItem[] = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting started', level: 2 },
  { id: 'install', label: 'Install', level: 3 },
  { id: 'configure', label: 'Configure', level: 3 },
  { id: 'theme', label: 'Theme', level: 3 },
  { id: 'tokens', label: 'Tokens', level: 3 },
  { id: 'icons', label: 'Icons', level: 3 },
  { id: 'fonts', label: 'Fonts', level: 3 },
  { id: 'dark-mode', label: 'Dark mode', level: 3 },
  { id: 'components', label: 'Components', level: 1 },
  { id: 'inputs', label: 'Inputs', level: 2 },
  { id: 'button', label: 'Button', level: 3 },
  { id: 'checkbox', label: 'Checkbox', level: 3 },
  { id: 'select', label: 'Select', level: 3 },
  { id: 'switch', label: 'Switch', level: 3 },
];

export function TableOfContentsLeftExample() {
  return (
    <div className="min-h-100">
      <TableOfContents
        items={items}
        defaultValue="install"
        side="left"
      />
    </div>
  );
}
```

## Controlled

Pass `value` and `onValueChange` to own the active item, for example to follow the section in view as the page scrolls. Clicking an item calls `onValueChange`; the active item only moves when you update `value`.

```tsx
import {
  TableOfContents,
  type TableOfContentsItem,
} from '@/components/ui/TableOfContents';
import { useState } from 'react';

const items: TableOfContentsItem[] = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting started', level: 2 },
  { id: 'install', label: 'Install', level: 3 },
  { id: 'configure', label: 'Configure', level: 3 },
  { id: 'theme', label: 'Theme', level: 3 },
  { id: 'tokens', label: 'Tokens', level: 3 },
  { id: 'icons', label: 'Icons', level: 3 },
  { id: 'fonts', label: 'Fonts', level: 3 },
  { id: 'dark-mode', label: 'Dark mode', level: 3 },
  { id: 'components', label: 'Components', level: 1 },
  { id: 'inputs', label: 'Inputs', level: 2 },
  { id: 'button', label: 'Button', level: 3 },
  { id: 'checkbox', label: 'Checkbox', level: 3 },
  { id: 'select', label: 'Select', level: 3 },
  { id: 'switch', label: 'Switch', level: 3 },
];

export function TableOfContentsControlledExample() {
  const [active, setActive] = useState('introduction');

  return (
    <div className="flex min-h-100 items-start gap-8">
      <ul className="space-y-2 text-sm text-grayscale-opacity-700">
        {items
          .filter((item) => item.level !== 3)
          .map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={
                  item.id === active ? 'text-primary-500' : undefined
                }
              >
                Go to {item.label}
              </button>
            </li>
          ))}
      </ul>
      <TableOfContents
        items={items}
        value={active}
        onValueChange={setActive}
      />
    </div>
  );
}
```

## Always Open or Closed

`expanded` overrides hover and focus: `expanded` keeps the panel open, `expanded={false}` keeps it closed. Leave it unset for the default behavior.

## Props

`TableOfContents` renders a `<nav>` and accepts its props.

| Prop            | Type                    | Default               | Description                                                    |
| --------------- | ----------------------- | --------------------- | -------------------------------------------------------------- |
| `items`         | `TableOfContentsItem[]` | -                     | Headings to list, in page order                                |
| `value`         | `string`                | -                     | Controlled active item id                                      |
| `defaultValue`  | `string`                | -                     | Initial active item id when uncontrolled                       |
| `onValueChange` | `(id: string) => void`  | -                     | Called when an item is clicked                                 |
| `side`          | `'left' \| 'right'`     | `'right'`             | Which side of the content the rail sits on                     |
| `expanded`      | `boolean`               | -                     | Forces the panel open or closed; unset follows hover and focus |
| `aria-label`    | `string`                | `'Table of contents'` | Name of the navigation landmark                                |

### TableOfContentsItem

| Field   | Type          | Default | Description                               |
| ------- | ------------- | ------- | ----------------------------------------- |
| `id`    | `string`      | -       | Unique id, and the default link target    |
| `label` | `string`      | -       | Text in the panel and the link name       |
| `level` | `1 \| 2 \| 3` | `1`     | Heading depth; sets tick width and indent |
| `href`  | `string`      | `#<id>` | Link target                               |

## Accessibility

The component is a `navigation` landmark named by `aria-label`. The rail links are the accessible surface: each is named by its item's label, and the active one has `aria-current="location"`. The expanded panel is visual only and hidden from assistive technology, so screen reader and keyboard users get one link per heading.
