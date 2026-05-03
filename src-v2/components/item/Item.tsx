import { Separator } from '@/components/separator/Separator';
import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

type ItemGroupContextValue = {
  itemRole?: string;
};

const ItemGroupContext = createContext<ItemGroupContextValue | null>(
  null,
);

const itemVariants = cva(
  [
    'group/item box-border flex flex-wrap items-center border border-transparent',
    'font-sans text-sm leading-5 text-grayscale-800 outline-none transition-colors duration-200',
    'focus-visible:shadow-focus-primary',
    'hover:bg-grayscale-100 active:bg-grayscale-200',
    'data-[highlighted]:bg-grayscale-100 data-[active]:bg-grayscale-200',
    'data-[current]:text-primary-500 aria-current:text-primary-500',
    'data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-500',
    'aria-disabled:pointer-events-none aria-disabled:text-grayscale-500',
    'disabled:pointer-events-none disabled:text-grayscale-500',
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-grayscale-300 bg-white',
        muted: 'bg-grayscale-100',
      },
      size: {
        default: 'gap-4 rounded p-4',
        sm: 'gap-3 rounded px-4 py-3',
        xs: 'gap-2 rounded px-3 py-2',
        list: 'min-h-8 gap-2 rounded-none px-5 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;

export type ItemProps = useRender.ComponentProps<'div'> &
  ItemVariants;

const Item = forwardRef<ElementRef<'div'>, ItemProps>(
  function Item(props, ref) {
    const {
      className,
      render,
      role: roleProp,
      size = 'default',
      variant = 'default',
      ...itemProps
    } = props;
    const context = useContext(ItemGroupContext);
    const role = roleProp ?? (render ? undefined : context?.itemRole);

    return useRender({
      ref,
      render,
      defaultTagName: 'div',
      state: {
        size,
        slot: 'item',
        variant,
      },
      props: mergeProps<'div'>(
        {
          className: cn(itemVariants({ size, variant }), className),
          role,
        },
        itemProps,
      ),
    });
  },
);

export type ItemGroupProps = ComponentPropsWithoutRef<'div'>;

const ItemGroup = forwardRef<ElementRef<'div'>, ItemGroupProps>(
  function ItemGroup({ className, role = 'list', ...props }, ref) {
    return (
      <ItemGroupContext.Provider
        value={{ itemRole: role === 'list' ? 'listitem' : undefined }}
      >
        <div
          ref={ref}
          role={role}
          data-slot="item-group"
          className={cn('group/item-group flex flex-col', className)}
          {...props}
        />
      </ItemGroupContext.Provider>
    );
  },
);

export type ItemSeparatorProps = ComponentPropsWithoutRef<
  typeof Separator
>;

const ItemSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ItemSeparatorProps
>(function ItemSeparator({ className, ...props }, ref) {
  return (
    <Separator
      ref={ref}
      data-slot="item-separator"
      className={cn('bg-grayscale-200', className)}
      {...props}
    />
  );
});

const itemMediaVariants = cva(
  [
    'flex shrink-0 items-center justify-center gap-2',
    'group-has-[[data-slot=item-description]]/item:self-start',
    'group-has-[[data-slot=item-description]]/item:translate-y-0.5',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: [
          'size-5 text-inherit',
          '[&_svg:not([class*=size-])]:size-5',
        ],
        image:
          'size-8 overflow-hidden rounded-full [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ItemMediaVariants = VariantProps<
  typeof itemMediaVariants
>;

export type ItemMediaProps = ComponentPropsWithoutRef<'div'> &
  ItemMediaVariants;

const ItemMedia = forwardRef<ElementRef<'div'>, ItemMediaProps>(
  function ItemMedia(
    { className, variant = 'default', ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="item-media"
        data-variant={variant}
        className={cn(itemMediaVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

export type ItemContentProps = ComponentPropsWithoutRef<'div'>;

const ItemContent = forwardRef<ElementRef<'div'>, ItemContentProps>(
  function ItemContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-content"
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-1',
          '[&+[data-slot=item-content]]:flex-none',
          className,
        )}
        {...props}
      />
    );
  },
);

export type ItemTitleProps = ComponentPropsWithoutRef<'div'>;

const ItemTitle = forwardRef<ElementRef<'div'>, ItemTitleProps>(
  function ItemTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-title"
        className={cn(
          'flex min-w-0 items-center gap-2 text-sm leading-5 font-normal text-inherit',
          className,
        )}
        {...props}
      />
    );
  },
);

export type ItemDescriptionProps = ComponentPropsWithoutRef<'p'>;

const ItemDescription = forwardRef<
  ElementRef<'p'>,
  ItemDescriptionProps
>(function ItemDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="item-description"
      className={cn(
        'm-0 line-clamp-2 break-anywhere text-sm leading-5 font-normal text-grayscale-500',
        'group-data-[current]/item:text-primary-500',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-500',
        className,
      )}
      {...props}
    />
  );
});

export type ItemActionsProps = ComponentPropsWithoutRef<'div'>;

const ItemActions = forwardRef<ElementRef<'div'>, ItemActionsProps>(
  function ItemActions({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-actions"
        className={cn('ml-auto flex items-center gap-2', className)}
        {...props}
      />
    );
  },
);

export type ItemHeaderProps = ComponentPropsWithoutRef<'div'>;

const ItemHeader = forwardRef<ElementRef<'div'>, ItemHeaderProps>(
  function ItemHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-header"
        className={cn(
          'flex basis-full items-center justify-between gap-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export type ItemFooterProps = ComponentPropsWithoutRef<'div'>;

const ItemFooter = forwardRef<ElementRef<'div'>, ItemFooterProps>(
  function ItemFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-footer"
        className={cn(
          'flex basis-full items-center justify-between gap-2',
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
};
