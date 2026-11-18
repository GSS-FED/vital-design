'use client';

import { Input } from '@/components/input/input/Input';

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Filled', props: { defaultValue: 'Vital Design' } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Read-only',
    props: { defaultValue: 'Vital Design', readOnly: true },
  },
];

export function InputStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Input
            aria-label={label}
            placeholder="Enter text..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
