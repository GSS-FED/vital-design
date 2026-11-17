'use client';

import { Button } from '@/components/button/Button';

const variants = [
  { variant: 'default', label: 'Default' },
  { variant: 'text', label: 'Text' },
  { variant: 'ghost', label: 'Ghost' },
] as const;

const states = [
  { label: 'Enabled', props: {} },
  { label: 'Disabled', props: { disabled: true } },
];

export function ButtonStatesExample() {
  return (
    <div className="inline-grid grid-cols-[auto_repeat(3,auto)] items-center justify-items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      <span />
      {variants.map(({ variant, label }) => (
        <span key={variant}>{label}</span>
      ))}
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          {variants.map(({ variant }) => (
            <Button
              key={variant}
              variant={variant}
              theme="primary"
              {...props}
            >
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
