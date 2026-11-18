'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';

export function TooltipWithoutArrowExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>No arrow</Button>} />
        <TooltipContent arrow={false}>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
