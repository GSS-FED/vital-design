'use client';

import { Spinner } from '@/components/spinner/Spinner';

export function SpinnerColorsExample() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary-500" />
      <Spinner className="text-success-500" />
      <Spinner className="text-destructive-500" />
      <Spinner className="text-grayscale-opacity-500" />
    </div>
  );
}
