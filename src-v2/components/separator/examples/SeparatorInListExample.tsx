'use client';

import { Separator } from '@/components/separator/Separator';

export function SeparatorInListExample() {
  return (
    <div className="flex w-80 flex-col">
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-opacity-800">
        First row
      </span>
      <Separator />
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-opacity-800">
        Second row
      </span>
    </div>
  );
}
