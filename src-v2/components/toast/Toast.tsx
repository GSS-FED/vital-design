import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/lib/utils';
import { Toast as BaseToast } from '@base-ui/react/toast';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';
import { useToast } from './useToast';

export type ToastStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'loading';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastVariant = 'solid' | 'subtle';

export type ToastCancelProps = ComponentPropsWithoutRef<'button'>;

export type ToasterToastData = {
  icon?: ReactNode;
  cancelProps?: ToastCancelProps;
};

const VIEWPORT_BASE_CLASSES =
  'fixed z-9999 outline-none [--gap:0.5rem]';

const VIEWPORT_BY_POSITION: Record<ToastPosition, string> = {
  'top-left':
    'top-4 left-4 [--toast-stack-direction:1] [--toast-enter-y:-100%]',
  'top-center':
    'top-4 left-1/2 [--toast-stack-direction:1] [--toast-enter-y:-100%]',
  'top-right':
    'top-4 right-4 [--toast-stack-direction:1] [--toast-enter-y:-100%]',
  'bottom-left':
    'bottom-4 left-4 [--toast-stack-direction:-1] [--toast-enter-y:100%]',
  'bottom-center':
    'bottom-4 left-1/2 [--toast-stack-direction:-1] [--toast-enter-y:100%]',
  'bottom-right':
    'bottom-4 right-4 [--toast-stack-direction:-1] [--toast-enter-y:100%]',
};

export type ToastProviderProps = ComponentPropsWithoutRef<
  typeof BaseToast.Provider
>;

const ToastProvider = BaseToast.Provider;

export type ToastPortalProps = ComponentPropsWithoutRef<
  typeof BaseToast.Portal
>;

const ToastPortal = BaseToast.Portal;

export type ToastViewportProps = ComponentPropsWithoutRef<
  typeof BaseToast.Viewport
> & {
  position?: ToastPosition;
};

const ToastViewport = forwardRef<
  ElementRef<typeof BaseToast.Viewport>,
  ToastViewportProps
>(function ToastViewport(
  { className, position = 'bottom-right', ...props },
  ref,
) {
  return (
    <BaseToast.Viewport
      ref={ref}
      data-slot="toast-viewport"
      data-position={position}
      className={cn(
        VIEWPORT_BASE_CLASSES,
        VIEWPORT_BY_POSITION[position],
        className,
      )}
      {...props}
    />
  );
});

const TOAST_ROOT_CLASSES = [
  'group/toast pointer-events-auto absolute box-border flex max-w-[min(400px,calc(100vw-2rem))] items-center gap-4 rounded font-sans text-sm leading-5 font-medium shadow-emphasis outline-none',
  'transition-[transform,opacity] duration-300 ease-out',
  '[transform:translateX(var(--toast-anchor-x,0))_translateY(calc(var(--toast-index)*var(--toast-stack-direction,-1)*var(--gap)))_translateY(calc(var(--toast-index)*var(--toast-stack-direction,-1)*100%))_scale(calc(1-var(--toast-index)*0.05))]',
  'data-[expanded]:[transform:translateX(var(--toast-anchor-x,0))_translateY(calc(var(--toast-index)*var(--toast-stack-direction,-1)*var(--gap)))_translateY(calc(var(--toast-index)*var(--toast-stack-direction,-1)*100%))]',
  'data-[starting-style]:[transform:translateX(var(--toast-anchor-x,0))_translateY(var(--toast-enter-y,100%))] data-[starting-style]:opacity-0',
  'data-[ending-style]:opacity-0 data-[ending-style]:[transform:translateX(var(--toast-anchor-x,0))_translateY(calc(var(--toast-swipe-movement-y,0px)+var(--toast-enter-y,100%)))]',
  'data-[swipe-direction=right]:data-[ending-style]:[transform:translateX(calc(var(--toast-swipe-movement-x,0px)+100%))] data-[swipe-direction=right]:data-[ending-style]:opacity-0',
  'data-[swipe-direction=left]:data-[ending-style]:[transform:translateX(calc(var(--toast-swipe-movement-x,0px)-100%))] data-[swipe-direction=left]:data-[ending-style]:opacity-0',
  'data-[swiping]:transition-none',
] as const;

