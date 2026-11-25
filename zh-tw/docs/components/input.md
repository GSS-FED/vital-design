# Input

> 文字輸入元件，包含 Input、PasswordInput 與 Textarea。

## Input

單行輸入的基礎 primitive。

### 預覽

```tsx
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

export function InputExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      className="w-112.5"
      placeholder="Enter text..."
      value={value}
      onValueChange={setValue}
    />
  );
}
```

### 用法

`Input` 建立在 Base UI 的 input primitive 上。受控更新優先用 `onValueChange`；`onChange`、`name`、`type`、`disabled`、`aria-invalid` 這類原生 input props 仍會傳進去。

### 無邊框

設定 `appearance="ghost"` 得到平時沒有框線、hover 與 focus 時才顯示框線的輸入框，例如放在表格或工具列裡。

```tsx
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

export function InputGhostExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      appearance="ghost"
      className="w-112.5"
      placeholder="Borderless until hover or focus"
      value={value}
      onValueChange={setValue}
    />
  );
}
```

### 狀態

用 `disabled` 停用輸入，用 `aria-invalid` 標示值不合法，`readOnly` 則讓值可以選取但不能編輯。

```tsx
import { Input } from '@/components/ui/Input';

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Filled', props: { defaultValue: 'Vital Design' } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Read-only',
    props: { defaultValue: 'Vital Design', readOnly: true },
  },
];

export function InputStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Input
            aria-label={label}
            placeholder="Enter text..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
```

### Input 屬性

| Prop            | Type                                   | Default   | 說明                   |
| --------------- | -------------------------------------- | --------- | -------------------- |
| `value`         | `string`                               | —         | 受控值                  |
| `defaultValue`  | `string`                               | —         | 非受控的初始值              |
| `onValueChange` | `(value: string) => void`              | —         | 受控值變更時的回呼            |
| `onChange`      | `ChangeEventHandler<HTMLInputElement>` | —         | 原生 input 的 change 回呼 |
| `placeholder`   | `string`                               | —         | 佔位文字                 |
| `appearance`    | `'solid' \| 'ghost'`                   | `'solid'` | 有框線或無框線樣式            |
| `disabled`      | `boolean`                              | `false`   | 停用輸入                 |
| `aria-invalid`  | `boolean`                              | —         | 套用無效框線樣式             |
| `className`     | `string`                               | —         | 額外的 CSS class        |
| `style`         | `CSSProperties`                        | —         | 行內樣式                 |

## InputGroup

欄位裡需要前綴、後綴、文字或動作按鈕時，用 [InputGroup](/zh-tw/docs/components/input-group) 組合。

## PasswordInput

帶顯示／隱藏切換的密碼輸入。它是獨立的 registry item `password-input`，建立在 `InputGroup` 上。

```bash
npx shadcn@latest add @vital-design/password-input
```

### 預覽

設定 `id` 來連接 label，設定 `autoComplete` 讓密碼管理員可以填入。範例用到 `field` registry item 的 `Field` 與 `FieldLabel`。

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useState } from 'react';

export function PasswordInputExample() {
  const [password, setPassword] = useState('');

  return (
    <Field className="w-112.5">
      <FieldLabel htmlFor="current-password">Password</FieldLabel>
      <PasswordInput
        id="current-password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      />
    </Field>
  );
}
```

### PasswordInput 屬性

| Prop                | Type                      | Default           | 說明                   |
| ------------------- | ------------------------- | ----------------- | -------------------- |
| `value`             | `string`                  | —                 | 受控值                  |
| `defaultValue`      | `string`                  | —                 | 非受控的初始值              |
| `onChange`          | `(value: string) => void` | —                 | 值變更時的回呼              |
| `placeholder`       | `string`                  | —                 | 佔位文字                 |
| `initiallyVisible`  | `boolean`                 | `false`           | 一開始就顯示密碼文字           |
| `disabled`          | `boolean`                 | `false`           | 停用輸入                 |
| `aria-invalid`      | `boolean`                 | —                 | 套用無效框線樣式             |
| `prefix`            | `ReactNode`               | —                 | 顯示在左側內部的元素           |
| `onEnter`           | `(value: string) => void` | —                 | 按下 Enter 時呼叫         |
| `showPasswordLabel` | `string`                  | `'Show password'` | 密碼隱藏時，切換鈕的名稱         |
| `hidePasswordLabel` | `string`                  | `'Hide password'` | 密碼顯示時，切換鈕的名稱         |
| `className`         | `string`                  | —                 | InputGroup 外殼的 class |
| `style`             | `CSSProperties`           | —                 | InputGroup 外殼的行內樣式   |

其餘 `<input>` props（`id`、`name`、`autoComplete`、`required`、`onBlur` 等）都會傳給內層 input，`ref` 也指向該 input。`onChange` 收到的仍是 `string`，不是事件。

---

## Textarea

多行文字欄位。各種狀態見 [Textarea](/zh-tw/docs/components/textarea)。

### 預覽

```tsx
import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';

export function TextareaExample() {
  const [text, setText] = useState('');

  return (
    <Textarea
      aria-label="Feedback"
      className="w-112.5"
      placeholder="Tell us what you think..."
      value={text}
      onChange={(event) => setText(event.currentTarget.value)}
    />
  );
}
```

### Textarea 屬性

| Prop           | Type                                      | Default | 說明            |
| -------------- | ----------------------------------------- | ------- | ------------- |
| `value`        | `string`                                  | —       | 受控值           |
| `defaultValue` | `string`                                  | —       | 非受控的初始值       |
| `placeholder`  | `string`                                  | —       | 佔位文字          |
| `disabled`     | `boolean`                                 | `false` | 停用 textarea   |
| `aria-invalid` | `boolean`                                 | —       | 套用錯誤框線樣式      |
| `onChange`     | `ChangeEventHandler<HTMLTextAreaElement>` | —       | 原生值變更回呼       |
| `rows`         | `number`                                  | —       | 原生可見列數        |
| `className`    | `string`                                  | —       | 額外的 CSS class |
| `style`        | `CSSProperties`                           | —       | 行內樣式          |
