'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { FlagIcon } from '@/icons/FlagIcon';

export function TooltipWithIconExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Help</Button>} />
        <TooltipContent>
          <FlagIcon className="size-5 shrink-0 text-warning-500" />
          <span>Save your changes before leaving this page</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
