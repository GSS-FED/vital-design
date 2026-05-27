'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function PopoverPreview() {
  return (
    <ComponentPreview name="PopoverPreview">
      <Popover>
        <PopoverTrigger render={<Button>View details</Button>} />
        <PopoverContent className="w-72">
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription className="mt-1">
            Use Popover for short overlays anchored to a trigger —
            tooltips with rich content, profile cards, or contextual
            forms.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
  );
}
