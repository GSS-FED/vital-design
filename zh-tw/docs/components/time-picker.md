# Time Picker

> 三欄時間選擇器（時、分、秒），點一下就選取，並使用 CSS scroll-snap。

## 預覽

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

## 用法

`TimePicker` 接受 `Date`，也送出 `Date`。只會改時、分、秒；`value` 的日期部分會保留。

## 只顯示時與分

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

隱藏的秒不會從底層 `Date` 消失。它們會保留 `value` 上原本的秒（`value` 是 `undefined` 時為 `0`）。可以自由切換 `showSeconds`，不會丟掉資料。

## 自訂間隔

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

用 `hourStep`、`minuteStep`、`secondStep` 讓每一欄少顯示幾列。這裡用 `minuteStep={15}`。

## 自訂高度

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

預設欄高是 300px。用 `className` 覆寫，這裡用 `h-60`。

## 時間選擇器（Popover + TimePicker）

沒有獨立的 root 元件。用 `Popover`、`TimePicker` 和輸入框風格的觸發器組出來：

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

## 行為

- **點一下就選取。** 點選項目會呼叫 `onValueChange`，並把該項目平滑捲到該欄頂端。
- **捲動不會選取。** 拖曳或滾輪可以自由捲動該欄；只有使用者明確點選時，選取才會變。
- **`scroll-snap-type: y proximity`。** 動作停下來時，該欄會對齊，讓一個項目貼齊頂端。快速捲動時不會每一幀都在搶 snap。
- **初始位置。** 掛載時，選取項目會立刻放到頂端（沒有動畫）。之後的值變更才會有動畫。
- **保留日期部分。** 有提供 `value` 時，送出的 `Date` 會保留它的年／月／日。若是 `undefined`，送出的日期錨在今天。

## 與 Calendar 搭配

`Calendar` 與 `TimePicker` 都用 `Date`，組合日期時間輸入很直接。把同一個 `Date` 傳給兩邊：

```tsx
const [value, setValue] = useState<Date>();

<Calendar mode="single" selected={value} onSelect={setValue} />
<TimePicker value={value} onValueChange={setValue} />
```

`Calendar.onSelect` 更新年／月／日；`TimePicker.onValueChange` 更新時／分／秒。兩邊都寫回同一個 `Date`。

## Props

| Prop            | Type                    | Default | 說明                                         |
| --------------- | ----------------------- | ------- | ------------------------------------------ |
| `value`         | `Date`                  | —       | 目前時間。只呈現時／分／秒；送出時保留日期部分。                   |
| `onValueChange` | `(value: Date) => void` | —       | 以帶有所選時間的新 `Date` 呼叫。日期部分沿用 `value`，否則設為今天。 |
| `showSeconds`   | `boolean`               | `true`  | `false` 時隱藏秒欄。                             |
| `hourStep`      | `number`                | `1`     | 小時值的間隔（例如 `2` → `0, 2, 4, …, 22`）。         |
| `minuteStep`    | `number`                | `1`     | 分鐘值的間隔。                                    |
| `secondStep`    | `number`                | `1`     | 秒值的間隔。                                     |
| `disabled`      | `boolean`               | `false` | 停用所有互動。                                    |
| `className`     | `string`                | —       | root 上的額外 class。用來覆寫高度（例如 `h-60`）。         |
