import { Separator } from '@/components/separator/Separator';
import { type CvaProps, cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

const toolbarVariants = cva(
  'flex w-full flex-wrap items-center gap-2 font-sans text-sm leading-5 text-grayscale-opacity-800',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        bar: 'bg-grayscale-100',
        outline: 'border-b border-grayscale-opacity-200 bg-white',
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
  CvaProps<ToolbarVariants>;

const Toolbar = function Toolbar({
  'aria-orientation': ariaOrientation = 'horizontal',
  className,
  role = 'toolbar',
  size = 'default',
  variant = 'default',
  ref,
  ...props
}: Omit<ToolbarProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
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
};

export type ToolbarGroupProps = ComponentPropsWithoutRef<'div'>;

const ToolbarGroup = function ToolbarGroup({
  className,
  ref,
  ...props
}: Omit<ToolbarGroupProps, 'ref'> & {
  ref?: Ref<ElementRef<'div'>>;
}) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="toolbar-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
};

export type ToolbarSpacerProps = ComponentPropsWithoutRef<'div'>;

const ToolbarSpacer = function ToolbarSpacer({
  className,
  ref,
  ...props
}: Omit<ToolbarSpacerProps, 'ref'> & {
  ref?: Ref<ElementRef<'div'>>;
}) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-slot="toolbar-spacer"
      className={cn('flex-1', className)}
      {...props}
    />
  );
};

export type ToolbarSeparatorProps = ComponentPropsWithoutRef<
  typeof Separator
>;

const ToolbarSeparator = function ToolbarSeparator({
  className,
  ref,
  ...props
}: Omit<ToolbarSeparatorProps, 'ref'> & {
  ref?: Ref<ElementRef<typeof Separator>>;
}) {
  return (
    <Separator
      ref={ref}
      orientation="vertical"
      data-slot="toolbar-separator"
      className={cn('mx-1 h-5 self-center', className)}
      {...props}
    />
  );
};

export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarSpacer };
