'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';

export function NumberInputDecimalsExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1.5}
        step={0.1}
        smallStep={0.01}
        largeStep={1}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0.0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
