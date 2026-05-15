import { Avatar } from '@/components/avatar/Avatar';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
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
import {
  ActionBar,
  type Emission,
  type EmissionTreeRow,
  FilterButton,
  emissionColumns,
  emissions,
} from './DataTableGrouping.demo';

function getEmissionLeaves(row: EmissionTreeRow): Emission[] {
  if (row.kind === 'source') {
    return [row];
  }

  return row.subRows.flatMap(getEmissionLeaves);
}

function buildEmissionTree(rows: Emission[]): EmissionTreeRow[] {
  const categories = new Map<string, Map<string, Emission[]>>();

  for (const row of rows) {
    const category =
      categories.get(row.category) ?? new Map<string, Emission[]>();
    const subcategory = category.get(row.subcategory) ?? [];
    subcategory.push(row);
    category.set(row.subcategory, subcategory);
    categories.set(row.category, category);
  }

  return Array.from(categories, ([category, subcategories]) => ({
    id: `category-${category}`,
    kind: 'category',
    title: category,
    subRows: Array.from(subcategories, ([subcategory, leaves]) => ({
      id: `subcategory-${subcategory}`,
      kind: 'subcategory',
      title: subcategory,
      subRows: leaves.map((leaf) => ({
        ...leaf,
        kind: 'source' as const,
      })),
    })),
  }));
}

const emissionRailTemplate = '4px 28px 24px 24px';

function getEmissionGridTemplate(columns: Column<EmissionTreeRow>[]) {
  return `${emissionRailTemplate} ${columns
    .map((column) => `${column.getSize()}px`)
    .join(' ')} minmax(0, 1fr)`;
}

function EmissionRailLine({ branch = false }: { branch?: boolean }) {
  return (
    <div className="relative h-full">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-grayscale-300"
      />
      {branch && (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-[22px] w-3 rounded-bl-lg border-b border-l border-border"
        />
      )}
    </div>
  );
}

function EmissionHeaderRows({
  headerGroups,
  gridTemplateColumns,
}: {
  headerGroups: HeaderGroup<EmissionTreeRow>[];
  gridTemplateColumns: string;
}) {
  return headerGroups.map((hg) => (
    <div
      key={hg.id}
      role="row"
      className="grid"
      style={{ gridTemplateColumns }}
    >
      <div />
      <div />
      <EmissionRailLine />
      <div />
      {hg.headers.map((header) => {
        const isSelect = header.column.id === 'select';
        return (
          <div
            key={header.id}
            role="columnheader"
            className={cn(
              'flex h-8 items-center overflow-hidden border-b border-r border-grayscale-300 bg-white text-sm font-normal whitespace-nowrap text-grayscale-800',
              isSelect ? 'justify-center px-0' : 'px-3',
            )}
          >
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
          </div>
        );
      })}
    </div>
  ));
}

function EmissionCategoryRow({
  row,
  gridTemplateColumns,
}: {
  row: Row<EmissionTreeRow>;
  gridTemplateColumns: string;
}) {
  if (row.original.kind !== 'category') {
    return null;
  }

  return (
    <div
      aria-expanded={row.getIsExpanded()}
      role="button"
      tabIndex={0}
      style={{ gridTemplateColumns }}
      onClick={row.getToggleExpandedHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.toggleExpanded();
        }
      }}
      className="grid h-9 cursor-pointer border-b border-grayscale-300 bg-[rgba(35,35,50,0.03)] transition-colors hover:bg-[rgba(35,35,50,0.06)]"
    >
      <div />
      <div />
      <div className="flex items-center justify-center">
        <ChevronDownIcon
          className={cn(
            'size-3 text-grayscale-700 transition-transform',
            !row.getIsExpanded() && '-rotate-90',
          )}
        />
      </div>
      <div
        className="flex items-center gap-2 overflow-hidden pr-3 text-sm font-medium whitespace-nowrap text-grayscale-900"
        style={{ gridColumn: '4 / -1' }}
      >
        <Badge variant="info" type="text" size="md">
          ISO
        </Badge>
        <Avatar fallback="" size="xs" color="tiffany" />
        <span className="truncate">{row.original.title}</span>
        <span className="ml-auto px-3 text-sm font-normal tabular-nums text-grayscale-700">
          {getEmissionLeaves(row.original).length}
        </span>
      </div>
    </div>
  );
}

