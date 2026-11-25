# Calendar

> Date picker calendar built on react-day-picker. Single, range, and multi-select modes with full classNames and components overrides.

## Preview

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';

export function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
    />
  );
}
```

## Usage

Control the selection with `selected` and `onSelect`; their shape follows `mode`. The calendar opens on the current month. Pass `defaultMonth` to open on another one.

## Range Selection

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

export function CalendarRangeExample() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 9),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2026, 0)}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  );
}
```

## Disabled Dates

Pass one or more react-day-picker [matchers](https://daypicker.dev/selections/disabling-dates) to `disabled`. Here only the days from December 25 to January 8 can be picked.

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';

export function CalendarDisabledExample() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      disabled={[
        { before: new Date(2025, 11, 25) },
        { after: new Date(2026, 0, 8) },
      ]}
    />
  );
}
```

## Year/Month Dropdown Caption

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';

export function CalendarDropdownCaptionExample() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}
```

Pass `captionLayout="dropdown"` (or `"dropdown-months"` / `"dropdown-years"`) and bound the navigable range with `startMonth` / `endMonth`. The month picker is a 3-column grid and the year picker a scrollable list (Vittal `Popover`s, not native selects); the year picker centers the current year on open. Override `components={{ MonthsDropdown, YearsDropdown }}` to customize. To translate the dropdown labels, pass a `locale` (see [Localization](#localization)); to change their _format_, override `formatMonthDropdown`.

## Localization

`Calendar` ships **no default formatters** — it stays locale-neutral and leaves translation to the caller. There are two independent layers:

1. **`locale`** — _which language._ Import a locale from `react-day-picker/locale` and pass it as `locale`. It drives the weekday header, caption, and dropdown labels in the right language and order.
2. **`formatters`** — _how it renders._ Override `formatters` only when you want a different format than the locale's default. They are a pure react-day-picker pass-through.

### Locale

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';
import { zhTW } from 'react-day-picker/locale';

export function CalendarLocaleExample() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      locale={zhTW}
      captionLayout="dropdown"
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}
```

The locale alone gives CJK weekday labels (`一 二 三 …`), a Monday week start, and Chinese month names in the dropdown (`一月`) — no hand-written formatters.

### Locale + formatter

Layer a formatter on top of the locale to reshape an already-localized value. The `dateLib` argument passed to each formatter carries the active locale, so format **through it** to stay localized. Here the month dropdown shows the short month (`1月`, `2月` …) instead of the locale default full name (`一月`):

```tsx
import { Calendar } from '@/components/ui/Calendar';
import { useState } from 'react';
import { defaultDateLib } from 'react-day-picker';
import { zhTW } from 'react-day-picker/locale';

export function CalendarLocaleWithFormatterExample() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      locale={zhTW}
      captionLayout="dropdown"
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
      formatters={{
        formatMonthDropdown: (month, dateLib) =>
          (dateLib ?? defaultDateLib).format(month, 'LLL'),
      }}
    />
  );
}
```

## Navigation

The header ships with year-jump arrows (`«` `»`) flanking the single-month steps (`‹` `›`); year jumps respect `startMonth` / `endMonth`. To use single-month navigation only (e.g. inside a date-time picker), override the `Nav` slot via `components`.

## Date Picker (Popover + Calendar)

There is no separate `DatePicker` component — compose `Popover`, `Calendar`, and an input-style trigger. `defaultMonth={date}` reopens the calendar on the picked month:

```tsx
import { Calendar } from '@/components/ui/Calendar';
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
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { format } from 'date-fns';
import { useState } from 'react';

export function CalendarInsideDatePickerExample() {
  const [date, setDate] = useState<Date | undefined>();
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
                value={date ? format(date, 'yyyy/MM/dd') : ''}
                placeholder="Pick a date"
                className="cursor-pointer"
              />
              <InputGroupAddon align="inline-end">
                <CalendarDaysIcon className="size-4 text-grayscale-opacity-500" />
              </InputGroupAddon>
            </InputGroup>
          }
        />
        <PopoverContent className="p-0" sideOffset={8}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(next) => {
              setDate(next);
              if (next) setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

## Props

`Calendar` extends [`DayPickerProps`](https://daypicker.dev/api/interfaces/DayPickerProps) from `react-day-picker`. The most common props:

| Prop              | Type                                                             | Default   | Description                                              |
| ----------------- | ---------------------------------------------------------------- | --------- | -------------------------------------------------------- |
| `mode`            | `'single' \| 'range' \| 'multiple'`                              | —         | Selection mode                                           |
| `selected`        | `Date \| DateRange \| Date[]`                                    | —         | Selected date(s); shape depends on `mode`                |
| `onSelect`        | `(value) => void`                                                | —         | Called when selection changes                            |
| `numberOfMonths`  | `number`                                                         | `1`       | How many months to render side-by-side                   |
| `showOutsideDays` | `boolean`                                                        | `true`    | Render leading/trailing days from adjacent months        |
| `captionLayout`   | `'label' \| 'dropdown' \| 'dropdown-months' \| 'dropdown-years'` | `'label'` | Month/year header style                                  |
| `startMonth`      | `Date`                                                           | —         | Earliest month the user can navigate to                  |
| `endMonth`        | `Date`                                                           | —         | Latest month the user can navigate to                    |
| `disabled`        | `Matcher \| Matcher[]`                                           | —         | Days that cannot be selected (see react-day-picker docs) |
| `formatters`      | `Partial<Formatters>`                                            | —         | Override label formatters (weekday, caption, etc.)       |
| `classNames`      | `Partial<ClassNames>`                                            | —         | Override class names per part                            |
| `components`      | `Partial<CustomComponents>`                                      | —         | Override built-in components (e.g. `Nav`, `DayButton`)   |
| `className`       | `string`                                                         | —         | Additional classes on root                               |
