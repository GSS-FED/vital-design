import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'>;

const Breadcrumb = forwardRef<ElementRef<'nav'>, BreadcrumbProps>(
  function Breadcrumb({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        data-slot="breadcrumb"
        className={className}
        {...props}
      />
    );
  },
);

const breadcrumbListVariants = cva(
  'flex flex-wrap items-center gap-2 break-words font-sans text-grayscale-500',
  {
    variants: {
      size: {
        sm: 'text-sm leading-5 font-normal [&_[data-slot=breadcrumb-separator]>svg]:size-3.5',
        lg: 'text-xl leading-8 font-medium [&_[data-slot=breadcrumb-separator]>svg]:size-4',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export type BreadcrumbListProps = ComponentPropsWithoutRef<'ol'> &
  VariantProps<typeof breadcrumbListVariants>;

const BreadcrumbList = forwardRef<
  ElementRef<'ol'>,
  BreadcrumbListProps
>(function BreadcrumbList({ className, size, ...props }, ref) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants({ size }), className)}
      {...props}
    />
  );
});

export type BreadcrumbItemProps = ComponentPropsWithoutRef<'li'>;

const BreadcrumbItem = forwardRef<
  ElementRef<'li'>,
  BreadcrumbItemProps
>(function BreadcrumbItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
});

export type BreadcrumbLinkProps = useRender.ComponentProps<'a'>;

const BreadcrumbLink = forwardRef<
  ElementRef<'a'>,
  BreadcrumbLinkProps
>(function BreadcrumbLink({ className, render, ...linkProps }, ref) {
  return useRender({
    ref,
    render,
    defaultTagName: 'a',
    state: { slot: 'breadcrumb-link' },
    props: mergeProps<'a'>(
      {
        className: cn(
          'cursor-pointer rounded-xs text-grayscale-500 outline-none transition-colors duration-200',
          'hover:text-primary-500',
          'focus-visible:shadow-focus-primary',
          className,
        ),
      },
      linkProps,
    ),
  });
});

export type BreadcrumbPageProps = ComponentPropsWithoutRef<'span'>;

const BreadcrumbPage = forwardRef<
  ElementRef<'span'>,
  BreadcrumbPageProps
>(function BreadcrumbPage({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn('text-grayscale-900', className)}
      {...props}
    />
  );
});

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<'li'>;

const BreadcrumbSeparator = forwardRef<
  ElementRef<'li'>,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator(
  { className, children, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn(
        'inline-flex items-center justify-center text-grayscale-500 [&>svg]:size-3.5',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
});

export type BreadcrumbEllipsisProps =
  ComponentPropsWithoutRef<'span'>;

const BreadcrumbEllipsis = forwardRef<
  ElementRef<'span'>,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(
  { className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn(
        'inline-flex size-5 items-center justify-center text-grayscale-500 [&>svg]:size-3.5',
        className,
      )}
      {...props}
    >
      {children ?? <EllipsisIcon />}
      <span className="sr-only">More</span>
    </span>
  );
});

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
