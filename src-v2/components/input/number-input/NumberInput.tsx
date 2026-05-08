import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { cn } from '@/lib/utils';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type NumberInputProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Root
>;

const NumberInput = forwardRef<
  ElementRef<typeof BaseNumberField.Root>,
  NumberInputProps
>(function NumberInput({ className, ...props }, ref) {
  return (
    <BaseNumberField.Root
      ref={ref}
      data-slot="number-input"
      className={cn('inline-flex w-full font-sans', className)}
      {...props}
    />
  );
});

export type NumberInputGroupProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Group
>;

const NumberInputGroup = forwardRef<
  ElementRef<typeof BaseNumberField.Group>,
  NumberInputGroupProps
>(function NumberInputGroup({ className, ...props }, ref) {
  return (
    <BaseNumberField.Group
      ref={ref}
      data-slot="number-input-group"
      className={cn(
        'group/number-input box-border flex h-8 w-full min-w-0 items-stretch overflow-hidden rounded border border-grayscale-300 bg-white font-sans text-grayscale-800 transition-colors duration-200 outline-none',
        'hover:border-grayscale-500 focus-within:border-primary-500',
        'has-[input:disabled]:border-grayscale-300 has-[input:disabled]:bg-grayscale-200 has-[input:disabled]:text-grayscale-500 has-[input:disabled]:hover:border-grayscale-300',
        'has-[input[aria-invalid=true]]:border-destructive-500 has-[input[aria-invalid=true]]:hover:border-destructive-500 has-[input[aria-invalid=true]]:focus-within:border-destructive-500',
        className,
      )}
      {...props}
    />
  );
});

export type NumberInputControlProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Input
>;

const NumberInputControl = forwardRef<
  ElementRef<typeof BaseNumberField.Input>,
  NumberInputControlProps
>(function NumberInputControl({ className, ...props }, ref) {
  return (
    <BaseNumberField.Input
      ref={ref}
      data-slot="number-input-control"
      className={cn(
        'box-border h-full w-full min-w-0 bg-transparent px-2 py-1.5 text-right text-sm leading-5 font-normal text-grayscale-800 outline-none',
        'placeholder:text-grayscale-400',
        'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

const stepperBaseClasses = [
  'flex h-1/2 w-6 cursor-pointer items-center justify-center border-l border-grayscale-300 bg-white text-grayscale-700 transition-colors duration-150 outline-none select-none',
  'hover:bg-grayscale-100 active:bg-grayscale-200',
  'disabled:cursor-not-allowed disabled:bg-grayscale-100 disabled:text-grayscale-300',
] as const;

export type NumberInputIncrementProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Increment
>;

const NumberInputIncrement = forwardRef<
  ElementRef<typeof BaseNumberField.Increment>,
  NumberInputIncrementProps
>(function NumberInputIncrement(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseNumberField.Increment
      ref={ref}
      data-slot="number-input-increment"
      className={cn(
        stepperBaseClasses,
        'border-b border-grayscale-300',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronUpIcon width={10} height={10} />}
    </BaseNumberField.Increment>
  );
});

export type NumberInputDecrementProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Decrement
>;

const NumberInputDecrement = forwardRef<
  ElementRef<typeof BaseNumberField.Decrement>,
  NumberInputDecrementProps
>(function NumberInputDecrement(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseNumberField.Decrement
      ref={ref}
      data-slot="number-input-decrement"
      className={cn(stepperBaseClasses, className)}
      {...props}
    >
      {children ?? <ChevronDownIcon width={10} height={10} />}
    </BaseNumberField.Decrement>
  );
});

export type NumberInputSteppersProps =
  ComponentPropsWithoutRef<'div'>;

const NumberInputSteppers = forwardRef<
  ElementRef<'div'>,
  NumberInputSteppersProps
>(function NumberInputSteppers(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="number-input-steppers"
      className={cn(
        'flex h-full flex-col items-stretch text-grayscale-800',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <NumberInputIncrement />
          <NumberInputDecrement />
        </>
      )}
    </div>
  );
});

export type NumberInputScrubAreaProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.ScrubArea
>;

const NumberInputScrubArea = forwardRef<
  ElementRef<typeof BaseNumberField.ScrubArea>,
  NumberInputScrubAreaProps
>(function NumberInputScrubArea({ className, ...props }, ref) {
  return (
    <BaseNumberField.ScrubArea
      ref={ref}
      data-slot="number-input-scrub-area"
      className={cn('cursor-ns-resize', className)}
      {...props}
    />
  );
});

export type NumberInputScrubAreaCursorProps =
  ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>;

const NumberInputScrubAreaCursor = forwardRef<
  ElementRef<typeof BaseNumberField.ScrubAreaCursor>,
  NumberInputScrubAreaCursorProps
>(function NumberInputScrubAreaCursor({ className, ...props }, ref) {
  return (
    <BaseNumberField.ScrubAreaCursor
      ref={ref}
      data-slot="number-input-scrub-area-cursor"
      className={cn('text-grayscale-800', className)}
      {...props}
    />
  );
});

export {
  NumberInput,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
};
