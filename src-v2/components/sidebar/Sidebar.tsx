'use client';

import { Input } from '@/components/input/input/Input';
import { Separator } from '@/components/separator/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/sheet/Sheet';
import { Skeleton } from '@/components/skeleton/Skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
} from 'react';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(
  null,
);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebar must be used within a SidebarProvider.',
    );
  }
  return context;
}

export type SidebarProviderProps = ComponentPropsWithoutRef<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enableKeyboardShortcut?: boolean;
};

const SidebarProvider = forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(function SidebarProvider(
  {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    enableKeyboardShortcut = true,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState =
        typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = useCallback(() => {
    return isMobile
      ? setOpenMobile((value) => !value)
      : setOpen((value) => !value);
  }, [isMobile, setOpen]);

  useEffect(() => {
    if (!enableKeyboardShortcut) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.key !== SIDEBAR_KEYBOARD_SHORTCUT ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcut, toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    ],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delay={0}>
        <div
          ref={ref}
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});

export type SidebarProps = ComponentPropsWithoutRef<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar(
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    const { isMobile, state, openMobile, setOpenMobile } =
      useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          ref={ref}
          data-slot="sidebar"
          data-side={side}
          data-variant={variant}
          data-state={state}
          data-collapsible="none"
          className={cn(
            'group peer',
            'flex h-full min-h-0 w-full flex-col',
            'relative w-(--sidebar-width) bg-sidebar text-sidebar-foreground',
            className,
          )}
          style={style}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            className="flex h-full min-h-0 w-full flex-1 flex-col"
          >
            {children}
          </div>
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            data-variant={variant}
            data-state={state}
            data-collapsible=""
            showCloseButton={false}
            side={side}
            className={cn(
              'group w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden',
              'max-w-none gap-0 overflow-hidden border-sidebar-border shadow-none',
              'duration-500 ease-in-out data-ending-style:duration-300',
              className,
            )}
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
                ...style,
              } as CSSProperties
            }
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>
                Displays the mobile sidebar.
              </SheetDescription>
            </SheetHeader>
            <div
              ref={ref}
              data-slot="sidebar-inner"
              className={cn(
                'flex h-full min-h-0 w-full flex-col',
                'text-sidebar-foreground',
              )}
              {...props}
            >
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        className="group peer hidden text-sidebar-foreground md:block data-[side=right]:order-last"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
        data-slot="sidebar"
      >
        <div
          data-slot="sidebar-gap"
          className={cn(
            'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
              : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
          )}
        />
        <div
          ref={ref}
          data-slot="sidebar-container"
          className={cn(
            'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex md:flex-col',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
              : 'bg-sidebar group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=left]:border-sidebar-border group-data-[side=right]:border-l group-data-[side=right]:border-sidebar-border',
            className,
          )}
          style={style}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            className={cn(
              'flex h-full min-h-0 w-full flex-col',
              'flex-1 bg-sidebar group-data-[variant=floating]:overflow-hidden group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export type SidebarTriggerProps = ComponentPropsWithoutRef<'button'>;

const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(function SidebarTrigger({ className, onClick, ...props }, ref) {
  const { toggleSidebar, isMobile, open, openMobile } = useSidebar();

  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      aria-expanded={isMobile ? openMobile : open}
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-md text-sidebar-foreground outline-hidden ring-sidebar-ring transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        className,
      )}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});

export type SidebarRailProps = ComponentPropsWithoutRef<'button'>;

const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  function SidebarRail({ className, onClick, ...props }, ref) {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="rail"
        data-slot="sidebar-rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        title="Toggle Sidebar"
        className={cn(
          'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-sidebar-border sm:flex',
          'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
          '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
          'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
          '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
          '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
          className,
        )}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      />
    );
  },
);

export type SidebarInsetProps = ComponentPropsWithoutRef<'main'>;