function EmissionSubcategoryRow({
  row,
  gridTemplateColumns,
}: {
  row: Row<EmissionTreeRow>;
  gridTemplateColumns: string;
}) {
  if (row.original.kind !== 'subcategory') {
    return null;
  }

  return (
    <div
      aria-expanded={row.getIsExpanded()}
      role="button"
      tabIndex={0}
      style={{ gridTemplateColumns }}
      onClick={row.getToggleExpandedHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.toggleExpanded();
        }
      }}
      className="grid h-11 cursor-pointer bg-white transition-colors hover:bg-grayscale-100"
    >
      <div />
      <div />
      <EmissionRailLine branch />
      <div className="flex items-center justify-center">
        <ChevronDownIcon
          className={cn(
            'size-3 text-grayscale-700 transition-transform',
            !row.getIsExpanded() && '-rotate-90',
          )}
        />
      </div>
      <div
        className="flex items-center gap-2 overflow-hidden border-r border-grayscale-300 pr-3 text-sm font-medium whitespace-nowrap text-grayscale-800"
        style={{ gridColumn: '5 / -1' }}
      >
        <Badge variant="info" type="text" size="md">
          ISO
        </Badge>
        <Avatar fallback="" size="xs" color="tiffany" />
        <span className="truncate">{row.original.title}</span>
        <span className="ml-auto px-3 text-sm font-normal tabular-nums text-grayscale-700">
          {getEmissionLeaves(row.original).length}
        </span>
      </div>
    </div>
  );
}

function EmissionSourceRow({
  row,
  gridTemplateColumns,
}: {
  row: Row<EmissionTreeRow>;
  gridTemplateColumns: string;
}) {
  return (
    <div
      role="row"
      className="grid transition-colors hover:bg-grayscale-100"
      style={{ gridTemplateColumns }}
    >
      <div />
      <div />
      <EmissionRailLine />
      <div />
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          role="cell"
          className={cn(
            'flex h-11 items-center overflow-hidden border-b border-r border-grayscale-300 bg-white text-sm whitespace-nowrap text-grayscale-800',
            cell.column.id === 'select'
              ? 'justify-center px-0'
              : 'px-3',
          )}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}

export function DataTableGroupingNestedBlock() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const data = useMemo(() => buildEmissionTree(emissions), []);
  const table = useReactTable({
    data,
    columns: emissionColumns,
    state: { expanded, rowSelection, sorting },
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
  const gridTemplateColumns = getEmissionGridTemplate(visibleColumns);

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
            <FilterButton>分群：排放源</FilterButton>
            <FilterButton>顯示欄位</FilterButton>
            <FilterButton>審核：開啟</FilterButton>
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
      <div className="overflow-x-auto">
        <div
          role="table"
          className="min-w-[1408px] overflow-hidden bg-white"
        >
          {table.getRowModel().rows.map((row, index, allRows) => {
            if (row.original.kind === 'category') {
              return (
                <EmissionCategoryRow
                  key={row.id}
                  row={row}
                  gridTemplateColumns={gridTemplateColumns}
                />
              );
            }

            if (row.original.kind === 'subcategory') {
              return (
                <EmissionSubcategoryRow
                  key={row.id}
                  row={row}
                  gridTemplateColumns={gridTemplateColumns}
                />
              );
            }

            const previousRow = allRows[index - 1];
            const shouldRenderHeaders =
              previousRow?.original.kind === 'subcategory';

            return (
              <Fragment key={row.id}>
                {shouldRenderHeaders && (
                  <EmissionHeaderRows
                    headerGroups={table.getHeaderGroups()}
                    gridTemplateColumns={gridTemplateColumns}
                  />
                )}
                <EmissionSourceRow
                  row={row}
                  gridTemplateColumns={gridTemplateColumns}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
