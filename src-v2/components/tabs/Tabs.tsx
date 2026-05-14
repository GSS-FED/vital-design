import { cn } from '@/lib/utils';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type TabsVariant = 'underline' | 'pill';

export type TabsProps = ComponentPropsWithoutRef<
  typeof BaseTabs.Root
> & {
  variant?: TabsVariant;
};

const Tabs = forwardRef<ElementRef<typeof BaseTabs.Root>, TabsProps>(
  function Tabs(
    {
      className,
      orientation = 'horizontal',
      variant = 'underline',
      ...props
    },
    ref,
  ) {
    return (
      <BaseTabs.Root
        ref={ref}
        orientation={orientation}
        data-slot="tabs"
        data-variant={variant}
        className={cn(
          'group/tabs font-sans',
          variant === 'underline' &&
            'text-base leading-4 text-grayscale-700',
          variant === 'pill' && 'text-sm leading-5',
          orientation === 'vertical' && 'flex items-start',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TabsListProps = ComponentPropsWithoutRef<
  typeof BaseTabs.List
> & {
  bordered?: boolean;
};

const TabsList = forwardRef<
  ElementRef<typeof BaseTabs.List>,
  TabsListProps
>(function TabsList({ bordered = false, className, ...props }, ref) {
  return (
    <BaseTabs.List
      ref={ref}
      data-slot="tabs-list"
      data-bordered={bordered ? '' : undefined}
      className={cn(
        'group/tabs-list relative flex shrink-0',
        'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:h-[27px] group-data-[variant=underline]/tabs:data-[orientation=horizontal]:items-start group-data-[variant=underline]/tabs:data-[orientation=horizontal]:gap-6',
        'group-data-[variant=underline]/tabs:data-[orientation=vertical]:w-[148px] group-data-[variant=underline]/tabs:data-[orientation=vertical]:flex-col group-data-[variant=underline]/tabs:data-[orientation=vertical]:items-stretch',
        'group-data-[variant=pill]/tabs:flex-wrap group-data-[variant=pill]/tabs:items-center group-data-[variant=pill]/tabs:gap-2',
        bordered &&
          'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:h-[47px] group-data-[variant=underline]/tabs:data-[orientation=horizontal]:items-start group-data-[variant=underline]/tabs:data-[orientation=horizontal]:border-b group-data-[variant=underline]/tabs:data-[orientation=horizontal]:border-grayscale-200 group-data-[variant=underline]/tabs:data-[orientation=horizontal]:pl-3 group-data-[variant=underline]/tabs:data-[orientation=horizontal]:pt-4',
        bordered &&
          'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:gap-4 group-data-[variant=underline]/tabs:data-[orientation=vertical]:border-r group-data-[variant=underline]/tabs:data-[orientation=vertical]:border-grayscale-200 group-data-[variant=underline]/tabs:data-[orientation=vertical]:pt-3',
        className,
      )}
      {...props}
    />
  );
});

export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof BaseTabs.Tab
>;

const TabsTrigger = forwardRef<
  ElementRef<typeof BaseTabs.Tab>,
  TabsTriggerProps
>(function TabsTrigger(
  { className, type = 'button', ...props },
  ref,
) {
  return (
    <BaseTabs.Tab
      ref={ref}
      type={type}
      data-slot="tabs-trigger"
      className={cn(
        'relative flex shrink-0 items-center justify-center outline-none transition-colors duration-100 cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        'focus-visible:shadow-focus-primary',
        'group-data-[variant=underline]/tabs:gap-1 group-data-[variant=underline]/tabs:text-base/4 group-data-[variant=underline]/tabs:font-medium',
        'group-data-[variant=underline]/tabs:hover:not-disabled:not-data-[disabled]:text-primary-500',
        'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:px-1 group-data-[variant=underline]/tabs:data-[orientation=horizontal]:text-center',
        'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:data-[active]:text-primary-500',
        'group-data-[variant=underline]/tabs:data-[orientation=horizontal]:not-data-[active]:text-grayscale-600',
        'group-data-[variant=underline]/tabs:data-[orientation=vertical]:w-full group-data-[variant=underline]/tabs:data-[orientation=vertical]:justify-between group-data-[variant=underline]/tabs:data-[orientation=vertical]:px-2 group-data-[variant=underline]/tabs:data-[orientation=vertical]:py-3 group-data-[variant=underline]/tabs:data-[orientation=vertical]:text-left',
        'group-data-[variant=underline]/tabs:data-[orientation=vertical]:data-[active]:text-primary-500',
        'group-data-[variant=underline]/tabs:data-[orientation=vertical]:not-data-[active]:text-grayscale-700',
        'group-data-[bordered]/tabs-list:font-normal',
        'group-data-[bordered]/tabs-list:data-[orientation=horizontal]:gap-3',
        'group-data-[bordered]/tabs-list:data-[orientation=horizontal]:not-data-[active]:text-grayscale-700',
        'group-data-[variant=pill]/tabs:gap-1 group-data-[variant=pill]/tabs:rounded-sm group-data-[variant=pill]/tabs:px-2 group-data-[variant=pill]/tabs:py-1.5 group-data-[variant=pill]/tabs:text-sm group-data-[variant=pill]/tabs:leading-5 group-data-[variant=pill]/tabs:font-normal group-data-[variant=pill]/tabs:text-grayscale-800',
        'group-data-[variant=pill]/tabs:hover:bg-grayscale-200',
        'group-data-[variant=pill]/tabs:data-[active]:bg-primary-50 group-data-[variant=pill]/tabs:data-[active]:text-primary-500',
        className,
      )}
      {...props}
    />
  );
});

export type TabsIndicatorProps = ComponentPropsWithoutRef<
  typeof BaseTabs.Indicator
>;

const TabsIndicator = forwardRef<
  ElementRef<typeof BaseTabs.Indicator>,
  TabsIndicatorProps
>(function TabsIndicator({ className, ...props }, ref) {
  return (
    <BaseTabs.Indicator
      ref={ref}
      data-slot="tabs-indicator"
      className={cn(
        'absolute bg-primary-500 transition-all duration-150',
        'data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:left-[var(--active-tab-left)] data-[orientation=horizontal]:h-[3px] data-[orientation=horizontal]:w-[var(--active-tab-width)] data-[orientation=horizontal]:rounded-t-[1.5px]',
        'data-[orientation=vertical]:top-[var(--active-tab-top)] data-[orientation=vertical]:right-0 data-[orientation=vertical]:h-[var(--active-tab-height)] data-[orientation=vertical]:w-[3px] data-[orientation=vertical]:rounded-l-[1.5px]',
        'group-data-[variant=pill]/tabs:hidden',
        className,
      )}
      {...props}
    />
  );
});

export type TabsContentProps = ComponentPropsWithoutRef<
  typeof BaseTabs.Panel
>;

const TabsContent = forwardRef<
  ElementRef<typeof BaseTabs.Panel>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  return (
    <BaseTabs.Panel
      ref={ref}
      data-slot="tabs-content"
      className={cn(
        'mt-4 font-sans text-sm leading-5 text-grayscale-700 outline-none focus-visible:shadow-focus-primary',
        'data-[orientation=vertical]:mt-0 data-[orientation=vertical]:ml-4 data-[orientation=vertical]:flex-1',
        className,
      )}
      {...props}
    />
  );
});

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
