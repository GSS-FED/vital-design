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
  type ColumnResizeMode,
  type ExpandedState,
  type HeaderGroup,
  type Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type CSSProperties, memo, useMemo, useState } from 'react';
import { ActionBar, FilterButton } from './action-bar';
import { candidateColumns } from './columns';
import {
  type Candidate,
  type CandidateTreeRow,
  buildCandidateTree,
  candidates,
} from './data';
import {
  FILLER_COLUMN_WIDTH,
  columnSizeVar,
  getColumnSizeVars,
  getCommonPinningStyles,
  getLeafColumnsInDisplayOrder,
  getPinnedCellClassName,
} from './pinning';
import { ResizeHandle } from './resize-handle';

const flatTableTargetWidth = 1040;
const flatViewportWidth = 860;
// Sticky group-title row height (h-9 button + 1px bottom border); column
// headers stick directly below it.
const groupTitleHeight = 37;

const baseCandidateWidth = candidateColumns.reduce(
  (total, column) => total + (column.size ?? 150),
  0,
);

const flatCandidateColumns = candidateColumns.map((column) => {
  const size =
    ((column.size ?? 150) / baseCandidateWidth) *
    flatTableTargetWidth;
  // Checkbox gutter and the row action button are fixed affordances, not data.
  const canResize = column.id !== 'select' && column.id !== 'actions';

  return {
    ...column,
    size,
    enableResizing: canResize,
    // A fixed column must also pin its bounds: `getSize()` clamps to min/max,
    // so `defaultColumn.minSize` would otherwise inflate these gutters.
    ...(canResize ? null : { minSize: size, maxSize: size }),
  };
}) satisfies ColumnDef<CandidateTreeRow>[];

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
        <col
          key={column.id}
          style={{ width: `var(${columnSizeVar(column.id)})` }}
        />
      ))}
      {/* Absorbs whatever space is left over, so narrowing the columns below
          the card width does not end the rows mid-frame. */}
      <col style={{ width: FILLER_COLUMN_WIDTH }} />
    </colgroup>
  );
}

function CandidateGroupRow({
  row,
  columnCount,
}: {
  row: Row<CandidateTreeRow>;
  columnCount: number;
}) {
  const open = row.getIsExpanded();
  const stickyTitleStyle: CSSProperties = {
    width: `min(${flatViewportWidth}px, calc(100vw - 48px))`,
  };

  return (
    <TableRow className="group cursor-pointer bg-[rgba(35,35,50,0.03)] transition-colors hover:bg-[rgba(35,35,50,0.06)]">
      <TableCell
        colSpan={columnCount}
        className="sticky top-0 left-0 z-50 h-auto border-b border-grayscale-opacity-300 bg-[#f8f8f9] p-0 text-sm font-medium text-grayscale-opacity-800"
        style={{ width: 'var(--table-total-size)' }}
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={row.getToggleExpandedHandler()}
          className="sticky left-0 flex h-9 items-center gap-2 px-4 text-left"
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

interface CandidateGroupSectionProps {
  row: Row<CandidateTreeRow>;
  headerGroups: HeaderGroup<CandidateTreeRow>[];
  columnCount: number;
  isResizing: boolean;
}

function CandidateGroupSection({
  row,
  headerGroups,
  columnCount,
}: CandidateGroupSectionProps) {
  return (
    <TableBody>
      <CandidateGroupRow row={row} columnCount={columnCount} />
      {row.getIsExpanded() && (
        <>
          {headerGroups.map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  data-column-id={header.column.id}
                  style={getCommonPinningStyles(
                    header.column,
                    30,
                    groupTitleHeight,
                  )}
                  className={getPinnedCellClassName(
                    header.column,
                    // Clipping lives on the inner span, not the cell — the
                    // resize guide has to escape downwards.
                    'border-b border-grayscale-opacity-300',
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <span className="block overflow-hidden text-ellipsis">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </span>
                  )}
                  {!header.isPlaceholder && (
                    <ResizeHandle header={header} />
                  )}
                </TableHead>
              ))}
              <td
                aria-hidden="true"
                className="border-b border-grayscale-opacity-300 bg-white p-0"
              />
            </TableRow>
          ))}
          {row.subRows.map((candidateRow) => (
            <TableRow
              key={candidateRow.id}
              className="group transition-colors hover:bg-grayscale-opacity-100"
            >
              {candidateRow.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={getCommonPinningStyles(cell.column, 20)}
                  className={getPinnedCellClassName(
                    cell.column,
                    'overflow-hidden border-b border-grayscale-opacity-300 text-ellipsis',
                  )}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
              <td
                aria-hidden="true"
                className="border-b border-grayscale-opacity-300 p-0"
              />
            </TableRow>
          ))}
        </>
      )}
    </TableBody>
  );
}

/**
 * Column widths come from CSS variables on `<table>`, so a drag does not need
 * to re-render a single row — freeze the sections until it ends. Without this
 * every `mousemove` rebuilds the whole tree.
 */
const MemoCandidateGroupSection = memo(
  CandidateGroupSection,
  (_prev, next) => next.isResizing,
);

export interface DataTableGroup01Props {
  /**
   * `'onChange'` moves the columns under the pointer; `'onEnd'` holds them and
   * commits on release, with the guide line showing where the edge will land.
   * Prefer `'onEnd'` for wide tables — it does no layout work while dragging.
   */
  columnResizeMode?: ColumnResizeMode;
}

export function DataTableGroup01({
  columnResizeMode = 'onChange',
}: DataTableGroup01Props = {}) {
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
    defaultColumn: { minSize: 64, maxSize: 480 },
    columnResizeMode,
    onExpandedChange: setExpanded,
    getSubRows: (row) =>
      row.kind === 'group' ? row.subRows : undefined,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const visibleColumnCount = table.getVisibleLeafColumns().length;
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn,
  );

  return (
    <Card className="w-full max-w-[860px]">
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
        className={cn(
          'table-fixed border-separate border-spacing-0',
          isResizing && '[&_*]:cursor-col-resize',
        )}
        containerClassName="max-h-[560px] overflow-auto"
        style={{
          ...getColumnSizeVars(table),
          width: 'var(--table-total-size)',
          minWidth: '100%',
        }}
      >
        <ColumnGroup columns={getLeafColumnsInDisplayOrder(table)} />
        {table
          .getRowModel()
          .rows.filter((row) => row.depth === 0)
          .map((groupRow) => (
            <MemoCandidateGroupSection
              key={groupRow.id}
              row={groupRow}
              headerGroups={table.getHeaderGroups()}
              // + 1 for the trailing filler column.
              columnCount={visibleColumnCount + 1}
              isResizing={isResizing}
            />
          ))}
      </Table>
    </Card>
  );
}
