'use client';

import { Textarea } from '@/components/textarea/Textarea';

const states = [
  { label: 'Placeholder', props: {} },
  {
    label: 'Filled',
    props: { defaultValue: 'The new dashboard loads much faster.' },
  },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
  {
    label: 'Read-only',
    props: {
      defaultValue: 'The new dashboard loads much faster.',
      readOnly: true,
    },
  },
];

export function TextareaStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span className="py-1.5">{label}</span>
          <Textarea
            aria-label={label}
            placeholder="Tell us what you think..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
