'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';

const states = [
  { label: 'Empty', props: {} },
  { label: 'Disabled', props: { defaultValue: 12, disabled: true } },
  { label: 'Read-only', props: { defaultValue: 12, readOnly: true } },
  { label: 'Invalid', props: { defaultValue: 99 }, invalid: true },
];

export function NumberInputStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <NumberInput {...props}>
            <NumberInputGroup>
              <NumberInputControl
                aria-invalid={invalid}
                placeholder="0"
              />
              <NumberInputSteppers />
            </NumberInputGroup>
          </NumberInput>
        </div>
      ))}
    </div>
  );
}
