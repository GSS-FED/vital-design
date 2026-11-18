'use client';

import { Skeleton } from '@/components/skeleton/Skeleton';

export function SkeletonCardExample() {
  return (
    <div className="flex w-80 flex-col gap-5 rounded-md border border-grayscale-opacity-300 p-5">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="aspect-square w-full" />
    </div>
  );
}
