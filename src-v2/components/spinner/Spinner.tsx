import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type SpinnerProps = ComponentProps<'svg'>;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <SpinnerIcon
      role="status"
      aria-label="Loading"
      animated={false}
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
