import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { type CvaProps, cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'>;

const Breadcrumb = function Breadcrumb({
  className,
  ref,
  ...props
}: Omit<BreadcrumbProps, 'ref'> & { ref?: Ref<ElementRef<'nav'>> }) {
  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={className}
      {...props}
    />
  );
};

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

export type BreadcrumbListVariants = VariantProps<
  typeof breadcrumbListVariants
>;

export type BreadcrumbListProps = ComponentPropsWithoutRef<'ol'> &
  CvaProps<BreadcrumbListVariants>;

const BreadcrumbList = function BreadcrumbList({
  className,
  size,
  ref,
  ...props
}: Omit<BreadcrumbListProps, 'ref'> & {
  ref?: Ref<ElementRef<'ol'>>;
}) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants({ size }), className)}
      {...props}
    />
  );
};

export type BreadcrumbItemProps = ComponentPropsWithoutRef<'li'>;

const BreadcrumbItem = function BreadcrumbItem({
  className,
  ref,
  ...props
}: Omit<BreadcrumbItemProps, 'ref'> & {
  ref?: Ref<ElementRef<'li'>>;
}) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
};

export type BreadcrumbLinkProps = useRender.ComponentProps<'a'>;

const BreadcrumbLink = function BreadcrumbLink({
  className,
  render,
  ref,
  ...linkProps
}: Omit<BreadcrumbLinkProps, 'ref'> & {
  ref?: Ref<ElementRef<'a'>>;
}) {
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
};

export type BreadcrumbPageProps = ComponentPropsWithoutRef<'span'>;

const BreadcrumbPage = function BreadcrumbPage({
  className,
  ref,
  ...props
}: Omit<BreadcrumbPageProps, 'ref'> & {
  ref?: Ref<ElementRef<'span'>>;
}) {
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
};

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<'li'>;

const BreadcrumbSeparator = function BreadcrumbSeparator({
  className,
  children,
  ref,
  ...props
}: Omit<BreadcrumbSeparatorProps, 'ref'> & {
  ref?: Ref<ElementRef<'li'>>;
}) {
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
};

export type BreadcrumbEllipsisProps =
  ComponentPropsWithoutRef<'span'>;

const BreadcrumbEllipsis = function BreadcrumbEllipsis({
  className,
  children,
  ref,
  ...props
}: Omit<BreadcrumbEllipsisProps, 'ref'> & {
  ref?: Ref<ElementRef<'span'>>;
}) {
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
};

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
