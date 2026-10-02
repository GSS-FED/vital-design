'use client';

import { Card } from '@/components/card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { buildColumns } from './columns';
import { type EmissionRow, emissionRows } from './data';

export function DataTableGroup04() {
  const [rows, setRows] = useState<EmissionRow[]>(emissionRows);

  const updateRow = useCallback(
    (id: string, patch: Partial<EmissionRow>) => {
      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, ...patch } : row,
        ),
      );
    },
    [],
  );

  const columns = useMemo<ColumnDef<EmissionRow>[]>(
    () => buildColumns({ updateRow }),
    [updateRow],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-fit max-w-full">
      <Table
        className="table-fixed border-separate border-spacing-0"
        containerClassName="overflow-auto"
        style={{ width: table.getTotalSize() }}
      >
        <colgroup>
          {table.getVisibleLeafColumns().map((column) => (
            <col
              key={column.id}
              style={{ width: column.getSize() }}
            />
          ))}
        </colgroup>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-b border-grayscale-opacity-300 bg-white text-left text-xs font-medium text-grayscale-opacity-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group transition-colors hover:bg-grayscale-opacity-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="border-b border-grayscale-opacity-300 p-0 align-middle"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
