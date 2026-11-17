'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function TooltipSidePlacementExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={<Button size="md">{side}</Button>}
            />
            <TooltipContent side={side}>
              Shown on the {side}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
