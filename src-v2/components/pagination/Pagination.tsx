'use client';

import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { PageFirstIcon } from '@/icons/PageFirstIcon';
import { PageLastIcon } from '@/icons/PageLastIcon';
import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  MouseEvent,
} from 'react';

export type PaginationProps = ComponentPropsWithoutRef<'nav'>;

const Pagination = forwardRef<ElementRef<'nav'>, PaginationProps>(
  function Pagination({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="pagination"
        data-slot="pagination"
        className={cn('flex w-fit items-center font-sans', className)}
        {...props}
      />
    );
  },
);

export type PaginationContentProps = ComponentPropsWithoutRef<'ul'>;

const PaginationContent = forwardRef<
  ElementRef<'ul'>,
  PaginationContentProps
>(function PaginationContent({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn(
        'm-0 flex list-none items-center gap-1 p-0',
        className,
      )}
      {...props}
    />
  );
});

export type PaginationItemProps = ComponentPropsWithoutRef<'li'>;

const PaginationItem = forwardRef<
  ElementRef<'li'>,
  PaginationItemProps
>(function PaginationItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="pagination-item"
      className={cn('inline-flex', className)}
      {...props}
    />
  );
});

export type PaginationLinkProps = useRender.ComponentProps<'a'> & {
  isActive?: boolean;
  disabled?: boolean;
};

function preventActivation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  event.stopPropagation();
}

const PaginationLink = forwardRef<
  ElementRef<'a'>,
  PaginationLinkProps
>(function PaginationLink(
  {
    className,
    disabled = false,
    href,
    isActive = false,
    render,
    tabIndex,
    ...props
  },
  ref,
) {
  return useRender({
    ref,
    render,
    defaultTagName: 'a',
    state: { slot: 'pagination-link', active: isActive, disabled },
    props: {
      ...props,
      href: disabled ? undefined : href,
      tabIndex: disabled ? -1 : tabIndex,
      role: props.role ?? (disabled && !render ? 'link' : undefined),
      'aria-current': isActive ? 'page' : props['aria-current'],
      'aria-disabled': disabled || props['aria-disabled'],
      onClickCapture: disabled
        ? preventActivation
        : props.onClickCapture,
      onAuxClickCapture: disabled
        ? preventActivation
        : props.onAuxClickCapture,
      className: cn(
        'box-border inline-flex h-[30px] min-w-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full px-2 py-1.5 font-sans text-sm leading-[18px] font-normal whitespace-nowrap text-grayscale-opacity-600 outline-none transition-colors',
        'hover:bg-grayscale-opacity-200 focus-visible:shadow-focus-primary',
        '[&_[data-slot=pagination-icon]]:shrink-0',
        isActive &&
          'bg-grayscale-opacity-600 text-white hover:bg-grayscale-opacity-600',
        disabled &&
          'cursor-not-allowed text-grayscale-opacity-300 hover:bg-transparent',
        className,
      ),
    },
  });
});

export type PaginationPreviousProps = PaginationLinkProps;

const PaginationPrevious = forwardRef<
  ElementRef<'a'>,
  PaginationPreviousProps
>(function PaginationPrevious(
  { children, className, ...props },
  ref,
) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      className={cn('me-1 px-1.5', className)}
      {...props}
    >
      <ChevronLeftIcon
        data-slot="pagination-icon"
        className="size-3 rtl:rotate-180"
      />
      {children}
    </PaginationLink>
  );
});

export type PaginationNextProps = PaginationLinkProps;

const PaginationNext = forwardRef<
  ElementRef<'a'>,
  PaginationNextProps
>(function PaginationNext({ children, className, ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      data-slot="pagination-next"
      className={cn('ms-1 px-1.5', className)}
      {...props}
    >
      {children}
      <ChevronRightIcon
        data-slot="pagination-icon"
        className="size-3 rtl:rotate-180"
      />
    </PaginationLink>
  );
});

export type PaginationFirstProps = PaginationLinkProps;

const PaginationFirst = forwardRef<
  ElementRef<'a'>,
  PaginationFirstProps
>(function PaginationFirst({ children, className, ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to first page"
      data-slot="pagination-first"
      className={cn('px-1.5', className)}
      {...props}
    >
      <PageFirstIcon
        data-slot="pagination-icon"
        className="size-[18px] rtl:rotate-180"
      />
      {children}
    </PaginationLink>
  );
});

export type PaginationLastProps = PaginationLinkProps;

const PaginationLast = forwardRef<
  ElementRef<'a'>,
  PaginationLastProps
>(function PaginationLast({ children, className, ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to last page"
      data-slot="pagination-last"
      className={cn('px-1.5', className)}
      {...props}
    >
      {children}
      <PageLastIcon
        data-slot="pagination-icon"
        className="size-[18px] rtl:rotate-180"
      />
    </PaginationLink>
  );
});

export type PaginationEllipsisProps =
  ComponentPropsWithoutRef<'span'>;

const PaginationEllipsis = forwardRef<
  ElementRef<'span'>,
  PaginationEllipsisProps
>(function PaginationEllipsis(
  { children, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="pagination-ellipsis"
      className={cn(
        'inline-flex size-[30px] shrink-0 items-center justify-center text-grayscale-opacity-600',
        className,
      )}
      {...props}
    >
      <EllipsisIcon className="size-[18px]" />
      <span className="sr-only">{children ?? 'More pages'}</span>
    </span>
  );
});

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
