# Calendar

> 建立在 react-day-picker 上的日期選擇月曆。支援單選、範圍與多選，並可完整覆寫 classNames 與 components。

## 預覽

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

## 用法

用 `selected` 與 `onSelect` 控制選取，值的形狀依 `mode` 而定。月曆預設開在本月；要開在別的月份，傳入 `defaultMonth`。

## 範圍選擇

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

## 停用日期

把一個或多個 react-day-picker [matcher](https://daypicker.dev/selections/disabling-dates) 傳給 `disabled`。這裡只能選 12 月 25 日到 1 月 8 日。

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

## 年月下拉標題

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

傳入 `captionLayout="dropdown"`（或 `"dropdown-months"` / `"dropdown-years"`），並用 `startMonth` / `endMonth` 限制可瀏覽的範圍。月份選擇器是 3 欄網格，年份選擇器是可捲動清單（Vittal 的 `Popover`，不是原生 select）；年份選擇器開啟時會把目前年份置中。要自訂時覆寫 `components={{ MonthsDropdown, YearsDropdown }}`。要翻譯下拉標籤，傳入 `locale`（見 [在地化](#localization)）；要改它們&#x7684;_&#x683C;式_，覆寫 `formatMonthDropdown`。

## 在地化

`Calendar` **沒有預設 formatter**。它保持與語系無關，翻譯交給呼叫端。有兩個各自獨立的層：

1. **`locale`** — _哪一種語言。_ 從 `react-day-picker/locale` 引入 locale，傳給 `locale`。它決定星期標題、caption 與下拉標籤的語言和順序。
2. **`formatters`** — _怎麼呈現。_ 只有想要不同於該語系預設的格式時，才覆寫 `formatters`。它們是直接轉給 react-day-picker 的。

### 語系

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

只靠 locale 就會得到 CJK 星期標籤（`一 二 三 …`）、從星期一開始的一週，以及下拉裡的中文月份名稱（`一月`），不必自己寫 formatter。

### 語系與 formatter

在 locale 之上再加 formatter，可以改寫已經在地化的值。每個 formatter 收到的 `dateLib` 帶有目前的 locale，所以要**透過它**格式化，才會維持在地化。這裡月份下拉顯示短月份（`1月`、`2月` …），而不是語系預設的全名（`一月`）：

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

## 導覽

標題列預設有跳年箭頭（`«` `»`），夾在單月步進（`‹` `›`）兩側；跳年會遵守 `startMonth` / `endMonth`。只要單月導覽時（例如放在日期時間選擇器裡），透過 `components` 覆寫 `Nav` slot。

## 日期選擇器（Popover + Calendar）

沒有獨立的 `DatePicker` 元件。用 `Popover`、`Calendar` 和輸入框風格的觸發器組出來。`defaultMonth={date}` 讓月曆重新打開時停在選好的月份：

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

`Calendar` 延伸自 `react-day-picker` 的 [`DayPickerProps`](https://daypicker.dev/api/interfaces/DayPickerProps)。最常用的 props：

| Prop              | Type                                                             | Default   | 說明                             |
| ----------------- | ---------------------------------------------------------------- | --------- | ------------------------------ |
| `mode`            | `'single' \| 'range' \| 'multiple'`                              | —         | 選取模式                           |
| `selected`        | `Date \| DateRange \| Date[]`                                    | —         | 選取的日期；形狀依 `mode` 而定            |
| `onSelect`        | `(value) => void`                                                | —         | 選取變更時呼叫                        |
| `numberOfMonths`  | `number`                                                         | `1`       | 並排顯示幾個月                        |
| `showOutsideDays` | `boolean`                                                        | `true`    | 顯示相鄰月份的前後日期                    |
| `captionLayout`   | `'label' \| 'dropdown' \| 'dropdown-months' \| 'dropdown-years'` | `'label'` | 月／年標題的樣式                       |
| `startMonth`      | `Date`                                                           | —         | 使用者能前往的最早月份                    |
| `endMonth`        | `Date`                                                           | —         | 使用者能前往的最晚月份                    |
| `disabled`        | `Matcher \| Matcher[]`                                           | —         | 不能選取的日期（見 react-day-picker 文件） |
| `formatters`      | `Partial<Formatters>`                                            | —         | 覆寫標籤 formatter（星期、caption 等）   |
| `classNames`      | `Partial<ClassNames>`                                            | —         | 依部分覆寫 class name               |
| `components`      | `Partial<CustomComponents>`                                      | —         | 覆寫內建元件（例如 `Nav`、`DayButton`）   |
| `className`       | `string`                                                         | —         | root 上的額外 class                |
