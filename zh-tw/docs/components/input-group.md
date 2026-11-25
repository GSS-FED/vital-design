# InputGroup

> 可組合的輸入外框，在 input 或 textarea 周圍放前綴、後綴、文字與動作。

## 預覽

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/InputGroup';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { XmarkIcon } from '@/components/icons/XmarkIcon';
import { useState } from 'react';

export function InputGroupExample() {
  const [query, setQuery] = useState('');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <MagnifyingGlassIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        placeholder="Search..."
        value={query}
        onValueChange={setQuery}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Clear"
          size="icon-xs"
          onClick={() => setQuery('')}
        >
          <XmarkIcon className="size-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

## 安裝

[設定好 registry](/zh-tw/docs/getting-started/installation) 後，安裝 InputGroup：

```bash
npx shadcn@latest add @vital-design/input-group
```

## 用法

`InputGroup` 為一個控制項（`InputGroupInput` 或 `InputGroupTextarea`）畫出框線，以及焦點、停用與無效狀態。圖示、文字與按鈕放在 `InputGroupAddon`；點 addon 裡按鈕以外的地方會讓控制項取得焦點。

要自己組輸入框版面時用它。[SearchBar](/zh-tw/docs/components/search-bar) 與 [PasswordInput](/zh-tw/docs/components/input#password-input) 是建立在 `InputGroup` 上的現成 wrapper，合用時直接用它們。

## 搭配文字

協定、單位或幣別這類固定的前綴與後綴，用 `InputGroupText`。

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupWithTextExample() {
  const [domain, setDomain] = useState('vital.example.com');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Website"
        value={domain}
        onValueChange={setDomain}
      />
    </InputGroup>
  );
}
```

## Textarea

```tsx
import {
  InputGroup,
  InputGroupTextarea,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupTextareaExample() {
  const [message, setMessage] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupTextarea
        aria-label="Message"
        className="h-30"
        placeholder="Enter your message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
```

## 區塊 addon

設定 `align="block-start"` 或 `align="block-end"`，把 addon 放在控制項上方或下方。

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupBlockAddonExample() {
  const [comment, setComment] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText>Comment</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        aria-label="Comment"
        placeholder="Enter your message"
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
```

## 狀態

在 `InputGroupInput` 加 `disabled` 停用控制項，外框與 addon 會跟著變；值不合法時在控制項加 `aria-invalid`。

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/InputGroup';
import { PlusIcon } from '@/components/icons/PlusIcon';

const states = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function InputGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              aria-label={`${label} amount`}
              defaultValue="2000"
              {...props}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Increase"
                size="icon-xs"
                disabled={props.disabled}
              >
                <PlusIcon className="size-3.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  );
}
```

## 部件

| 部件                   | 說明               |
| -------------------- | ---------------- |
| `InputGroup`         | 帶焦點、停用與無效狀態的視覺外框 |
| `InputGroupInput`    | 單行輸入控制項          |
| `InputGroupTextarea` | 多行 textarea 控制項  |
| `InputGroupAddon`    | 前綴或後綴插槽          |
| `InputGroupButton`   | addon 裡的小型動作按鈕   |
| `InputGroupText`     | addon 裡的靜態文字     |

## 屬性

### InputGroupAddon

| Prop    | Type                                                             | Default          | 說明              |
| ------- | ---------------------------------------------------------------- | ---------------- | --------------- |
| `align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | addon 在控制項周圍的位置 |

### InputGroupButton

| Prop   | Type                                     | Default    | 說明                   |
| ------ | ---------------------------------------- | ---------- | -------------------- |
| `size` | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'` | `'xs'`     | 按鈕尺寸；只有圖示時用 `icon-*` |
| `type` | `'button' \| 'submit' \| 'reset'`        | `'button'` | 原生 button type       |

`InputGroupButton` 也接受 `Button` 除了 `variant` 與 `size` 以外的 props，`theme` 不能是 `dangerous`。`InputGroupInput` 接受 `Input` 的 props，`InputGroupTextarea` 接受 `Textarea` 的 props。
