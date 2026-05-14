import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export interface TableProps
  extends ComponentPropsWithoutRef<'table'> {
  containerClassName?: string;
}

const Table = forwardRef<ElementRef<'table'>, TableProps>(
  function Table({ className, containerClassName, ...props }, ref) {
    return (
      <div
        data-slot="table-container"
        className={cn(
          'relative w-full overflow-x-auto',
          containerClassName,
        )}
      >
        <table
          ref={ref}
          data-slot="table"
          className={cn(
            'w-full caption-bottom border-collapse font-sans text-sm leading-5 text-grayscale-800',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;

const TableHeader = forwardRef<ElementRef<'thead'>, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        data-slot="table-header"
        className={cn(
          '[&_tr]:border-b [&_tr]:border-grayscale-300',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

const TableBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        data-slot="table-body"
        className={cn('[&_tr:last-child]:border-b-0', className)}
        {...props}
      />
    );
  },
);

export type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;

const TableFooter = forwardRef<ElementRef<'tfoot'>, TableFooterProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        data-slot="table-footer"
        className={cn(
          'border-t border-grayscale-300 bg-grayscale-100 font-medium [&>tr]:last:border-b-0',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableRowProps = ComponentPropsWithoutRef<'tr'>;

const TableRow = forwardRef<ElementRef<'tr'>, TableRowProps>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          'border-b border-grayscale-300 transition-colors',
          'hover:bg-grayscale-100 has-aria-expanded:bg-grayscale-100 data-[state=selected]:bg-grayscale-100',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableHeadProps = ComponentPropsWithoutRef<'th'>;

const TableHead = forwardRef<ElementRef<'th'>, TableHeadProps>(
  function TableHead({ className, ...props }, ref) {
    return (
      <th
        ref={ref}
        data-slot="table-head"
        className={cn(
          'h-8 border-r border-grayscale-300 bg-white px-3 py-1.5 text-left align-middle font-normal whitespace-nowrap text-grayscale-800 last:border-r-0',
          '[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:mx-auto',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableCellProps = ComponentPropsWithoutRef<'td'>;

const TableCell = forwardRef<ElementRef<'td'>, TableCellProps>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        data-slot="table-cell"
        className={cn(
          'h-11 border-r border-grayscale-300 px-3 py-1 align-middle whitespace-nowrap text-grayscale-800 last:border-r-0',
          '[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:mx-auto',
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;

const TableCaption = forwardRef<
  ElementRef<'caption'>,
  TableCaptionProps
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn(
        'mt-4 text-sm leading-5 text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
