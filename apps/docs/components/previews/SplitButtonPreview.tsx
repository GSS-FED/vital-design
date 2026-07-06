'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import { SearchIcon } from '@/icons/SearchIcon';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SplitButtonPreview() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentPreview name="SplitButtonPreview">
      <SplitButton
        theme="primary"
        size="lg"
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
    <ComponentPreview name="SplitButtonDefaultPreview">
      <SplitButton
        theme="default"
        size="lg"
        open={open}
        onClick={() => {}}
        splitOnClick={() => setOpen((v) => !v)}
      >
        Action
      </SplitButton>
    </ComponentPreview>
  );
}

export function SplitButtonSizesPreview() {
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <ComponentPreview name="SplitButtonSizesPreview">
      <SplitButton
        theme="primary"
        size="md"
        open={openMd}
        onClick={() => {}}
        splitOnClick={() => setOpenMd((v) => !v)}
      >
        Medium
      </SplitButton>
      <SplitButton
        theme="primary"
        size="lg"
        open={openLg}
        onClick={() => {}}
        splitOnClick={() => setOpenLg((v) => !v)}
      >
        Large
      </SplitButton>
    </ComponentPreview>
  );
}