const SidebarInset = forwardRef<HTMLElement, SidebarInsetProps>(
  function SidebarInset({ className, ...props }, ref) {
    return (
      <main
        ref={ref}
        data-slot="sidebar-inset"
        className={cn(
          'relative flex w-full flex-1 flex-col bg-background',
          'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SidebarInputProps = ComponentPropsWithoutRef<
  typeof Input
>;

const SidebarInput = forwardRef<
  ElementRef<typeof Input>,
  SidebarInputProps
>(function SidebarInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      data-slot="sidebar-input"
      appearance="ghost"
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className,
      )}
      {...props}
    />
  );
});

export type SidebarHeaderProps = ComponentPropsWithoutRef<'div'>;

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        data-sidebar="header"
        className={cn(
          'flex shrink-0 flex-col gap-2 bg-sidebar p-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SidebarFooterProps = ComponentPropsWithoutRef<'div'>;

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        data-sidebar="footer"
        className={cn(
          'flex shrink-0 flex-col gap-2 bg-sidebar p-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SidebarSeparatorProps = ComponentPropsWithoutRef<
  typeof Separator
>;

const SidebarSeparator = forwardRef<
  ElementRef<typeof Separator>,
  SidebarSeparatorProps
>(function SidebarSeparator({ className, ...props }, ref) {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  );
});

export type SidebarContentProps = ComponentPropsWithoutRef<'div'>;

const SidebarContent = forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(function SidebarContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
});

export type SidebarGroupProps = ComponentPropsWithoutRef<'div'>;

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  function SidebarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-group"
        data-sidebar="group"
        className={cn(
          'relative flex w-full min-w-0 flex-col p-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SidebarGroupLabelProps = useRender.ComponentProps<'div'>;

const SidebarGroupLabel = forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(function SidebarGroupLabel({ className, render, ...props }, ref) {
  return useRender({
    ref,
    render,
    defaultTagName: 'div',
    state: { slot: 'sidebar-group-label' },
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-grayscale-500 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
          className,
        ),
        ...({
          'data-sidebar': 'group-label',
        } as HTMLAttributes<HTMLDivElement>),
      },
      props,
    ),
  });
});

export type SidebarGroupActionProps =
  useRender.ComponentProps<'button'>;

const SidebarGroupAction = forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(function SidebarGroupAction({ className, render, ...props }, ref) {
  return useRender({
    ref,
    render,
    defaultTagName: 'button',
    state: { slot: 'sidebar-group-action' },
    props: mergeProps<'button'>(
      {
        type: render ? undefined : 'button',
        className: cn(
          'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'after:absolute after:-inset-2 md:after:hidden',
          'group-data-[collapsible=icon]:hidden',
          className,
        ),
        ...({
          'data-sidebar': 'group-action',
        } as HTMLAttributes<HTMLButtonElement>),
      },
      props,
    ),
  });
});

export type SidebarGroupContentProps =
  ComponentPropsWithoutRef<'div'>;

const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(function SidebarGroupContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
});

export type SidebarMenuProps = ComponentPropsWithoutRef<'ul'>;

const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  function SidebarMenu({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-slot="sidebar-menu"
        data-sidebar="menu"
        className={cn(
          'flex w-full min-w-0 flex-col gap-1',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SidebarMenuItemProps = ComponentPropsWithoutRef<'li'>;

const SidebarMenuItem = forwardRef<
  HTMLLIElement,
  SidebarMenuItemProps
>(function SidebarMenuItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
});

const sidebarMenuButtonVariants = cva(
  // Icon-collapse: hide label spans only — not Avatar (Base UI root is often <span data-slot=avatar>)
  'peer/menu-button relative flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-grayscale-800 ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-2! hover:bg-grayscale-200 focus-visible:ring-2 active:bg-grayscale-200 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-grayscale-200 data-[active=true]:font-medium data-[state=open]:hover:bg-grayscale-200 [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:not([data-slot=avatar])]:hidden [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-grayscale-200',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-grayscale-200 hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type SidebarMenuButtonProps =
  useRender.ComponentProps<'button'> &
    VariantProps<typeof sidebarMenuButtonVariants> & {
      isActive?: boolean;
      tooltip?:
        | string
        | ComponentPropsWithoutRef<typeof TooltipContent>;
    };

const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton(
  {
    isActive = false,
    variant = 'default',
    size = 'default',
    tooltip,
    className,
    render,
    ...props
  },
  ref,
) {
  const { isMobile, state } = useSidebar();
  const buttonClassName = cn(
    sidebarMenuButtonVariants({ variant, size }),
    className,
  );
  const dataAttrs = {
    'data-sidebar': 'menu-button',
    'data-size': size,
    'data-active': isActive,
  } as HTMLAttributes<HTMLButtonElement>;

  const view = useRender({
    ref,
    render,
    defaultTagName: 'button',
    state: { slot: 'sidebar-menu-button' },
    props: mergeProps<'button'>(
      {
        type: render ? undefined : 'button',
        className: buttonClassName,
        ...dataAttrs,
      },
      props,
    ),
  });

  if (!tooltip) {
    return view;
  }

  const tooltipProps =
    typeof tooltip === 'string' ? { children: tooltip } : tooltip;
  const { className: tooltipClassName, ...restTooltipProps } =
    tooltipProps;

  return (
    <Tooltip>
      <TooltipTrigger render={view as ReactElement} />
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        className={tooltipClassName}
        {...restTooltipProps}
      />
    </Tooltip>
  );
});

export type SidebarMenuActionProps =
  useRender.ComponentProps<'button'> & {
    showOnHover?: boolean;
  };

const SidebarMenuAction = forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(function SidebarMenuAction(
  { className, render, showOnHover = false, ...props },
  ref,
) {
  return useRender({
    ref,
    render,
    defaultTagName: 'button',
    state: { slot: 'sidebar-menu-action' },
    props: mergeProps<'button'>(
      {
        type: render ? undefined : 'button',
        className: cn(
          'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'after:absolute after:-inset-2 md:after:hidden',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          showOnHover &&
            'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0',
          className,
        ),
        ...({
          'data-sidebar': 'menu-action',
        } as HTMLAttributes<HTMLButtonElement>),
      },
      props,
    ),
  });
});

export type SidebarMenuBadgeProps = ComponentPropsWithoutRef<'div'>;

const SidebarMenuBadge = forwardRef<
  HTMLDivElement,
  SidebarMenuBadgeProps
>(function SidebarMenuBadge({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
});

export type SidebarMenuSkeletonProps =
  ComponentPropsWithoutRef<'div'> & {
    showIcon?: boolean;
    /** Skeleton bar width (CSS length). Default `70%`. */
    width?: string;
  };

const SidebarMenuSkeleton = forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(function SidebarMenuSkeleton(
  { className, showIcon = false, width = '70%', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2',
        className,
      )}
      {...props}
    >
      {showIcon ? (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      ) : null}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as CSSProperties
        }
      />
    </div>
  );
});

export type SidebarMenuSubProps = ComponentPropsWithoutRef<'ul'>;

const SidebarMenuSub = forwardRef<
  HTMLUListElement,
  SidebarMenuSubProps
>(function SidebarMenuSub({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
});

export type SidebarMenuSubItemProps = ComponentPropsWithoutRef<'li'>;

const SidebarMenuSubItem = forwardRef<
  HTMLLIElement,
  SidebarMenuSubItemProps
>(function SidebarMenuSubItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
});

export type SidebarMenuSubButtonProps =
  useRender.ComponentProps<'button'> & {
    size?: 'sm' | 'md';
    isActive?: boolean;
  };

const SidebarMenuSubButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(function SidebarMenuSubButton(
  {
    className,
    render,
    size = 'md',
    isActive = false,
    children,
    ...props
  },
  ref,
) {
  const content =
    typeof children === 'string' || typeof children === 'number' ? (
      <span>{children}</span>
    ) : (
      children
    );

  return useRender({
    ref,
    render,
    defaultTagName: 'button',
    state: { slot: 'sidebar-menu-sub-button' },
    props: mergeProps<'button'>(
      {
        type: render ? undefined : 'button',
        className: cn(
          'flex h-7 w-full min-w-0 -translate-x-px cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-grayscale-800 ring-sidebar-ring outline-hidden hover:bg-grayscale-200 focus-visible:ring-2 active:bg-grayscale-200 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
          'data-[active=true]:bg-grayscale-200 data-[active=true]:font-medium',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className,
        ),
        children: content,
        ...({
          'data-sidebar': 'menu-sub-button',
          'data-size': size,
          'data-active': isActive,
        } as HTMLAttributes<HTMLButtonElement>),
      },
      props,
    ),
  });
});

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
