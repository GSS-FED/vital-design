import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
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
    return <span className={className}>{title}</span>;
  }

  const sort = column.getIsSorted();

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      data-sort={sort || undefined}
      onClick={column.getToggleSortingHandler()}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1 font-normal text-grayscale-opacity-800 transition-colors hover:text-grayscale-opacity-900 focus-visible:shadow-focus-primary focus-visible:outline-none',
        className,
      )}
    >
      <span>{title}</span>
      <span
        aria-hidden="true"
        className="inline-flex size-4 items-center justify-center text-grayscale-opacity-500"
      >
        {sort === 'desc' ? (
          <ChevronDownIcon className="size-3.5" />
        ) : sort === 'asc' ? (
          <ChevronUpIcon className="size-3.5" />
        ) : (
          <span className="relative inline-flex h-3 w-3 flex-col items-center justify-between leading-none">
            <ChevronUpIcon className="size-2" />
            <ChevronDownIcon className="size-2" />
          </span>
        )}
      </span>
    </button>
  );
}
