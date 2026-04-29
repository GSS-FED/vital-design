'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function DropdownMenuPreview() {
  return (
    <ComponentPreview>
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
