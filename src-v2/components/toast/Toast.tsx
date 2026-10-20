/* eslint-disable react-refresh/only-export-components --
 * Toast.tsx intentionally co-locates the singleton managers (toastManager,
 * anchoredToastManager) and the hook (useToast) alongside components so
 * registry consumers get everything in a single file.
 */
import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/lib/utils';
import { Toast as BaseToast } from '@base-ui/react/toast';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
  Ref,
} from 'react';

export const useToast = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;

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

export const toastManager = createToastManager<ToasterToastData>();
export const anchoredToastManager =
  createToastManager<ToasterToastData>();

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

type BaseProviderProps = ComponentPropsWithoutRef<
  typeof BaseToast.Provider
>;

type ViewportOptionProps = {
  className?: string;
  closable?: boolean;
  position?: ToastPosition;
  variant?: ToastVariant;
};

export type ToastProviderProps = BaseProviderProps &
  ViewportOptionProps;

function ToastProvider({
  children,
  className,
  closable,
  position,
  toastManager: providedManager,
  variant,
  ...providerProps
}: ToastProviderProps) {
  return (
    <BaseToast.Provider
      toastManager={providedManager ?? toastManager}
      {...providerProps}
    >
      {children}
      <Toaster
        className={className}
        closable={closable}
        position={position}
        variant={variant}
      />
    </BaseToast.Provider>
  );
}

export type AnchoredToastProviderProps = BaseProviderProps &
  Omit<ViewportOptionProps, 'position'>;

function AnchoredToastProvider({
  children,
  className,
  closable,
  toastManager: providedManager,
  variant,
  ...providerProps
}: AnchoredToastProviderProps) {
  return (
    <BaseToast.Provider
      toastManager={providedManager ?? anchoredToastManager}
      {...providerProps}
    >
      {children}
      <AnchoredToaster
        className={className}
        closable={closable}
        variant={variant}
      />
    </BaseToast.Provider>
  );
}

export type ToastPortalProps = ComponentPropsWithoutRef<
  typeof BaseToast.Portal
>;

const ToastPortal = BaseToast.Portal;

export type ToastViewportProps = ComponentPropsWithoutRef<
  typeof BaseToast.Viewport
> & {
  position?: ToastPosition;
};

const ToastViewport = function ToastViewport({
  className,
  position = 'bottom-right',
  ref,
  ...props
}: Omit<ToastViewportProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Viewport>>;
}) {
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
};

const TOAST_ROOT_CLASSES = [
  'group/toast pointer-events-auto absolute box-border flex max-w-[min(400px,calc(100vw-2rem))] items-center gap-4 rounded font-sans text-sm leading-5 font-medium shadow-emphasis outline-none',
  'transition-[transform,opacity] duration-300 ease-out',
  '[z-index:calc(1000-var(--toast-index,0))]',
  '[transform:translateX(calc(var(--toast-anchor-x,0px)+var(--toast-swipe-movement-x,0px)))_translateY(calc(var(--toast-index,0)*var(--toast-stack-direction,-1)*16px+var(--toast-swipe-movement-y,0px)))_scale(calc(1-var(--toast-index,0)*0.05))]',
  'data-[expanded]:[transform:translateX(calc(var(--toast-anchor-x,0px)+var(--toast-swipe-movement-x,0px)))_translateY(calc((var(--toast-offset-y,0px)+var(--toast-index,0)*var(--gap,0px))*var(--toast-stack-direction,-1)+var(--toast-swipe-movement-y,0px)))_scale(1)]',
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

const Toast = function Toast({
  className,
  position = 'bottom-right',
  status,
  toast,
  ref,
  ...props
}: Omit<ToastProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Root>>;
}) {
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
};

export type ToastIconProps = ComponentPropsWithoutRef<'span'>;

const ToastIcon = function ToastIcon({
  className,
  ref,
  ...props
}: Omit<ToastIconProps, 'ref'> & { ref?: Ref<HTMLSpanElement> }) {
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
};

export type ToastContentProps = ComponentPropsWithoutRef<
  typeof BaseToast.Content
>;

const ToastContent = function ToastContent({
  className,
  ref,
  ...props
}: Omit<ToastContentProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Content>>;
}) {
  return (
    <BaseToast.Content
      ref={ref}
      data-slot="toast-content"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
};

export type ToastTitleProps = ComponentPropsWithoutRef<
  typeof BaseToast.Title
>;

const ToastTitle = function ToastTitle({
  className,
  ref,
  ...props
}: Omit<ToastTitleProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Title>>;
}) {
  return (
    <BaseToast.Title
      ref={ref}
      data-slot="toast-title"
      className={cn('text-sm leading-5 font-medium', className)}
      {...props}
    />
  );
};

export type ToastDescriptionProps = ComponentPropsWithoutRef<
  typeof BaseToast.Description
>;

const ToastDescription = function ToastDescription({
  className,
  ref,
  ...props
}: Omit<ToastDescriptionProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Description>>;
}) {
  return (
    <BaseToast.Description
      ref={ref}
      data-slot="toast-description"
      className={cn('text-sm leading-5 font-normal', className)}
      {...props}
    />
  );
};

export type ToastActionProps = ComponentPropsWithoutRef<
  typeof BaseToast.Action
>;

const ToastAction = function ToastAction({
  className,
  ref,
  ...props
}: Omit<ToastActionProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Action>>;
}) {
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
};

export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof BaseToast.Close
>;

const ToastClose = function ToastClose({
  'aria-label': ariaLabel = 'Close',
  children,
  className,
  ref,
  ...props
}: Omit<ToastCloseProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Close>>;
}) {
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
};

