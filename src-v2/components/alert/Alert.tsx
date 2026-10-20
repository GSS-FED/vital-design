import { cn } from '@/lib/utils';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

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

const Alert = function Alert({
  className,
  role = 'alert',
  ref,
  ...alertProps
}: Omit<AlertProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      role={role}
      data-slot="alert"
      className={cn(alertBaseClasses, className)}
      {...alertProps}
    />
  );
};

export type AlertTitleProps = ComponentPropsWithoutRef<'div'>;

const AlertTitle = function AlertTitle({
  className,
  ref,
  ...titleProps
}: Omit<AlertTitleProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(alertTitleClasses, className)}
      {...titleProps}
    />
  );
};

export type AlertDescriptionProps = ComponentPropsWithoutRef<'div'>;

const AlertDescription = function AlertDescription({
  className,
  ref,
  ...descriptionProps
}: Omit<AlertDescriptionProps, 'ref'> & {
  ref?: Ref<ElementRef<'div'>>;
}) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(alertDescriptionClasses, className)}
      {...descriptionProps}
    />
  );
};

export type AlertActionProps = ComponentPropsWithoutRef<'div'>;

const AlertAction = function AlertAction({
  className,
  ref,
  ...actionProps
}: Omit<AlertActionProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      data-slot="alert-action"
      className={cn(alertActionClasses, className)}
      {...actionProps}
    />
  );
};

export { Alert, AlertAction, AlertDescription, AlertTitle };
