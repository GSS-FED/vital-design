import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type LabelProps = ComponentPropsWithoutRef<'label'> & {
  required?: boolean;
};

const Label = forwardRef<ElementRef<'label'>, LabelProps>(
  function Label({ className, required, ...props }, ref) {
    return (
      <label
        ref={ref}
        data-slot="label"
        data-required={required ? 'true' : undefined}
        className={cn(
          'relative flex items-center gap-2 font-sans text-sm leading-none font-medium text-grayscale-800 select-none',
          'data-[required=true]:before:absolute data-[required=true]:before:top-[3px] data-[required=true]:before:-left-2 data-[required=true]:before:size-1 data-[required=true]:before:rounded-full data-[required=true]:before:bg-destructive-500 data-[required=true]:before:content-[""]',
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
