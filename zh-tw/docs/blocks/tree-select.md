# Tree Select

> 用 Command 與 Popover 組成的可搜尋階層路徑選擇器。

## 預覽

```tsx
import {
  TreeSelect,
  type TreeSelectItem,
  type TreeSelectValue,
} from '@/blocks/tree-select/tree-select';
import { useState } from 'react';

const locationItems: TreeSelectItem[] = [
  {
    label: 'Taiwan',
    parentValue: null,
    value: 'tw',
    hasChildren: true,
  },
  {
    label: 'Japan',
    parentValue: null,
    value: 'jp',
    hasChildren: true,
  },
  { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
  { label: 'Kaohsiung', parentValue: 'tw', value: 'khh' },
  { label: 'Tokyo', parentValue: 'jp', value: 'tky' },
  { label: 'Osaka', parentValue: 'jp', value: 'osa' },
];

export function TreeSelectExample() {
  const [value, setValue] = useState<TreeSelectValue | null>(null);

  return (
    <TreeSelect
      items={locationItems}
      label="Locations"
      value={value}
      onValueChange={setValue}
      placeholder="Select location"
      searchPlaceholder="Search locations"
      emptyMessage="No locations found."
    />
  );
}
```

## 組合

這個區塊用以下 Vittal Design primitive 組成：

- [`Command`](/zh-tw/docs/components/command)、[`Popover`](/zh-tw/docs/components/popover)
- `AngleDownIcon`, `AngleRightIcon`

## 用法

傳入一份平面清單，每一項寫明父層，會打開下一層的項目加上 `hasChildren`。選到葉節點時，會回傳它的值與從最上層開始的路徑。

```tsx
import {
  TreeSelect,
  type TreeSelectValue,
} from '@/blocks/tree-select/tree-select';
import { useState } from 'react';

const items = [
  {
    label: 'Taiwan',
    parentValue: null,
    value: 'tw',
    hasChildren: true,
  },
  { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
];

export function LocationField() {
  const [value, setValue] = useState<TreeSelectValue | null>(null);

  return (
    <TreeSelect
      items={items}
      label="Locations"
      value={value}
      onValueChange={setValue}
    />
  );
}
```

區塊關掉 cmdk 的篩選（`shouldFilter={false}`），自己篩選畫面上的這一層，所以搜尋不會比對到其他層的項目。搜尋欄是空的時候按 Backspace 會回到父層，關閉 popup 會回到最上層。

這個區塊不載入資料。要按需載入子層，請修改安裝後檔案裡的 `openPage` 與項目清單。

## Props

| Prop                | 型別                                 | 預設值                   | 說明               |
| ------------------- | ---------------------------------- | --------------------- | ---------------- |
| `items`             | `TreeSelectItem[]`                 | —                     | 所有層級的平面清單        |
| `label`             | `string`                           | —                     | 觸發器與清單的無障礙名稱     |
| `value`             | `TreeSelectValue \| null`          | —                     | 已選的葉節點與路徑        |
| `onValueChange`     | `(value: TreeSelectValue) => void` | —                     | 選到葉節點時呼叫         |
| `placeholder`       | `string`                           | `'Select'`            | 尚未選取時觸發器顯示的文字    |
| `searchPlaceholder` | `string`                           | `'Search'`            | 搜尋欄的 placeholder |
| `emptyMessage`      | `string`                           | `'No results found.'` | 這一層沒有符合項目時顯示     |
| `className`         | `string`                           | —                     | 加在觸發器上的 class    |

## 檔案

| 檔案                | 說明                 |
| ----------------- | ------------------ |
| `tree-select.tsx` | 區塊進入點——觸發器、頁面堆疊與搜尋 |

## 安裝

```bash
npx shadcn@latest add @vital-design/tree-select
```

會安裝 `src/blocks/tree-select/tree-select.tsx`，以及它用到的 Command、Popover 與 icon。
