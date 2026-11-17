'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { useState } from 'react';

export function DropdownMenuWithRadioGroupExample() {
  const [position, setPosition] = useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Panel position</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={setPosition}
          >
            <DropdownMenuRadioItem value="top">
              Top
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              Right
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">
              Left
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
