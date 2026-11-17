'use client';

import { Button } from '@/components/button/Button';
import { AngleUpIcon } from '@/icons/AngleUpIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { XmarkIcon } from '@/icons/XmarkIcon';

export function ButtonIconOnlyExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button size="icon-md" theme="default" aria-label="Close">
        <XmarkIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-md" theme="primary" aria-label="Search">
        <MagnifyingGlassIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-lg" theme="primary" aria-label="Expand">
        <AngleUpIcon data-icon="inline-start" />
      </Button>
    </div>
  );
}
