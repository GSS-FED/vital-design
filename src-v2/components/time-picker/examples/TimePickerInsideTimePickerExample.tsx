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
