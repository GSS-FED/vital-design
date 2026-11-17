'use client';

import { Chip } from '@/components/chip/Chip';
import { useState } from 'react';

export function ChipExample() {
  const [selected, setSelected] = useState(true);

  return (
    <Chip selected={selected} onChange={setSelected}>
      Urgent
    </Chip>
  );
}
