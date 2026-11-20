# Checkbox

> A checkbox input supporting checked, unchecked, and indeterminate states. Built on Base UI for accessibility.

## Preview

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

export function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox
        id="checkbox-terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="checkbox-terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  );
}
```

## Usage

Put the `Checkbox` and its `FieldLabel` in a horizontal `Field`, and pair the label's `htmlFor` with the checkbox `id`. The whole row then toggles the checkbox and shows its hover ring.

## States

Mark an invalid checkbox with `aria-invalid`. Put `data-disabled` on the `Field` so the label dims with a disabled checkbox.

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';

const states = [
  { label: 'Unchecked', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Checked', props: { checked: true } },
  {
    label: 'Disabled checked',
    props: { checked: true, disabled: true },
  },
  { label: 'Indeterminate', props: { indeterminate: true } },
  {
    label: 'Disabled indeterminate',
    props: { disabled: true, indeterminate: true },
  },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function CheckboxStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[repeat(2,auto)] gap-x-10 gap-y-3">
      {states.map(({ label, props }) => {
        const id = `checkbox-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <Field
            key={label}
            orientation="horizontal"
            className="w-auto"
            data-disabled={props.disabled}
          >
            <Checkbox id={id} {...props} />
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
          </Field>
        );
      })}
    </div>
  );
}
```

The `indeterminate` state is useful for "select all" patterns where only some items are selected.

## Indeterminate Pattern

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

const items = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push notifications' },
];

export function CheckboxIndeterminateExample() {
  const [selected, setSelected] = useState<string[]>(['email']);
  const allChecked = selected.length === items.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <div className="flex flex-col gap-3">
      <Field orientation="horizontal" className="w-auto">
        <Checkbox
          id="checkbox-select-all"
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={(checked) =>
            setSelected(checked ? items.map((item) => item.id) : [])
          }
        />
        <FieldLabel htmlFor="checkbox-select-all">
          Select all
        </FieldLabel>
      </Field>
      {items.map((item) => (
        <Field
          key={item.id}
          orientation="horizontal"
          className="w-auto pl-6"
        >
          <Checkbox
            id={`checkbox-${item.id}`}
            checked={selected.includes(item.id)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked
                  ? [...current, item.id]
                  : current.filter((id) => id !== item.id),
              )
            }
          />
          <FieldLabel htmlFor={`checkbox-${item.id}`}>
            {item.label}
          </FieldLabel>
        </Field>
      ))}
    </div>
  );
}
```

## Props

| Prop              | Type             | Default | Description                       |
| ----------------- | ---------------- | ------- | --------------------------------- |
| `checked`         | `boolean`        | —       | Controlled checked state          |
| `defaultChecked`  | `boolean`        | `false` | Initial checked state             |
| `indeterminate`   | `boolean`        | `false` | Shows the mixed state             |
| `onCheckedChange` | Base UI callback | —       | Called when checked state changes |
| `disabled`        | `boolean`        | `false` | Disables interaction              |
| `required`        | `boolean`        | `false` | Marks the checkbox as required    |
| `className`       | `string`         | —       | Additional CSS classes            |
| `style`           | `CSSProperties`  | —       | Inline styles                     |
