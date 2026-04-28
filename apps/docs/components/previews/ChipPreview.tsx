'use client';

import { Chip } from '@/components/chip/Chip';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function ChipPreview() {
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);

  return (
    <ComponentPreview>
      <Chip selected={selected1} onChange={setSelected1}>
        Selected
      </Chip>
      <Chip selected={selected2} onChange={setSelected2}>
        Unselected
      </Chip>
    </ComponentPreview>
  );
}

export function ChipStatesPreview() {
  const [active, setActive] = useState(true);
  const [inactive, setInactive] = useState(false);

  return (
    <ComponentPreview>
      <Chip selected={active} onChange={setActive}>
        Active
      </Chip>
      <Chip selected={inactive} onChange={setInactive}>
        Inactive
      </Chip>
    </ComponentPreview>
  );
}
