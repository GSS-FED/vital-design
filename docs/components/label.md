# Label

> Accessible label text associated with a form control.

## Preview

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelWithInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="name@example.com" />
    </div>
  );
}
```

## Usage

Pair `htmlFor` with the control's `id` so clicking the label focuses the control. For a label with a description or error message, use [Field](/docs/components/field).

## Required

`required` adds the Vittal Design required dot to the label. Keep the actual required state on the control too.

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelRequiredExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="required-email" required>
        Email
      </Label>
      <Input
        id="required-email"
        placeholder="name@example.com"
        required
      />
    </div>
  );
}
```

## With Disabled Input

Disabling the input doesn't change the label. To dim the label with the control, use [Field](/docs/components/field) with `data-disabled`.

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelWithDisabledInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="disabled-email">Email</Label>
      <Input
        id="disabled-email"
        placeholder="name@example.com"
        disabled
      />
    </div>
  );
}
```

## Props

| Prop        | Type                      | Default | Description                     |
| ----------- | ------------------------- | ------- | ------------------------------- |
| `htmlFor`   | `string`                  | —       | Associated control id           |
| `required`  | `boolean`                 | `false` | Shows the required dot          |
| `className` | `string`                  | —       | Additional CSS classes          |
| `style`     | `CSSProperties`           | —       | Inline styles                   |
| `...props`  | `ComponentProps<'label'>` | —       | Native `label` props and events |
