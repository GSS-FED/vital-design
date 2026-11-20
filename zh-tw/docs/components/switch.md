# Switch

> 用來切換布林開／關設定的開關。

## 預覽

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import { Switch } from '@/components/ui/Switch';
import { useState } from 'react';

export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto items-center">
      <Switch
        id="switch-notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="switch-notifications">
        Email notifications
      </FieldLabel>
    </Field>
  );
}
```

## 用法

開關要有看得到的標籤：放進水平的 `Field`，搭配 `htmlFor` 對到開關 `id` 的 `FieldLabel`。沒有可見標籤時，傳入 `aria-label`。

## 狀態

停用狀態同時接受 `checked={false}` 與 `checked={true}`。使用 `aria-invalid` 套用無效樣式。

```tsx
import { Switch } from '@/components/ui/Switch';

const states = [
  { label: 'Off', props: {} },
  { label: 'On', props: { checked: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Disabled on', props: { checked: true, disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Invalid on',
    props: { 'aria-invalid': true, checked: true },
  },
];

export function SwitchStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Switch aria-label={label} {...props} />
        </div>
      ))}
    </div>
  );
}
```

## 屬性

| Prop              | Type                         | Default | 說明              |
| ----------------- | ---------------------------- | ------- | --------------- |
| `checked`         | `boolean`                    | —       | 控制開關狀態          |
| `defaultChecked`  | `boolean`                    | `false` | 設定非受控的初始狀態      |
| `onCheckedChange` | `(checked: boolean) => void` | —       | 切換時呼叫           |
| `disabled`        | `boolean`                    | `false` | 停用互動            |
| `aria-invalid`    | `boolean`                    | —       | 套用無效樣式          |
| `className`       | `string`                     | —       | 額外的 CSS class   |
| `...props`        | `BaseSwitch.Root.Props`      | —       | 傳給 Base UI root |
