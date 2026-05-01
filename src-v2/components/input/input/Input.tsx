import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<ElementRef<'input'>, InputProps>(
  function Input(props, ref) {
    const {
      className,
      disabled = false,
      type = 'text',
      ...inputProps
    } = props;

    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        disabled={disabled}
        className={cn(
          'box-border flex h-8 w-full min-w-0 rounded border border-grayscale-300 bg-white px-2 py-1.5 font-sans text-sm leading-5 font-normal text-grayscale-800 transition-colors duration-200 outline-none',
          'placeholder:text-grayscale-400 hover:border-grayscale-500 focus-visible:border-primary-500',
          'file:mr-2 file:border-0 file:bg-transparent file:p-0 file:text-sm file:font-medium file:text-grayscale-800',
          'disabled:cursor-not-allowed disabled:border-grayscale-300 disabled:bg-grayscale-200 disabled:text-grayscale-500 disabled:hover:border-grayscale-300',
          'aria-invalid:border-alarm-500 aria-invalid:hover:border-alarm-500 aria-invalid:focus-visible:border-alarm-500',
          className,
        )}
        {...inputProps}
      />
    );
  },
);

export { Input };
