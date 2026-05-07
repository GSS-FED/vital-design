import { cn } from '@/lib/utils';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { forwardRef } from 'react';
import type { ElementRef } from 'react';

export type SwitchProps = BaseSwitch.Root.Props;

const Switch = forwardRef<
  ElementRef<typeof BaseSwitch.Root>,
  SwitchProps
>(function Switch({ className, disabled, ...props }, ref) {
  return (
    <BaseSwitch.Root
      ref={ref}
      data-slot="switch"
      disabled={disabled}
      className={cn(
        'peer group/switch relative box-border inline-flex h-6 w-13 shrink-0 cursor-pointer items-center rounded-[100px] border border-grayscale-300 bg-grayscale-200 px-0.75 font-sans text-[13px] text-grayscale-500 outline-none transition-colors duration-100',
        'before:content-["Off"] before:absolute before:right-2',
        'focus-visible:border-primary-500 focus-visible:shadow-(--shadow-focus-ring-primary)',
        'aria-invalid:border-destructive-500 aria-invalid:shadow-(--shadow-focus-ring-destructive)',
        'data-invalid:border-destructive-500 data-invalid:shadow-(--shadow-focus-ring-destructive)',
        'data-disabled:cursor-not-allowed data-disabled:opacity-40',
        'data-checked:border-transparent data-checked:bg-primary-500 data-checked:text-white',
        'data-checked:before:content-["On"]',
        'data-checked:before:left-2 data-checked:before:right-auto',
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none inline-block h-4.5 w-4.5 translate-x-0 rounded-full border border-grayscale-300 bg-white transition-transform duration-100',
          'data-checked:translate-x-[150%]',
          'data-checked:border-transparent',
          'data-disabled:opacity-80',
          !disabled &&
            'group-hover/switch:shadow-[0_0_0_1px_var(--grayscale-200)]',
          !disabled &&
            'group-hover/switch:data-checked:shadow-[0_0_0_5px_rgba(14,134,254,0.2)]',
        )}
      />
    </BaseSwitch.Root>
  );
});

export { Switch };
