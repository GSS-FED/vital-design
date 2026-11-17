'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SplitButtonPreview() {
  return (
    <ComponentPreview name="SplitButtonPreview">
      <DropdownMenu>
        <SplitButton
          theme="primary"
          size="lg"
          onClick={() => {}}
          splitRender={<DropdownMenuTrigger />}
        >
          <MagnifyingGlassIcon data-icon="inline-start" />
          Save
        </SplitButton>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
          <DropdownMenuItem>Save and publish</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