const TOAST_ANCHOR_BY_POSITION: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-center': 'top-0 left-0 [--toast-anchor-x:-50%]',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-center': 'bottom-0 left-0 [--toast-anchor-x:-50%]',
  'bottom-right': 'bottom-0 right-0',
};

export type ToastProps = Omit<
  ComponentPropsWithoutRef<typeof BaseToast.Root>,
  'toast'
> & {
  toast: ComponentPropsWithoutRef<typeof BaseToast.Root>['toast'];
  position?: ToastPosition;
  status?: ToastStatus;
};

const Toast = forwardRef<
  ElementRef<typeof BaseToast.Root>,
  ToastProps
>(function Toast(
  { className, position = 'bottom-right', status, toast, ...props },
  ref,
) {
  const resolvedStatus =
    status ?? (toast.type as ToastStatus | undefined);

  return (
    <BaseToast.Root
      ref={ref}
      toast={toast}
      data-slot="toast"
      data-status={resolvedStatus}
      data-position={position}
      className={cn(
        TOAST_ROOT_CLASSES,
        TOAST_ANCHOR_BY_POSITION[position],
        className,
      )}
      {...props}
    />
  );
});

export type ToastIconProps = ComponentPropsWithoutRef<'span'>;

const ToastIcon = forwardRef<HTMLSpanElement, ToastIconProps>(
  function ToastIcon({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-slot="toast-icon"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center',
          className,
        )}
        {...props}
      />
    );
  },
);

export type ToastContentProps = ComponentPropsWithoutRef<
  typeof BaseToast.Content
>;

const ToastContent = forwardRef<
  ElementRef<typeof BaseToast.Content>,
  ToastContentProps
>(function ToastContent({ className, ...props }, ref) {
  return (
    <BaseToast.Content
      ref={ref}
      data-slot="toast-content"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
});

export type ToastTitleProps = ComponentPropsWithoutRef<
  typeof BaseToast.Title
>;

const ToastTitle = forwardRef<
  ElementRef<typeof BaseToast.Title>,
  ToastTitleProps
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <BaseToast.Title
      ref={ref}
      data-slot="toast-title"
      className={cn('text-sm leading-5 font-medium', className)}
      {...props}
    />
  );
});

export type ToastDescriptionProps = ComponentPropsWithoutRef<
  typeof BaseToast.Description
>;

const ToastDescription = forwardRef<
  ElementRef<typeof BaseToast.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <BaseToast.Description
      ref={ref}
      data-slot="toast-description"
      className={cn('text-sm leading-5 font-normal', className)}
      {...props}
    />
  );
});

export type ToastActionProps = ComponentPropsWithoutRef<
  typeof BaseToast.Action
>;

const ToastAction = forwardRef<
  ElementRef<typeof BaseToast.Action>,
  ToastActionProps
>(function ToastAction({ className, ...props }, ref) {
  return (
    <BaseToast.Action
      ref={ref}
      data-slot="toast-action"
      className={cn(
        'shrink-0 cursor-pointer text-sm leading-5 font-medium outline-none transition-colors duration-150',
        className,
      )}
      {...props}
    />
  );
});

export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof BaseToast.Close
>;

const ToastClose = forwardRef<
  ElementRef<typeof BaseToast.Close>,
  ToastCloseProps
>(function ToastClose(
  {
    'aria-label': ariaLabel = 'Close',
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <BaseToast.Close
      ref={ref}
      aria-label={ariaLabel}
      data-slot="toast-close"
      className={cn(
        'flex size-5 shrink-0 cursor-pointer items-center justify-center outline-none transition-colors duration-150',
        className,
      )}
      {...props}
    >
      {children ?? <CloseIcon />}
    </BaseToast.Close>
  );
});

