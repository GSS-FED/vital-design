# Switch

> A toggle control for boolean on/off settings.

## Preview

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import { Switch } from '@/components/ui/Switch';
import { useState } from 'react';

export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto items-center">
      <Switch
        id="switch-notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="switch-notifications">
        Email notifications
      </FieldLabel>
    </Field>
  );
}
```

## Usage

Give the switch a visible label: put it in a horizontal `Field` with a `FieldLabel` whose `htmlFor` matches the switch `id`. Without a visible label, pass `aria-label`.

## States

The disabled state accepts both `checked={false}` and `checked={true}`. Use `aria-invalid` for invalid styling.

```tsx
import { Switch } from '@/components/ui/Switch';

const states = [
  { label: 'Off', props: {} },
  { label: 'On', props: { checked: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Disabled on', props: { checked: true, disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Invalid on',
    props: { 'aria-invalid': true, checked: true },
  },
];

export function SwitchStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Switch aria-label={label} {...props} />
        </div>
      ))}
    </div>
  );
}
```

## Props

| Prop              | Type                         | Default | Description                         |
| ----------------- | ---------------------------- | ------- | ----------------------------------- |
| `checked`         | `boolean`                    | —       | Controls the toggle state           |
| `defaultChecked`  | `boolean`                    | `false` | Sets the uncontrolled initial state |
| `onCheckedChange` | `(checked: boolean) => void` | —       | Called when toggled                 |
| `disabled`        | `boolean`                    | `false` | Disables interaction                |
| `aria-invalid`    | `boolean`                    | —       | Applies invalid styling             |
| `className`       | `string`                     | —       | Additional CSS classes              |
| `...props`        | `BaseSwitch.Root.Props`      | —       | Passed to the Base UI root          |
