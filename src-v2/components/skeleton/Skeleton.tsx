import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

export type SkeletonProps = ComponentPropsWithoutRef<'div'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md bg-surface-muted',
        className,
      )}
      {...props}
    />
  );
}
