import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const alertBaseClasses = [
  'group/alert',
  'grid w-full gap-x-3 gap-y-2',
  'rounded bg-white px-6 py-4 shadow-emphasis',
  'font-sans text-grayscale-opacity-800',
  'has-[>svg]:grid-cols-[auto_1fr]',
  '*:[svg]:row-span-2 *:[svg]:size-6',
];

const alertTitleClasses = [
  'font-medium text-base',
  'group-has-[>svg]/alert:col-start-2',
];
const alertDescriptionClasses = [
  'text-base text-grayscale-opacity-700',
  'group-has-[>svg]/alert:col-start-2',
];
const alertActionClasses = ['col-span-full flex justify-end gap-6'];

export type AlertProps = ComponentPropsWithoutRef<'div'>;

const Alert = forwardRef<ElementRef<'div'>, AlertProps>(
  function Alert({ className, role = 'alert', ...alertProps }, ref) {
    return (
      <div
        ref={ref}
        role={role}
        data-slot="alert"
        className={cn(alertBaseClasses, className)}
        {...alertProps}
      />
    );
  },
);

export type AlertTitleProps = ComponentPropsWithoutRef<'div'>;

const AlertTitle = forwardRef<ElementRef<'div'>, AlertTitleProps>(
  function AlertTitle({ className, ...titleProps }, ref) {
    return (
      <div
        ref={ref}
        data-slot="alert-title"
        className={cn(alertTitleClasses, className)}
        {...titleProps}
      />
    );
  },
);

export type AlertDescriptionProps = ComponentPropsWithoutRef<'div'>;

const AlertDescription = forwardRef<
  ElementRef<'div'>,
  AlertDescriptionProps
>(function AlertDescription({ className, ...descriptionProps }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(alertDescriptionClasses, className)}
      {...descriptionProps}
    />
  );
});

export type AlertActionProps = ComponentPropsWithoutRef<'div'>;

const AlertAction = forwardRef<ElementRef<'div'>, AlertActionProps>(
  function AlertAction({ className, ...actionProps }, ref) {
    return (
      <div
        ref={ref}
        data-slot="alert-action"
        className={cn(alertActionClasses, className)}
        {...actionProps}
      />
    );
  },
);

export { Alert, AlertAction, AlertDescription, AlertTitle };
