# Slider

> Select a numeric value or range from a bounded scale.

## Preview

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

## Usage

Compose `SliderControl`, `SliderTrack`, `SliderIndicator`, and one `SliderThumb` per value inside `Slider`. Add `SliderLabel` and `SliderValue` to show what the slider controls and its current value. A single value is a `number`; `onValueChange` receives a `number` or an array depending on the value shape, so narrow it before storing it.

## Range

Use an array value and render one thumb for each value.

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

## Disabled

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

## Step

Step values render tick dots on the track.

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

## Min And Max

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

## Vertical

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

## Props

### Slider

`Slider` is the root component.

| Prop                    | Type                                       | Default        | Description                                |
| ----------------------- | ------------------------------------------ | -------------- | ------------------------------------------ |
| `defaultValue`          | `number \| readonly number[]`              | —              | Uncontrolled initial value                 |
| `value`                 | `number \| readonly number[]`              | —              | Controlled value                           |
| `onValueChange`         | `(value, eventDetails) => void`            | —              | Called when the value changes              |
| `onValueCommitted`      | `(value, eventDetails) => void`            | —              | Called when interaction commits            |
| `min`                   | `number`                                   | `0`            | Minimum value                              |
| `max`                   | `number`                                   | `100`          | Maximum value                              |
| `step`                  | `number`                                   | `1`            | Step increment                             |
| `largeStep`             | `number`                                   | `10`           | Page and shift-key step increment          |
| `disabled`              | `boolean`                                  | `false`        | Disables interaction                       |
| `orientation`           | `'horizontal' \| 'vertical'`               | `'horizontal'` | Slider orientation                         |
| `minStepsBetweenValues` | `number`                                   | `0`            | Minimum step distance between range values |
| `name`                  | `string`                                   | —              | Form field name                            |
| `form`                  | `string`                                   | —              | Associated form id                         |
| `format`                | `Intl.NumberFormatOptions`                 | —              | Value formatting options                   |
| `locale`                | `Intl.LocalesArgument`                     | —              | Locale for value formatting                |
| `className`             | `string \| (state) => string \| undefined` | —              | Additional classes for the root element    |

### SliderThumb

| Prop               | Type                                       | Default | Description                      |
| ------------------ | ------------------------------------------ | ------- | -------------------------------- |
| `index`            | `number`                                   | `0`     | Thumb index for range sliders    |
| `getAriaLabel`     | `(index: number) => string`                | —       | Accessible label for the input   |
| `getAriaValueText` | `(formatted, value, index) => string`      | —       | Accessible value text            |
| `inputRef`         | `Ref<HTMLInputElement>`                    | —       | Ref for the nested range input   |
| `className`        | `string \| (state) => string \| undefined` | —       | Additional classes for the thumb |

### Slider Parts

`SliderControl`, `SliderTrack`, `SliderIndicator`, `SliderValue`, and `SliderLabel` forward refs to their underlying DOM elements and accept Base UI `className` state functions.
