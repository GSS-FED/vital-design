# Checkbox

> 支援已核取、未核取與不確定狀態的核取方塊。以 Base UI 處理無障礙。

## 預覽

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

export function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox
        id="checkbox-terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="checkbox-terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  );
}
```

## 用法

把 `Checkbox` 和它的 `FieldLabel` 放進水平的 `Field`，並把標籤的 `htmlFor` 對到 checkbox 的 `id`。這樣點整列都會切換 checkbox，也會顯示 hover 外框。

## 狀態

用 `aria-invalid` 標示無效的 checkbox。在 `Field` 加上 `data-disabled`，checkbox 停用時標籤才會一起變淡。

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';

const states = [
  { label: 'Unchecked', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Checked', props: { checked: true } },
  {
    label: 'Disabled checked',
    props: { checked: true, disabled: true },
  },
  { label: 'Indeterminate', props: { indeterminate: true } },
  {
    label: 'Disabled indeterminate',
    props: { disabled: true, indeterminate: true },
  },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function CheckboxStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[repeat(2,auto)] gap-x-10 gap-y-3">
      {states.map(({ label, props }) => {
        const id = `checkbox-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <Field
            key={label}
            orientation="horizontal"
            className="w-auto"
            data-disabled={props.disabled}
          >
            <Checkbox id={id} {...props} />
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
          </Field>
        );
      })}
    </div>
  );
}
```

`indeterminate` 狀態適合「全選」：只選了一部分項目時使用。

## 不確定狀態範例

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

const items = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push notifications' },
];

export function CheckboxIndeterminateExample() {
  const [selected, setSelected] = useState<string[]>(['email']);
  const allChecked = selected.length === items.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <div className="flex flex-col gap-3">
      <Field orientation="horizontal" className="w-auto">
        <Checkbox
          id="checkbox-select-all"
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={(checked) =>
            setSelected(checked ? items.map((item) => item.id) : [])
          }
        />
        <FieldLabel htmlFor="checkbox-select-all">
          Select all
        </FieldLabel>
      </Field>
      {items.map((item) => (
        <Field
          key={item.id}
          orientation="horizontal"
          className="w-auto pl-6"
        >
          <Checkbox
            id={`checkbox-${item.id}`}
            checked={selected.includes(item.id)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked
                  ? [...current, item.id]
                  : current.filter((id) => id !== item.id),
              )
            }
          />
          <FieldLabel htmlFor={`checkbox-${item.id}`}>
            {item.label}
          </FieldLabel>
        </Field>
      ))}
    </div>
  );
}
```

## 屬性

| Prop              | Type             | Default | 說明              |
| ----------------- | ---------------- | ------- | --------------- |
| `checked`         | `boolean`        | —       | 受控的核取狀態         |
| `defaultChecked`  | `boolean`        | `false` | 初始核取狀態          |
| `indeterminate`   | `boolean`        | `false` | 顯示混合狀態          |
| `onCheckedChange` | Base UI callback | —       | 核取狀態變更時呼叫       |
| `disabled`        | `boolean`        | `false` | 停用互動            |
| `required`        | `boolean`        | `false` | 把 checkbox 標成必填 |
| `className`       | `string`         | —       | 額外的 CSS class   |
| `style`           | `CSSProperties`  | —       | 行內樣式            |
