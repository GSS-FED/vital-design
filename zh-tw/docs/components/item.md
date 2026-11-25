# Item

> 含媒體、標題、說明與動作的內容列。

## 預覽

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

## 組合

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

用 `Item` 顯示一列內容。密度要對齊選擇器或清單時，用 `size="list"`。選值用 `Select` 或 `Combobox`，動作選單用 `DropdownMenu`，可搜尋或有階層的命令面板用 `Command` 配 `Popover`。

## 變體

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

## 尺寸

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

## 清單列

`size="list"` 沿用選項列：`text-sm`、緊湊間距，以及 hover、active、current、disabled 狀態。選擇器與選單 primitive 會設定 `data-highlighted`、`data-active`、`data-current` 與 `data-disabled`；範例直接設定這些屬性來呈現各狀態。

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

### 加上說明

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

### 加上圖示

前置圖示用 `ItemMedia variant="icon"`，尾端圖示放在 `ItemActions`。

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

### 加上圖片

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

## 群組

用 `ItemGroup` 包住多列，並用 `ItemSeparator` 分隔。

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

## 連結

傳入 `render={<a href="..." />}`，讓整列渲染成連結。

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

## 屬性

### Item

| Prop        | Type                                  | Default     | 說明            |
| ----------- | ------------------------------------- | ----------- | ------------- |
| `variant`   | `'default' \| 'outline' \| 'muted'`   | `'default'` | 視覺樣式          |
| `size`      | `'default' \| 'sm' \| 'xs' \| 'list'` | `'default'` | 列的密度          |
| `render`    | `ReactElement` or render function     | -           | 替換根元素         |
| `className` | `string`                              | -           | 額外的 CSS class |

### ItemMedia

| Prop      | Type                             | Default     | 說明      |
| --------- | -------------------------------- | ----------- | ------- |
| `variant` | `'default' \| 'icon' \| 'image'` | `'default'` | 媒體的呈現方式 |

### 部分

`ItemGroup` 預設是 `role="list"`。`ItemDescription` 預設最多兩行。`ItemSeparator` 使用 `Separator` 的屬性。`ItemContent`、`ItemTitle`、`ItemDescription`、`ItemActions`、`ItemHeader`、`ItemFooter` 接受原生元素屬性。