const ToastCancel = function ToastCancel({
  className,
  type = 'button',
  ref,
  ...props
}: Omit<ToastCancelProps, 'ref'> & { ref?: Ref<HTMLButtonElement> }) {
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
};

export type ToastPositionerProps = ComponentPropsWithoutRef<
  typeof BaseToast.Positioner
>;

const ToastPositioner = function ToastPositioner({
  className,
  ref,
  ...props
}: Omit<ToastPositionerProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseToast.Positioner>>;
}) {
  return (
    <BaseToast.Positioner
      ref={ref}
      data-slot="toast-positioner"
      className={cn('outline-none', className)}
      {...props}
    />
  );
};

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

type ToastObject = ReturnType<
  typeof useToast<ToasterToastData>
>['toasts'][number];

type ToasterItemProps = {
  toast: ToastObject;
  position: ToastPosition;
  variant: ToastVariant;
  closable: boolean;
  onCancel: (id: string) => void;
};

function ToasterItem({
  toast,
  position,
  variant,
  closable,
  onCancel,
}: ToasterItemProps) {
  const status = (toast.type as ToastStatus | undefined) ?? 'info';
  const icon = toast.data?.icon;
  const cancelProps = toast.data?.cancelProps;
  const isLoading = status === 'loading';
  const showClose = closable && !isLoading && !cancelProps;

  return (
    <Toast
      toast={toast}
      status={status}
      position={position}
      data-variant={variant}
      className={cn(
        variant === 'solid'
          ? cn(SOLID_BG[status], 'w-fit px-4 py-1.5 text-white')
          : 'min-w-[300px] bg-white p-4 text-grayscale-opacity-800',
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
                : 'text-grayscale-opacity-600'
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
              onCancel(toast.id);
            }
          }}
          className={cn(
            variant === 'solid'
              ? 'text-white/80 hover:text-white focus-visible:text-white'
              : 'text-grayscale-opacity-600 hover:text-grayscale-opacity-800 focus-visible:text-grayscale-opacity-800',
            cancelProps.className,
          )}
        />
      ) : null}
      {showClose ? (
        <ToastClose
          className={
            variant === 'solid'
              ? 'text-white hover:text-white/80 focus-visible:text-white/80'
              : 'text-grayscale-opacity-500 hover:text-grayscale-opacity-700 focus-visible:text-grayscale-opacity-700'
          }
        />
      ) : null}
    </Toast>
  );
}

export type ToasterProps = ViewportOptionProps;

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
        {manager.toasts.map((toast) => (
          <ToasterItem
            key={toast.id}
            toast={toast}
            position={position}
            variant={variant}
            closable={closable}
            onCancel={manager.close}
          />
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}

const ANCHORED_TOAST_CLASSES = [
  'pointer-events-auto box-border inline-flex items-center gap-2 rounded font-sans text-sm leading-5 font-medium shadow-emphasis outline-none px-3 py-1.5',
  'transition-opacity duration-200 ease-out',
  'data-[starting-style]:opacity-0',
  'data-[ending-style]:opacity-0',
] as const;

function AnchoredToasterItem({
  toast,
  variant,
  closable,
  onCancel,
}: Omit<ToasterItemProps, 'position'>) {
  const status = (toast.type as ToastStatus | undefined) ?? 'info';
  const icon = toast.data?.icon;
  const cancelProps = toast.data?.cancelProps;
  const isLoading = status === 'loading';
  const showClose = closable && !isLoading && !cancelProps;

  return (
    <BaseToast.Root
      toast={toast}
      data-slot="toast"
      data-status={status}
      data-variant={variant}
      className={cn(
        ANCHORED_TOAST_CLASSES,
        variant === 'solid'
          ? cn(SOLID_BG[status], 'text-white')
          : 'bg-white text-grayscale-opacity-800',
      )}
    >
      {icon ? (
        <ToastIcon
          className={variant === 'subtle' ? SUBTLE_ICON[status] : ''}
        >
          {icon}
        </ToastIcon>
      ) : null}
      <ToastTitle className="whitespace-nowrap">
        {toast.title}
      </ToastTitle>
      {cancelProps ? (
        <ToastCancel
          {...cancelProps}
          onClick={(event) => {
            cancelProps.onClick?.(event);
            if (!event.defaultPrevented) {
              onCancel(toast.id);
            }
          }}
          className={cn(
            variant === 'solid'
              ? 'text-white/80 hover:text-white focus-visible:text-white'
              : 'text-grayscale-opacity-600 hover:text-grayscale-opacity-800 focus-visible:text-grayscale-opacity-800',
            cancelProps.className,
          )}
        />
      ) : null}
      {showClose ? (
        <ToastClose
          className={
            variant === 'solid'
              ? 'text-white hover:text-white/80 focus-visible:text-white/80'
              : 'text-grayscale-opacity-500 hover:text-grayscale-opacity-700 focus-visible:text-grayscale-opacity-700'
          }
        />
      ) : null}
    </BaseToast.Root>
  );
}

export type AnchoredToasterProps = Omit<
  ViewportOptionProps,
  'position'
>;

function AnchoredToaster({
  className,
  closable = true,
  variant = 'solid',
}: AnchoredToasterProps) {
  const manager = useToast<ToasterToastData>();

  return (
    <ToastPortal>
      {manager.toasts.map((toast) => (
        <ToastPositioner
          key={toast.id}
          toast={toast}
          className={cn('z-9999', className)}
          {...toast.positionerProps}
        >
          <AnchoredToasterItem
            toast={toast}
            variant={variant}
            closable={closable}
            onCancel={manager.close}
          />
        </ToastPositioner>
      ))}
    </ToastPortal>
  );
}

export {
  AnchoredToastProvider,
  AnchoredToaster,
  Toast,
  ToastAction,
  ToastCancel,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastPositioner,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
};
