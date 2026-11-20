# NumberInput

> A numeric input with stepper buttons, locale-aware formatting, and clamped step interactions.

## Preview

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputExample() {
  return (
    <div className="w-60">
      <NumberInput defaultValue={0}>
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## Usage

`NumberInput` is built on Base UI's
[Number Field](https://base-ui.com/react/components/number-field).
The root manages the numeric value, clamping, formatting, and the
disabled state of every part. Compose `NumberInputGroup`,
`NumberInputControl`, and `NumberInputSteppers` to render the field.

## Min, Max, And Step

`min` and `max` clamp values from the steppers, keyboard, and wheel.
`step` controls the increment per arrow press; `smallStep` and
`largeStep` are used when the meta or shift key is held.

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputWithRangeExample() {
  return (
    <div className="w-60">
      <NumberInput defaultValue={5} min={0} max={10} step={1}>
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## States

Disable every part with `disabled` on `NumberInput`, or keep the value focusable but unchangeable with `readOnly`. Set `aria-invalid` on `NumberInputControl` to apply the error border style.

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

const states = [
  { label: 'Empty', props: {} },
  { label: 'Disabled', props: { defaultValue: 12, disabled: true } },
  { label: 'Read-only', props: { defaultValue: 12, readOnly: true } },
  { label: 'Invalid', props: { defaultValue: 99 }, invalid: true },
];

export function NumberInputStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <NumberInput {...props}>
            <NumberInputGroup>
              <NumberInputControl
                aria-invalid={invalid}
                placeholder="0"
              />
              <NumberInputSteppers />
            </NumberInputGroup>
          </NumberInput>
        </div>
      ))}
    </div>
  );
}
```

## Decimals

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputDecimalsExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1.5}
        step={0.1}
        smallStep={0.01}
        largeStep={1}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0.0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## Currency Formatting

Pass `Intl.NumberFormatOptions` via `format` to render the value in any
locale-aware shape.

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputFormattedCurrencyExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1234}
        format={{
          style: 'currency',
          currency: 'TWD',
          maximumFractionDigits: 0,
        }}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="NT$0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## Controlled

Use `value` and `onValueChange` to drive the field from state. The
callback emits `null` when the input is empty.
Wrap a label in `NumberInputScrubArea` to let users drag it to change
the value.

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';
import { Label } from '@/components/ui/Label';
import { useId, useState } from 'react';

export function NumberInputControlledExample() {
  const [value, setValue] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="w-60">
      <NumberInput
        id={id}
        className="flex flex-col gap-2"
        value={value}
        onValueChange={setValue}
        min={-50}
        max={50}
        step={5}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
        <NumberInputScrubArea>
          <Label htmlFor={id}>
            Current value: {value ?? 'empty'}
          </Label>
          <NumberInputScrubAreaCursor />
        </NumberInputScrubArea>
      </NumberInput>
    </div>
  );
}
```

## Props

### NumberInput

`NumberInput` is the root component and accepts every Base UI
[`NumberField.Root`](https://base-ui.com/react/components/number-field#api-reference-numberfieldroot)
prop.

| Prop               | Type                                       | Default | Description                             |
| ------------------ | ------------------------------------------ | ------- | --------------------------------------- |
| `value`            | `number \| null`                           | —       | Controlled numeric value                |
| `defaultValue`     | `number`                                   | —       | Uncontrolled initial value              |
| `onValueChange`    | `(value, eventDetails) => void`            | —       | Called when the value changes           |
| `onValueCommitted` | `(value, eventDetails) => void`            | —       | Called when the value is committed      |
| `min`              | `number`                                   | —       | Minimum allowed value                   |
| `max`              | `number`                                   | —       | Maximum allowed value                   |
| `step`             | `number \| 'any'`                          | `1`     | Step for buttons, arrow keys, and wheel |
| `smallStep`        | `number`                                   | `0.1`   | Step when the meta key is held          |
| `largeStep`        | `number`                                   | `10`    | Step when the shift key is held         |
| `snapOnStep`       | `boolean`                                  | `false` | Snap to the nearest step when stepping  |
| `allowOutOfRange`  | `boolean`                                  | `false` | Allow typed values outside the min/max  |
| `allowWheelScrub`  | `boolean`                                  | `false` | Increment with the mouse wheel on focus |
| `format`           | `Intl.NumberFormatOptions`                 | —       | Locale-aware formatting options         |
| `locale`           | `Intl.LocalesArgument`                     | —       | Locale to format the value with         |
| `disabled`         | `boolean`                                  | `false` | Disables every part                     |
| `readOnly`         | `boolean`                                  | `false` | Prevents user-driven value changes      |
| `required`         | `boolean`                                  | `false` | Requires a value before form submit     |
| `name`             | `string`                                   | —       | Form field name                         |
| `id`               | `string`                                   | —       | Hidden input id                         |
| `inputRef`         | `Ref<HTMLInputElement>`                    | —       | Ref forwarded to the hidden input       |
| `className`        | `string \| (state) => string \| undefined` | —       | Additional classes for the root element |

### NumberInput Parts

| Part                         | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `NumberInputGroup`           | Visual shell with focus, disabled, and `aria-invalid` states                    |
| `NumberInputControl`         | The native input that displays and parses the formatted value                   |
| `NumberInputSteppers`        | Convenience layout that stacks the increment and decrement buttons on the right |
| `NumberInputIncrement`       | Stepper button that adds `step` to the value                                    |
| `NumberInputDecrement`       | Stepper button that subtracts `step` from the value                             |
| `NumberInputScrubArea`       | Optional region that scrubs the value with pointer drags                        |
| `NumberInputScrubAreaCursor` | Cursor element rendered while scrubbing                                         |

All parts forward refs to their underlying DOM elements and accept Base
UI `className` state functions.