const ToastCancel = forwardRef<HTMLButtonElement, ToastCancelProps>(
  function ToastCancel(
    { className, type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="toast-cancel"
        className={cn(
          'shrink-0 cursor-pointer text-sm leading-5 font-medium outline-none transition-colors duration-150',
          className,
        )}
        {...props}
      />
    );
  },
);

const SOLID_BG: Record<ToastStatus, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-destructive-500',
  info: 'bg-grayscale-700',
  loading: 'bg-grayscale-700',
};

const SUBTLE_ICON: Record<ToastStatus, string> = {
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-destructive-500',
  info: 'text-info-500',
  loading: 'text-primary-500',
};

export type ToasterProps = {
  className?: string;
  closable?: boolean;
  position?: ToastPosition;
  variant?: ToastVariant;
};

function Toaster({
  className,
  closable = true,
  position = 'bottom-right',
  variant = 'solid',
}: ToasterProps) {
  const manager = useToast<ToasterToastData>();

  return (
    <ToastPortal>
      <ToastViewport position={position} className={className}>
        {manager.toasts.map((toast) => {
          const status =
            (toast.type as ToastStatus | undefined) ?? 'info';
          const icon = toast.data?.icon;
          const cancelProps = toast.data?.cancelProps;
          const isLoading = status === 'loading';
          const showClose = closable && !isLoading && !cancelProps;

          return (
            <Toast
              key={toast.id}
              toast={toast}
              status={status}
              position={position}
              data-variant={variant}
              className={cn(
                variant === 'solid'
                  ? cn(
                      SOLID_BG[status],
                      'w-fit px-4 py-1.5 text-white',
                    )
                  : 'min-w-[300px] bg-white p-4 text-grayscale-800',
              )}
            >
              <ToastContent
                className={
                  variant === 'subtle' ? 'min-w-0 flex-1' : undefined
                }
              >
                {icon ? (
                  <ToastIcon
                    className={
                      variant === 'subtle' ? SUBTLE_ICON[status] : ''
                    }
                  >
                    {icon}
                  </ToastIcon>
                ) : null}
                <ToastTitle
                  className={
                    variant === 'subtle'
                      ? 'min-w-0 flex-1'
                      : 'whitespace-nowrap'
                  }
                >
                  {toast.title}
                </ToastTitle>
                {toast.description ? (
                  <ToastDescription
                    className={
                      variant === 'solid'
                        ? 'text-white/90'
                        : 'text-grayscale-600'
                    }
                  >
                    {toast.description}
                  </ToastDescription>
                ) : null}
              </ToastContent>
              {toast.actionProps ? (
                <ToastAction
                  className={
                    variant === 'solid'
                      ? 'text-white underline underline-offset-2 hover:text-white/90 focus-visible:text-white/90'
                      : 'text-primary-500 hover:text-primary-600 focus-visible:text-primary-600'
                  }
                />
              ) : null}
              {cancelProps ? (
                <ToastCancel
                  {...cancelProps}
                  onClick={(event) => {
                    cancelProps.onClick?.(event);
                    if (!event.defaultPrevented) {
                      manager.close(toast.id);
                    }
                  }}
                  className={cn(
                    variant === 'solid'
                      ? 'text-white/80 hover:text-white focus-visible:text-white'
                      : 'text-grayscale-600 hover:text-grayscale-800 focus-visible:text-grayscale-800',
                    cancelProps.className,
                  )}
                />
              ) : null}
              {showClose ? (
                <ToastClose
                  className={
                    variant === 'solid'
                      ? 'text-white hover:text-white/80 focus-visible:text-white/80'
                      : 'text-grayscale-500 hover:text-grayscale-700 focus-visible:text-grayscale-700'
                  }
                />
              ) : null}
            </Toast>
          );
        })}
      </ToastViewport>
    </ToastPortal>
  );
}

export {
  Toast,
  ToastAction,
  ToastCancel,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
};
