import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
import { cn } from '@/lib/utils';
import {
  type Table as ReactTable,
  flexRender,
} from '@tanstack/react-table';
import type { CSSProperties, ReactNode } from 'react';

export interface DataTableColumnClassNames {
  head?: string;
  cell?: string;
}

export interface DataTableProps<TData> {
  table: ReactTable<TData>;
  emptyMessage?: ReactNode;
  className?: string;
  containerClassName?: string;
  columnClassNames?: Record<string, DataTableColumnClassNames>;
}

export function DataTable<TData>({
  table,
  emptyMessage = 'No results.',
  className,
  containerClassName,
  columnClassNames,
}: DataTableProps<TData>) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const columnCount = table.getAllLeafColumns().length;

  return (
    <Table
      className={className}
      containerClassName={containerClassName}
    >
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const size = header.getSize();
              const style: CSSProperties | undefined =
                size && size !== 150 ? { width: size } : undefined;
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  data-column-id={header.column.id}
                  style={style}
                  className={
                    columnClassNames?.[header.column.id]?.head
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columnCount}
              className={cn('h-24 text-center text-grayscale-500')}
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow
              key={row.id}
              className="group"
              data-state={
                row.getIsSelected() ? 'selected' : undefined
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={columnClassNames?.[cell.column.id]?.cell}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
