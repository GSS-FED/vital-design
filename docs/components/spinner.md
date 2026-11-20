# Spinner

> Loading indicator for pending actions and async content.

## Preview

```tsx
import { Spinner } from '@/components/ui/Spinner';

export function SpinnerExample() {
  return <Spinner />;
}
```

## Sizes

```tsx
import { Spinner } from '@/components/ui/Spinner';

export function SpinnerSizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
    </div>
  );
}
```

## Colors

```tsx
import { Spinner } from '@/components/ui/Spinner';

export function SpinnerColorsExample() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary-500" />
      <Spinner className="text-success-500" />
      <Spinner className="text-destructive-500" />
      <Spinner className="text-grayscale-opacity-500" />
    </div>
  );
}
```

## With Label

```tsx
import { Spinner } from '@/components/ui/Spinner';

export function SpinnerWithLabelExample() {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-grayscale-opacity-700">
      <Spinner className="size-4" />
      Loading
    </div>
  );
}
```

## Props

| Prop         | Type                    | Default     | Description                   |
| ------------ | ----------------------- | ----------- | ----------------------------- |
| `className`  | `string`                | —           | Additional CSS classes        |
| `aria-label` | `string`                | `'Loading'` | Accessible label              |
| `role`       | `string`                | `'status'`  | Accessible status role        |
| `...props`   | `ComponentProps<'svg'>` | —           | Native `svg` props and events |
