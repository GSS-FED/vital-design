# Editable

> 行內可編輯文字欄位，包含顯示、單行輸入與多行輸入部件。

## 預覽

```tsx
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/ui/Editable';

export function EditableExample() {
  return (
    <div className="w-80">
      <Editable defaultValue="Click to edit" placeholder="Not set">
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  );
}
```

## 用法

`Editable` 是行內編輯文字的複合元件。顯示區看起來像靜態文字；點擊後換成聚焦的 `Input`（或 `Textarea`），游標在文字結尾。按 `Enter`（或失焦）會透過 `onCommit` 確認值；`Escape` 會捨棄暫存的編輯。

## Textarea 變體

欄位要接受多行內容時，把 `EditableInput` 換成 `EditableTextarea`。`Enter` 會插入換行；點外面才確認。

```tsx
import {
  Editable,
  EditableDisplay,
  EditableTextarea,
} from '@/components/ui/Editable';

export function EditableTextareaVariantExample() {
  return (
    <div className="w-80">
      <Editable
        defaultValue="A longer note. Click to edit."
        placeholder="Click to add a note"
      >
        <EditableDisplay />
        <EditableTextarea rows={3} />
      </Editable>
    </div>
  );
}
```

## 受控

同時提供 `value` 與 `onCommit`，由外部驅動欄位。元件內部仍管理自己的暫存編輯緩衝，父層只會收到已確認的值。

```tsx
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/ui/Editable';
import { useState } from 'react';

export function EditableControlledExample() {
  const [value, setValue] = useState('Alice');

  return (
    <div className="flex w-80 flex-col gap-2">
      <Editable
        value={value}
        onCommit={setValue}
        placeholder="Enter a name"
      >
        <EditableDisplay />
        <EditableInput />
      </Editable>
      <p className="font-sans text-xs text-grayscale-opacity-500">
        Current value: {value || '(empty)'}
      </p>
    </div>
  );
}
```

## 狀態

值是空的時，`EditableDisplay` 會顯示 `placeholder` 文字並帶可見的框線，讓可編輯的提示維持可見。傳 `disabled` 會完全不能編輯；傳 `readOnly` 時顯示仍像可互動，但點擊不會進入編輯。

```tsx
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/ui/Editable';

const states = [
  { label: 'Empty', props: { defaultValue: '' } },
  {
    label: 'Disabled',
    props: { defaultValue: 'Cannot edit', disabled: true },
  },
  {
    label: 'Read-only',
    props: { defaultValue: 'Read-only content', readOnly: true },
  },
];

export function EditableStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_20rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Editable placeholder="Click to add a note" {...props}>
            <EditableDisplay />
            <EditableInput />
          </Editable>
        </div>
      ))}
    </div>
  );
}
```

## 部件

| 部件                 | 說明                         |
| ------------------ | -------------------------- |
| `Editable`         | 擁有值與編輯狀態的 context provider |
| `EditableDisplay`  | 非編輯時顯示的、看起來像靜態文字的按鈕        |
| `EditableInput`    | 編輯時顯示的單行 `Input`           |
| `EditableTextarea` | 編輯時顯示的多行 `textarea`        |

## Editable 屬性

| Prop           | Type                      | Default | 說明                       |
| -------------- | ------------------------- | ------- | ------------------------ |
| `value`        | `string`                  | —       | 受控值                      |
| `defaultValue` | `string`                  | `''`    | 非受控的初始值                  |
| `onCommit`     | `(value: string) => void` | —       | 暫存值被確認時呼叫                |
| `placeholder`  | `string`                  | —       | 空值時顯示，也給 input 使用        |
| `disabled`     | `boolean`                 | `false` | 阻止進入編輯模式                 |
| `readOnly`     | `boolean`                 | `false` | 顯示仍可聚焦，但不能進入編輯模式         |
| `className`    | `string`                  | —       | wrapper 上的額外 CSS class   |
| `...props`     | `ComponentProps<'div'>`   | —       | wrapper 上的原生 `div` props |

## 鍵盤

| 按鍵       | 行為                             |
| -------- | ------------------------------ |
| `Enter`  | （Input）確認暫存值並離開編輯模式            |
| `Escape` | 捨棄暫存值並離開編輯模式                   |
| Blur     | 確認暫存值（`Input` 與 `Textarea` 皆是） |
