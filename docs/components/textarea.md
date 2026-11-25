# Textarea

> Multi-line text input with consistent border, focus, and disabled states.

## Preview

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

## Usage

`Textarea` renders a native `<textarea>`; read the value from `event.currentTarget.value` in `onChange`. Set `rows` for a taller default height.

## States

Use `disabled` to disable the textarea, `aria-invalid` to apply the destructive border treatment, and `readOnly` for text that can be selected but not edited.

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

## Props

| Prop           | Type                                   | Default | Description                       |
| -------------- | -------------------------------------- | ------- | --------------------------------- |
| `disabled`     | `boolean`                              | `false` | Disables the textarea             |
| `aria-invalid` | `boolean`                              | —       | Applies destructive border styles |
| `className`    | `string`                               | —       | Additional CSS classes            |
| `...props`     | `ComponentPropsWithoutRef<'textarea'>` | —       | Native textarea props forwarded   |
