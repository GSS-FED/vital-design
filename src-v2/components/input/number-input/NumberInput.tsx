import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import { cn } from '@/lib/utils';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  Ref,
} from 'react';

export type NumberInputProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Root
>;

const NumberInput = function NumberInput({
  className,
  ref,
  ...props
}: Omit<NumberInputProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.Root>>;
}) {
  return (
    <BaseNumberField.Root
      ref={ref}
      data-slot="number-input"
      className={cn('inline-flex w-full font-sans', className)}
      {...props}
    />
  );
};

export type NumberInputGroupProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Group
>;

const NumberInputGroup = function NumberInputGroup({
  className,
  ref,
  ...props
}: Omit<NumberInputGroupProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.Group>>;
}) {
  return (
    <BaseNumberField.Group
      ref={ref}
      data-slot="number-input-group"
      className={cn(
        'group/number-input box-border flex h-8 w-full min-w-0 items-stretch overflow-hidden rounded border border-grayscale-opacity-300 bg-white font-sans text-grayscale-opacity-800 transition-colors duration-200 outline-none',
        'hover:border-grayscale-opacity-500 focus-within:border-primary-500',
        'has-[input:disabled]:border-grayscale-opacity-300 has-[input:disabled]:bg-grayscale-opacity-200 has-[input:disabled]:text-grayscale-opacity-500 has-[input:disabled]:hover:border-grayscale-opacity-300',
        'has-[input[aria-invalid=true]]:border-destructive-500 has-[input[aria-invalid=true]]:hover:border-destructive-500 has-[input[aria-invalid=true]]:focus-within:border-destructive-500',
        className,
      )}
      {...props}
    />
  );
};

export type NumberInputControlProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Input
>;

const NumberInputControl = function NumberInputControl({
  className,
  ref,
  ...props
}: Omit<NumberInputControlProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.Input>>;
}) {
  return (
    <BaseNumberField.Input
      ref={ref}
      data-slot="number-input-control"
      className={cn(
        'box-border h-full w-full min-w-0 bg-transparent px-2 py-1.5 text-right text-sm leading-5 font-normal text-grayscale-opacity-800 outline-none',
        'placeholder:text-grayscale-opacity-400',
        'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-grayscale-opacity-500',
        className,
      )}
      {...props}
    />
  );
};

const stepperBaseClasses = [
  'flex h-1/2 w-6 cursor-pointer items-center justify-center border-l border-grayscale-opacity-300 bg-white text-grayscale-opacity-700 transition-colors duration-150 outline-none select-none',
  'hover:bg-grayscale-opacity-100 active:bg-grayscale-opacity-200',
  'disabled:cursor-not-allowed disabled:bg-grayscale-opacity-100 disabled:text-grayscale-opacity-300',
] as const;

export type NumberInputIncrementProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Increment
>;

const NumberInputIncrement = function NumberInputIncrement({
  className,
  children,
  ref,
  ...props
}: Omit<NumberInputIncrementProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.Increment>>;
}) {
  return (
    <BaseNumberField.Increment
      ref={ref}
      data-slot="number-input-increment"
      className={cn(
        stepperBaseClasses,
        'border-b border-grayscale-opacity-300',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronUpIcon className="size-2.5" />}
    </BaseNumberField.Increment>
  );
};

export type NumberInputDecrementProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.Decrement
>;

const NumberInputDecrement = function NumberInputDecrement({
  className,
  children,
  ref,
  ...props
}: Omit<NumberInputDecrementProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.Decrement>>;
}) {
  return (
    <BaseNumberField.Decrement
      ref={ref}
      data-slot="number-input-decrement"
      className={cn(stepperBaseClasses, className)}
      {...props}
    >
      {children ?? <ChevronDownIcon className="size-2.5" />}
    </BaseNumberField.Decrement>
  );
};

export type NumberInputSteppersProps =
  ComponentPropsWithoutRef<'div'>;

const NumberInputSteppers = function NumberInputSteppers({
  className,
  children,
  ref,
  ...props
}: Omit<NumberInputSteppersProps, 'ref'> & {
  ref?: Ref<ComponentRef<'div'>>;
}) {
  return (
    <div
      ref={ref}
      data-slot="number-input-steppers"
      className={cn(
        'flex h-full flex-col items-stretch text-grayscale-opacity-800',
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
};

export type NumberInputScrubAreaProps = ComponentPropsWithoutRef<
  typeof BaseNumberField.ScrubArea
>;

const NumberInputScrubArea = function NumberInputScrubArea({
  className,
  ref,
  ...props
}: Omit<NumberInputScrubAreaProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseNumberField.ScrubArea>>;
}) {
  return (
    <BaseNumberField.ScrubArea
      ref={ref}
      data-slot="number-input-scrub-area"
      className={cn('cursor-ns-resize', className)}
      {...props}
    />
  );
};

export type NumberInputScrubAreaCursorProps =
  ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>;

const NumberInputScrubAreaCursor =
  function NumberInputScrubAreaCursor({
    className,
    ref,
    ...props
  }: Omit<NumberInputScrubAreaCursorProps, 'ref'> & {
    ref?: Ref<ComponentRef<typeof BaseNumberField.ScrubAreaCursor>>;
  }) {
    return (
      <BaseNumberField.ScrubAreaCursor
        ref={ref}
        data-slot="number-input-scrub-area-cursor"
        className={cn('text-grayscale-opacity-800', className)}
        {...props}
      />
    );
  };

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
