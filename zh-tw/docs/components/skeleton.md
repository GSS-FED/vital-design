# Skeleton

> 內容還在載入時用的佔位區塊。

## 預覽

```tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonExample() {
  return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
}
```

## 頭像

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

## 卡片

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

## 文字

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

## 表單

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

## 表格

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

## 屬性

| Prop        | Type                    | Default | 說明                 |
| ----------- | ----------------------- | ------- | ------------------ |
| `className` | `string`                | —       | 額外的 CSS class      |
| `style`     | `CSSProperties`         | —       | 行內樣式               |
| `...props`  | `ComponentProps<'div'>` | —       | 原生 `div` props 與事件 |
