import { cn } from '@/lib/utils';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const TOOLTIP_CONTENT_CLASSES =
  'box-border inline-flex max-w-[400px] origin-(--transform-origin) items-center gap-1 rounded bg-grayscale-700 px-3 py-1.5 font-sans text-sm leading-5 font-normal text-white shadow-emphasis outline-none duration-100 data-[side=bottom]:slide-in-from-top-1 data-[side=inline-end]:slide-in-from-left-1 data-[side=inline-start]:slide-in-from-right-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95';

const TOOLTIP_ARROW_CLASSES =
  'pointer-events-none bg-grayscale-700 data-[side=bottom]:-top-1.5 data-[side=bottom]:h-1.5 data-[side=bottom]:w-3 data-[side=bottom]:[clip-path:polygon(50%_0%,0%_100%,100%_100%)] data-[side=inline-end]:-left-1.5 data-[side=inline-end]:h-3 data-[side=inline-end]:w-1.5 data-[side=inline-end]:[clip-path:polygon(100%_0%,0%_50%,100%_100%)] data-[side=inline-start]:-right-1.5 data-[side=inline-start]:h-3 data-[side=inline-start]:w-1.5 data-[side=inline-start]:[clip-path:polygon(0%_0%,100%_50%,0%_100%)] data-[side=left]:-right-1.5 data-[side=left]:h-3 data-[side=left]:w-1.5 data-[side=left]:[clip-path:polygon(0%_0%,100%_50%,0%_100%)] data-[side=right]:-left-1.5 data-[side=right]:h-3 data-[side=right]:w-1.5 data-[side=right]:[clip-path:polygon(100%_0%,0%_50%,100%_100%)] data-[side=top]:-bottom-1.5 data-[side=top]:h-1.5 data-[side=top]:w-3 data-[side=top]:[clip-path:polygon(0%_0%,100%_0%,50%_100%)]';

export type TooltipProviderProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Provider
>;

function TooltipProvider({
  delay = 200,
  closeDelay = 100,
  ...props
}: TooltipProviderProps) {
  return (
    <BaseTooltip.Provider
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    />
  );
}

export type TooltipProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Root
>;

const Tooltip = BaseTooltip.Root;

export type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Trigger
>;

const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(function TooltipTrigger({ className, ...props }, ref) {
  return (
    <BaseTooltip.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      className={className}
      {...props}
    />
  );
});

export type TooltipPortalProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Portal
>;

const TooltipPortal = BaseTooltip.Portal;

export type TooltipPositionerProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Positioner
>;

const TooltipPositioner = forwardRef<
  ElementRef<typeof BaseTooltip.Positioner>,
  TooltipPositionerProps
>(function TooltipPositioner({ className, ...props }, ref) {
  return (
    <BaseTooltip.Positioner
      ref={ref}
      data-slot="tooltip-positioner"
      className={cn('z-9999', className)}
      {...props}
    />
  );
});

export type TooltipArrowProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Arrow
>;

const TooltipArrow = forwardRef<
  ElementRef<typeof BaseTooltip.Arrow>,
  TooltipArrowProps
>(function TooltipArrow({ className, ...props }, ref) {
  return (
    <BaseTooltip.Arrow
      ref={ref}
      data-slot="tooltip-arrow"
      className={cn(TOOLTIP_ARROW_CLASSES, className)}
      {...props}
    />
  );
});

export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof BaseTooltip.Popup
> &
  Pick<
    TooltipPositionerProps,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    arrow?: boolean;
    positionerClassName?: string;
  };

const TooltipContent = forwardRef<
  ElementRef<typeof BaseTooltip.Popup>,
  TooltipContentProps
>(function TooltipContent(
  {
    align = 'center',
    alignOffset,
    arrow = true,
    children,
    className,
    positionerClassName,
    side = 'top',
    sideOffset = 8,
    ...props
  },
  ref,
) {
  return (
    <BaseTooltip.Portal>
      <TooltipPositioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={positionerClassName}
      >
        <BaseTooltip.Popup
          ref={ref}
          data-slot="tooltip-content"
          className={cn(TOOLTIP_CONTENT_CLASSES, className)}
          {...props}
        >
          {children}
          {arrow && <TooltipArrow />}
        </BaseTooltip.Popup>
      </TooltipPositioner>
    </BaseTooltip.Portal>
  );
});

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
};
