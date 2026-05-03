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

const PopoverTrigger = BasePopover.Trigger;

export type PopoverPortalProps = ComponentPropsWithoutRef<
  typeof BasePopover.Portal
>;

const PopoverPortal = BasePopover.Portal;

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
        className={cn('z-9999', positionerClassName)}
      >
        <BasePopover.Popup
          ref={ref}
          data-slot="popover-content"
          className={cn(
            'box-border rounded bg-white p-4 font-sans text-sm leading-5 text-grayscale-800 shadow-emphasis outline-none',
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
        'text-sm font-medium leading-5 text-grayscale-800',
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
        'text-sm leading-5 text-grayscale-600',
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
};
