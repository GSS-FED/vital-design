'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';

const states = [
  { label: 'Default', props: {} },
  { label: 'Open', props: { open: true } },
  { label: 'Disabled', props: { disabled: true } },
];

export function SplitButtonStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <SplitButton theme="primary" {...props}>
            Save
          </SplitButton>
          <SplitButton theme="default" {...props}>
            Save
          </SplitButton>
        </div>
      ))}
    </div>
  );
}
