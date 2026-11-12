'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { PageFirstIcon } from '@/icons/PageFirstIcon';
import { PageLastIcon } from '@/icons/PageLastIcon';
import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';

export type PaginationProps = ComponentProps<'nav'>;

const Pagination = function Pagination({
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto w-full flex justify-center', className)}
      {...props}
    />
  );
};

export type PaginationContentProps = ComponentProps<'ul'>;

const PaginationContent = function PaginationContent({
  className,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
};

export type PaginationItemProps = ComponentProps<'li'>;

const PaginationItem = function PaginationItem({
  ...props
}: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
};

export type PaginationLinkProps = useRender.ComponentProps<'a'> & {
  isActive?: boolean;
  disabled?: boolean;
};

function preventActivation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  event.stopPropagation();
}

const PaginationLink = function PaginationLink({
  className,
  disabled = false,
  href,
  isActive = false,
  render,
  tabIndex,
  ...props
}: PaginationLinkProps) {
  return useRender({
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
};

export type PaginationPreviousProps = PaginationLinkProps;

const PaginationPrevious = function PaginationPrevious({
  children,
  className,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      className={cn('me-1', className)}
      {...props}
    >
      <ChevronLeftIcon
        data-slot="pagination-icon"
        className="size-3 rtl:rotate-180"
      />
      {children}
    </PaginationLink>
  );
};

export type PaginationNextProps = PaginationLinkProps;

const PaginationNext = function PaginationNext({
  children,
  className,
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      data-slot="pagination-next"
      className={cn('ms-1', className)}
      {...props}
    >
      {children}
      <ChevronRightIcon
        data-slot="pagination-icon"
        className="size-3 rtl:rotate-180"
      />
    </PaginationLink>
  );
};

export type PaginationFirstProps = PaginationLinkProps;

const PaginationFirst = function PaginationFirst({
  children,
  ...props
}: PaginationFirstProps) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      data-slot="pagination-first"
      {...props}
    >
      <PageFirstIcon
        data-slot="pagination-icon"
        className="size-[18px] rtl:rotate-180"
      />
      {children}
    </PaginationLink>
  );
};

export type PaginationLastProps = PaginationLinkProps;

const PaginationLast = function PaginationLast({
  children,
  ...props
}: PaginationLastProps) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      data-slot="pagination-last"
      {...props}
    >
      {children}
      <PageLastIcon
        data-slot="pagination-icon"
        className="size-[18px] rtl:rotate-180"
      />
    </PaginationLink>
  );
};

export type PaginationEllipsisProps = {
  /** Hidden page numbers shown in the menu. */
  pages?: number[];
  onPageSelect?: (page: number) => void;
  className?: string;
  /** Accessible name. Defaults to “More pages”. */
  children?: ReactNode;
};

const PaginationEllipsis = function PaginationEllipsis({
  children,
  className,
  pages = [],
  onPageSelect,
}: PaginationEllipsisProps) {
  const label =
    typeof children === 'string' ? children : 'More pages';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        data-slot="pagination-ellipsis"
        aria-label={label}
        className={cn(
          'inline-flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full text-grayscale-opacity-600 outline-none hover:bg-grayscale-opacity-200 focus-visible:shadow-focus-primary',
          className,
        )}
      >
        <EllipsisIcon className="size-[18px] [&_path]:[fill-opacity:1]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="max-h-60 min-w-16 overflow-y-auto"
      >
        {pages.map((value) => (
          <DropdownMenuItem
            key={value}
            onClick={() => onPageSelect?.(value)}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
