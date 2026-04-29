import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

const Label = forwardRef<ElementRef<'label'>, LabelProps>(
  function Label({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          'flex items-center gap-2 font-sans text-sm leading-none font-medium text-grayscale-800 select-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);

export { Label };
