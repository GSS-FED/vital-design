'use client';

import { Chip } from '@/components/chip/Chip';
import { FlagIcon } from '@/icons/FlagIcon';

const states = [
  { label: 'Selected', selected: true },
  { label: 'Unselected', selected: false },
];

export function ChipStatesExample() {
  return (
    <div className="grid grid-cols-[auto_auto_auto] items-center justify-items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, selected }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Chip selected={selected}>Urgent</Chip>
          <Chip
            selected={selected}
            icon={<FlagIcon className="size-3" />}
          >
            Urgent
          </Chip>
        </div>
      ))}
    </div>
  );
}
