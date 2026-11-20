# RadioGroup

> A single-selection group of radio buttons.

## Preview

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="flex w-auto flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field
          key={option.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`radio-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## Usage

Wrap each `RadioGroupItem` and its `FieldLabel` in a horizontal `Field`, and pair the label's `htmlFor` with the item `id`. `RadioGroup` stacks items vertically by default; pass layout classes such as `flex flex-wrap gap-4` to put them in a row.

## Compound Items

Use `FieldContent` with a `FieldLabel` and `FieldDescription` when an option needs extra text.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const plans = [
  {
    description: 'Good for individual use',
    label: 'Basic',
    value: 'basic',
  },
  {
    description: 'Recommended for teams',
    label: 'Pro',
    value: 'pro',
  },
];

export function RadioGroupCompoundItemsExample() {
  const [value, setValue] = useState('basic');

  return (
    <RadioGroup
      className="flex w-auto flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {plans.map((plan) => (
        <Field
          key={plan.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`plan-${plan.value}`}
            value={plan.value}
          />
          <FieldContent>
            <FieldLabel htmlFor={`plan-${plan.value}`}>
              {plan.label}
            </FieldLabel>
            <FieldDescription>{plan.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## Vertical Layout

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupVerticalExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="w-auto gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field key={option.value} orientation="horizontal">
          <RadioGroupItem
            id={`radio-vertical-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-vertical-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## States

Disable an item with `disabled` on `RadioGroupItem` and put `data-disabled` on its `Field` so the label dims too. Mark an invalid item with `aria-invalid`. Long labels wrap and stay aligned with the radio button.

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';

const states = [
  { label: 'Unchecked' },
  { label: 'Checked', checked: true },
  { label: 'Invalid', invalid: true },
  { label: 'Disabled', disabled: true },
  { label: 'Checked & disabled', checked: true, disabled: true },
  {
    label: 'Long label',
    checked: true,
    text: 'A long option label that wraps onto the next line and stays aligned with the radio button',
  },
];

export function RadioGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, checked, invalid, disabled, text }) => {
        const id = `radio-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <div key={label} className="contents">
            <span className="leading-5">{label}</span>
            <RadioGroup
              aria-label={label}
              defaultValue={checked ? 'option' : undefined}
            >
              <Field
                orientation="horizontal"
                data-disabled={disabled}
              >
                <RadioGroupItem
                  aria-invalid={invalid}
                  disabled={disabled}
                  id={id}
                  value="option"
                />
                <FieldLabel htmlFor={id}>
                  {text ?? 'Option'}
                </FieldLabel>
              </Field>
            </RadioGroup>
          </div>
        );
      })}
    </div>
  );
}
```

## Props

### RadioGroup

| Prop            | Type             | Default | Description                          |
| --------------- | ---------------- | ------- | ------------------------------------ |
| `value`         | `string`         | —       | Currently selected value             |
| `defaultValue`  | `string`         | —       | Initial value for uncontrolled usage |
| `onValueChange` | Base UI callback | —       | Called when selection changes        |
| `className`     | `string`         | —       | Additional CSS classes               |

### RadioGroupItem

| Prop       | Type      | Default | Description                 |
| ---------- | --------- | ------- | --------------------------- |
| `value`    | `string`  | —       | **Required.** Option value  |
| `disabled` | `boolean` | `false` | Disables this specific item |
