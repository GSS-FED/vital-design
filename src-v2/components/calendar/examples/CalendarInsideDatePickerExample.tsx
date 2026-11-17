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
import { CalendarDaysIcon } from '@/icons/CalendarDaysIcon';
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
