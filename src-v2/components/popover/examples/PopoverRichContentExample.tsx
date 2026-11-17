'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/popover/Popover';

export function PopoverRichContentExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>View profile</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Yuki Tanaka</PopoverTitle>
        <PopoverDescription className="mt-1">
          Senior Engineer · Tokyo
        </PopoverDescription>
        <p className="mt-3 text-sm text-grayscale-opacity-600">
          Joined the platform team in 2021. Owns the registry pipeline
          and the docs site deployment.
        </p>
      </PopoverContent>
    </Popover>
  );
}
