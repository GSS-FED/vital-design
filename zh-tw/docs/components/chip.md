# Chip

> 可切換的膠囊，用來做篩選、標籤與多選。

## 預覽

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

## 用法

`Chip` 是受控元件：把 `selected` 放在 state，並在 `onChange` 更新它；`onChange` 會收到下一個選取值。

## 加上圖示

把圖示傳給 `icon`，會顯示在文字前面。

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

## 狀態

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

`selected` 為 `true` 時，chip 以主色藍底與藍字渲染。為 `false` 時，以灰階樣式渲染。

## 多個 Chip（篩選群組）

常見做法是一組 chip 當成互斥篩選：

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

## 屬性

| Prop        | Type                          | Default | 說明                  |
| ----------- | ----------------------------- | ------- | ------------------- |
| `children`  | `ReactNode`                   | —       | Chip 標籤內容           |
| `selected`  | `boolean`                     | —       | **必填。** 控制選取狀態      |
| `onChange`  | `(selected: boolean) => void` | —       | **必填。** 點擊 chip 時呼叫 |
| `icon`      | `ReactNode`                   | —       | 渲染在標籤左側的選用圖示        |
| `className` | `string`                      | —       | 額外的 CSS class       |
| `style`     | `CSSProperties`               | —       | 行內樣式                |
