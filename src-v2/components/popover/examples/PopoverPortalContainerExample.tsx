'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { useRef } from 'react';

export function PopoverPortalContainerExample() {
  const scope = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scope}
      className="rounded border border-dashed border-grayscale-opacity-300 p-4"
    >
      <Popover>
        <PopoverTrigger
          render={<Button size="md">Open in scope</Button>}
        />
        <PopoverContent portalContainer={scope} className="w-64">
          <div className="space-y-1">
            <PopoverTitle>Scoped popup</PopoverTitle>
            <PopoverDescription>
              Rendered inside the dashed region, so styles scoped to
              it still apply.
            </PopoverDescription>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
