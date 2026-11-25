# Editable

> Inline editable text field with display, input, and textarea parts.

## Preview

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

## Usage

`Editable` is a compound component for inline text editing. The
display surface looks like static text; clicking it swaps in an
`Input` (or `Textarea`) focused with the caret at the end. Pressing
`Enter` (or blurring) commits the value through `onCommit`; `Escape`
discards the staged edit.

## Textarea Variant

Swap `EditableInput` for `EditableTextarea` when the field should
accept multi-line content. `Enter` inserts a newline; click outside
to commit.

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

## Controlled

Provide `value` together with `onCommit` to drive the field from
outside. The component still manages its own staged edit buffer
internally, so the parent only receives the committed value.

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

## States

When the value is empty, `EditableDisplay` renders the `placeholder`
text with a visible border so the affordance stays visible. Pass
`disabled` to block editing entirely, or `readOnly` to keep the
display interactive-looking but ignore enter-edit clicks.

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

## Parts

| Part               | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `Editable`         | Context provider that owns the value and editing state |
| `EditableDisplay`  | Static-looking button shown when not editing           |
| `EditableInput`    | Single-line `Input` shown while editing                |
| `EditableTextarea` | Multi-line `textarea` shown while editing              |

## Editable Props

| Prop           | Type                      | Default | Description                                        |
| -------------- | ------------------------- | ------- | -------------------------------------------------- |
| `value`        | `string`                  | —       | Controlled value                                   |
| `defaultValue` | `string`                  | `''`    | Uncontrolled initial value                         |
| `onCommit`     | `(value: string) => void` | —       | Called when the staged value is committed          |
| `placeholder`  | `string`                  | —       | Shown in display when empty and used by the input  |
| `disabled`     | `boolean`                 | `false` | Blocks entering edit mode                          |
| `readOnly`     | `boolean`                 | `false` | Display stays focusable but cannot enter edit mode |
| `className`    | `string`                  | —       | Additional CSS classes on the wrapper              |
| `...props`     | `ComponentProps<'div'>`   | —       | Native `div` props on the wrapper                  |

## Keyboard

| Key      | Behavior                                               |
| -------- | ------------------------------------------------------ |
| `Enter`  | (Input) commits the staged value and exits edit mode   |
| `Escape` | Discards the staged value and exits edit mode          |
| Blur     | Commits the staged value (both `Input` and `Textarea`) |
