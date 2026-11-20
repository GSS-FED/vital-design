# Skeleton

> Placeholder blocks for content that is still loading.

## Preview

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonExample() {
  return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
}
```

## Avatar

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonAvatarExample() {
  return (
    <div className="flex w-80 items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
```

## Card

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonCardExample() {
  return (
    <div className="flex w-80 flex-col gap-5 rounded-md border border-grayscale-opacity-300 p-5">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="aspect-square w-full" />
    </div>
  );
}
```

## Text

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonTextExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
```

## Form

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonFormExample() {
  return (
    <div className="flex w-80 flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  );
}
```

## Table

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonTableExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      {Array.from({ length: 3 }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
```

## Props

| Prop        | Type                    | Default | Description                   |
| ----------- | ----------------------- | ------- | ----------------------------- |
| `className` | `string`                | —       | Additional CSS classes        |
| `style`     | `CSSProperties`         | —       | Inline styles                 |
| `...props`  | `ComponentProps<'div'>` | —       | Native `div` props and events |
