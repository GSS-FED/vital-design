'use client';

import { SpinnerIcon } from '@/icons/SpinnerIcon';

export function IconsSpinnerExample() {
  return (
    <div className="flex items-center gap-4">
      <SpinnerIcon className="size-6 animate-spin text-primary-500" />
      <SpinnerIcon className="size-6 text-grayscale-opacity-500" />
    </div>
  );
}
