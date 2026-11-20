# RadioGroup

> 只能選一個的 radio 按鈕群組。

## 預覽

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="flex w-auto flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field
          key={option.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`radio-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## 用法

把每個 `RadioGroupItem` 和它的 `FieldLabel` 包進水平的 `Field`，並把標籤的 `htmlFor` 對到項目的 `id`。`RadioGroup` 預設垂直排列；要排成一列時，傳入 `flex flex-wrap gap-4` 這類版面 class。

## 複合項目

選項需要額外文字時，使用 `FieldContent` 搭配 `FieldLabel` 與 `FieldDescription`。

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const plans = [
  {
    description: 'Good for individual use',
    label: 'Basic',
    value: 'basic',
  },
  {
    description: 'Recommended for teams',
    label: 'Pro',
    value: 'pro',
  },
];

export function RadioGroupCompoundItemsExample() {
  const [value, setValue] = useState('basic');

  return (
    <RadioGroup
      className="flex w-auto flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {plans.map((plan) => (
        <Field
          key={plan.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`plan-${plan.value}`}
            value={plan.value}
          />
          <FieldContent>
            <FieldLabel htmlFor={`plan-${plan.value}`}>
              {plan.label}
            </FieldLabel>
            <FieldDescription>{plan.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## 垂直排列

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupVerticalExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="w-auto gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field key={option.value} orientation="horizontal">
          <RadioGroupItem
            id={`radio-vertical-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-vertical-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

## 狀態

在 `RadioGroupItem` 加上 `disabled` 停用項目，並在它的 `Field` 加上 `data-disabled`，標籤才會一起變淡。用 `aria-invalid` 標示無效的項目。長標籤會換行，並與 radio 按鈕對齊。

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';

const states = [
  { label: 'Unchecked' },
  { label: 'Checked', checked: true },
  { label: 'Invalid', invalid: true },
  { label: 'Disabled', disabled: true },
  { label: 'Checked & disabled', checked: true, disabled: true },
  {
    label: 'Long label',
    checked: true,
    text: 'A long option label that wraps onto the next line and stays aligned with the radio button',
  },
];

export function RadioGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, checked, invalid, disabled, text }) => {
        const id = `radio-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <div key={label} className="contents">
            <span className="leading-5">{label}</span>
            <RadioGroup
              aria-label={label}
              defaultValue={checked ? 'option' : undefined}
            >
              <Field
                orientation="horizontal"
                data-disabled={disabled}
              >
                <RadioGroupItem
                  aria-invalid={invalid}
                  disabled={disabled}
                  id={id}
                  value="option"
                />
                <FieldLabel htmlFor={id}>
                  {text ?? 'Option'}
                </FieldLabel>
              </Field>
            </RadioGroup>
          </div>
        );
      })}
    </div>
  );
}
```

## 屬性

### RadioGroup

| Prop            | Type             | Default | 說明            |
| --------------- | ---------------- | ------- | ------------- |
| `value`         | `string`         | —       | 目前選取的值        |
| `defaultValue`  | `string`         | —       | 非受控用法的初始值     |
| `onValueChange` | Base UI callback | —       | 選取變更時呼叫       |
| `className`     | `string`         | —       | 額外的 CSS class |

### RadioGroupItem

| Prop       | Type      | Default | 說明          |
| ---------- | --------- | ------- | ----------- |
| `value`    | `string`  | —       | **必填。** 選項值 |
| `disabled` | `boolean` | `false` | 停用這一個項目     |
