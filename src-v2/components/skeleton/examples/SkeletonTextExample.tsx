'use client';

import { Skeleton } from '@/components/skeleton/Skeleton';

export function SkeletonTextExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
