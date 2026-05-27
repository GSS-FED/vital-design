'use client';

import { Calendar } from '@/components/calendar/Calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { CalendarIcon } from '@/icons/CalendarIcon';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <ComponentPreview name="CalendarPreview">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </ComponentPreview>
  );
}

export function CalendarRangePreview() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 8),
  });
  return (
    <ComponentPreview name="CalendarRangePreview">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
    </ComponentPreview>
  );
}

export function CalendarDropdownCaptionPreview() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <ComponentPreview name="CalendarDropdownCaptionPreview">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(2000, 0)}
        endMonth={new Date(2030, 11)}
      />
    </ComponentPreview>
  );
}

const CJK_WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export function CalendarCJKLocalePreview() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <ComponentPreview name="CalendarCJKLocalePreview">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        formatters={{
          formatWeekdayName: (d) => CJK_WEEK_LABELS[d.getDay()] ?? '',
          formatCaption: (d) =>
            `${d.getFullYear()}  ${d.getMonth() + 1}月`,
        }}
      />
    </ComponentPreview>
  );
}

export function CalendarDatePickerPreview() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <ComponentPreview name="CalendarDatePickerPreview">
      <div className="w-72">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroup className="cursor-pointer">
                <InputGroupInput
                  readOnly
                  value={date ? format(date, 'yyyy/MM/dd') : ''}
                  placeholder="Pick a date"
                  className="cursor-pointer"
                />
                <InputGroupAddon align="inline-end">
                  <CalendarIcon className="size-4 text-grayscale-opacity-500" />
                </InputGroupAddon>
              </InputGroup>
            }
          />
          <PopoverContent className="p-0" sideOffset={8}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(next) => {
                setDate(next);
                if (next) setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
  );
}
