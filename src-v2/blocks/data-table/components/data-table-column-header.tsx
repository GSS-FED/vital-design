import { CaretDownIcon } from '@/icons/CaretDownIcon';
import { CaretUpIcon } from '@/icons/CaretUpIcon';
import { cn } from '@/lib/utils';
import type { Column } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: ReactNode;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <span className={cn('block truncate', className)}>{title}</span>
    );
  }

  const sort = column.getIsSorted();

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      data-sort={sort || undefined}
      onClick={column.getToggleSortingHandler()}
      className={cn(
        'group/sort inline-flex max-w-full cursor-pointer items-center gap-1 font-normal text-grayscale-opacity-800 transition-colors hover:text-grayscale-opacity-900 focus-visible:shadow-focus-primary focus-visible:outline-none',
        className,
      )}
    >
      <span className="truncate">{title}</span>
      {/* Unsorted arrows wait for the pointer over the th (group/th) or
          keyboard focus. A sorted column keeps its arrow on screen. */}
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-4 shrink-0 flex-col items-center justify-center',
          !sort &&
            'opacity-0 group-hover/th:opacity-100 group-focus-visible/sort:opacity-100',
        )}
      >
        <CaretUpIcon
          className={cn(
            '-mb-1 size-3.75 shrink-0',
            sort === 'asc'
              ? 'text-grayscale-opacity-800'
              : 'text-grayscale-opacity-400',
          )}
        />
        <CaretDownIcon
          className={cn(
            '-mt-1 size-3.75 shrink-0',
            sort === 'desc'
              ? 'text-grayscale-opacity-800'
              : 'text-grayscale-opacity-400',
          )}
        />
      </span>
    </button>
  );
}
