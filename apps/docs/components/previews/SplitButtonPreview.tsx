'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import { SearchIcon } from '@/icons/SearchIcon';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SplitButtonPreview() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentPreview>
      <SplitButton
        theme="primary"
        open={open}
        onClick={() => {}}
        splitOnClick={() => setOpen((v) => !v)}
      >
        <SearchIcon data-icon="inline-start" />
        Submit
      </SplitButton>
    </ComponentPreview>
  );
}

export function SplitButtonDefaultPreview() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentPreview>
      <SplitButton
        theme="default"
        open={open}
        onClick={() => {}}
        splitOnClick={() => setOpen((v) => !v)}
      >
        Action
      </SplitButton>
    </ComponentPreview>
  );
}
