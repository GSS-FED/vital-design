'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';

const aligns = ['start', 'center', 'end'] as const;

export function TooltipAlignmentsExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {aligns.map((align) => (
          <Tooltip key={align}>
            <TooltipTrigger
              render={<Button size="md">{align}</Button>}
            />
            <TooltipContent align={align}>
              align: {align}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
