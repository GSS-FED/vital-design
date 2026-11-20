# Time Picker

> Three-column time picker (hours, minutes, seconds) with click-to-select and CSS scroll-snap.

## Preview

```tsx
import { TimePicker } from '@/components/ui/TimePicker';
import { format } from 'date-fns';
import { useState } from 'react';

export function TimePickerExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <div className="flex flex-col items-center gap-4">
      <TimePicker value={value} onValueChange={setValue} />
      <code className="text-sm text-grayscale-opacity-600">
        {format(value, 'HH:mm:ss')}
      </code>
    </div>
  );
}
```

## Usage

`TimePicker` accepts a `Date` and emits a `Date`. Only the hours, minutes, and seconds portion is mutated — the date portion of `value` is preserved.

## Hours and Minutes Only

```tsx
import { TimePicker } from '@/components/ui/TimePicker';
import { useState } from 'react';

export function TimePickerHoursMinutesOnlyExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 14, 0));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      showSeconds={false}
    />
  );
}
```

Hidden seconds don't disappear from the underlying `Date` — they keep whatever was on `value` (or `0` if `value` was undefined). Toggle `showSeconds` freely without losing data.

## Custom Steps

```tsx
import { TimePicker } from '@/components/ui/TimePicker';
import { useState } from 'react';

export function TimePickerStepsExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 0));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      minuteStep={15}
      showSeconds={false}
    />
  );
}
```

Use `hourStep`, `minuteStep`, `secondStep` to render fewer rows per column. This example uses `minuteStep={15}`.

## Custom Height

```tsx
import { TimePicker } from '@/components/ui/TimePicker';
import { useState } from 'react';

export function TimePickerCustomHeightExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      className="h-60"
    />
  );
}
```

The default column height is 300px. Override it with `className`, here `h-60`.

## Time Picker (Popover + TimePicker)

There is no separate root component — compose `Popover`, `TimePicker`, and an input-style trigger:

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { TimePicker } from '@/components/ui/TimePicker';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { format } from 'date-fns';
import { useState } from 'react';

export function TimePickerInsideTimePickerExample() {
  const [value, setValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-96">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          nativeButton={false}
          render={
            <InputGroup className="cursor-pointer">
              <InputGroupInput
                readOnly
                value={value ? format(value, 'HH:mm:ss') : ''}
                placeholder="Pick a time"
                className="cursor-pointer"
              />
              <InputGroupAddon align="inline-end">
                <ClockIcon className="text-grayscale-opacity-500" />
              </InputGroupAddon>
            </InputGroup>
          }
        />
        <PopoverContent className="p-0" sideOffset={8}>
          <TimePicker value={value} onValueChange={setValue} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

## Behavior

- **Click selects.** Clicking an item calls `onValueChange` and smooth-scrolls that item to the top of its column.
- **Scrolling does not select.** Drag or wheel scrolls the column freely; the selection only changes when the user explicitly clicks.
- **`scroll-snap-type: y proximity`.** When motion settles, the column snaps so an item sits flush at the top — no per-frame snap fighting during fast scroll.
- **Initial position.** On mount, the selected item is placed at the top instantly (no animation). Subsequent value changes animate.
- **Date portion preserved.** If `value` is provided, its year/month/day are preserved in the emitted `Date`. If `undefined`, the emit anchors to today.

## Pairing with Calendar

Because both `Calendar` and `TimePicker` work with `Date`, composing a date-time input is straightforward — pass the same `Date` through both:

```tsx
const [value, setValue] = useState<Date>();

<Calendar mode="single" selected={value} onSelect={setValue} />
<TimePicker value={value} onValueChange={setValue} />
```

`Calendar.onSelect` updates the year/month/day; `TimePicker.onValueChange` updates the hours/minutes/seconds. Both write back to the same `Date`.

## Props

| Prop            | Type                    | Default | Description                                                                                                 |
| --------------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `value`         | `Date`                  | —       | Current time. Only the hours/minutes/seconds portion is rendered; date portion is preserved on emit.        |
| `onValueChange` | `(value: Date) => void` | —       | Called with a new `Date` carrying the chosen time. Date portion is preserved from `value`, or set to today. |
| `showSeconds`   | `boolean`               | `true`  | When `false`, hides the seconds column.                                                                     |
| `hourStep`      | `number`                | `1`     | Step between hour values (e.g. `2` → `0, 2, 4, …, 22`).                                                     |
| `minuteStep`    | `number`                | `1`     | Step between minute values.                                                                                 |
| `secondStep`    | `number`                | `1`     | Step between second values.                                                                                 |
| `disabled`      | `boolean`               | `false` | Disables all interaction.                                                                                   |
| `className`     | `string`                | —       | Additional classes on root. Use to override height (e.g. `h-60`).                                           |
