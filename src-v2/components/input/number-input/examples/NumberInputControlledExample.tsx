'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';
import { Label } from '@/components/label/Label';
import { useId, useState } from 'react';

export function NumberInputControlledExample() {
  const [value, setValue] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="w-60">
      <NumberInput
        id={id}
        className="flex flex-col gap-2"
        value={value}
        onValueChange={setValue}
        min={-50}
        max={50}
        step={5}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
        <NumberInputScrubArea>
          <Label htmlFor={id}>
            Current value: {value ?? 'empty'}
          </Label>
          <NumberInputScrubAreaCursor />
        </NumberInputScrubArea>
      </NumberInput>
    </div>
  );
}
