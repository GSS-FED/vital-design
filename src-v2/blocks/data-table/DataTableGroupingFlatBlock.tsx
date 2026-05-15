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
  type ColumnDef,
  type HeaderGroup,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type CSSProperties, useState } from 'react';
import {
  ActionBar,
  type Candidate,
  FilterButton,
  candidateColumns,
  candidates,
} from './DataTableGrouping.demo';
import { partitionRows } from './grouping';

const flatTableTargetWidth = 1040;
const flatViewportWidth = 860;

const baseCandidateWidth = candidateColumns.reduce(
  (total, column) => total + (column.size ?? 150),
  0,
);

const flatCandidateColumns = candidateColumns.map((column) => ({
  ...column,
  size:
    ((column.size ?? 150) / baseCandidateWidth) *
    flatTableTargetWidth,
})) satisfies ColumnDef<Candidate>[];

const scrollableCandidates: Candidate[] = Array.from(
  { length: 7 },
  (_, groupIndex) =>
    candidates.map((candidate) => ({
      ...candidate,
      id: `${candidate.id}-${groupIndex + 1}`,
      name:
        groupIndex === 0
          ? candidate.name
          : `${candidate.name} ${groupIndex + 1}`,
    })),
).flat();

function getCommonPinningStyles<TData>(
  column: Column<TData>,
  zIndex = 1,
): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? 'inset -1px 0 0 var(--grayscale-300)'
      : isFirstRightPinnedColumn
        ? 'inset 1px 0 0 var(--grayscale-300)'
        : undefined,
    left:
      isPinned === 'left'
        ? `${column.getStart('left')}px`
        : undefined,
    right:
      isPinned === 'right'
        ? `${column.getAfter('right')}px`
        : undefined,
    opacity: 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? zIndex : 0,
  };
}

function getPinnedCellClassName<TData>(
  column: Column<TData>,
  className: string,
) {
  return [
    className,
    column.getIsPinned() &&
      'bg-white group-hover:!z-40 group-hover:bg-[#f8f8f9] group-focus-within:!z-40 group-data-[state=selected]:!z-40 group-data-[state=selected]:bg-[#f8f8f9]',
  ]
    .filter(Boolean)
    .join(' ');
}

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
  tableWidth,
}: {
  groupKey: string;
  rows: Row<Candidate>[];
  headerGroups: HeaderGroup<Candidate>[];
  columnCount: number;
  tableWidth: number;
}) {
  const [open, setOpen] = useState(true);
  const stickyTitleStyle: CSSProperties = {
    width: `min(${flatViewportWidth}px, calc(100vw - 48px))`,
  };

  return (
    <TableBody>
      <TableRow className="group cursor-pointer border-y border-grayscale-300 bg-[rgba(35,35,50,0.03)] transition-colors hover:bg-[rgba(35,35,50,0.06)]">
        <TableCell
          colSpan={columnCount}
          className="sticky top-0 left-0 z-50 h-auto bg-[#f8f8f9] p-0 text-sm font-medium text-grayscale-800"
          style={{ width: tableWidth }}
        >
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="sticky left-0 flex items-center gap-2 px-4 py-2 text-left"
            style={stickyTitleStyle}
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
                  data-column-id={header.column.id}
                  style={getCommonPinningStyles(header.column, 30)}
                  className={getPinnedCellClassName(
                    header.column,
                    'overflow-hidden text-ellipsis',
                  )}
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
              className="group border-b border-grayscale-300 transition-colors hover:bg-grayscale-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={getCommonPinningStyles(cell.column, 20)}
                  className={getPinnedCellClassName(
                    cell.column,
                    'overflow-hidden text-ellipsis',
                  )}
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
    data: scrollableCandidates,
    columns: flatCandidateColumns,
    initialState: {
      columnPinning: {
        left: ['select', 'name'],
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  const groups = partitionRows(
    table.getRowModel().rows,
    (r) => r.original.jobTitle,
  );
  const tableWidth = table.getTotalSize();
  const visibleColumnCount = table.getVisibleLeafColumns().length;
  const stickyTitleStyle: CSSProperties = {
    width: `min(${flatViewportWidth}px, calc(100vw - 48px))`,
  };

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
      <Table
        className="table-fixed border-separate border-spacing-0"
        containerClassName="max-h-[560px] overflow-auto"
        style={{ width: tableWidth }}
      >
        <ColumnGroup columns={table.getVisibleLeafColumns()} />
        {Array.from(groups).map(([key, rows]) => (
          <CandidateGroupSection
            key={key}
            groupKey={key}
            rows={rows}
            headerGroups={table.getHeaderGroups()}
            columnCount={visibleColumnCount}
            tableWidth={tableWidth}
          />
        ))}
        {['系統網路資安工程師', '產業別業務經理', '程式分析師'].map(
          (key) => (
            <TableBody key={key}>
              <TableRow className="border-b border-grayscale-300 bg-grayscale-100">
                <TableCell
                  colSpan={visibleColumnCount}
                  className="sticky top-0 left-0 z-50 h-auto bg-grayscale-100 p-0 text-sm font-medium text-grayscale-800"
                  style={{ width: tableWidth }}
                >
                  <span
                    className="sticky left-0 flex items-center gap-2 px-4 py-2"
                    style={stickyTitleStyle}
                  >
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
