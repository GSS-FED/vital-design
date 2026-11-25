# Slider

> 在有上下限的刻度上選一個數值或一段範圍。

## 預覽

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from '@/components/ui/Slider';
import { useState } from 'react';

export function SliderWithLabelAndValueExample() {
  const [value, setValue] = useState(60);

  return (
    <div className="w-[225px]">
      <Slider
        value={value}
        onValueChange={(nextValue) => {
          if (typeof nextValue === 'number') {
            setValue(nextValue);
          }
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <SliderLabel>Volume</SliderLabel>
          <SliderValue />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
      </Slider>
    </div>
  );
}
```

## 用法

在 `Slider` 裡組合 `SliderControl`、`SliderTrack`、`SliderIndicator`，並為每個值放一個 `SliderThumb`。加上 `SliderLabel` 與 `SliderValue` 可顯示 slider 控制的項目與目前的值。單一值是 `number`；`onValueChange` 依值的形狀收到 `number` 或陣列，存進 state 前要先判斷型別。

## 範圍

使用陣列值，並為每個值渲染一個滑塊。

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/Slider';
import { useState } from 'react';

export function SliderRangeExample() {
  const [value, setValue] = useState<readonly number[]>([25, 75]);

  return (
    <div className="w-[225px]">
      <Slider
        value={value}
        onValueChange={(nextValue) => {
          if (Array.isArray(nextValue)) {
            setValue(nextValue);
          }
        }}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb index={0} />
          <SliderThumb index={1} />
        </SliderControl>
      </Slider>
    </div>
  );
}
```

## 停用

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/Slider';

export function SliderDisabledExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={50} disabled>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
      </Slider>
    </div>
  );
}
```

## 步進

步進值會在軌道上畫出刻度點。

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/Slider';

export function SliderStepExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={40} step={10}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
      </Slider>
    </div>
  );
}
```

## 最小值與最大值

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/Slider';

export function SliderMinMaxExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={20} min={-40} max={40} step={20}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
        <div className="mt-2 flex justify-between font-sans text-sm text-grayscale-opacity-600">
          <span>-40</span>
          <span>40</span>
        </div>
      </Slider>
    </div>
  );
}
```

## 垂直

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/Slider';

export function SliderVerticalExample() {
  return (
    <div className="flex h-48 items-center justify-center">
      <Slider defaultValue={60} orientation="vertical">
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
      </Slider>
    </div>
  );
}
```

## 屬性

### Slider

`Slider` 是 root 元件。

| Prop                    | Type                                       | Default        | 說明                   |
| ----------------------- | ------------------------------------------ | -------------- | -------------------- |
| `defaultValue`          | `number \| readonly number[]`              | —              | 非受控的初始值              |
| `value`                 | `number \| readonly number[]`              | —              | 受控值                  |
| `onValueChange`         | `(value, eventDetails) => void`            | —              | 值變更時呼叫               |
| `onValueCommitted`      | `(value, eventDetails) => void`            | —              | 互動確定時呼叫              |
| `min`                   | `number`                                   | `0`            | 最小值                  |
| `max`                   | `number`                                   | `100`          | 最大值                  |
| `step`                  | `number`                                   | `1`            | 步進增量                 |
| `largeStep`             | `number`                                   | `10`           | Page 鍵與 Shift 鍵的步進增量 |
| `disabled`              | `boolean`                                  | `false`        | 停用互動                 |
| `orientation`           | `'horizontal' \| 'vertical'`               | `'horizontal'` | Slider 方向            |
| `minStepsBetweenValues` | `number`                                   | `0`            | 範圍值之間的最小步進距離         |
| `name`                  | `string`                                   | —              | 表單欄位名稱               |
| `form`                  | `string`                                   | —              | 關聯的 form id          |
| `format`                | `Intl.NumberFormatOptions`                 | —              | 數值格式化選項              |
| `locale`                | `Intl.LocalesArgument`                     | —              | 數值格式化用語系             |
| `className`             | `string \| (state) => string \| undefined` | —              | root 元素的額外 class     |

### SliderThumb

| Prop               | Type                                       | Default | 說明                   |
| ------------------ | ------------------------------------------ | ------- | -------------------- |
| `index`            | `number`                                   | `0`     | 範圍 slider 的滑塊索引      |
| `getAriaLabel`     | `(index: number) => string`                | —       | input 的無障礙標籤         |
| `getAriaValueText` | `(formatted, value, index) => string`      | —       | 無障礙的值文字              |
| `inputRef`         | `Ref<HTMLInputElement>`                    | —       | 內部 range input 的 ref |
| `className`        | `string \| (state) => string \| undefined` | —       | 滑塊的額外 class          |

### Slider 部件

`SliderControl`、`SliderTrack`、`SliderIndicator`、`SliderValue` 與 `SliderLabel` 會把 ref 轉送到對應的 DOM 元素，並接受 Base UI 的 `className` state 函式。
