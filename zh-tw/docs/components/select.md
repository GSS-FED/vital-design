# Select

> 從平面清單選一個或多個選項的下拉。

## 預覽

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

## 用法

`Select` 是包住 Base UI Select 的薄樣式層。root 是 `BaseSelect.Root`；版面屬於父層 wrapper。

平面選值用 `Select`。觸發器要自訂外觀時，仍以 `Select` 為 root，只改 `SelectTrigger`；不要把選擇器搬進 `DropdownMenu`。

## 多選

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

可搜尋的選擇器、自動完成，或可移除的 chip 值，改用 `Combobox`。

## 怎麼選

| 需求               | 使用                    |
| ---------------- | --------------------- |
| 平面的單選或多選值選擇器     | `Select`              |
| 可搜尋的選擇器或標籤選擇器    | `Combobox`            |
| 階層路徑選擇器          | `Command` + `Popover` |
| 帶 callback 的命令選單 | `DropdownMenu`        |

## 匯出

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

## 分組項目

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

## 搭配圖示

在每個項目的 `SelectItemText` 前面放圖示。

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

## 狀態

在 `Select` 加 `disabled` 停用整個選擇器；值不合法時在 `SelectTrigger` 加 `aria-invalid`。過長的值會以省略號截斷。

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

## 屬性

`Select` 接受 Base UI `Select.Root` 的 props。希望 `SelectValue` 顯示標籤而不是原始值時，傳入 `items`。

### SelectContent

`SelectContent` 是 Portal + Positioner + Popup 的組合。定位 props 會轉給 Positioner；`portalContainer` 會轉給 Portal。

| Prop                    | Type                                                   | Default                        | 說明                               |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | 相對錨點的對齊                          |
| `alignItemWithTrigger`  | `boolean`                                              | `false`                        | 讓選取的項目疊在觸發器上                     |
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

### SelectTrigger

| Prop          | Type        | Default | 說明         |
| ------------- | ----------- | ------- | ---------- |
| `placeholder` | `ReactNode` | `''`    | 尚未選取時的佔位內容 |

### SelectItem

| Prop       | Type               | Default | 說明     |
| ---------- | ------------------ | ------- | ------ |
| `value`    | `string \| number` | —       | 項目值    |
| `children` | `ReactNode`        | —       | 項目內容   |
| `disabled` | `boolean`          | `false` | 停用這個項目 |

依需要的視覺提示，在項目裡使用 `<SelectItemText>`、`<SelectItemCheck>` 與 `<SelectItemCheckbox>`。
