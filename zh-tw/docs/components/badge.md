# Badge

> 小型狀態指示膠囊，有語意色彩變體，內容可以是數字或文字。

## 預覽

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeExample() {
  return <Badge>9</Badge>;
}
```

## 變體

每一欄是一種 `variant` 的所有尺寸與類型：`lg` 數字、`lg` 文字、`md` 數字、`md` 文字，以及 `sm` 圓點。

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

## 尺寸

預設是 `lg`。`md` 是較小的膠囊。`sm` 渲染成空的圓點，不顯示 `children`。

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeDotExample() {
  return <Badge size="sm" />;
}
```

## 類型：數字與文字

`type="number"`（預設）用在數量。`type="text"` 會調整 padding 與字級，適合短字詞。

```tsx
import { Badge } from '@/components/ui/Badge';

export function BadgeTextExample() {
  return <Badge type="text">New</Badge>;
}
```

## 屬性

| Prop        | Type                                                             | Default     | 說明                  |
| ----------- | ---------------------------------------------------------------- | ----------- | ------------------- |
| `variant`   | `'primary' \| 'success' \| 'warning' \| 'destructive' \| 'info'` | `'primary'` | 色彩變體                |
| `size`      | `'sm' \| 'md' \| 'lg'`                                           | `'lg'`      | Badge 尺寸；`sm` 是空的圓點 |
| `type`      | `'number' \| 'text'`                                             | `'number'`  | 依標籤調整 padding 與字級   |
| `children`  | `ReactNode`                                                      | —           | Badge 內容（`sm` 時忽略）  |
| `className` | `string`                                                         | —           | 額外的 CSS class       |
| `style`     | `CSSProperties`                                                  | —           | 行內樣式                |
