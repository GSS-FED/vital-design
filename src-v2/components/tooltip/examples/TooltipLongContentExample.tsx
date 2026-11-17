'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';

export function TooltipLongContentExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Long content</Button>} />
        <TooltipContent>
          Tooltip text is capped at 400px wide. Longer content wraps
          onto new lines instead of stretching across the screen.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
