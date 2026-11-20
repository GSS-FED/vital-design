# Badge

> Small status indicator pill with semantic color variants and number or text content.

## Preview

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeExample() {
  return <Badge>9</Badge>;
}
```

## Variants

Each column shows one `variant` in every size and type: `lg` number, `lg` text, `md` number, `md` text, and the `sm` dot.

```tsx
import { Badge } from '@/components/ui/Badge';

const variants = [
  'primary',
  'success',
  'warning',
  'destructive',
  'info',
] as const;

export function BadgeAllVariantsExample() {
  return (
    <div className="flex flex-wrap gap-10">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex flex-col items-start gap-3"
        >
          <span className="text-xs text-grayscale-opacity-600">
            {variant}
          </span>
          <Badge size="lg" type="number" variant={variant}>
            9
          </Badge>
          <Badge size="lg" type="text" variant={variant}>
            New
          </Badge>
          <Badge size="md" type="number" variant={variant}>
            9
          </Badge>
          <Badge size="md" type="text" variant={variant}>
            New
          </Badge>
          <Badge size="sm" variant={variant} />
        </div>
      ))}
    </div>
  );
}
```

## Sizes

`lg` is the default. `md` is a smaller pill. `sm` renders an empty dot and ignores `children`.

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeDotExample() {
  return <Badge size="sm" />;
}
```

## Type: Number vs Text

`type="number"` (default) suits counts. `type="text"` adjusts padding and font size for short words.

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeTextExample() {
  return <Badge type="text">New</Badge>;
}
```

## Props

| Prop        | Type                                                             | Default     | Description                          |
| ----------- | ---------------------------------------------------------------- | ----------- | ------------------------------------ |
| `variant`   | `'primary' \| 'success' \| 'warning' \| 'destructive' \| 'info'` | `'primary'` | Color variant                        |
| `size`      | `'sm' \| 'md' \| 'lg'`                                           | `'lg'`      | Badge size; `sm` is an empty dot     |
| `type`      | `'number' \| 'text'`                                             | `'number'`  | Adjusts padding/typography for label |
| `children`  | `ReactNode`                                                      | —           | Badge content (ignored when `sm`)    |
| `className` | `string`                                                         | —           | Additional CSS classes               |
| `style`     | `CSSProperties`                                                  | —           | Inline styles                        |
