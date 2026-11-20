import { cn } from '@/lib/utils';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import type {
  AlertDialogBackdropState,
  AlertDialogDescriptionState,
  AlertDialogPopupState,
  AlertDialogRootProps,
  AlertDialogTitleState,
  AlertDialogViewportState,
  AlertDialogBackdropProps as BaseAlertDialogBackdropProps,
  AlertDialogCloseProps as BaseAlertDialogCloseProps,
  AlertDialogDescriptionProps as BaseAlertDialogDescriptionProps,
  AlertDialogPopupProps as BaseAlertDialogPopupProps,
  AlertDialogPortalProps as BaseAlertDialogPortalProps,
  AlertDialogTitleProps as BaseAlertDialogTitleProps,
  AlertDialogTriggerProps as BaseAlertDialogTriggerProps,
  AlertDialogViewportProps as BaseAlertDialogViewportProps,
} from '@base-ui/react/alert-dialog';
import type { ComponentPropsWithoutRef, Ref } from 'react';

type ClassNameProp<State> =
  | string
  | ((state: State) => string | undefined);

function mergeClassName<State>(
  baseClassName: string,
  className?: ClassNameProp<State>,
) {
  if (typeof className === 'function') {
    return (state: State) => cn(baseClassName, className(state));
  }

  return cn(baseClassName, className);
}

export type AlertDialogProps<Payload = unknown> =
  AlertDialogRootProps<Payload>;

function AlertDialog<Payload = unknown>(
  props: AlertDialogProps<Payload>,
) {
  return <BaseAlertDialog.Root {...props} />;
}

export type AlertDialogTriggerProps<Payload = unknown> =
  BaseAlertDialogTriggerProps<Payload>;

const AlertDialogTrigger = function AlertDialogTrigger({
  type = 'button',
  ref,
  ...props
}: Omit<AlertDialogTriggerProps, 'ref'> & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <BaseAlertDialog.Trigger
      ref={ref}
      type={type}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
};

export type AlertDialogPortalProps = BaseAlertDialogPortalProps;

const AlertDialogPortal = function AlertDialogPortal({
  ref,
  ...props
}: Omit<AlertDialogPortalProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return <BaseAlertDialog.Portal ref={ref} {...props} />;
};

export type AlertDialogBackdropProps = BaseAlertDialogBackdropProps;

const AlertDialogBackdrop = function AlertDialogBackdrop({
  className,
  ref,
  ...props
}: Omit<AlertDialogBackdropProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      data-slot="alert-dialog-backdrop"
      className={mergeClassName<AlertDialogBackdropState>(
        'fixed inset-0 z-[9998] bg-grayscale-opacity-300 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogViewportProps = BaseAlertDialogViewportProps;

const AlertDialogViewport = function AlertDialogViewport({
  className,
  ref,
  ...props
}: Omit<AlertDialogViewportProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <BaseAlertDialog.Viewport
      ref={ref}
      data-slot="alert-dialog-viewport"
      className={mergeClassName<AlertDialogViewportState>(
        'fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center overflow-y-auto p-4',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogPopupProps = BaseAlertDialogPopupProps;

const AlertDialogPopup = function AlertDialogPopup({
  className,
  ref,
  ...props
}: Omit<AlertDialogPopupProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <BaseAlertDialog.Popup
      ref={ref}
      data-slot="alert-dialog-popup"
      className={mergeClassName<AlertDialogPopupState>(
        'box-border flex w-full max-w-[420px] max-h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-sm)] bg-background font-sans text-grayscale-opacity-800 shadow-emphasis outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogBodyProps = ComponentPropsWithoutRef<'div'>;

const AlertDialogBody = function AlertDialogBody({
  className,
  ref,
  ...props
}: Omit<AlertDialogBodyProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-body"
      className={cn(
        'flex min-h-0 flex-1 items-start gap-3 overflow-auto px-6 pb-1 pt-4',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogMediaProps = ComponentPropsWithoutRef<'div'>;

const AlertDialogMedia = function AlertDialogMedia({
  className,
  ref,
  ...props
}: Omit<AlertDialogMediaProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-slot="alert-dialog-media"
      className={cn(
        'flex size-6 shrink-0 items-center justify-center [&_svg]:size-5',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogHeaderProps = ComponentPropsWithoutRef<'div'>;

const AlertDialogHeader = function AlertDialogHeader({
  className,
  ref,
  ...props
}: Omit<AlertDialogHeaderProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2 break-words',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogTitleProps = BaseAlertDialogTitleProps;

const AlertDialogTitle = function AlertDialogTitle({
  className,
  ref,
  ...props
}: Omit<AlertDialogTitleProps, 'ref'> & {
  ref?: Ref<HTMLHeadingElement>;
}) {
  return (
    <BaseAlertDialog.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={mergeClassName<AlertDialogTitleState>(
        'font-sans text-base font-medium leading-6 text-grayscale-opacity-800',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogDescriptionProps =
  BaseAlertDialogDescriptionProps;

const AlertDialogDescription = function AlertDialogDescription({
  className,
  ref,
  ...props
}: Omit<AlertDialogDescriptionProps, 'ref'> & {
  ref?: Ref<HTMLParagraphElement>;
}) {
  return (
    <BaseAlertDialog.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={mergeClassName<AlertDialogDescriptionState>(
        'font-sans text-base leading-6 text-grayscale-opacity-700',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogFooterProps = ComponentPropsWithoutRef<'div'>;

const AlertDialogFooter = function AlertDialogFooter({
  className,
  ref,
  ...props
}: Omit<AlertDialogFooterProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn(
        'flex items-center justify-end gap-6 px-6 pb-2',
        className,
      )}
      {...props}
    />
  );
};

export type AlertDialogCloseProps = BaseAlertDialogCloseProps;

const AlertDialogClose = function AlertDialogClose({
  type = 'button',
  ref,
  ...props
}: Omit<AlertDialogCloseProps, 'ref'> & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      type={type}
      data-slot="alert-dialog-close"
      {...props}
    />
  );
};

export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
};
