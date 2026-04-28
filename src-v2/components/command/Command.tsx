import masks from '@/constants/mask';
import { SearchIcon } from '@/icons/SearchIcon';
import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { cn } from '@/utils/cn';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

function assignRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function getMaskImage(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
) {
  if (scrollHeight <= clientHeight) {
    return undefined;
  }

  const isScrollAtTop = scrollTop <= 0;
  const isScrollAtBottom =
    Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

  if (isScrollAtTop) return masks.HIDE_TOP_MASK;
  if (isScrollAtBottom) return masks.HIDE_BOTTOM_MASK;
  return masks.FULL_MASK;
}

export type CommandProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;

const CommandRoot = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  CommandProps
>(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'box-border flex w-full flex-col overflow-hidden rounded bg-white font-sans text-sm text-grayscale-800 shadow-emphasis',
        className,
      )}
      {...props}
    />
  );
});

export type CommandInputProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
> & {
  containerClassName?: string;
  prefix?: ReactNode;
};

const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput(
  { className, containerClassName, prefix, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        'mx-2 my-2 flex items-center gap-2 rounded-[4rem] border border-grayscale-300 bg-white px-3 py-1.5 text-grayscale-500 transition-colors duration-200',
        'hover:border-grayscale-500 focus-within:border-primary-500',
        containerClassName,
      )}
    >
      {prefix ?? (
        <span className="flex shrink-0 items-center text-grayscale-500">
          <SearchIcon width={13} height={13} />
        </span>
      )}
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-5 w-full min-w-0 border-none bg-transparent p-0 text-sm font-normal leading-5 text-grayscale-800 outline-none',
          'placeholder:text-grayscale-400 disabled:cursor-not-allowed disabled:text-grayscale-500',
          className,
        )}
        {...props}
      />
    </div>
  );
});

export type CommandListProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
> & {
  height?: number;
};

const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(function CommandList(
  { className, height, onScroll, style, ...props },
  ref,
) {
  const localRef = useRef<ElementRef<
    typeof CommandPrimitive.List
  > | null>(null);
  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const maskImage = useMemo(
    () =>
      getMaskImage(
        scrollInfo.scrollTop,
        scrollInfo.scrollHeight,
        scrollInfo.clientHeight,
      ),
    [
      scrollInfo.clientHeight,
      scrollInfo.scrollHeight,
      scrollInfo.scrollTop,
    ],
  );

  const syncScrollInfo = () => {
    const node = localRef.current;
    if (!node) return;

    const nextValue = {
      scrollTop: node.scrollTop,
      scrollHeight: node.scrollHeight,
      clientHeight: node.clientHeight,
    };

    setScrollInfo((prev) => {
      if (
        prev.scrollTop === nextValue.scrollTop &&
        prev.scrollHeight === nextValue.scrollHeight &&
        prev.clientHeight === nextValue.clientHeight
      ) {
        return prev;
      }
      return nextValue;
    });
  };

  useEffect(() => {
    syncScrollInfo();
  });

  return (
    <CommandPrimitive.List
      ref={(
        node: ElementRef<typeof CommandPrimitive.List> | null,
      ) => {
        localRef.current = node;
        assignRef(ref, node);
      }}
      onScroll={(event) => {
        syncScrollInfo();
        onScroll?.(event);
      }}
      className={cn(
        'min-h-0 overflow-auto pb-1',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      style={{
        height: height ? `${height}px` : undefined,
        maskImage,
        WebkitMaskImage: maskImage,
        ...style,
      }}
      {...props}
    />
  );
});

export type CommandEmptyProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn(
        'px-4 py-6 text-center text-sm text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export type CommandGroupProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;

const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(function CommandGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'overflow-hidden p-1 text-grayscale-800',
        '[&_[cmdk-group-heading]]:mb-1.5 [&_[cmdk-group-heading]]:px-2.5',
        '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:leading-[1.3] [&_[cmdk-group-heading]]:text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export type CommandSeparatorProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('mx-3 h-px bg-grayscale-300', className)}
      {...props}
    />
  );
});

export type CommandItemProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;

const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(function CommandItem({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'box-border flex cursor-default items-center gap-2 rounded px-4 py-1.5 text-sm font-normal leading-[1.43] text-grayscale-800 outline-none select-none',
        'data-[selected=true]:bg-grayscale-150',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export type CommandShortcutProps = HTMLAttributes<HTMLSpanElement>;

const CommandShortcut = forwardRef<
  HTMLSpanElement,
  CommandShortcutProps
>(function CommandShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        'ml-auto text-xs font-medium tracking-wide text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export type CommandLoadingProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Loading
> & {
  indicator?: ReactNode;
};

const CommandLoading = forwardRef<
  ElementRef<typeof CommandPrimitive.Loading>,
  CommandLoadingProps
>(function CommandLoading(
  { className, children, indicator, ...props },
  ref,
) {
  return (
    <CommandPrimitive.Loading
      ref={ref}
      className={cn(
        'flex items-center justify-center px-5 py-1.5 text-grayscale-400',
        className,
      )}
      {...props}
    >
      {children ?? indicator ?? (
        <SpinnerIcon
          width={18}
          height={18}
          fill="var(--grayscale-400)"
        />
      )}
    </CommandPrimitive.Loading>
  );
});

export type CommandHeaderProps = HTMLAttributes<HTMLDivElement>;

const CommandHeader = forwardRef<HTMLDivElement, CommandHeaderProps>(
  function CommandHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('mt-1.5 px-1', className)}
        {...props}
      />
    );
  },
);

export type CommandBackButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
  };

const CommandBackButton = forwardRef<
  HTMLButtonElement,
  CommandBackButtonProps
>(function CommandBackButton(
  { className, children, icon, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'box-border flex w-full items-center gap-1 rounded px-3 py-1.5 text-left text-xs font-medium text-grayscale-500 transition-colors duration-200',
        'hover:bg-grayscale-100',
        className,
      )}
      {...props}
    >
      <span className="flex shrink-0 items-center">
        {icon ?? <ChevronLeftIcon />}
      </span>
      <span className="truncate">{children}</span>
    </button>
  );
});

export {
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandRoot,
  CommandRoot as Command,
  CommandSeparator,
  CommandShortcut,
};
