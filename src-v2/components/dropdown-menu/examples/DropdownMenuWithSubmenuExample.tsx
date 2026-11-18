'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';

export function DropdownMenuWithSubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>File</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuItem>Open…</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Open recent</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>project-a.tsx</DropdownMenuItem>
            <DropdownMenuItem>project-b.tsx</DropdownMenuItem>
            <DropdownMenuItem>notes.md</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
