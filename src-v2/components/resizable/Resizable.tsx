import { cn } from '@/utils/cn';
import * as ResizablePrimitive from 'react-resizable-panels';

export type ResizablePanelGroupProps = ResizablePrimitive.GroupProps;

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        'flex h-full w-full aria-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

export type ResizablePanelProps = ResizablePrimitive.PanelProps;

function ResizablePanel(props: ResizablePanelProps) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      {...props}
    />
  );
}

export type ResizableHandleProps =
  ResizablePrimitive.SeparatorProps & {
    withHandle?: boolean;
  };

function ResizableHandle({
  className,
  children,
  withHandle,
  ...props
}: ResizableHandleProps) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        'relative flex w-px shrink-0 items-center justify-center bg-grayscale-300 outline-none transition-colors duration-100',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2',
        'hover:bg-primary-500 focus-visible:bg-primary-500 focus-visible:shadow-focus-primary',
        'aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-3 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2',
        '[&[aria-orientation=horizontal]>[data-slot=resizable-handle-indicator]]:rotate-90',
        className,
      )}
      {...props}
    >
      {children ??
        (withHandle ? (
          <span
            aria-hidden="true"
            data-slot="resizable-handle-indicator"
            className="z-10 flex h-4 w-3 items-center justify-center gap-px rounded-xs border border-grayscale-300 bg-white text-grayscale-500 shadow-base"
          >
            <span className="h-2.5 w-px rounded-full bg-current" />
            <span className="h-2.5 w-px rounded-full bg-current" />
          </span>
        ) : null)}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
