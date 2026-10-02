import { cn } from '@/lib/utils';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { forwardRef } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
} from 'react';

type ScrollAreaViewportStyle = CSSProperties & {
  '--vital-scroll-area-fade-size'?: string;
};

const scrollAreaFadeClassName = [
  '[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--vital-scroll-area-fade-size),var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(var(--vital-scroll-area-fade-size),var(--scroll-area-overflow-y-end))),transparent_100%)]',
  '[mask-repeat:no-repeat]',
  '[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--vital-scroll-area-fade-size),var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(var(--vital-scroll-area-fade-size),var(--scroll-area-overflow-y-end))),transparent_100%)]',
  '[-webkit-mask-repeat:no-repeat]',
].join(' ');

export type ScrollAreaProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Root
>;

const ScrollArea = forwardRef<
  ElementRef<typeof BaseScrollArea.Root>,
  ScrollAreaProps
>(function ScrollArea({ className, ...props }, ref) {
  return (
    <BaseScrollArea.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  );
});

export type ScrollAreaViewportProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Viewport
> & {
  fadeEdges?: boolean;
  fadeSize?: number | string;
};

const ScrollAreaViewport = forwardRef<
  ElementRef<typeof BaseScrollArea.Viewport>,
  ScrollAreaViewportProps
>(function ScrollAreaViewport(
  { className, fadeEdges = false, fadeSize = 40, style, ...props },
  ref,
) {
  const fadeStyle: ScrollAreaViewportStyle = {
    '--vital-scroll-area-fade-size':
      typeof fadeSize === 'number'
        ? `${Math.max(0, fadeSize)}px`
        : fadeSize,
    ...style,
  };

  return (
    <BaseScrollArea.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      className={cn(
        'min-h-0 overflow-auto',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        fadeEdges && scrollAreaFadeClassName,
        className,
      )}
      style={fadeEdges ? fadeStyle : style}
      {...props}
    />
  );
});

export type ScrollAreaContentProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Content
>;

const ScrollAreaContent = forwardRef<
  ElementRef<typeof BaseScrollArea.Content>,
  ScrollAreaContentProps
>(function ScrollAreaContent({ className, ...props }, ref) {
  return (
    <BaseScrollArea.Content
      ref={ref}
      data-slot="scroll-area-content"
      className={className}
      {...props}
    />
  );
});

export type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Scrollbar
>;

const ScrollAreaScrollbar = forwardRef<
  ElementRef<typeof BaseScrollArea.Scrollbar>,
  ScrollAreaScrollbarProps
>(function ScrollAreaScrollbar({ className, ...props }, ref) {
  return (
    <BaseScrollArea.Scrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      className={cn(
        'flex touch-none p-0.5 select-none',
        'data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col',
        'data-[orientation=vertical]:w-2',
        className,
      )}
      {...props}
    />
  );
});

export type ScrollAreaThumbProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Thumb
>;

const ScrollAreaThumb = forwardRef<
  ElementRef<typeof BaseScrollArea.Thumb>,
  ScrollAreaThumbProps
>(function ScrollAreaThumb({ className, ...props }, ref) {
  return (
    <BaseScrollArea.Thumb
      ref={ref}
      data-slot="scroll-area-thumb"
      className={cn(
        'rounded-full bg-grayscale-opacity-300',
        'data-[orientation=horizontal]:h-full',
        'data-[orientation=vertical]:w-full',
        className,
      )}
      {...props}
    />
  );
});

export type ScrollAreaCornerProps = ComponentPropsWithoutRef<
  typeof BaseScrollArea.Corner
>;

const ScrollAreaCorner = forwardRef<
  ElementRef<typeof BaseScrollArea.Corner>,
  ScrollAreaCornerProps
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <BaseScrollArea.Corner
      ref={ref}
      data-slot="scroll-area-corner"
      className={className}
      {...props}
    />
  );
});

export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
