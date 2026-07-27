import { Avatar } from '@/components/avatar/Avatar';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
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
  type ColumnResizeMode,
  type ExpandedState,
  type HeaderGroup,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, memo, useMemo, useState } from 'react';
import { ActionBar, FilterButton } from './action-bar';
import { emissionColumns } from './columns';
import {
  type EmissionTreeRow,
  buildEmissionTree,
  emissions,
  getEmissionLeaves,
} from './data';
import {
  CATEGORY_TITLE_LEFT,
  FILLER_COLUMN_WIDTH,
  RAIL_STARTS,
  RAIL_WIDTHS,
  SUBCATEGORY_TITLE_LEFT,
  columnSizeVar,
  getColumnSizeVars,
  getPinnedClassName,
  getPinningStyles,
  titleStickyStyle,
} from './pinning';
import { ResizeHandle } from './resize-handle';
import { ChevronCell, RailCells } from './table-rail';

function EmissionColGroup({
  columns,
}: {
  columns: Column<EmissionTreeRow>[];
}) {
  return (
    <colgroup>
      {RAIL_WIDTHS.map((width, index) => (
        <col key={`rail-${index}`} style={{ width }} />
      ))}
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

function EmissionHeaderRows({
  headerGroups,
}: {
  headerGroups: HeaderGroup<EmissionTreeRow>[];
}) {
  return (
    <>
      {headerGroups.map((hg) => (
        // Sticks below the category (top-0, h-9) + subcategory (top-9, h-11)
        // titles → 36 + 44 = 80px. z-[15] keeps it above source rows (pinned
        // cells z-10) but below the subcategory (z-20) and category (z-30)
        // titles. The row's z-index makes the whole header (incl. its pinned
        // cells) paint above source rows during vertical scroll.
        <TableRow
          key={hg.id}
          className="sticky top-20 z-[15] hover:bg-transparent"
        >
          <RailCells variant="vertical" />
          {hg.headers.map((header) => (
            <TableHead
              key={header.id}
              style={getPinningStyles(header.column)}
              className={cn(
                'border-b border-grayscale-opacity-300',
                getPinnedClassName(header.column),
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
          <td className="border-b border-grayscale-opacity-300 bg-white p-0" />
        </TableRow>
      ))}
    </>
  );
}

function EmissionCategoryRow({
  row,
  titleColSpan,
}: {
  row: Row<EmissionTreeRow>;
  titleColSpan: number;
}) {
  if (row.original.kind !== 'category') {
    return null;
  }

  return (
    <TableRow
      aria-expanded={row.getIsExpanded()}
      role="button"
      tabIndex={0}
      onClick={row.getToggleExpandedHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.toggleExpanded();
        }
      }}
      className="sticky top-0 z-30 cursor-pointer bg-[#f8f8f9] hover:bg-[#f0f0f2]"
    >
      <td
        className="sticky z-10 bg-[#f8f8f9] p-0"
        style={{ left: RAIL_STARTS[0], width: RAIL_WIDTHS[0] }}
      />
      <td
        className="sticky z-10 bg-[#f8f8f9] p-0"
        style={{ left: RAIL_STARTS[1], width: RAIL_WIDTHS[1] }}
      />
      <ChevronCell
        expanded={row.getIsExpanded()}
        leftOffset={RAIL_STARTS[2]}
        bgClassName="bg-[#f8f8f9]"
      />
      <TableCell
        colSpan={titleColSpan}
        className="h-9 overflow-visible border-r-0 bg-transparent py-0 pl-0 pr-3 text-sm font-medium text-grayscale-opacity-900"
      >
        <div
          className="flex items-center gap-2 overflow-hidden whitespace-nowrap pr-3"
          style={titleStickyStyle(CATEGORY_TITLE_LEFT)}
        >
          <Badge variant="info" type="text" size="md">
            ISO
          </Badge>
          <Avatar fallback="" size="xs" color="tiffany" />
          <span className="truncate">{row.original.title}</span>
          <span className="ml-auto text-sm font-normal tabular-nums text-grayscale-opacity-700">
            {getEmissionLeaves(row.original).length}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

function EmissionSubcategoryRow({
  row,
  titleColSpan,
}: {
  row: Row<EmissionTreeRow>;
  titleColSpan: number;
}) {
  if (row.original.kind !== 'subcategory') {
    return null;
  }

  return (
    <TableRow
      aria-expanded={row.getIsExpanded()}
      role="button"
      tabIndex={0}
      onClick={row.getToggleExpandedHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.toggleExpanded();
        }
      }}
      className="sticky top-9 z-20 cursor-pointer bg-white hover:bg-grayscale-opacity-100"
    >
      <RailCells
        variant="branch"
        trailingCell={
          <ChevronCell
            expanded={row.getIsExpanded()}
            leftOffset={RAIL_STARTS[3]}
          />
        }
      />
      <TableCell
        colSpan={titleColSpan}
        className="h-11 overflow-visible border-r-0 bg-transparent py-0 pl-0 pr-3 text-sm font-medium text-grayscale-opacity-800"
      >
        <div
          className="flex items-center gap-2 overflow-hidden whitespace-nowrap pr-3"
          style={titleStickyStyle(SUBCATEGORY_TITLE_LEFT)}
        >
          <Badge variant="info" type="text" size="md">
            ISO
          </Badge>
          <Avatar fallback="" size="xs" color="tiffany" />
          <span className="truncate">{row.original.title}</span>
          <span className="ml-auto text-sm font-normal tabular-nums text-grayscale-opacity-700">
            {getEmissionLeaves(row.original).length}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

function EmissionSourceRow({ row }: { row: Row<EmissionTreeRow> }) {
  return (
    <TableRow>
      <RailCells variant="vertical" />
      {row.getVisibleCells().map((cell) => {
        const pinStyle = getPinningStyles(cell.column);
        const pinClass = getPinnedClassName(cell.column);

        if (cell.column.id === 'id') {
          return (
            <TableHead
              key={cell.id}
              scope="row"
              style={pinStyle}
              className={cn(
                'h-11 border-b border-grayscale-opacity-300 bg-transparent px-3 py-1 align-middle font-normal text-grayscale-opacity-800',
                pinClass,
              )}
            >
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              )}
            </TableHead>
          );
        }

        return (
          <TableCell
            key={cell.id}
            style={pinStyle}
            className={cn(
              'border-b border-grayscale-opacity-300 bg-transparent',
              pinClass,
            )}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext(),
            )}
          </TableCell>
        );
      })}
      <td className="border-b border-grayscale-opacity-300 p-0" />
    </TableRow>
  );
}

interface EmissionCategorySectionProps {
  row: Row<EmissionTreeRow>;
  headerGroups: HeaderGroup<EmissionTreeRow>[];
  categoryTitleColSpan: number;
  subcategoryTitleColSpan: number;
  isResizing: boolean;
}

function EmissionCategorySection({
  row,
  headerGroups,
  categoryTitleColSpan,
  subcategoryTitleColSpan,
}: EmissionCategorySectionProps) {
  return (
    <TableBody>
      <EmissionCategoryRow
        row={row}
        titleColSpan={categoryTitleColSpan}
      />
      {row.getIsExpanded() &&
        row.subRows.map((subcategoryRow) => (
          <Fragment key={subcategoryRow.id}>
            <EmissionSubcategoryRow
              row={subcategoryRow}
              titleColSpan={subcategoryTitleColSpan}
            />
            {subcategoryRow.getIsExpanded() && (
              <>
                <EmissionHeaderRows headerGroups={headerGroups} />
                {subcategoryRow.subRows.map((sourceRow) => (
                  <EmissionSourceRow
                    key={sourceRow.id}
                    row={sourceRow}
                  />
                ))}
              </>
            )}
          </Fragment>
        ))}
    </TableBody>
  );
}

/**
 * Column widths come from CSS variables on `<table>`, so a drag does not need
 * to re-render a single row — freeze the sections until it ends. Without this
 * every `mousemove` rebuilds the whole tree (measured ~50ms/frame here, vs the
 * ~14ms idle frame).
 */
const MemoEmissionCategorySection = memo(
  EmissionCategorySection,
  (_prev, next) => next.isResizing,
);

export interface DataTableGroup02Props {
  /**
   * `'onChange'` moves the columns under the pointer; `'onEnd'` holds them and
   * commits on release, with the guide line showing where the edge will land.
   * This table is wide and heavily pinned, so `'onEnd'` is noticeably smoother
   * — it does no layout work while dragging.
   */
  columnResizeMode?: ColumnResizeMode;
}

export function DataTableGroup02({
  columnResizeMode = 'onChange',
}: DataTableGroup02Props = {}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // `true` expands every row by default (vs `{}` which collapses all).
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const data = useMemo(() => buildEmissionTree(emissions), []);
  const table = useReactTable({
    data,
    columns: emissionColumns,
    state: { expanded, rowSelection, sorting },
    initialState: {
      columnPinning: { left: ['select', 'id'] },
    },
    defaultColumn: { minSize: 48, maxSize: 480 },
    columnResizeMode,
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSubRows: (row) =>
      row.kind === 'source' ? undefined : row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const visibleColumns = table.getVisibleLeafColumns();
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn,
  );
  // Total cols = 4 rail tracks + data cols + 1 trailing fill col.
  // Category title spans everything to the right of the chevron (col 3).
  // Subcategory title spans everything to the right of its chevron (col 4).
  const categoryTitleColSpan = visibleColumns.length + 2;
  const subcategoryTitleColSpan = visibleColumns.length + 1;

  return (
    <Card className="w-full max-w-[1408px]">
      <ActionBar
        searchPlaceholder="搜尋"
        left={
          <ToolbarGroup>
            <FilterButton>負責人</FilterButton>
            <FilterButton>審核人</FilterButton>
          </ToolbarGroup>
        }
        right={
          <ToolbarGroup>
            <FilterButton>分群:排放源</FilterButton>
            <FilterButton>顯示欄位</FilterButton>
            <FilterButton>審核:開啟</FilterButton>
            <Button variant="default" theme="default">
              填報欄位名稱
            </Button>
            <Button variant="default" theme="primary">
              新增
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </ToolbarGroup>
        }
      />
      <Table
        className={cn(
          'table-fixed border-separate border-spacing-0',
          isResizing && '[&_*]:cursor-col-resize',
        )}
        containerClassName="max-h-[560px] overflow-auto"
        style={{
          ...getColumnSizeVars(table),
          minWidth: 'max(1408px, var(--table-total-size))',
        }}
      >
        <EmissionColGroup columns={visibleColumns} />
        {table
          .getRowModel()
          .rows.filter((row) => row.depth === 0)
          .map((categoryRow) => (
            <MemoEmissionCategorySection
              key={categoryRow.id}
              row={categoryRow}
              headerGroups={table.getHeaderGroups()}
              categoryTitleColSpan={categoryTitleColSpan}
              subcategoryTitleColSpan={subcategoryTitleColSpan}
              isResizing={isResizing}
            />
          ))}
      </Table>
    </Card>
  );
}
