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
import { cn } from '@/lib/utils';
import {
  type Column,
  type ColumnDef,
  type ExpandedState,
  type Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type CSSProperties, useMemo, useState } from 'react';
import { ActionBar, FilterButton } from './action-bar';
import { candidateColumns } from './columns';
import {
  type Candidate,
  type CandidateTreeRow,
  buildCandidateTree,
  candidates,
} from './data';
import {
  getCommonPinningStyles,
  getPinnedCellClassName,
} from './pinning';

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
})) satisfies ColumnDef<CandidateTreeRow>[];

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

// Job titles with no candidates yet. Rendered as toggleable groups with empty subRows
// so all groups share the same interaction model.
const decorativeEmptyGroups = [
  '系統網路資安工程師',
  '產業別業務經理',
  '程式分析師',
];

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

function CandidateGroupRow({
  row,
  columnCount,
  tableWidth,
}: {
  row: Row<CandidateTreeRow>;
  columnCount: number;
  tableWidth: number;
}) {
  const open = row.getIsExpanded();
  const stickyTitleStyle: CSSProperties = {
    width: `min(${flatViewportWidth}px, calc(100vw - 48px))`,
  };

  return (
    <TableRow className="group cursor-pointer border-y border-grayscale-opacity-300 bg-[rgba(35,35,50,0.03)] transition-colors hover:bg-[rgba(35,35,50,0.06)]">
      <TableCell
        colSpan={columnCount}
        className="sticky top-0 left-0 z-50 h-auto bg-[#f8f8f9] p-0 text-sm font-medium text-grayscale-opacity-800"
        style={{ width: tableWidth }}
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={row.getToggleExpandedHandler()}
          className="sticky left-0 flex items-center gap-2 px-4 py-2 text-left"
          style={stickyTitleStyle}
        >
          <ChevronDownIcon
            className={cn(
              'size-3 text-grayscale-opacity-700 transition-transform',
              !open && '-rotate-90',
            )}
          />
          {row.original.kind === 'group' ? row.original.title : ''}
        </button>
      </TableCell>
    </TableRow>
  );
}

export function DataTableGroup01() {
  // `true` expands every row by default (vs `{}` which collapses all).
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const data = useMemo(
    () =>
      buildCandidateTree(scrollableCandidates, decorativeEmptyGroups),
    [],
  );
  const table = useReactTable({
    data,
    columns: flatCandidateColumns,
    state: { expanded },
    initialState: {
      columnPinning: {
        left: ['select', 'name'],
      },
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) =>
      row.kind === 'group' ? row.subRows : undefined,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const tableWidth = table.getTotalSize();
  const visibleColumnCount = table.getVisibleLeafColumns().length;

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
        {table
          .getRowModel()
          .rows.filter((row) => row.depth === 0)
          .map((groupRow) => (
            <TableBody key={groupRow.id}>
              <CandidateGroupRow
                row={groupRow}
                columnCount={visibleColumnCount}
                tableWidth={tableWidth}
              />
              {groupRow.getIsExpanded() && (
                <>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow
                      key={hg.id}
                      className="border-b border-grayscale-opacity-300"
                    >
                      {hg.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          data-column-id={header.column.id}
                          style={getCommonPinningStyles(
                            header.column,
                            30,
                          )}
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
                  {groupRow.subRows.map((candidateRow) => (
                    <TableRow
                      key={candidateRow.id}
                      className="group border-b border-grayscale-opacity-300 transition-colors hover:bg-grayscale-opacity-100"
                    >
                      {candidateRow.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={getCommonPinningStyles(
                            cell.column,
                            20,
                          )}
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
          ))}
      </Table>
    </Card>
  );
}
