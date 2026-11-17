'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function PopoverSidePlacementExample() {
  return (
    <div className="flex gap-4">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button size="md">{side}</Button>}
          />
          <PopoverContent side={side} className="w-48">
            Anchored on the {side} side.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
