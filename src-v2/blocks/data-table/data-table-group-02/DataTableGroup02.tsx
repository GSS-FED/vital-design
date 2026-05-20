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
import { Fragment, useMemo, useState } from 'react';
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
  RAIL_STARTS,
  RAIL_WIDTHS,
  SUBCATEGORY_TITLE_LEFT,
  getPinnedClassName,
  getPinningStyles,
  titleStickyStyle,
} from './pinning';
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
        <col key={column.id} style={{ width: column.getSize() }} />
      ))}
      <col />
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
        <TableRow key={hg.id} className="hover:bg-transparent">
          <RailCells variant="vertical" />
          {hg.headers.map((header) => (
            <TableHead
              key={header.id}
              style={getPinningStyles(header.column)}
              className={cn(
                'border-b border-grayscale-300',
                getPinnedClassName(header.column),
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
          <td className="border-b border-grayscale-300 p-0" />
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
        className="h-9 overflow-visible border-r-0 bg-transparent py-0 pl-0 pr-3 text-sm font-medium text-grayscale-900"
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
          <span className="ml-auto text-sm font-normal tabular-nums text-grayscale-700">
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
      className="sticky top-9 z-20 cursor-pointer bg-white hover:bg-grayscale-100"
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
        className="h-11 overflow-visible border-r-0 bg-transparent py-0 pl-0 pr-3 text-sm font-medium text-grayscale-800"
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
          <span className="ml-auto text-sm font-normal tabular-nums text-grayscale-700">
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
                'h-11 border-b border-grayscale-300 bg-transparent px-3 py-1 align-middle font-normal text-grayscale-800',
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
              'border-b border-grayscale-300 bg-transparent',
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
      <td className="border-b border-grayscale-300 p-0" />
    </TableRow>
  );
}

export function DataTableGroup02() {
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
  // Total cols = 4 rail tracks + data cols + 1 trailing fill col.
  // Category title spans everything to the right of the chevron (col 3).
  // Subcategory title spans everything to the right of its chevron (col 4).
  const categoryTitleColSpan = visibleColumns.length + 2;
  const subcategoryTitleColSpan = visibleColumns.length + 1;

  return (
    <Card className="max-w-[1408px]">
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
        className="table-fixed border-separate border-spacing-0"
        containerClassName="max-h-[560px] overflow-auto"
        style={{ minWidth: 1408 }}
      >
        <EmissionColGroup columns={visibleColumns} />
        {table
          .getRowModel()
          .rows.filter((row) => row.depth === 0)
          .map((categoryRow) => (
            <TableBody key={categoryRow.id}>
              <EmissionCategoryRow
                row={categoryRow}
                titleColSpan={categoryTitleColSpan}
              />
              {categoryRow.getIsExpanded() &&
                categoryRow.subRows.map((subcategoryRow) => (
                  <Fragment key={subcategoryRow.id}>
                    <EmissionSubcategoryRow
                      row={subcategoryRow}
                      titleColSpan={subcategoryTitleColSpan}
                    />
                    {subcategoryRow.getIsExpanded() && (
                      <>
                        <EmissionHeaderRows
                          headerGroups={table.getHeaderGroups()}
                        />
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
          ))}
      </Table>
    </Card>
  );
}
