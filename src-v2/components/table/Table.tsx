import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
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

const Table = forwardRef<ElementRef<'table'>, TableProps>(
  function Table(
    { className, containerClassName, containerRef, striped, ...props },
    ref,
  ) {
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
          '[&_tr]:border-b [&_tr]:border-grayscale-opacity-300',
          '[&_tr]:hover:bg-transparent [&_tr]:has-aria-expanded:bg-transparent',
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
          'border-t border-grayscale-opacity-300 bg-grayscale-opacity-100 font-medium [&>tr]:last:border-b-0',
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
          'border-b border-grayscale-opacity-300 bg-[var(--table-row-bg,transparent)] transition-colors',
          'hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))] has-aria-expanded:bg-[var(--table-row-hover,var(--grayscale-opacity-100))] data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]',
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
          'h-8 border-r border-grayscale-opacity-300 bg-white px-3 py-1.5 text-left align-middle font-normal whitespace-nowrap text-grayscale-opacity-800 last:border-r-0',
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
          'h-11 border-r border-grayscale-opacity-300 px-3 py-1 align-middle whitespace-nowrap text-grayscale-opacity-800 last:border-r-0',
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
        'mt-4 text-sm leading-5 text-grayscale-opacity-500',
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
