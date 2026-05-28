import { cn } from '@/lib/utils';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const inputVariants = cva(
  cn(
    'box-border flex h-8 w-full min-w-0 rounded border bg-transparent px-2 py-1.5 font-sans text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200 outline-none',
    'placeholder:text-grayscale-opacity-400 hover:border-grayscale-opacity-500 focus-visible:border-primary-500',
    'file:mr-2 file:border-0 file:bg-transparent file:p-0 file:text-sm file:font-medium file:text-grayscale-opacity-800',
    'disabled:cursor-not-allowed disabled:border-grayscale-opacity-300 disabled:bg-grayscale-opacity-200 disabled:text-grayscale-opacity-500 disabled:hover:border-grayscale-opacity-300',
    'aria-invalid:border-destructive-500 aria-invalid:hover:border-destructive-500 aria-invalid:focus-visible:border-destructive-500',
  ),
  {
    variants: {
      appearance: {
        solid: 'border-grayscale-opacity-300 bg-white',
        ghost:
          'border-transparent bg-transparent hover:border-grayscale-opacity-300',
      },
    },
    defaultVariants: {
      appearance: 'solid',
    },
  },
);

export type InputProps = ComponentPropsWithoutRef<
  typeof InputPrimitive
> &
  VariantProps<typeof inputVariants>;

const Input = forwardRef<
  ElementRef<typeof InputPrimitive>,
  InputProps
>(function Input(props, ref) {
  const {
    className,
    disabled = false,
    type = 'text',
    appearance = 'solid',
    ...inputProps
  } = props;

  return (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      data-appearance={appearance}
      disabled={disabled}
      className={cn(inputVariants({ appearance }), className)}
      {...inputProps}
    />
  );
});

export { Input };
