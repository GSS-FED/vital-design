'use client';

import { Spinner } from '@/components/spinner/Spinner';

export function SpinnerWithLabelExample() {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-grayscale-opacity-700">
      <Spinner className="size-4" />
      Loading
    </div>
  );
}
