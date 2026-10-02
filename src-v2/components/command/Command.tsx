import { Spinner } from '@/components/spinner/Spinner';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { forwardRef } from 'react';
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

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
      data-slot="command"
      className={cn(
        'box-border flex w-full flex-col overflow-hidden rounded bg-white font-sans text-sm text-grayscale-opacity-800 shadow-emphasis',
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
      data-slot="command-input"
      className={cn(
        'mx-2 my-2 flex items-center gap-2 rounded-[4rem] border border-grayscale-opacity-300 bg-white px-3 py-1.5 text-grayscale-opacity-500 transition-colors duration-200',
        'hover:border-grayscale-opacity-500 focus-within:border-primary-500',
        containerClassName,
      )}
    >
      {prefix ?? (
        <span
          data-slot="command-input-prefix"
          className="flex shrink-0 items-center text-grayscale-opacity-500"
        >
          <SearchIcon className="size-[13px]" />
        </span>
      )}
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input-control"
        className={cn(
          'flex h-5 w-full min-w-0 border-none bg-transparent p-0 text-sm font-normal leading-5 text-grayscale-opacity-800 outline-none',
          'placeholder:text-grayscale-opacity-400 disabled:cursor-not-allowed disabled:text-grayscale-opacity-500',
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
  const listStyle =
    height === undefined
      ? style
      : {
          height: `${height}px`,
          ...style,
        };

  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-list"
      onScroll={onScroll}
      className={cn(
        'min-h-0 overflow-auto pb-1',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      style={listStyle}
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
      data-slot="command-empty"
      className={cn(
        'px-4 py-6 text-center text-sm text-grayscale-opacity-500',
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
      data-slot="command-group"
      className={cn(
        'overflow-hidden p-1 text-grayscale-opacity-800',
        '[&_[cmdk-group-heading]]:mb-1.5 [&_[cmdk-group-heading]]:px-2.5',
        '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:leading-[1.3] [&_[cmdk-group-heading]]:text-grayscale-opacity-500',
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
      data-slot="command-separator"
      className={cn('mx-3 h-px bg-grayscale-opacity-300', className)}
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
      data-slot="command-item"
      className={cn(
        'box-border flex cursor-default items-center gap-2 rounded px-4 py-1.5 text-sm font-normal leading-[1.43] text-grayscale-opacity-800 outline-none select-none',
        'data-[selected=true]:bg-grayscale-opacity-150',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:text-grayscale-opacity-500',
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
      data-slot="command-shortcut"
      className={cn(
        'ml-auto text-xs font-medium tracking-wide text-grayscale-opacity-500',
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
      data-slot="command-loading"
      className={cn(
        'flex items-center justify-center px-5 py-1.5 text-grayscale-opacity-400',
        className,
      )}
      {...props}
    >
      {children ?? indicator ?? (
        <Spinner className="size-[18px] text-grayscale-opacity-400" />
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
        data-slot="command-header"
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
      data-slot="command-back-button"
      className={cn(
        'box-border flex w-full items-center gap-1 rounded px-3 py-1.5 text-left text-xs font-medium text-grayscale-opacity-500 transition-colors duration-200',
        'hover:bg-grayscale-opacity-100',
        className,
      )}
      {...props}
    >
      <span
        data-slot="command-back-button-icon"
        className="flex shrink-0 items-center"
      >
        {icon ?? <ChevronLeftIcon />}
      </span>
      <span
        data-slot="command-back-button-label"
        className="truncate"
      >
        {children}
      </span>
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
