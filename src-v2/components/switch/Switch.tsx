import { cn } from '@/lib/utils';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { forwardRef } from 'react';
import type { ElementRef } from 'react';

export type SwitchProps = BaseSwitch.Root.Props & {
  children?: React.ReactNode;
};

const Switch = forwardRef<
  ElementRef<typeof BaseSwitch.Root>,
  SwitchProps
>(function Switch({ className, children, ...props }, ref) {
  return (
    <BaseSwitch.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        'peer group/switch box-border inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-grayscale-opacity-300 bg-grayscale-opacity-200 px-0.75 outline-none transition-colors duration-100',
        'focus-visible:border-primary-500 focus-visible:shadow-(--shadow-focus-ring-primary)',
        'aria-invalid:border-destructive-500 aria-invalid:shadow-(--shadow-focus-ring-destructive)',
        'data-invalid:border-destructive-500 data-invalid:shadow-(--shadow-focus-ring-destructive)',
        'data-disabled:cursor-not-allowed data-disabled:opacity-40',
        'data-checked:border-transparent data-checked:bg-primary-500',
        className,
      )}
      {...props}
    >
      {children}
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none size-4.5 rounded-full border border-grayscale-opacity-300 bg-white transition-transform duration-100',
          'data-checked:translate-x-full data-checked:border-transparent',
          'data-disabled:opacity-80',
          'not-data-disabled:group-hover/switch:shadow-[0_0_0_1px_var(--grayscale-opacity-200)]',
          'not-data-disabled:group-hover/switch:data-checked:shadow-[0_0_0_5px_color-mix(in_srgb,var(--primary-500)_20%,transparent)]',
        )}
      />
    </BaseSwitch.Root>
  );
});

export { Switch };
