'use client';

import { Button } from '@/components/button/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapsible/Collapsible';
import { AngleDownIcon } from '@/icons/AngleDownIcon';

export function CollapsibleExample() {
  return (
    <Collapsible className="w-80 space-y-2">
      <CollapsibleTrigger
        render={
          <Button
            variant="text"
            theme="default"
            className="w-full [&[data-panel-open]_[data-icon]]:rotate-180"
          >
            <span className="flex-1 text-left">
              Can I use this in my project?
            </span>
            <AngleDownIcon
              data-icon="inline-end"
              className="transition-transform duration-150"
            />
          </Button>
        }
      />
      <CollapsibleContent className="rounded-(--radius-sm) bg-grayscale-opacity-100 p-4 text-grayscale-opacity-700">
        Yes. Free to use for personal and commercial projects. No
        attribution required.
      </CollapsibleContent>
    </Collapsible>
  );
}
