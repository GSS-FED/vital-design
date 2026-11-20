# Spinner

> 等待中的動作與非同步內容用的載入指示器。

## 預覽

```tsx
import { Spinner } from '@/components/ui/Spinner';

export function SpinnerExample() {
  return <Spinner />;
}
```

## 尺寸

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

## 色彩

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

## 加上標籤

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

## 屬性

| Prop         | Type                    | Default     | 說明                 |
| ------------ | ----------------------- | ----------- | ------------------ |
| `className`  | `string`                | —           | 額外的 CSS class      |
| `aria-label` | `string`                | `'Loading'` | 無障礙標籤              |
| `role`       | `string`                | `'status'`  | 無障礙狀態角色            |
| `...props`   | `ComponentProps<'svg'>` | —           | 原生 `svg` props 與事件 |
