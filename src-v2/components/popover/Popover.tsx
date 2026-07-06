/* eslint-disable react-refresh/only-export-components --
 * Popover exposes Base UI's createHandle helper next to its parts so
 * registry consumers can use detached triggers from one installed file.
 */
import { cn } from '@/lib/utils';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type PopoverProps = ComponentPropsWithoutRef<
  typeof BasePopover.Root
>;

const Popover = BasePopover.Root;

export type PopoverTriggerProps = ComponentPropsWithoutRef<
  typeof BasePopover.Trigger
>;

const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger({ className, ...props }, ref) {
  return (
    <BasePopover.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={className}
      {...props}
    />
  );
});

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

const PopoverViewport = forwardRef<
  ElementRef<typeof BasePopover.Viewport>,
  PopoverViewportProps
>(function PopoverViewport({ className, ...props }, ref) {
  return (
    <BasePopover.Viewport
      ref={ref}
      data-slot="popover-viewport"
      className={className}
      {...props}
    />
  );
});

export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof BasePopover.Popup
> &
  Pick<
    ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    positionerClassName?: string;
  };

const PopoverContent = forwardRef<
  ElementRef<typeof BasePopover.Popup>,
  PopoverContentProps
>(function PopoverContent(
  {
    align = 'start',
    alignOffset,
    children,
    className,
    positionerClassName,
    side,
    sideOffset = 4,
    ...props
  },
  ref,
) {
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
});

export type PopoverArrowProps = ComponentPropsWithoutRef<
  typeof BasePopover.Arrow
>;

const PopoverArrow = forwardRef<
  ElementRef<typeof BasePopover.Arrow>,
  PopoverArrowProps
>(function PopoverArrow({ className, ...props }, ref) {
  return (
    <BasePopover.Arrow
      ref={ref}
      data-slot="popover-arrow"
      className={cn('text-white', className)}
      {...props}
    />
  );
});

export type PopoverCloseProps = ComponentPropsWithoutRef<
  typeof BasePopover.Close
>;

const PopoverClose = forwardRef<
  ElementRef<typeof BasePopover.Close>,
  PopoverCloseProps
>(function PopoverClose({ className, ...props }, ref) {
  return (
    <BasePopover.Close
      ref={ref}
      data-slot="popover-close"
      className={className}
      {...props}
    />
  );
});

export type PopoverTitleProps = ComponentPropsWithoutRef<
  typeof BasePopover.Title
>;

const PopoverTitle = forwardRef<
  ElementRef<typeof BasePopover.Title>,
  PopoverTitleProps
>(function PopoverTitle({ className, ...props }, ref) {
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
});

export type PopoverDescriptionProps = ComponentPropsWithoutRef<
  typeof BasePopover.Description
>;

const PopoverDescription = forwardRef<
  ElementRef<typeof BasePopover.Description>,
  PopoverDescriptionProps
>(function PopoverDescription({ className, ...props }, ref) {
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
});

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
