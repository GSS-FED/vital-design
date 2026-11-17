'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';

export function NumberInputFormattedCurrencyExample() {
  return (
    <div className="w-60">
      <NumberInput
        defaultValue={1234}
        format={{
          style: 'currency',
          currency: 'TWD',
          maximumFractionDigits: 0,
        }}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="NT$0" />
          <NumberInputSteppers />
        </NumberInputGroup>
      </NumberInput>
    </div>
  );
}
