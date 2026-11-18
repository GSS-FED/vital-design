'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/popover/Popover';

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>Open</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Popover title</PopoverTitle>
        <PopoverDescription className="mt-1">
          Popovers are floating panels that appear when triggered. Use
          them for short bits of information, action menus, or rich
          content overlays.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
