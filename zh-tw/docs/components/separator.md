# Separator

> 水平或垂直分隔線。

## 預覽

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

## 垂直

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

## 列表中

用水平的 `Separator` 隔開上下排列的列。

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

## 屬性

| Prop          | Type                          | Default        | 說明                            |
| ------------- | ----------------------------- | -------------- | ----------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | 分隔線方向                         |
| `className`   | `string`                      | —              | 額外的 CSS class                 |
| `style`       | `CSSProperties`               | —              | 行內樣式                          |
| `...props`    | `ComponentProps<typeof Base>` | —              | Base UI separator 的 props 與事件 |
