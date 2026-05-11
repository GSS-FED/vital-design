import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/lib/utils';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { createContext, forwardRef, useContext } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from 'react';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

type SheetModal = ComponentPropsWithoutRef<
  typeof BaseDialog.Root
>['modal'];

const SheetContext = createContext<{ modal: SheetModal }>({
  modal: undefined,
});

export type SheetProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Root
>;

const Sheet = ({ modal, ...props }: SheetProps) => (
  <SheetContext.Provider value={{ modal }}>
    <BaseDialog.Root modal={modal} {...props} />
  </SheetContext.Provider>
);

export type SheetTriggerProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Trigger
>;

const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  function SheetTrigger({ type = 'button', ...props }, ref) {
    return (
      <BaseDialog.Trigger
        ref={ref}
        type={type}
        data-slot="sheet-trigger"
        {...props}
      />
    );
  },
);

export type SheetCloseProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Close
>;

const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  function SheetClose({ type = 'button', ...props }, ref) {
    return (
      <BaseDialog.Close
        ref={ref}
        type={type}
        data-slot="sheet-close"
        {...props}
      />
    );
  },
);

export type SheetPortalProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Portal
>;

const SheetPortal = (props: SheetPortalProps) => (
  <BaseDialog.Portal {...props} />
);

export type SheetOverlayProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Backdrop
>;

const SheetOverlay = forwardRef<
  ElementRef<typeof BaseDialog.Backdrop>,
  SheetOverlayProps
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <BaseDialog.Backdrop
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-[9998] bg-grayscale-900/40 transition-opacity duration-300 ease-in-out data-starting-style:opacity-0 data-ending-style:opacity-0',
        className,
      )}
      {...props}
    />
  );
});

export type SheetContentProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Popup
> & {
  side?: SheetSide;
  showCloseButton?: boolean;
  closeLabel?: string;
  overlayClassName?: string;
  portalContainer?: SheetPortalProps['container'];
};

const SheetContent = forwardRef<
  ElementRef<typeof BaseDialog.Popup>,
  SheetContentProps
>(function SheetContent(
  {
    children,
    className,
    closeLabel = 'Close',
    overlayClassName,
    portalContainer,
    showCloseButton = true,
    side = 'right',
    ...props
  },
  ref,
) {
  const { modal } = useContext(SheetContext);
  const renderOverlay = modal !== false;

  return (
    <BaseDialog.Portal container={portalContainer}>
      {renderOverlay ? (
        <SheetOverlay className={overlayClassName} />
      ) : null}
      <BaseDialog.Popup
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          'fixed z-[9999] box-border flex flex-col gap-4 bg-white p-6 font-sans text-grayscale-800 shadow-top-level outline-none transition-transform duration-300 ease-in-out',
          'data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:max-h-[80vh] data-[side=top]:border-b data-[side=top]:border-grayscale-200 data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full',
          'data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:border-t data-[side=bottom]:border-grayscale-200 data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full',
          'data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-3/4 data-[side=left]:max-w-md data-[side=left]:border-r data-[side=left]:border-grayscale-200 data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full',
          'data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-3/4 data-[side=right]:max-w-md data-[side=right]:border-l data-[side=right]:border-grayscale-200 data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <BaseDialog.Close
            type="button"
            data-slot="sheet-close"
            aria-label={closeLabel}
            className="absolute right-3 top-3 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-(--radius-xs) text-grayscale-600 transition-colors duration-150 hover:bg-grayscale-100 hover:text-grayscale-900 focus-visible:shadow-focus-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 data-disabled:cursor-not-allowed data-disabled:opacity-60"
          >
            <CloseIcon width={14} height={14} />
          </BaseDialog.Close>
        ) : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
});

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  function SheetHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-header"
        className={cn('flex flex-col gap-1.5 pr-8', className)}
        {...props}
      />
    );
  },
);

export type SheetBodyProps = HTMLAttributes<HTMLDivElement>;

const SheetBody = forwardRef<HTMLDivElement, SheetBodyProps>(
  function SheetBody({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-body"
        className={cn(
          'min-h-0 flex-1 overflow-auto text-sm text-grayscale-700',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  function SheetFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sheet-footer"
        className={cn(
          'mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SheetTitleProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Title
>;

const SheetTitle = forwardRef<
  ElementRef<typeof BaseDialog.Title>,
  SheetTitleProps
>(function SheetTitle({ className, ...props }, ref) {
  return (
    <BaseDialog.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn(
        'font-sans text-lg font-medium leading-6 text-grayscale-900',
        className,
      )}
      {...props}
    />
  );
});

export type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof BaseDialog.Description
>;

const SheetDescription = forwardRef<
  ElementRef<typeof BaseDialog.Description>,
  SheetDescriptionProps
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <BaseDialog.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn(
        'font-sans text-sm leading-5 text-grayscale-600',
        className,
      )}
      {...props}
    />
  );
});

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
