import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

export type BadgeProps = {
  variant?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'info';
  size?: 'sm' | 'md' | 'lg';
  type?: 'number' | 'text';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full font-sans font-medium text-white box-border whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary-500',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        destructive: 'bg-destructive-500',
        info: 'bg-info-500',
      },
      size: {
        sm: 'size-1.5',
        md: 'h-4 px-1.5 leading-4',
        lg: 'h-5',
      },
      type: {
        number: '',
        text: '',
      },
    },
    compoundVariants: [
      { size: 'md', type: 'number', class: 'text-xs' },
      { size: 'md', type: 'text', class: 'text-[10px]' },
      {
        size: 'lg',
        type: 'number',
        class: 'px-1.5 text-sm leading-5',
      },
      {
        size: 'lg',
        type: 'text',
        class: 'px-2 py-0.5 text-xs leading-4',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      type: 'number',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export function Badge(props: BadgeProps) {
  const {
    variant = 'primary',
    size = 'lg',
    type = 'number',
    children,
    className,
    style,
  } = props;

  if (size === 'sm') {
    return (
      <span
        role="status"
        data-slot="badge"
        data-size="sm"
        data-variant={variant}
        className={cn(badgeVariants({ variant, size }), className)}
        style={style}
      />
    );
  }

  return (
    <span
      role="status"
      data-slot="badge"
      data-size={size}
      data-variant={variant}
      data-type={type}
      className={cn(
        badgeVariants({ variant, size, type }),
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
