'use client';

import { Chip } from '@/components/chip/Chip';
import { FlagIcon } from '@/icons/FlagIcon';
import { useState } from 'react';

export function ChipIconExample() {
  const [selected, setSelected] = useState(true);

  return (
    <Chip
      selected={selected}
      onChange={setSelected}
      icon={<FlagIcon className="size-3" />}
    >
      Urgent
    </Chip>
  );
}
