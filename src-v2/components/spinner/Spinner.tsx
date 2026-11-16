import { SpinnerThirdIcon } from '@/icons/SpinnerThirdIcon';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type SpinnerProps = ComponentProps<'svg'>;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <SpinnerThirdIcon
      role="status"
      aria-label="Loading"
      aria-hidden={false}
      data-slot="spinner"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
