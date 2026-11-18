'use client';

import { Button } from '@/components/button/Button';
import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';

export function ButtonWithIconsExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button theme="primary">
        <FlagIcon data-icon="inline-start" />
        New Branch
      </Button>
      <Button theme="default">
        Download
        <AngleDownIcon data-icon="inline-end" />
      </Button>
      <Button variant="text" theme="primary">
        Search
        <MagnifyingGlassIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
