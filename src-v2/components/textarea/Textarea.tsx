import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

const Textarea = forwardRef<ElementRef<'textarea'>, TextareaProps>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          'box-border flex min-h-16 w-full min-w-0 rounded border border-grayscale-opacity-300 bg-white px-2 py-1.5 font-sans text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200 outline-none',
          'placeholder:text-grayscale-opacity-400 hover:border-grayscale-opacity-500 focus-visible:border-primary-500',
          'disabled:cursor-not-allowed disabled:border-grayscale-opacity-300 disabled:bg-grayscale-opacity-200 disabled:text-grayscale-opacity-500 disabled:hover:border-grayscale-opacity-300',
          'aria-invalid:border-destructive-500 aria-invalid:hover:border-destructive-500 aria-invalid:focus-visible:border-destructive-500',
          className,
        )}
        {...props}
      />
    );
  },
);

export { Textarea };
