'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { CheckIcon } from '@/icons/CheckIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';

export function DropdownMenuWithIconsExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Quick actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <MagnifyingGlassIcon
            data-icon="inline-start"
            className="size-3.5"
          />
          <span>Search</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CheckIcon data-icon="inline-start" className="size-3.5" />
          <span>Mark complete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
