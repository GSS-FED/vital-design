'use client';

import { Switch } from '@/components/switch/Switch';

const states = [
  { label: 'Off', props: {} },
  { label: 'On', props: { checked: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Disabled on', props: { checked: true, disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Invalid on',
    props: { 'aria-invalid': true, checked: true },
  },
];

export function SwitchStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Switch aria-label={label} {...props} />
        </div>
      ))}
    </div>
  );
}
