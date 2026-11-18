'use client';

import { Separator } from '@/components/separator/Separator';

export function SeparatorVerticalExample() {
  return (
    <div className="flex h-16 items-stretch gap-4">
      <span className="text-sm text-grayscale-opacity-700">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-grayscale-opacity-700">
        Right
      </span>
    </div>
  );
}
