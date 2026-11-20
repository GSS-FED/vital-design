# Avatar

> Display a user's profile picture with fallback to initials or a default icon, available in 12 color variants.

## Preview

```tsx
import { Avatar } from '@/components/ui/Avatar';

export function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/images/ray.jpg" alt="Ray" name="Ray" size="lg" />
      <Avatar name="Arthur Lu" color="blue" size="lg" />
      <Avatar name="Sean Chen" color="tiffany" size="lg" />
      <Avatar size="lg" />
    </div>
  );
}
```

## Usage

When `src` is provided, the image is displayed. While it loads, or if it fails, the avatar shows `fallback`, the initials from `name`, or a default icon.

## Sizes

```tsx
import { Avatar } from '@/components/ui/Avatar';

export function AvatarAllSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xs" alt="Extra small" />
      <Avatar size="sm" alt="Small" />
      <Avatar size="md" alt="Medium" />
      <Avatar size="lg" alt="Large" />
      <Avatar size="xl" alt="Extra large" />
    </div>
  );
}
```

| Size | Dimensions           |
| ---- | -------------------- |
| `xs` | 24 × 24 px           |
| `sm` | 32 × 32 px           |
| `md` | 40 × 40 px (default) |
| `lg` | 48 × 48 px           |
| `xl` | 60 × 60 px           |

## Color Variants

```tsx
import { Avatar } from '@/components/ui/Avatar';

const colors = [
  'default',
  'tiffany',
  'green',
  'orange',
  'pink',
  'blue',
  'sky',
  'purple',
  'light-gold',
  'salmon',
  'ice',
  'lavender',
] as const;

export function AvatarColorsExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Avatar key={color} color={color} alt={color} />
      ))}
    </div>
  );
}
```

## Fallback

Without `fallback` or `name`, the avatar shows the default person icon. `fallback` takes precedence over `name`. With only `name`, the avatar shows the first letters of up to two words.

```tsx
import { Avatar } from '@/components/ui/Avatar';

export function AvatarFallbackExample() {
  return (
    <div className="flex flex-wrap items-start gap-8 text-xs text-grayscale-opacity-600">
      <figure className="flex flex-col items-center gap-2">
        <Avatar />
        <figcaption>Default icon</figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <Avatar name="Vittal Design" fallback="BZ" />
        <figcaption>fallback</figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <Avatar name="Vittal Design" />
        <figcaption>name only</figcaption>
      </figure>
    </div>
  );
}
```

## Group

Use `AvatarGroup` to stack multiple avatars. Add `AvatarGroupCount` at the end when the list is truncated.

```tsx
import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/ui/Avatar';

export function AvatarGroupExample() {
  return (
    <AvatarGroup>
      <Avatar color="green" name="Arthur Lu" />
      <Avatar color="blue" name="Dover Shen" />
      <Avatar color="ice" name="Luka Jung" />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}
```

## Compound Parts

Use `AvatarRoot`, `AvatarImage`, and `AvatarFallback` when you need full control over the image and fallback content. The second avatar's image fails to load, so its fallback shows.

```tsx
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from '@/components/ui/Avatar';

export function AvatarCompoundExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AvatarRoot color="blue" size="lg">
        <AvatarImage src="/images/ray.jpg" alt="Ray" />
        <AvatarFallback color="blue">RA</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="tiffany" size="lg">
        <AvatarFallback color="tiffany">SC</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
```

## Bordered

`bordered` is `true` by default. Set `bordered={false}` to remove the colored border ring.

```tsx
import { Avatar } from '@/components/ui/Avatar';

export function AvatarBorderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar bordered={false} />
      <Avatar />
    </div>
  );
}
```

## Disabled

```tsx
import { Avatar } from '@/components/ui/Avatar';

export function AvatarDisabledExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xs" disabled alt="Disabled avatar" />
      <Avatar size="sm" disabled alt="Disabled avatar" />
      <Avatar size="md" disabled alt="Disabled avatar" />
      <Avatar size="lg" disabled alt="Disabled avatar" />
      <Avatar size="xl" disabled alt="Disabled avatar" />
    </div>
  );
}
```

## Props

| Prop                    | Type                                                                                                                                        | Default     | Description                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `name`                  | `string`                                                                                                                                    | —           | Used to generate initials fallback              |
| `src`                   | `string`                                                                                                                                    | —           | Image URL; falls back to initials if load fails |
| `alt`                   | `string`                                                                                                                                    | —           | Alt text for the image                          |
| `size`                  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                      | `'md'`      | Avatar dimensions                               |
| `color`                 | `'default' \| 'tiffany' \| 'green' \| 'orange' \| 'pink' \| 'blue' \| 'sky' \| 'purple' \| 'light-gold' \| 'salmon' \| 'ice' \| 'lavender'` | `'default'` | Background and text color variant               |
| `bordered`              | `boolean`                                                                                                                                   | `true`      | Adds a colored border ring                      |
| `disabled`              | `boolean`                                                                                                                                   | `false`     | Applies disabled overlay                        |
| `fallback`              | `ReactNode`                                                                                                                                 | —           | Custom fallback element                         |
| `onClick`               | `(event: MouseEvent) => void`                                                                                                               | —           | Click handler                                   |
| `onLoadingStatusChange` | `(status: 'idle' \| 'loading' \| 'loaded' \| 'error') => void`                                                                              | —           | Image load status callback                      |
| `style`                 | `CSSProperties`                                                                                                                             | —           | Inline styles                                   |
| `className`             | `string`                                                                                                                                    | —           | Root element class name                         |

## AvatarGroup Props

| Prop        | Type            | Default | Description                |
| ----------- | --------------- | ------- | -------------------------- |
| `children`  | `ReactNode`     | —       | Avatar items and count     |
| `className` | `string`        | —       | Additional CSS classes     |
| `style`     | `CSSProperties` | —       | Inline styles              |
| `...props`  | `div` props     | —       | Native div props forwarded |

## AvatarGroupCount Props

| Prop        | Type            | Default | Description                |
| ----------- | --------------- | ------- | -------------------------- |
| `children`  | `ReactNode`     | —       | Count label or icon        |
| `className` | `string`        | —       | Additional CSS classes     |
| `style`     | `CSSProperties` | —       | Inline styles              |
| `...props`  | `div` props     | —       | Native div props forwarded |
