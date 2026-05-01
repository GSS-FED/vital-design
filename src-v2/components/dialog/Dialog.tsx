import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/utils/cn';
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

const dialogTriggerClasses = [
  'inline-flex h-8 items-center justify-center px-4',
  'rounded-[var(--radius-xl)] bg-primary-500',
  'font-sans text-sm leading-5 text-white',
  'transition-colors duration-150',
  'cursor-pointer hover:bg-primary-400 active:bg-primary-600',
  'focus-visible:shadow-focus-primary focus-visible:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'data-disabled:cursor-not-allowed data-disabled:opacity-60',
].join(' ');

const dialogBackdropClasses = [
  'fixed inset-0 z-[9998] bg-grayscale-900/40',
  'transition-opacity duration-150 ease-out',
  'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
].join(' ');

const dialogViewportClasses = [
  'fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center',
  'overflow-y-auto px-4 py-4',
  'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
].join(' ');

const dialogPopupVariants = cva(
  [
    'box-border flex w-full max-h-[calc(100vh-2rem)] flex-col',
    'overflow-hidden rounded-[var(--radius-sm)] bg-white',
    'font-sans text-grayscale-800 shadow-top-level outline-none',
    'transition-[opacity,transform] duration-150 ease-out',
    'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
  ],
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

const dialogTitleBaseClasses =
  'font-sans text-lg font-medium leading-6';

const dialogDescriptionBaseClasses = 'font-sans text-sm leading-5';

const dialogCloseBaseClasses = [
  'inline-flex items-center justify-center',
  'font-sans text-sm leading-5',
  'h-6 text-white hover:text-white/40',
  'disabled:text-white/40 data-disabled:text-white/40',
  'transition-colors duration-200',
  'cursor-pointer',
  'focus-visible:shadow-focus-primary focus-visible:outline-none',
  'disabled:cursor-not-allowed data-disabled:cursor-not-allowed',
].join(' ');

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
      className={mergeClassName<BaseDialogTrigger.State>(
        dialogTriggerClasses,
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
      className={mergeClassName<BaseDialogBackdrop.State>(
        dialogBackdropClasses,
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
      className={mergeClassName<BaseDialogViewport.State>(
        dialogViewportClasses,
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
        className={mergeClassName<BaseDialogTitle.State>(
          cn(
            dialogTitleBaseClasses,
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
      className={mergeClassName<BaseDialogDescription.State>(
        cn(
          dialogDescriptionBaseClasses,
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
        aria-label={
          ariaLabel ??
          (hasChildren || hasCustomRender ? undefined : 'Close')
        }
        className={
          hasCustomRender
            ? className
            : mergeClassName<BaseDialogClose.State>(
                cn(dialogCloseBaseClasses),
                className,
              )
        }
        {...props}
      >
        {hasChildren || hasCustomRender ? (
          children
        ) : (
          <CloseIcon width={14} height={14} />
        )}
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
          className={cn(
            'flex items-start justify-between gap-4 pl-4 pr-3.5 py-2.25',
            'bg-(image:--gradient-primary)',
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
        className={cn(
          'flex items-center justify-end gap-2.5 px-5 py-2',
          'bg-grayscale-100 border-t border-t-gray-200',
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
