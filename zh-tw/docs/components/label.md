# Label

> 與表單控制項關聯的無障礙標籤文字。

## 預覽

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelWithInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="name@example.com" />
    </div>
  );
}
```

## 用法

把 `htmlFor` 對到控制項的 `id`，點標籤時才會聚焦到控制項。標籤需要搭配說明或錯誤訊息時，使用 [Field](/zh-tw/docs/components/field)。

## 必填

`required` 會在標籤加上 Vittal Design 的必填圓點。控制項本身也要維持真正的必填狀態。

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelRequiredExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="required-email" required>
        Email
      </Label>
      <Input
        id="required-email"
        placeholder="name@example.com"
        required
      />
    </div>
  );
}
```

## 搭配停用的 Input

停用 input 不會改變標籤樣式。要讓標籤隨控制項一起變淡，使用 [Field](/zh-tw/docs/components/field) 並加上 `data-disabled`。

```tsx
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LabelWithDisabledInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="disabled-email">Email</Label>
      <Input
        id="disabled-email"
        placeholder="name@example.com"
        disabled
      />
    </div>
  );
}
```

## 屬性

| Prop        | Type                      | Default | 說明                   |
| ----------- | ------------------------- | ------- | -------------------- |
| `htmlFor`   | `string`                  | —       | 關聯的控制項 id            |
| `required`  | `boolean`                 | `false` | 顯示必填圓點               |
| `className` | `string`                  | —       | 額外的 CSS class        |
| `style`     | `CSSProperties`           | —       | 行內樣式                 |
| `...props`  | `ComponentProps<'label'>` | —       | 原生 `label` props 與事件 |
