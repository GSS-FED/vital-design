'use client';

import { Skeleton } from '@/components/skeleton/Skeleton';

export function SkeletonTableExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      {Array.from({ length: 3 }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
