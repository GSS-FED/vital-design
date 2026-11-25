# Combobox

> 可搜尋並選取一個或多個選項的輸入選擇器。

## 預覽

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

## 用法

選擇器會渲染輸入框時使用 `Combobox`：搜尋、自動完成，或可移除的 chip。

彈出層是可搜尋的值選擇器時，以 `Combobox` 為 root。如果只改觸發器，自訂 `ComboboxTrigger`；不要把 combobox 包進 `DropdownMenu`。

## 多選

加上 `multiple`，並用 `ComboboxTagsValue` 顯示已選的值。`maxDisplayCount` 會把其餘的收成一個 `+N` chip。

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

## 附 footer 的標籤選擇器

用既有的 parts 組出標籤選擇器：觸發器裡放唯讀標籤與 `ComboboxOverflowChip`，彈出層 header 放可移除的 `ComboboxChip` 與 `ComboboxInput`，底部放 `Button`。輸入框在彈出層裡，觸發器仍是定位錨點。

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

## 狀態

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

## 怎麼選

| 需求               | 使用                    |
| ---------------- | --------------------- |
| 平面的單選或多選值選擇器     | `Select`              |
| 可搜尋的選擇器或標籤選擇器    | `Combobox`            |
| 階層路徑選擇器          | `Command` + `Popover` |
| 帶 callback 的命令選單 | `DropdownMenu`        |

具名匯出給 shadcn 風格的 import 使用：

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

## 屬性

### Combobox

`Combobox` 是 `BaseCombobox.Root`。使用 Base UI root props，例如 `items`、`value`、`onValueChange`、`multiple`、`disabled`、`itemToStringLabel` 與 `itemToStringValue`。

### ComboboxTrigger

已選值的樣式外框。裡面要渲染可移除標籤時，使用 `nativeButton={false}` 搭配 `render={<div />}`。

### ComboboxSearchBar

combobox 清單的彈出層搜尋輸入。它渲染 `BaseCombobox.Input`，所以篩選仍由 Base UI 負責。

### ComboboxTagsValue

多選 combobox 的預設值渲染器。把已選值渲染成可移除的 chip，支援 `maxDisplayCount`，隱藏的數量顯示為 `+N`。

### ComboboxContent

| Prop                    | Type                                                   | Default                        | 說明                               |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------------------------------- |
| `emptyText`             | `ReactNode`                                            | —                              | 空狀態內容                            |
| `listClassName`         | `string`                                               | —                              | 清單元素的 class                      |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | 相對錨點的對齊                          |
| `alignOffset`           | `number`                                               | `0`                            | 沿對齊軸的偏移                          |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                     | 偏好出現在錨點的哪一側                      |
| `sideOffset`            | `number`                                               | `4`                            | 與錨點的距離                           |
| `anchor`                | `RefObject \| Element \| …`                            | —                              | 自訂定位錨點（預設是觸發器）                   |
| `arrowPadding`          | `number`                                               | `5`                            | 箭頭與彈出層邊緣的最小距離                    |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'none' }` | 遇到碰撞時彈出層怎麼翻轉或位移                  |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`         | 彈出層要留在裡面的範圍                      |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                            | 與碰撞邊界保留的距離                       |
| `disableAnchorTracking` | `boolean`                                              | `false`                        | 不再跟著錨點的版面位移更新位置                  |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                   | positioner 的 CSS `position`      |
| `sticky`                | `boolean`                                              | `false`                        | 錨點捲出畫面後，彈出層仍留在畫面內                |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | —                              | 自訂 portal 容器（預設 `document.body`） |
| `keepMounted`           | `boolean`                                              | `false`                        | 關閉時仍把彈出層留在 DOM                   |

### ComboboxItem

`ComboboxItem` 是帶 Vittal Design 列樣式的 `BaseComboboxItem`。與 `ComboboxItemText`、`ComboboxItemCheck` 或 `ComboboxItemCheckbox` 一起組合。
