import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/lib/utils';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type {
  DialogBackdrop as BaseDialogBackdrop,
  DialogClose as BaseDialogClose,
  DialogDescription as BaseDialogDescription,
  DialogPopup as BaseDialogPopup,
  DialogPortal as BaseDialogPortal,
  DialogRoot as BaseDialogRoot,
  DialogTitle as BaseDialogTitle,
  DialogTrigger as BaseDialogTrigger,
  DialogViewport as BaseDialogViewport,
} from '@base-ui/react/dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

const DialogHeaderContext = createContext(false);

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

const dialogPopupVariants = cva(
  'box-border flex w-full max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[var(--radius-sm)] bg-white font-sans text-grayscale-800 shadow-top-level outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
  {
    variants: {
      size: {
        small: 'max-w-[360px]',
        medium: 'max-w-[480px]',
        large: 'max-w-[640px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export type DialogProps<Payload = unknown> =
  BaseDialogRoot.Props<Payload>;

function Dialog<Payload = unknown>(props: DialogProps<Payload>) {
  return <BaseDialog.Root {...props} />;
}

export type DialogTriggerProps<Payload = unknown> =
  BaseDialogTrigger.Props<Payload>;

const DialogTrigger = forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(function DialogTrigger(
  { className, type = 'button', ...props },
  ref,
) {
  return (
    <BaseDialog.Trigger
      ref={ref}
      type={type}
      data-slot="dialog-trigger"
      className={mergeClassName<BaseDialogTrigger.State>(
        'inline-flex h-8 cursor-pointer items-center justify-center rounded-[var(--radius-xl)] bg-primary-500 px-4 font-sans text-sm leading-5 text-white transition-colors duration-150 hover:bg-primary-400 active:bg-primary-600 focus-visible:shadow-focus-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 data-disabled:cursor-not-allowed data-disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
});

export type DialogPortalProps = BaseDialogPortal.Props;

const DialogPortal = forwardRef<HTMLDivElement, DialogPortalProps>(
  function DialogPortal(props, ref) {
    return <BaseDialog.Portal ref={ref} {...props} />;
  },
);

export type DialogBackdropProps = BaseDialogBackdrop.Props;

const DialogBackdrop = forwardRef<
  HTMLDivElement,
  DialogBackdropProps
>(function DialogBackdrop({ className, ...props }, ref) {
  return (
    <BaseDialog.Backdrop
      ref={ref}
      data-slot="dialog-backdrop"
      className={mergeClassName<BaseDialogBackdrop.State>(
        'fixed inset-0 z-[9998] bg-grayscale-900/40 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
});

export type DialogViewportProps = BaseDialogViewport.Props;

const DialogViewport = forwardRef<
  HTMLDivElement,
  DialogViewportProps
>(function DialogViewport({ className, ...props }, ref) {
  return (
    <BaseDialog.Viewport
      ref={ref}
      data-slot="dialog-viewport"
      className={mergeClassName<BaseDialogViewport.State>(
        'fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center overflow-y-auto px-4 py-4',
        className,
      )}
      {...props}
    />
  );
});

export type DialogPopupVariants = VariantProps<
  typeof dialogPopupVariants
>;

export type DialogPopupProps = BaseDialogPopup.Props &
  DialogPopupVariants;

const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  function DialogPopup(
    { className, size = 'medium', ...props },
    ref,
  ) {
    return (
      <BaseDialog.Popup
        ref={ref}
        data-slot="dialog-popup"
        className={mergeClassName<BaseDialogPopup.State>(
          dialogPopupVariants({ size }),
          className,
        )}
        {...props}
      />
    );
  },
);

export type DialogTitleProps = BaseDialogTitle.Props;

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ className, ...props }, ref) {
    const isInHeader = useContext(DialogHeaderContext);

    return (
      <BaseDialog.Title
        ref={ref}
        data-slot="dialog-title"
        className={mergeClassName<BaseDialogTitle.State>(
          cn(
            'font-sans text-lg font-medium leading-6',
            isInHeader ? 'text-white' : 'text-grayscale-900',
          ),
          className,
        )}
        {...props}
      />
    );
  },
);

export type DialogDescriptionProps = BaseDialogDescription.Props;

const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  const isInHeader = useContext(DialogHeaderContext);

  return (
    <BaseDialog.Description
      ref={ref}
      data-slot="dialog-description"
      className={mergeClassName<BaseDialogDescription.State>(
        cn(
          'font-sans text-sm leading-5',
          isInHeader ? 'text-white' : 'text-grayscale-600',
        ),
        className,
      )}
      {...props}
    />
  );
});

export type DialogCloseProps = BaseDialogClose.Props;

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
    {
      children,
      className,
      render,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) {
    const hasChildren = children !== undefined && children !== null;
    const hasCustomRender = render !== undefined;

    return (
      <BaseDialog.Close
        ref={ref}
        type={type}
        render={render}
        data-slot="dialog-close"
        aria-label={
          ariaLabel ??
          (hasChildren || hasCustomRender ? undefined : 'Close')
        }
        className={
          hasCustomRender
            ? className
            : mergeClassName<BaseDialogClose.State>(
                'inline-flex h-6 cursor-pointer items-center justify-center font-sans text-sm leading-5 text-white transition-colors duration-200 hover:text-white/40 focus-visible:shadow-focus-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:text-white/40 data-disabled:cursor-not-allowed data-disabled:text-white/40',
                className,
              )
        }
        {...props}
      >
        {hasChildren || hasCustomRender ? children : <CloseIcon />}
      </BaseDialog.Close>
    );
  },
);

export type DialogHeaderProps = ComponentPropsWithoutRef<'div'>;

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <DialogHeaderContext.Provider value={true}>
        <div
          ref={ref}
          data-slot="dialog-header"
          className={cn(
            'flex items-start justify-between gap-4 bg-(image:--gradient-primary) py-2.25 pl-4 pr-3.5',
            className,
          )}
          {...props}
        />
      </DialogHeaderContext.Provider>
    );
  },
);

export type DialogBodyProps = ComponentPropsWithoutRef<'div'>;

const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-body"
        className={cn(
          'min-h-0 flex-1 overflow-auto px-4 py-6 text-sm text-grayscale-700',
          className,
        )}
        {...props}
      />
    );
  },
);

export type DialogFooterProps = ComponentPropsWithoutRef<'div'>;

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          'flex items-center justify-end gap-2.5 border-t border-t-gray-200 bg-grayscale-100 px-5 py-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
};
