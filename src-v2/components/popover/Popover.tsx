/* eslint-disable react-refresh/only-export-components --
 * Popover exposes Base UI's createHandle helper next to its parts so
 * registry consumers can use detached triggers from one installed file.
 */
import { cn } from '@/lib/utils';
import { Popover as BasePopover } from '@base-ui/react/popover';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

export type PopoverProps = ComponentPropsWithoutRef<
  typeof BasePopover.Root
>;

const Popover = BasePopover.Root;

export type PopoverTriggerProps = ComponentPropsWithoutRef<
  typeof BasePopover.Trigger
>;

const PopoverTrigger = function PopoverTrigger({
  className,
  ref,
  ...props
}: Omit<PopoverTriggerProps, 'ref'> & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <BasePopover.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={className}
      {...props}
    />
  );
};

export type PopoverHandle<Payload = unknown> =
  BasePopover.Handle<Payload>;

const createPopoverHandle = BasePopover.createHandle;

export type PopoverPortalProps = ComponentPropsWithoutRef<
  typeof BasePopover.Portal
>;

const PopoverPortal = BasePopover.Portal;

export type PopoverViewportProps = ComponentPropsWithoutRef<
  typeof BasePopover.Viewport
>;

const PopoverViewport = function PopoverViewport({
  className,
  ref,
  ...props
}: Omit<PopoverViewportProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Viewport>>;
}) {
  return (
    <BasePopover.Viewport
      ref={ref}
      data-slot="popover-viewport"
      className={className}
      {...props}
    />
  );
};

export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof BasePopover.Popup
> &
  Pick<
    ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    positionerClassName?: string;
  };

const PopoverContent = function PopoverContent({
  align = 'start',
  alignOffset,
  children,
  className,
  positionerClassName,
  side,
  sideOffset = 4,
  ref,
  ...props
}: Omit<PopoverContentProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Popup>>;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn('isolate z-9999', positionerClassName)}
      >
        <BasePopover.Popup
          ref={ref}
          data-slot="popover-content"
          className={cn(
            'box-border origin-(--transform-origin) rounded bg-white p-4 font-sans text-sm leading-5 text-grayscale-opacity-800 shadow-emphasis outline-none duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
};

export type PopoverArrowProps = ComponentPropsWithoutRef<
  typeof BasePopover.Arrow
>;

const PopoverArrow = function PopoverArrow({
  className,
  ref,
  ...props
}: Omit<PopoverArrowProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Arrow>>;
}) {
  return (
    <BasePopover.Arrow
      ref={ref}
      data-slot="popover-arrow"
      className={cn('text-white', className)}
      {...props}
    />
  );
};

export type PopoverCloseProps = ComponentPropsWithoutRef<
  typeof BasePopover.Close
>;

const PopoverClose = function PopoverClose({
  className,
  ref,
  ...props
}: Omit<PopoverCloseProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Close>>;
}) {
  return (
    <BasePopover.Close
      ref={ref}
      data-slot="popover-close"
      className={className}
      {...props}
    />
  );
};

export type PopoverTitleProps = ComponentPropsWithoutRef<
  typeof BasePopover.Title
>;

const PopoverTitle = function PopoverTitle({
  className,
  ref,
  ...props
}: Omit<PopoverTitleProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Title>>;
}) {
  return (
    <BasePopover.Title
      ref={ref}
      data-slot="popover-title"
      className={cn(
        'text-sm font-medium leading-5 text-grayscale-opacity-800',
        className,
      )}
      {...props}
    />
  );
};

export type PopoverDescriptionProps = ComponentPropsWithoutRef<
  typeof BasePopover.Description
>;

const PopoverDescription = function PopoverDescription({
  className,
  ref,
  ...props
}: Omit<PopoverDescriptionProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof BasePopover.Description>>;
}) {
  return (
    <BasePopover.Description
      ref={ref}
      data-slot="popover-description"
      className={cn(
        'text-sm leading-5 text-grayscale-opacity-600',
        className,
      )}
      {...props}
    />
  );
};

export {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
  createPopoverHandle,
};
