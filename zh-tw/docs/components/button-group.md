# ButtonGroup

> 把按鈕控制項排成一組的版面 primitive。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Save</Button>
      <Button theme="default">More</Button>
    </ButtonGroup>
  );
}
```

## 用法

把 `Button` 包在 `ButtonGroup` 裡，讓它們連成一個控制項。群組只負責版面；每個按鈕的 `variant`、`theme` 與 `size` 照常設定。

## 加上分隔線

```tsx
import { Button } from '@/components/ui/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/ButtonGroup';

export function ButtonGroupWithSeparatorExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Archive</Button>
      <ButtonGroupSeparator />
      <Button theme="default">Snooze</Button>
    </ButtonGroup>
  );
}
```

## 加上文字

```tsx
import { Button } from '@/components/ui/Button';
import {
  ButtonGroup,
  ButtonGroupText,
} from '@/components/ui/ButtonGroup';

export function ButtonGroupWithTextExample() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Status</ButtonGroupText>
      <Button theme="default">Publish</Button>
    </ButtonGroup>
  );
}
```

## 垂直

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupVerticalExample() {
  return (
    <ButtonGroup orientation="vertical" className="w-40">
      <Button theme="default">Action A</Button>
      <Button theme="default">Action B</Button>
    </ButtonGroup>
  );
}
```

## 巢狀

巢狀群組內部相連，並與同層其他項目分開間距。

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupNestedExample() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button theme="default">Back</Button>
        <Button theme="default">Next</Button>
      </ButtonGroup>
      <Button>Submit</Button>
    </ButtonGroup>
  );
}
```

## 屬性

### ButtonGroup

| Prop          | Type                         | Default        | 說明            |
| ------------- | ---------------------------- | -------------- | ------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向          |
| `className`   | `string`                     | —              | 額外的 CSS class |
| `style`       | `CSSProperties`              | —              | 行內樣式          |

### ButtonGroupSeparator

| Prop          | Type                         | Default | 說明               |
| ------------- | ---------------------------- | ------- | ---------------- |
| `orientation` | `'horizontal' \| 'vertical'` | auto    | 分隔線方向            |
| `...props`    | `SeparatorProps`             | —       | 共用的 separator 屬性 |
