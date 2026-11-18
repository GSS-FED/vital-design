'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import { useState } from 'react';

export function SplitButtonControlledChevronExample() {
  const [open, setOpen] = useState(false);

  return (
    <SplitButton
      theme="default"
      size="lg"
      open={open}
      splitOnClick={() => setOpen((value) => !value)}
    >
      Save
    </SplitButton>
  );
}
