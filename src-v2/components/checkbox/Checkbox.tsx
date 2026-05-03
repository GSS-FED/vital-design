import { CheckIcon } from '@/icons/CheckIcon';
import { MinusIcon } from '@/icons/MinusIcon';
import { cn } from '@/lib/utils';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { forwardRef } from 'react';
import type { ElementRef } from 'react';

export type CheckboxProps = BaseCheckbox.Root.Props;

const Checkbox = forwardRef<
  ElementRef<typeof BaseCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ className, ...props }, ref) {
  return (
    <BaseCheckbox.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        'peer flex size-4 shrink-0 items-center justify-center rounded-sm border border-grayscale-400 bg-white outline-none transition-colors duration-100',
        'hover:border-primary-500 hover:shadow-(--shadow-focus-ring-primary)',
        'focus-visible:border-primary-500 focus-visible:shadow-(--shadow-focus-ring-primary)',
        'data-disabled:cursor-not-allowed data-disabled:border-grayscale-300 data-disabled:bg-grayscale-200 data-disabled:opacity-50',
        'data-disabled:hover:border-grayscale-300 data-disabled:hover:shadow-none',
        'aria-invalid:border-alarm-500 aria-invalid:shadow-(--shadow-focus-ring-alarm) aria-invalid:hover:border-alarm-500 aria-invalid:hover:shadow-(--shadow-focus-ring-alarm)',
        'data-checked:border-primary-500 data-checked:bg-primary-500',
        'data-indeterminate:border-primary-500 data-indeterminate:bg-primary-500',
        'data-disabled:data-checked:border-primary-500 data-disabled:data-checked:bg-primary-500 data-disabled:data-checked:opacity-40',
        'data-disabled:data-indeterminate:border-primary-500 data-disabled:data-indeterminate:bg-primary-500 data-disabled:data-indeterminate:opacity-40',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="inline-flex size-full items-center justify-center text-white data-checked:[&_[data-slot=checkbox-check]]:block data-indeterminate:[&_[data-slot=checkbox-minus]]:block"
      >
        <CheckIcon
          data-slot="checkbox-check"
          className="hidden h-2.25 w-3"
        />
        <MinusIcon
          data-slot="checkbox-minus"
          className="hidden h-0.75 w-2.5"
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
});

export { Checkbox };
