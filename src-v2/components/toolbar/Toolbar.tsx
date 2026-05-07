import { Separator } from '@/components/separator/Separator';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const toolbarVariants = cva(
  'flex w-full flex-wrap items-center gap-2 font-sans text-sm leading-5 text-grayscale-800',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        bar: 'bg-grayscale-50',
        outline: 'border-b border-grayscale-200 bg-white',
      },
      size: {
        default: 'px-4 py-3',
        sm: 'px-3 py-2',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToolbarVariants = VariantProps<typeof toolbarVariants>;

export type ToolbarProps = ComponentPropsWithoutRef<'div'> &
  ToolbarVariants;

const Toolbar = forwardRef<ElementRef<'div'>, ToolbarProps>(
  function Toolbar(
    {
      'aria-orientation': ariaOrientation = 'horizontal',
      className,
      role = 'toolbar',
      size = 'default',
      variant = 'default',
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role={role}
        aria-orientation={ariaOrientation}
        data-slot="toolbar"
        data-variant={variant}
        className={cn(toolbarVariants({ size, variant }), className)}
        {...props}
      />
    );
  },
);

export type ToolbarGroupProps = ComponentPropsWithoutRef<'div'>;

const ToolbarGroup = forwardRef<ElementRef<'div'>, ToolbarGroupProps>(
  function ToolbarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="toolbar-group"
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  },
);

export type ToolbarSpacerProps = ComponentPropsWithoutRef<'div'>;

const ToolbarSpacer = forwardRef<
  ElementRef<'div'>,
  ToolbarSpacerProps
>(function ToolbarSpacer({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-slot="toolbar-spacer"
      className={cn('flex-1', className)}
      {...props}
    />
  );
});

export type ToolbarSeparatorProps = ComponentPropsWithoutRef<
  typeof Separator
>;

const ToolbarSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ToolbarSeparatorProps
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <Separator
      ref={ref}
      orientation="vertical"
      data-slot="toolbar-separator"
      className={cn('mx-1 h-5 self-center', className)}
      {...props}
    />
  );
});

export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarSpacer };
