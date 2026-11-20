# Item

> Content rows with media, title, description, and actions.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/Item';
import { ShieldCheckIcon } from '@/components/icons/ShieldCheckIcon';

export function ItemExample() {
  return (
    <Item variant="outline" className="w-96 max-w-full">
      <ItemMedia variant="icon">
        <ShieldCheckIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Profile verified</ItemTitle>
        <ItemDescription>
          Your profile has been verified.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="md" theme="default">
          Review
        </Button>
      </ItemActions>
    </Item>
  );
}
```

## Composition

```txt
ItemGroup
`-- Item
    |-- ItemHeader
    |-- ItemMedia
    |-- ItemContent
    |   |-- ItemTitle
    |   `-- ItemDescription
    |-- ItemActions
    `-- ItemFooter
```

Use `Item` for display rows. Use `size="list"` when the row should match picker/list density. Use `Select` or `Combobox` for value picking, `DropdownMenu` for action menus, and `Command` with `Popover` for searchable or hierarchical command panels.

## Variants

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/Item';

export function ItemVariantsExample() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      <Item>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent background.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>
            Bordered row for clear grouping.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>
            Soft background for secondary content.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
```

## Sizes

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/Item';

const sizes = [
  {
    size: 'default',
    title: 'Default',
    description: 'Standard spacing.',
  },
  { size: 'sm', title: 'Small', description: 'Compact spacing.' },
  {
    size: 'xs',
    title: 'Extra small',
    description: 'Dense row spacing.',
  },
  { size: 'list', title: 'List', description: 'Picker row spacing.' },
] as const;

export function ItemSizesExample() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      {sizes.map(({ size, title, description }) => (
        <Item key={size} variant="outline" size={size}>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
```

## List Rows

`size="list"` follows the select-option row pattern: text-sm, compact padding, hover, active, current, and disabled states. Picker and menu primitives set `data-highlighted`, `data-active`, `data-current`, and `data-disabled`; the examples set them directly to show each state.

```tsx
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/Item';

export function ItemTextRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemContent>
          <ItemTitle>Normal</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Active</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-current>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-disabled>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
```

### With Description

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/Item';

export function ItemDescriptionRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemContent>
          <ItemTitle>Option</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Active</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-current>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-disabled>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
```

### With Icons

Use `ItemMedia variant="icon"` for a leading icon and `ItemActions` for a trailing one.

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/Item';
import { AngleRightIcon } from '@/components/icons/AngleRightIcon';
import { UserIcon } from '@/components/icons/UserIcon';

export function ItemIconRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Left icon</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Right icon</ItemTitle>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
      <Item size="list" data-current>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
      <Item size="list" data-disabled>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
    </ItemGroup>
  );
}
```

### With Images

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/Item';
import { AngleRightIcon } from '@/components/icons/AngleRightIcon';

const rows = [
  { label: 'Normal', description: true, action: true },
  {
    label: 'Hover',
    state: { 'data-highlighted': true },
    action: true,
  },
  { label: 'Active', state: { 'data-active': true }, action: true },
  {
    label: 'Current',
    state: { 'data-current': true },
    description: true,
  },
  { label: 'Disabled', state: { 'data-disabled': true } },
];

export function ItemImageRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      {rows.map(({ label, state, description, action }) => (
        <Item key={label} size="list" {...state}>
          <ItemMedia variant="image">
            <span className="grid size-full place-content-center rounded-full border border-primary-200 bg-primary-50 text-sm text-primary-500">
              VD
            </span>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{label}</ItemTitle>
            {description && (
              <ItemDescription>Description text</ItemDescription>
            )}
          </ItemContent>
          {action && (
            <ItemActions>
              <AngleRightIcon className="size-[11px]" />
            </ItemActions>
          )}
        </Item>
      ))}
    </ItemGroup>
  );
}
```

## Group

Wrap rows in `ItemGroup` and divide them with `ItemSeparator`.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/Item';
import { Fragment } from 'react';

const people = [
  {
    name: 'Alex Lin',
    initials: 'AL',
    email: 'alex.lin@vikosmos.com',
  },
  {
    name: 'Jamie Chen',
    initials: 'JC',
    email: 'jamie.chen@vikosmos.com',
  },
  {
    name: 'Morgan Wu',
    initials: 'MW',
    email: 'morgan.wu@vikosmos.com',
  },
];

export function ItemGroupedRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full rounded border border-grayscale-opacity-300">
      {people.map(({ name, initials, email }, index) => (
        <Fragment key={name}>
          <Item size="list">
            <ItemMedia variant="image">
              <span className="grid size-full place-content-center rounded-full bg-grayscale-opacity-100 text-xs text-grayscale-opacity-700">
                {initials}
              </span>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{email}</ItemDescription>
            </ItemContent>
          </Item>
          {index < people.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
```

## Link

Pass `render={<a href="..." />}` to render the row as a link.

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/Item';
import { AngleRightIcon } from '@/components/icons/AngleRightIcon';

export function ItemLinkExample() {
  return (
    <Item
      render={<a href="/docs" />}
      variant="outline"
      className="w-96 max-w-full"
    >
      <ItemContent>
        <ItemTitle>Documentation</ItemTitle>
        <ItemDescription>
          Learn how to install registry items.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <AngleRightIcon className="size-[11px]" />
      </ItemActions>
    </Item>
  );
}
```

## Props

### Item

| Prop        | Type                                  | Default     | Description              |
| ----------- | ------------------------------------- | ----------- | ------------------------ |
| `variant`   | `'default' \| 'outline' \| 'muted'`   | `'default'` | Visual style             |
| `size`      | `'default' \| 'sm' \| 'xs' \| 'list'` | `'default'` | Row density              |
| `render`    | `ReactElement` or render function     | -           | Replace the root element |
| `className` | `string`                              | -           | Additional CSS classes   |

### ItemMedia

| Prop      | Type                             | Default     | Description     |
| --------- | -------------------------------- | ----------- | --------------- |
| `variant` | `'default' \| 'icon' \| 'image'` | `'default'` | Media treatment |

### Parts

`ItemGroup` renders `role="list"` by default. `ItemDescription` is clamped to two lines by default. `ItemSeparator` uses `Separator` props. `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, and `ItemFooter` accept native element props.
