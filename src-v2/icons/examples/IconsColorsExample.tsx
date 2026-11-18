'use client';

import { FlagIcon } from '@/icons/FlagIcon';

export function IconsColorsExample() {
  return (
    <div className="flex items-center gap-4">
      <FlagIcon className="size-5 text-primary-500" />
      <FlagIcon className="size-5 text-success-500" />
      <FlagIcon className="size-5 text-warning-500" />
      <FlagIcon className="size-5 text-destructive-500" />
      <FlagIcon className="size-5 text-grayscale-opacity-700" />
    </div>
  );
}
