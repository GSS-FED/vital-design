import { cn } from '@/lib/utils';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

export interface TableProps
  extends ComponentPropsWithoutRef<'table'> {
  containerClassName?: string;
  /**
   * Ref to the scroll container that wraps the table. The container owns the
   * horizontal scroll, so scroll listeners, IntersectionObserver roots, and
   * scroll-position restore need this rather than the `<table>` ref.
   */
  containerRef?: Ref<HTMLDivElement>;
  /**
   * 斑馬紋：為 `tbody` 的隔行加上底色。`true` 等同 `'even'`（第 2、4… 列上色）。
   * 底色以 `--table-stripe` 覆寫，hover / selected 底色以 `--table-row-hover` 覆寫，
   * 例：`<Table striped className="[--table-stripe:var(--primary-50)]" />`
   */
  striped?: boolean | 'odd' | 'even';
}

const Table = function Table({
  className,
  containerClassName,
  containerRef,
  striped,
  ref,
  ...props
}: Omit<TableProps, 'ref'> & { ref?: Ref<ElementRef<'table'>> }) {
  const stripe =
    striped === true
      ? 'even'
      : striped === false
        ? undefined
        : striped;

  return (
    <div
      ref={containerRef}
      data-slot="table-container"
      className={cn(
        'relative w-full overflow-x-auto',
        containerClassName,
      )}
    >
      <table
        ref={ref}
        data-slot="table"
        data-striped={stripe}
        className={cn(
          'w-full caption-bottom border-collapse font-sans text-sm leading-5 text-grayscale-opacity-800',
          stripe &&
            '[--table-row-hover:var(--grayscale-opacity-200)]',
          stripe === 'odd' &&
            '[&>tbody>tr:nth-child(odd)]:[--table-row-bg:var(--table-stripe,var(--grayscale-opacity-100))]',
          stripe === 'even' &&
            '[&>tbody>tr:nth-child(even)]:[--table-row-bg:var(--table-stripe,var(--grayscale-opacity-100))]',
          className,
        )}
        {...props}
      />
    </div>
  );
};

export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;

const TableHeader = function TableHeader({
  className,
  ref,
  ...props
}: Omit<TableHeaderProps, 'ref'> & {
  ref?: Ref<ElementRef<'thead'>>;
}) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn(
        '[&_tr]:border-b [&_tr]:border-grayscale-opacity-300',
        '[&_tr]:hover:bg-transparent [&_tr]:has-aria-expanded:bg-transparent',
        className,
      )}
      {...props}
    />
  );
};

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

const TableBody = function TableBody({
  className,
  ref,
  ...props
}: Omit<TableBodyProps, 'ref'> & { ref?: Ref<ElementRef<'tbody'>> }) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-b-0', className)}
      {...props}
    />
  );
};

export type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;

const TableFooter = function TableFooter({
  className,
  ref,
  ...props
}: Omit<TableFooterProps, 'ref'> & {
  ref?: Ref<ElementRef<'tfoot'>>;
}) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        'border-t border-grayscale-opacity-300 bg-grayscale-opacity-100 font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
};

export type TableRowProps = ComponentPropsWithoutRef<'tr'>;

const TableRow = function TableRow({
  className,
  ref,
  ...props
}: Omit<TableRowProps, 'ref'> & { ref?: Ref<ElementRef<'tr'>> }) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        'border-b border-grayscale-opacity-300 bg-[var(--table-row-bg,transparent)] transition-colors',
        'hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))] has-aria-expanded:bg-[var(--table-row-hover,var(--grayscale-opacity-100))] data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]',
        className,
      )}
      {...props}
    />
  );
};

export type TableHeadProps = ComponentPropsWithoutRef<'th'>;

const TableHead = function TableHead({
  className,
  ref,
  ...props
}: Omit<TableHeadProps, 'ref'> & { ref?: Ref<ElementRef<'th'>> }) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        'relative h-8 border-r border-grayscale-opacity-300 bg-white px-3 py-1.5 text-left align-middle font-normal whitespace-nowrap text-grayscale-opacity-800 last:border-r-0',
        '[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:mx-auto',
        className,
      )}
      {...props}
    />
  );
};

export type TableCellProps = ComponentPropsWithoutRef<'td'>;

const TableCell = function TableCell({
  className,
  ref,
  ...props
}: Omit<TableCellProps, 'ref'> & { ref?: Ref<ElementRef<'td'>> }) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        'h-11 border-r border-grayscale-opacity-300 px-3 py-1 align-middle whitespace-nowrap text-grayscale-opacity-800 last:border-r-0',
        '[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:mx-auto',
        className,
      )}
      {...props}
    />
  );
};

export type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;

const TableCaption = function TableCaption({
  className,
  ref,
  ...props
}: Omit<TableCaptionProps, 'ref'> & {
  ref?: Ref<ElementRef<'caption'>>;
}) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn(
        'mt-4 text-sm leading-5 text-grayscale-opacity-500',
        className,
      )}
      {...props}
    />
  );
};

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
