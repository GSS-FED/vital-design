# SplitButton

> 由 ButtonGroup 組成的分割動作，含主要動作與獨立的切換觸發。

## 預覽

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

## 用法

把 `SplitButton` 放進 `DropdownMenu`，並傳入 `splitRender={<DropdownMenuTrigger />}`。箭頭就會成為選單的觸發器：負責開關選單、定位、鍵盤操作，選單開著時箭頭會朝上。主要按鈕仍執行自己的 `onClick`。

選單錨定在箭頭上。設定 `align="end"`，選單右緣就會和整個 SplitButton 的右緣對齊。

## 搭配圖示

把圖示當作 children 傳入，並加上 `data-icon="inline-start"`。圖示要另外安裝或引入，不要跟 SplitButton 放在一起。

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

## 箭頭名稱

箭頭的無障礙名稱預設是 `More options`。用 `splitLabel` 說明選單內容，或改成其他語言：

```tsx
<SplitButton splitLabel="更多儲存選項" splitRender={<DropdownMenuTrigger />}>
  儲存
</SplitButton>
```

## 自行控制箭頭

如果彈出的不是 `DropdownMenu`，可以用 `open` 和 `splitOnClick` 自行控制箭頭。`open` 會讓箭頭朝上，並把名稱切換成 `Expand options` 或 `Collapse options`。

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

## 主題

`theme` 的值與 `Button` 相同。

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

## 尺寸

`size="lg"` 會加上主題陰影，hover 時上浮；`size="md"` 是沒有陰影的精簡尺寸。

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

## 狀態

`open` 讓箭頭呈現開啟狀態。`disabled` 會停用兩個區塊；加上 `focusableWhenDisabled` 可以讓它們留在 Tab 順序裡。

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

## 屬性

| Prop                    | Type                                                                                   | Default          | 說明                                                              |
| ----------------------- | -------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------- |
| `open`                  | `boolean`                                                                              | —                | 讓箭頭呈現開啟狀態。搭配 `splitRender` 時不用設定                                |
| `splitRender`           | `ReactElement`                                                                         | —                | 把箭頭渲染成其他元素，通常是 `<DropdownMenuTrigger />`                        |
| `splitLabel`            | `string`                                                                               | `'More options'` | 箭頭的無障礙名稱。設定 `open` 時預設為 `'Expand options'`／`'Collapse options'` |
| `theme`                 | `'primary' \| 'default' \| 'success' \| 'info' \| 'warning' \| 'alarm' \| 'dangerous'` | `'default'`      | 色彩主題（與 `Button` 相同）                                             |
| `size`                  | `'md' \| 'lg'`                                                                         | `'md'`           | 按鈕尺寸                                                            |
| `onClick`               | `(e: MouseEvent) => void`                                                              | —                | 主要按鈕區域的處理函式                                                     |
| `splitOnClick`          | `(e: MouseEvent) => void`                                                              | —                | 箭頭觸發的處理函式                                                       |
| `focusableWhenDisabled` | `boolean`                                                                              | `false`          | 套用停用樣式時，按鈕仍可被鍵盤聚焦                                               |
| `disabled`              | `boolean`                                                                              | `false`          | 停用整個按鈕                                                          |
