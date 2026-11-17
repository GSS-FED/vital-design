'use client';

import { Spinner } from '@/components/spinner/Spinner';

export function SpinnerSizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
    </div>
  );
}
