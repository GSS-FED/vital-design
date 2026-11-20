# NumberInput

> 帶增減按鈕的數字輸入，可依語系格式化，步進時會限制在範圍內。

## 預覽

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputExample() {
  return (
    <div className="w-60">
      <NumberInput defaultValue={0}>
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## 用法

`NumberInput` 建立在 Base UI 的 [Number Field](https://base-ui.com/react/components/number-field) 上。root 管理數值、範圍限制、格式化，以及每個部件的停用狀態。組合 `NumberInputGroup`、`NumberInputControl` 與 `NumberInputSteppers` 來渲染欄位。

## 最小值、最大值與步進

`min` 與 `max` 會限制來自增減按鈕、鍵盤與滾輪的值。`step` 控制每次按方向鍵的增量；按住 meta 或 Shift 時分別使用 `smallStep` 與 `largeStep`。

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputWithRangeExample() {
  return (
    <div className="w-60">
      <NumberInput defaultValue={5} min={0} max={10} step={1}>
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## 狀態

在 `NumberInput` 上設定 `disabled` 會停用每個部件；設定 `readOnly` 時仍可聚焦，但不能改值。在 `NumberInputControl` 上設定 `aria-invalid`，套用錯誤框線樣式。

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

const states = [
  { label: 'Empty', props: {} },
  { label: 'Disabled', props: { defaultValue: 12, disabled: true } },
  { label: 'Read-only', props: { defaultValue: 12, readOnly: true } },
  { label: 'Invalid', props: { defaultValue: 99 }, invalid: true },
];

export function NumberInputStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <NumberInput {...props}>
            <NumberInputGroup>
              <NumberInputControl
                aria-invalid={invalid}
                placeholder="0"
              />
              <NumberInputSteppers />
            </NumberInputGroup>
          </NumberInput>
        </div>
      ))}
    </div>
  );
}
```

## 小數

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputDecimalsExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1.5}
        step={0.1}
        smallStep={0.01}
        largeStep={1}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0.0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## 貨幣格式

透過 `format` 傳入 `Intl.NumberFormatOptions`，以任何依語系的形式顯示數值。

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';

export function NumberInputFormattedCurrencyExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1234}
        format={{
          style: 'currency',
          currency: 'TWD',
          maximumFractionDigits: 0,
        }}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="NT$0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
```

## 受控

用 `value` 與 `onValueChange` 由外部 state 驅動欄位。輸入清空時，回呼會傳出 `null`。把 label 包在 `NumberInputScrubArea` 裡，使用者就能拖曳 label 調整數值。

```tsx
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
} from '@/components/ui/NumberInput';
import { Label } from '@/components/ui/Label';
import { useId, useState } from 'react';

export function NumberInputControlledExample() {
  const [value, setValue] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="w-60">
      <NumberInput
        id={id}
        className="flex flex-col gap-2"
        value={value}
        onValueChange={setValue}
        min={-50}
        max={50}
        step={5}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
        <NumberInputScrubArea>
          <Label htmlFor={id}>
            Current value: {value ?? 'empty'}
          </Label>
          <NumberInputScrubAreaCursor />
        </NumberInputScrubArea>
      </NumberInput>
    </div>
  );
}
```

## 屬性

### NumberInput

`NumberInput` 是 root 元件，接受所有 Base UI [`NumberField.Root`](https://base-ui.com/react/components/number-field#api-reference-numberfieldroot) prop。

| Prop               | Type                                       | Default | 說明                |
| ------------------ | ------------------------------------------ | ------- | ----------------- |
| `value`            | `number \| null`                           | —       | 受控數值              |
| `defaultValue`     | `number`                                   | —       | 非受控的初始值           |
| `onValueChange`    | `(value, eventDetails) => void`            | —       | 值變更時呼叫            |
| `onValueCommitted` | `(value, eventDetails) => void`            | —       | 值確定時呼叫            |
| `min`              | `number`                                   | —       | 允許的最小值            |
| `max`              | `number`                                   | —       | 允許的最大值            |
| `step`             | `number \| 'any'`                          | `1`     | 按鈕、方向鍵與滾輪的步進      |
| `smallStep`        | `number`                                   | `0.1`   | 按住 meta 鍵時的步進     |
| `largeStep`        | `number`                                   | `10`    | 按住 Shift 鍵時的步進    |
| `snapOnStep`       | `boolean`                                  | `false` | 步進時對齊到最近的步進值      |
| `allowOutOfRange`  | `boolean`                                  | `false` | 允許輸入超出 min／max 的值 |
| `allowWheelScrub`  | `boolean`                                  | `false` | 聚焦時可用滑鼠滾輪增減       |
| `format`           | `Intl.NumberFormatOptions`                 | —       | 依語系格式化的選項         |
| `locale`           | `Intl.LocalesArgument`                     | —       | 用來格式化數值的語系        |
| `disabled`         | `boolean`                                  | `false` | 停用每個部件            |
| `readOnly`         | `boolean`                                  | `false` | 阻止使用者改變數值         |
| `required`         | `boolean`                                  | `false` | 表單送出前必須有值         |
| `name`             | `string`                                   | —       | 表單欄位名稱            |
| `id`               | `string`                                   | —       | 隱藏 input 的 id     |
| `inputRef`         | `Ref<HTMLInputElement>`                    | —       | 轉送到隱藏 input 的 ref |
| `className`        | `string \| (state) => string \| undefined` | —       | root 元素的額外 class  |

### NumberInput 部件

| 部件                           | 說明                             |
| ---------------------------- | ------------------------------ |
| `NumberInputGroup`           | 帶焦點、停用與 `aria-invalid` 狀態的視覺外框 |
| `NumberInputControl`         | 顯示並解析格式化數值的原生 input            |
| `NumberInputSteppers`        | 把增加與減少按鈕疊在右側的版面                |
| `NumberInputIncrement`       | 把 `step` 加到數值的按鈕               |
| `NumberInputDecrement`       | 從數值減去 `step` 的按鈕               |
| `NumberInputScrubArea`       | 可選區域，用指標拖曳調整數值                 |
| `NumberInputScrubAreaCursor` | 拖曳調整時顯示的游標元素                   |

所有部件都會把 ref 轉送到對應的 DOM 元素，並接受 Base UI 的 `className` state 函式。
