# Input

> Text input components including Input, PasswordInput, and Textarea.

## Input

The base single-line input primitive.

### Preview

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

### Usage

`Input` is built on Base UI's input primitive. Prefer `onValueChange`
for controlled value updates; native input props such as `onChange`,
`name`, `type`, `disabled`, and `aria-invalid` still pass through.

### Ghost

Set `appearance="ghost"` for a borderless input that shows its border on hover and focus, for example inline in a table or toolbar.

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

### States

Use `disabled` to disable the input, `aria-invalid` to mark an invalid value, and `readOnly` for a value that can be selected but not edited.

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

### Input Props

| Prop            | Type                                   | Default   | Description                      |
| --------------- | -------------------------------------- | --------- | -------------------------------- |
| `value`         | `string`                               | —         | Controlled value                 |
| `defaultValue`  | `string`                               | —         | Uncontrolled initial value       |
| `onValueChange` | `(value: string) => void`              | —         | Controlled value change callback |
| `onChange`      | `ChangeEventHandler<HTMLInputElement>` | —         | Native input change callback     |
| `placeholder`   | `string`                               | —         | Placeholder text                 |
| `appearance`    | `'solid' \| 'ghost'`                   | `'solid'` | Bordered or borderless style     |
| `disabled`      | `boolean`                              | `false`   | Disables the input               |
| `aria-invalid`  | `boolean`                              | —         | Applies invalid border styling   |
| `className`     | `string`                               | —         | Additional CSS classes           |
| `style`         | `CSSProperties`                        | —         | Inline styles                    |

## InputGroup

Need a prefix, suffix, inline text, or an action button inside the field? Compose it with [InputGroup](/docs/components/input-group).

## PasswordInput

A text input with a visibility toggle for password fields. It installs as its own registry item, `password-input`, and is built on `InputGroup`.

```bash
npx shadcn@latest add @vital-design/password-input
```

### Preview

Set `id` to connect a label, and `autoComplete` so password managers can fill the field. The example uses `Field` and `FieldLabel` from the `field` registry item.

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

### PasswordInput Props

| Prop                | Type                      | Default           | Description                            |
| ------------------- | ------------------------- | ----------------- | -------------------------------------- |
| `value`             | `string`                  | —                 | Controlled value                       |
| `defaultValue`      | `string`                  | —                 | Uncontrolled initial value             |
| `onChange`          | `(value: string) => void` | —                 | Value change callback                  |
| `placeholder`       | `string`                  | —                 | Placeholder text                       |
| `initiallyVisible`  | `boolean`                 | `false`           | Show password text initially           |
| `disabled`          | `boolean`                 | `false`           | Disables the input                     |
| `aria-invalid`      | `boolean`                 | —                 | Applies invalid border styling         |
| `prefix`            | `ReactNode`               | —                 | Element rendered inside the left side  |
| `onEnter`           | `(value: string) => void` | —                 | Called when Enter key is pressed       |
| `showPasswordLabel` | `string`                  | `'Show password'` | Toggle name while the text is hidden   |
| `hidePasswordLabel` | `string`                  | `'Hide password'` | Toggle name while the text is visible  |
| `className`         | `string`                  | —                 | Classes for the InputGroup shell       |
| `style`             | `CSSProperties`           | —                 | Inline styles for the InputGroup shell |

Every other `<input>` prop (`id`, `name`, `autoComplete`, `required`, `onBlur`, …) is forwarded to the inner input, and `ref` points at that input. `onChange` still receives a `string`, not an event.

---

## Textarea

A multi-line text field. See [Textarea](/docs/components/textarea) for its states.

### Preview

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

### Textarea Props

| Prop           | Type                                      | Default | Description                  |
| -------------- | ----------------------------------------- | ------- | ---------------------------- |
| `value`        | `string`                                  | —       | Controlled value             |
| `defaultValue` | `string`                                  | —       | Uncontrolled initial value   |
| `placeholder`  | `string`                                  | —       | Placeholder text             |
| `disabled`     | `boolean`                                 | `false` | Disables the textarea        |
| `aria-invalid` | `boolean`                                 | —       | Applies error border styling |
| `onChange`     | `ChangeEventHandler<HTMLTextAreaElement>` | —       | Native value change callback |
| `rows`         | `number`                                  | —       | Native visible row count     |
| `className`    | `string`                                  | —       | Additional CSS classes       |
| `style`        | `CSSProperties`                           | —       | Inline styles                |
