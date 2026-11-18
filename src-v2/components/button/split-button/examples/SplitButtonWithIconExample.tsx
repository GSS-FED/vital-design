'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';

export function SplitButtonWithIconExample() {
  return (
    <DropdownMenu>
      <SplitButton
        theme="primary"
        splitRender={<DropdownMenuTrigger />}
      >
        <MagnifyingGlassIcon data-icon="inline-start" />
        Search
      </SplitButton>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Search files</DropdownMenuItem>
        <DropdownMenuItem>Search issues</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
