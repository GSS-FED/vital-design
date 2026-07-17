'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function DropdownMenuPreview() {
  return (
    <ComponentPreview name="DropdownMenuPreview">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button>Account</Button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ComponentPreview>
  );
}

export function DropdownMenuSubmenuPreview() {
  return (
    <ComponentPreview name="DropdownMenuSubmenuPreview">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button>File</Button>} />
        <DropdownMenuContent>
          <DropdownMenuItem>New file</DropdownMenuItem>
          <DropdownMenuItem>Open…</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Open recent
            </DropdownMenuSubTrigger>
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
    </ComponentPreview>
  );
}
