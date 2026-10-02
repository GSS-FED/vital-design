'use client';

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
import { TimePicker } from '@/components/time-picker/TimePicker';
import { ClockIcon } from '@/icons/ClockIcon';
import { format } from 'date-fns';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const at = (h: number, m: number, s = 0) => {
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d;
};

export function TimePickerPreview() {
  const [value, setValue] = useState<Date>(at(9, 30));
  return (
    <ComponentPreview name="TimePickerPreview">
      <div className="flex flex-col items-center gap-4">
        <TimePicker value={value} onValueChange={setValue} />
        <code className="text-sm text-grayscale-opacity-600">
          {format(value, 'HH:mm:ss')}
        </code>
      </div>
    </ComponentPreview>
  );
}

export function TimePickerHoursMinutesPreview() {
  const [value, setValue] = useState<Date>(at(14, 0));
  return (
    <ComponentPreview name="TimePickerHoursMinutesPreview">
      <TimePicker
        value={value}
        onValueChange={setValue}
        showSeconds={false}
      />
    </ComponentPreview>
  );
}

export function TimePickerStepsPreview() {
  const [value, setValue] = useState<Date>(at(9, 0));
  return (
    <ComponentPreview name="TimePickerStepsPreview">
      <TimePicker
        value={value}
        onValueChange={setValue}
        hourStep={1}
        minuteStep={15}
        showSeconds={false}
      />
    </ComponentPreview>
  );
}

export function TimePickerCustomHeightPreview() {
  const [value, setValue] = useState<Date>(at(9, 30));
  return (
    <ComponentPreview name="TimePickerCustomHeightPreview">
      <TimePicker
        value={value}
        onValueChange={setValue}
        className="h-60"
      />
    </ComponentPreview>
  );
}

export function TimePickerInPopoverPreview() {
  const [value, setValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <ComponentPreview name="TimePickerInPopoverPreview">
      <div className="w-72">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroup className="cursor-pointer">
                <InputGroupInput
                  readOnly
                  value={value ? format(value, 'HH:mm') : ''}
                  placeholder="Pick a time"
                  className="cursor-pointer"
                />
                <InputGroupAddon align="inline-end">
                  <ClockIcon className="size-4 text-grayscale-opacity-500" />
                </InputGroupAddon>
              </InputGroup>
            }
          />
          <PopoverContent className="p-0" sideOffset={8}>
            <TimePicker
              value={value}
              onValueChange={setValue}
              showSeconds={false}
              className="shadow-emphasis"
            />
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
  );
}
