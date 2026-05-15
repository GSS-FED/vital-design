import { Card } from '@/components/card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/table/Table';
import { ToolbarGroup } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import {
  type Column,
  type HeaderGroup,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  ActionBar,
  type Candidate,
  FilterButton,
  candidateColumns,
  candidates,
} from './DataTableGrouping.demo';
import { partitionRows } from './grouping';

function ColumnGroup<TData>({
  columns,
}: {
  columns: Column<TData>[];
}) {
  return (
    <colgroup>
      {columns.map((column) => (
        <col key={column.id} style={{ width: column.getSize() }} />
      ))}
    </colgroup>
  );
}

function CandidateGroupSection({
  groupKey,
  rows,
  headerGroups,
  columnCount,
}: {
  groupKey: string;
  rows: Row<Candidate>[];
  headerGroups: HeaderGroup<Candidate>[];
  columnCount: number;
}) {
  const [open, setOpen] = useState(true);

  return (
    <TableBody>
      <TableRow className="group cursor-pointer border-y border-grayscale-300 bg-[rgba(35,35,50,0.03)] transition-colors hover:bg-[rgba(35,35,50,0.06)]">
        <TableCell
          colSpan={columnCount}
          className="h-auto p-0 text-sm font-medium text-grayscale-800"
        >
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center gap-2 px-4 py-2 text-left"
          >
            <ChevronDownIcon
              className={`size-3 text-grayscale-700 transition-transform ${
                open ? '' : '-rotate-90'
              }`}
            />
            {groupKey}
          </button>
        </TableCell>
      </TableRow>
      {open && (
        <>
          {headerGroups.map((hg) => (
            <TableRow
              key={hg.id}
              className="border-b border-grayscale-300"
            >
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  className="overflow-hidden text-ellipsis"
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
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-grayscale-300 transition-colors hover:bg-grayscale-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="overflow-hidden text-ellipsis"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </>
      )}
    </TableBody>
  );
}

export function DataTableGroupingFlatBlock() {
  const table = useReactTable({
    data: candidates,
    columns: candidateColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const groups = partitionRows(
    table.getRowModel().rows,
    (r) => r.original.jobTitle,
  );

  return (
    <Card className="max-w-[860px]">
      <ActionBar
        searchPlaceholder="搜尋姓名"
        left={
          <ToolbarGroup>
            <FilterButton>職缺</FilterButton>
            <FilterButton>應徵日期</FilterButton>
          </ToolbarGroup>
        }
        right={<FilterButton>顯示欄位</FilterButton>}
      />
      <Table className="min-w-[860px] table-fixed">
        <ColumnGroup columns={table.getVisibleLeafColumns()} />
        {Array.from(groups).map(([key, rows]) => (
          <CandidateGroupSection
            key={key}
            groupKey={key}
            rows={rows}
            headerGroups={table.getHeaderGroups()}
            columnCount={candidateColumns.length}
          />
        ))}
        {['系統網路資安工程師', '產業別業務經理', '程式分析師'].map(
          (key) => (
            <TableBody key={key}>
              <TableRow className="border-b border-grayscale-300 bg-grayscale-100">
                <TableCell
                  colSpan={candidateColumns.length}
                  className="h-auto px-4 py-2 text-sm font-medium text-grayscale-800"
                >
                  <span className="inline-flex items-center gap-2">
                    <ChevronRightIcon className="size-3 text-grayscale-600" />
                    {key}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ),
        )}
      </Table>
    </Card>
  );
}
