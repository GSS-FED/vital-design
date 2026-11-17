'use client';

import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';

export function IconsSizesExample() {
  return (
    <div className="flex items-end gap-4 text-grayscale-opacity-800">
      <MagnifyingGlassIcon className="size-3" />
      <MagnifyingGlassIcon className="size-4" />
      <MagnifyingGlassIcon className="size-5" />
      <MagnifyingGlassIcon className="size-6" />
      <MagnifyingGlassIcon className="size-8" />
    </div>
  );
}
