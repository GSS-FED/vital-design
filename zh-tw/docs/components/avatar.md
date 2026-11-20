# Avatar

> 顯示使用者頭像；圖片載入失敗時改為姓名縮寫或預設圖示，有 12 種色彩變體。

## 預覽

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

## 用法

有提供 `src` 時顯示圖片。圖片載入中或載入失敗時，依序顯示 `fallback`、`name` 產生的姓名縮寫，或預設圖示。

## 尺寸

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

| 尺寸   | 寬高             |
| ---- | -------------- |
| `xs` | 24 × 24 px     |
| `sm` | 32 × 32 px     |
| `md` | 40 × 40 px（預設） |
| `lg` | 48 × 48 px     |
| `xl` | 60 × 60 px     |

## 色彩變體

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

沒有傳 `fallback` 也沒有傳 `name` 時，顯示預設人像圖示。`fallback` 優先於 `name`。只傳 `name` 時，顯示最多兩個字的開頭字母。

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

## 群組

用 `AvatarGroup` 把多個頭像疊在一起。清單被截斷時，在最後加上 `AvatarGroupCount`。

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

## 複合部分

需要完全控制圖片與 fallback 內容時，改用 `AvatarRoot`、`AvatarImage` 與 `AvatarFallback`。第二個頭像的圖片載入失敗，所以顯示 fallback。

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

## 邊框

`bordered` 預設為 `true`。設成 `bordered={false}` 可以拿掉有顏色的邊框環。

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

## 停用

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

## 屬性

| Prop                    | Type                                                                                                                                        | Default     | 說明                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `name`                  | `string`                                                                                                                                    | —           | 用來產生 fallback 用的姓名縮寫 |
| `src`                   | `string`                                                                                                                                    | —           | 圖片 URL；載入失敗時改用姓名縮寫   |
| `alt`                   | `string`                                                                                                                                    | —           | 圖片的替代文字              |
| `size`                  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                      | `'md'`      | Avatar 尺寸            |
| `color`                 | `'default' \| 'tiffany' \| 'green' \| 'orange' \| 'pink' \| 'blue' \| 'sky' \| 'purple' \| 'light-gold' \| 'salmon' \| 'ice' \| 'lavender'` | `'default'` | 背景與文字的色彩變體           |
| `bordered`              | `boolean`                                                                                                                                   | `true`      | 加上有顏色的邊框環            |
| `disabled`              | `boolean`                                                                                                                                   | `false`     | 套用停用遮罩               |
| `fallback`              | `ReactNode`                                                                                                                                 | —           | 自訂 fallback 元素       |
| `onClick`               | `(event: MouseEvent) => void`                                                                                                               | —           | 點擊處理函式               |
| `onLoadingStatusChange` | `(status: 'idle' \| 'loading' \| 'loaded' \| 'error') => void`                                                                              | —           | 圖片載入狀態的 callback     |
| `style`                 | `CSSProperties`                                                                                                                             | —           | 行內樣式                 |
| `className`             | `string`                                                                                                                                    | —           | 根元素的 class 名稱        |

## AvatarGroup 屬性

| Prop        | Type            | Default | 說明              |
| ----------- | --------------- | ------- | --------------- |
| `children`  | `ReactNode`     | —       | Avatar 項目與數量    |
| `className` | `string`        | —       | 額外的 CSS class   |
| `style`     | `CSSProperties` | —       | 行內樣式            |
| `...props`  | `div` props     | —       | 轉送的原生 div props |

## AvatarGroupCount 屬性

| Prop        | Type            | Default | 說明              |
| ----------- | --------------- | ------- | --------------- |
| `children`  | `ReactNode`     | —       | 數量標籤或圖示         |
| `className` | `string`        | —       | 額外的 CSS class   |
| `style`     | `CSSProperties` | —       | 行內樣式            |
| `...props`  | `div` props     | —       | 轉送的原生 div props |
