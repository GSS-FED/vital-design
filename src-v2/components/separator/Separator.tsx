import { cn } from '@/lib/utils';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type SeparatorProps = ComponentPropsWithoutRef<
  typeof BaseSeparator
>;

const Separator = forwardRef<
  ElementRef<typeof BaseSeparator>,
  SeparatorProps
>(function Separator(
  { className, orientation = 'horizontal', ...props },
  ref,
) {
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      data-slot="separator"
      className={cn(
        'shrink-0 bg-grayscale-200',
        orientation === 'horizontal'
          ? 'h-px w-full'
          : 'h-full min-h-4 w-px',
        className,
      )}
      {...props}
    />
  );
});

export { Separator };
