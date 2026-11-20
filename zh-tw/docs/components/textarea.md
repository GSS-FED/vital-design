# Textarea

> 多行文字輸入，框線、焦點與停用狀態一致。

## 預覽

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

## 用法

`Textarea` 渲染原生 `<textarea>`；在 `onChange` 裡從 `event.currentTarget.value` 取值。要預設高一點就設定 `rows`。

## 狀態

用 `disabled` 停用 textarea，用 `aria-invalid` 套用 destructive 框線，`readOnly` 則讓文字可以選取但不能編輯。

```tsx
import { Textarea } from '@/components/ui/Textarea';

const states = [
  { label: 'Placeholder', props: {} },
  {
    label: 'Filled',
    props: { defaultValue: 'The new dashboard loads much faster.' },
  },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Read-only',
    props: {
      defaultValue: 'The new dashboard loads much faster.',
      readOnly: true,
    },
  },
];

export function TextareaStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span className="py-1.5">{label}</span>
          <Textarea
            aria-label={label}
            placeholder="Tell us what you think..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
```

## 屬性

| Prop           | Type                                   | Default | 說明                   |
| -------------- | -------------------------------------- | ------- | -------------------- |
| `disabled`     | `boolean`                              | `false` | 停用 textarea          |
| `aria-invalid` | `boolean`                              | —       | 套用 destructive 框線樣式  |
| `className`    | `string`                               | —       | 額外的 CSS class        |
| `...props`     | `ComponentPropsWithoutRef<'textarea'>` | —       | 轉送的原生 textarea props |
