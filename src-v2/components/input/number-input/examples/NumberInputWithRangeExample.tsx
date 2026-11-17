'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';

export function NumberInputWithRangeExample() {
  return (
    <div className="w-60">
      <NumberInput defaultValue={5} min={0} max={10} step={1}>
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
