# Table of Contents

> 由章節刻度組成的精簡軌道，滑過或取得焦點時展開成完整的標題清單。

## 預覽

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

## 安裝

[設定好 registry](/zh-tw/docs/getting-started/installation) 後，安裝 Table of Contents：

```bash
npx shadcn@latest add @vital-design/table-of-contents
```

## 用法

把頁面的標題傳給 `items`。每個項目在軌道上畫一條刻度：第 1 層最長，第 3 層最短。目前項目的刻度會變成主色。

平常只顯示軌道。滑鼠移到軌道上，或鍵盤焦點移進來時，會打開列出所有標題的面板；滑鼠或焦點離開後收合。這個行為不需要傳 `expanded`。

每個項目預設連到 `#<id>`，也可以用 `href` 指定。點項目會把它設為目前項目；起始項目用 `defaultValue` 設定。

## 放在左側

軌道放在內容左邊時設 `side="left"`。刻度靠左對齊，面板往右展開。

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

## 受控

傳 `value` 與 `onValueChange` 自己管理目前項目，例如捲動頁面時跟著畫面中的章節。點項目會呼叫 `onValueChange`；目前項目要等你更新 `value` 才會移動。

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

## 固定展開或收合

`expanded` 會蓋過滑鼠與焦點：`expanded` 讓面板一直開著，`expanded={false}` 讓它一直收合。不設就是預設行為。

## 屬性

`TableOfContents` 渲染一個 `<nav>`，並接受它的 props。

| Prop            | Type                    | Default               | 說明                      |
| --------------- | ----------------------- | --------------------- | ----------------------- |
| `items`         | `TableOfContentsItem[]` | -                     | 要列出的標題，依頁面順序            |
| `value`         | `string`                | -                     | 受控的目前項目 id              |
| `defaultValue`  | `string`                | -                     | 非受控時的起始項目 id            |
| `onValueChange` | `(id: string) => void`  | -                     | 點項目時呼叫                  |
| `side`          | `'left' \| 'right'`     | `'right'`             | 軌道在內容的哪一側               |
| `expanded`      | `boolean`               | -                     | 強制展開或收合；不設則跟著滑鼠與焦點      |
| `aria-label`    | `string`                | `'Table of contents'` | navigation landmark 的名稱 |

### TableOfContentsItem

| 欄位      | Type          | Default | 說明              |
| ------- | ------------- | ------- | --------------- |
| `id`    | `string`      | -       | 唯一 id，也是預設的連結目標 |
| `label` | `string`      | -       | 面板裡的文字與連結名稱     |
| `level` | `1 \| 2 \| 3` | `1`     | 標題層級，決定刻度長度與縮排  |
| `href`  | `string`      | `#<id>` | 連結目標            |

## 無障礙

元件是一個 `navigation` landmark，名稱來自 `aria-label`。軌道上的連結是輔助科技讀到的部分：每個連結以項目的 label 命名，目前項目帶 `aria-current="location"`。展開的面板只是視覺呈現，對輔助科技隱藏，所以螢幕閱讀器與鍵盤使用者每個標題只會遇到一個連結。
