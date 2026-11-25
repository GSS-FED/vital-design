# Separator

> Horizontal or vertical divider.

## Preview

```tsx
import { Separator } from '@/components/ui/Separator';

export function SeparatorHorizontalExample() {
  return (
    <div className="w-80">
      <Separator />
    </div>
  );
}
```

## Vertical

```tsx
import { Separator } from '@/components/ui/Separator';

export function SeparatorVerticalExample() {
  return (
    <div className="flex h-16 items-stretch gap-4">
      <span className="text-sm text-grayscale-opacity-700">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-grayscale-opacity-700">
        Right
      </span>
    </div>
  );
}
```

## In a List

Separate stacked rows with a horizontal `Separator`.

```tsx
import { Separator } from '@/components/ui/Separator';

export function SeparatorInListExample() {
  return (
    <div className="flex w-80 flex-col">
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-opacity-800">
        First row
      </span>
      <Separator />
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-opacity-800">
        Second row
      </span>
    </div>
  );
}
```

## Props

| Prop          | Type                          | Default        | Description                    |
| ------------- | ----------------------------- | -------------- | ------------------------------ |
| `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Separator direction            |
| `className`   | `string`                      | —              | Additional CSS classes         |
| `style`       | `CSSProperties`               | —              | Inline styles                  |
| `...props`    | `ComponentProps<typeof Base>` | —              | Base UI separator props/events |
