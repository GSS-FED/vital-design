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
import { cn } from '@/lib/utils';
import {
  type Column,
  type ColumnDef,
  type ColumnOrderState,
  type HeaderGroup,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActionBar } from './action-bar';
import { AddRow } from './add-row';
import {
  GroupHeaderRow,
  GutterCells,
  NESTED_GUTTER,
  columnHeaderStickyTop,
} from './group-row';
import {
  type GroupNode,
  type GroupingConfig,
  buildGroupTree,
} from './group-tree';
import {
  getLeafColumnsInDisplayOrder,
  getPinningStyles,
  pinShadowVars,
} from './pinning';
import { ResizeHandle } from './resize-handle';
import {
  type SelectionScope,
  SelectionScopeContext,
  actionsColumn,
  nextRowSelection,
  selectColumn,
  selectionFlags,
} from './select-column';
import { SelectionBar } from './selection-bar';

declare module '@tanstack/react-table' {
  // Cells reach the table's row state through `table.options.meta`.
  interface TableMeta<TData extends RowData> {
    updateRow: (id: string, patch: Partial<TData>) => void;
    removeRow: (id: string) => void;
    /** A row that 新增 just added. Its first text cell opens for editing. */
    editRequestId: RefObject<string | null>;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Name in 顯示欄位 and for screen readers. Defaults to the id. */
    label?: string;
    /** Cells edit in place; they get the editable hover. */
    editable?: boolean;
    /** The search box matches this column's value. */
    searchable?: boolean;
  }
}

/** Sort state for screen readers; unsorted arrows are hidden until hover. */
function ariaSort<TData>(column: Column<TData>) {
  if (!column.getCanSort()) return undefined;
  const sort = column.getIsSorted();
  if (sort === 'asc') return 'ascending';
  if (sort === 'desc') return 'descending';
  return 'none';
}

function columnLabel<TData>(column: Column<TData>): string {
  return column.columnDef.meta?.label ?? column.id;
}

function nestedEdges(
  pinned: false | 'left' | 'right',
  top: boolean,
  inset: number,
) {
  return {
    ...(pinned === 'left'
      ? {
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid' as const,
          borderLeftColor: 'var(--grayscale-opacity-300)',
          left: inset,
        }
      : {}),
    ...(pinned === 'right'
      ? {
          borderRightWidth: '1px',
          borderRightStyle: 'solid' as const,
          borderRightColor: 'var(--grayscale-opacity-300)',
        }
      : {}),
    ...(top
      ? {
          borderTopWidth: '1px',
          borderTopStyle: 'solid' as const,
          borderTopColor: 'var(--grayscale-opacity-300)',
        }
      : {}),
  };
}

function ColumnHeaderRows<TData>({
  groupId,
  headerGroups,
  stickyTop,
  boxed = false,
  rails = [],
  scope = null,
  topBorder = false,
}: {
  groupId?: string;
  headerGroups: HeaderGroup<TData>[];
  /** Stick under the group header. Flat tables leave this unset. */
  stickyTop?: number;
  boxed?: boolean;
  /** Ancestor lines through this header. */
  rails?: boolean[];
  /** Tasks this header's select-all checkbox owns. */
  scope?: SelectionScope | null;
  /** Flat table: the header sits directly under the toolbar. */
  topBorder?: boolean;
}) {
  const inset = rails.length * NESTED_GUTTER;

  return headerGroups.map((headerGroup) => (
    <SelectionScopeContext.Provider
      key={groupId ? `${groupId}-${headerGroup.id}` : headerGroup.id}
      value={scope}
    >
      <TableRow
        className={cn(
          'border-b-0 hover:bg-transparent',
          stickyTop !== undefined && 'sticky z-[15] bg-white',
        )}
        style={
          stickyTop !== undefined ? { top: stickyTop } : undefined
        }
      >
        {rails.length > 0 ? (
          <GutterCells rails={rails} className="z-[16]" />
        ) : null}
        {headerGroup.headers.flatMap((header) => {
          const pinned = header.column.getIsPinned();
          const firstRight =
            pinned === 'right' &&
            header.column.getIsFirstColumn('right');
          const head = (
            <TableHead
              key={header.id}
              // The resize handle's own name would join the header's.
              aria-label={
                header.column.getCanResize()
                  ? columnLabel(header.column)
                  : undefined
              }
              aria-sort={ariaSort(header.column)}
              data-pinned={pinned || undefined}
              style={{
                ...getPinningStyles(header.column, 16),
                ...(boxed ? nestedEdges(pinned, true, inset) : {}),
              }}
              className={cn(
                'group/th border-b border-grayscale-opacity-300 bg-white',
                topBorder && 'border-t',
                pinned && 'bg-white',
                pinned === 'left' && 'px-0 text-center',
                pinned === 'right' && 'px-3',
                header.column.getIsLastColumn('center') &&
                  'border-r-0',
              )}
            >
              {header.isPlaceholder ? null : (
                <>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <ResizeHandle
                    header={header}
                    label={`調整${columnLabel(header.column)}欄寬`}
                  />
                </>
              )}
            </TableHead>
          );
          return firstRight
            ? [
                // Takes the leftover width once hidden columns leave the
                // table narrower than the card, so it carries the same
                // top edge as the headers beside it.
                <TableHead
                  key={`${header.id}-filler`}
                  style={
                    boxed
                      ? nestedEdges(false, true, inset)
                      : undefined
                  }
                  className={cn(
                    'border-b border-r-0 border-grayscale-opacity-300 p-0',
                    topBorder && 'border-t',
                  )}
                />,
                head,
              ]
            : [head];
        })}
      </TableRow>
    </SelectionScopeContext.Provider>
  ));
}

/**
 * White stays underneath. The hover tint is an image, so a sticky cell
 * does not turn translucent and show the cells scrolling behind it.
 */
const PINNED_CELL =
  'bg-white group-hover:[background-image:linear-gradient(var(--grayscale-opacity-100),var(--grayscale-opacity-100))] group-data-[state=selected]:[background-image:linear-gradient(var(--grayscale-opacity-100),var(--grayscale-opacity-100))]';

function DataRow<TData>({
  row,
  boxed = false,
  rails = [],
}: {
  row: Row<TData>;
  boxed?: boolean;
  rails?: boolean[];
}) {
  const inset = rails.length * NESTED_GUTTER;

  return (
    <TableRow
      data-state={row.getIsSelected() ? 'selected' : undefined}
      className="group transition-colors hover:bg-grayscale-opacity-100"
    >
      {rails.length > 0 ? (
        <GutterCells rails={rails} className="z-[2]" />
      ) : null}
      {row.getVisibleCells().flatMap((cell) => {
        const pinned = cell.column.getIsPinned();
        const editor = cell.column.columnDef.meta?.editable === true;
        const firstRight =
          pinned === 'right' && cell.column.getIsFirstColumn('right');
        const item = (
          <TableCell
            key={cell.id}
            aria-label={
              cell.column.id === 'actions' ? '操作' : undefined
            }
            data-pinned={pinned || undefined}
            style={{
              ...getPinningStyles(cell.column),
              ...(boxed ? nestedEdges(pinned, false, inset) : {}),
            }}
            className={cn(
              'border-b border-grayscale-opacity-300',
              editor &&
                'cursor-pointer p-0 hover:bg-grayscale-opacity-200 [&_button]:cursor-pointer',
              pinned && PINNED_CELL,
              pinned === 'left' && 'px-0 text-center',
              pinned === 'right' && 'px-3',
              cell.column.getIsLastColumn('center') && 'border-r-0',
            )}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext(),
            )}
          </TableCell>
        );
        return firstRight
          ? [
              <TableCell
                key={`${cell.id}-filler`}
                className="border-b border-r-0 border-grayscale-opacity-300 p-0"
              />,
              item,
            ]
          : [item];
      })}
    </TableRow>
  );
}

function collectRowIds<TData>(
  node: GroupNode<TData>,
  getRowId: (row: TData) => string,
): string[] {
  const ids: string[] = [];
  const walk = (current: GroupNode<TData>) => {
    for (const child of current.subRows) {
      if (child.kind === 'row') ids.push(getRowId(child.row));
      else walk(child);
    }
  };
  walk(node);
  return ids;
}

function GroupBlock<TData>({
  node,
  expanded,
  columnCount,
  viewportWidth,
  nestColumns,
  headerGroups,
  rowById,
  getRowId,
  itemName,
  ancestorRails = [],
  continued = false,
  hasNextSibling = false,
  nextCollapsed = false,
  padEnd = false,
  onToggle,
  onAdd,
  onSelectIds,
}: {
  node: GroupNode<TData>;
  expanded: Record<string, boolean>;
  columnCount: number;
  viewportWidth: number;
  /** Gutter columns reserved for every nesting level in this table. */
  nestColumns: number;
  headerGroups: HeaderGroup<TData>[];
  rowById: Map<string, Row<TData>>;
  getRowId: (row: TData) => string;
  /** What one row is called, e.g. 任務. Used in labels. */
  itemName: string;
  /** Lines of the groups above this one, outer first. */
  ancestorRails?: boolean[];
  /** A later sibling still needs the vertical line through this group. */
  continued?: boolean;
  /** Another group at this level follows. */
  hasNextSibling?: boolean;
  /** The next group header at this level is collapsed. */
  nextCollapsed?: boolean;
  /** Last nested group. It carries the gap before the next outer group. */
  padEnd?: boolean;
  onToggle: (id: string) => void;
  /** Leave out to hide the add rows. */
  onAdd?: (values: Partial<TData>) => void;
  onSelectIds: (ids: readonly string[], selected: boolean) => void;
}) {
  const open = expanded[node.id] !== false;
  const groups = node.subRows.flatMap((child) =>
    child.kind === 'group' ? [child] : [],
  );
  const rows = node.subRows.flatMap((child) =>
    child.kind === 'row' ? [child.row] : [],
  );
  // The innermost field owns the column header and the task rows.
  // An empty outer group has no child field to head, so the add row
  // sits on that group instead.
  const isLeaf = node.leaf;
  const showHeader = open && isLeaf;
  const showAdd =
    onAdd !== undefined &&
    open &&
    (isLeaf || (groups.length === 0 && rows.length === 0));
  // Depth 0 stays on the left edge. Each deeper field takes one gutter,
  // and only the innermost of those draws the inset table.
  const rails = node.depth === 0 ? [] : [...ancestorRails, continued];
  const boxed = isLeaf && rails.length > 0;
  const span = columnCount + Math.max(0, nestColumns - rails.length);
  // On a screen with two or more levels, the outermost group can
  // select every row inside it. A single-level screen does not.
  const selectGroup = node.depth === 0 && nestColumns > 0;
  const groupIds = selectGroup ? collectRowIds(node, getRowId) : [];
  const groupSelection = selectionFlags(
    groupIds,
    (id) => rowById.get(id)?.getIsSelected() ?? false,
  );

  return (
    <>
      <GroupHeaderRow
        depth={node.depth}
        title={node.title}
        open={open}
        columnCount={span}
        viewportWidth={viewportWidth}
        rails={rails}
        padEnd={padEnd && !open}
        bottomBorder={!(node.depth === 0 && !open && nextCollapsed)}
        selection={
          selectGroup
            ? {
                label: `選取 ${node.title}`,
                checked: groupSelection.checked,
                indeterminate: groupSelection.indeterminate,
                disabled: groupIds.length === 0,
                onCheckedChange: (checked) =>
                  onSelectIds(groupIds, checked),
              }
            : undefined
        }
        onToggle={() => onToggle(node.id)}
      />
      {open
        ? groups.map((group, index) => {
            const last = index === groups.length - 1;
            return (
              <GroupBlock
                key={group.id}
                node={group}
                expanded={expanded}
                columnCount={columnCount}
                viewportWidth={viewportWidth}
                nestColumns={nestColumns}
                headerGroups={headerGroups}
                rowById={rowById}
                getRowId={getRowId}
                itemName={itemName}
                ancestorRails={rails}
                continued={index < groups.length - 1}
                padEnd={last}
                onToggle={onToggle}
                onAdd={onAdd}
                onSelectIds={onSelectIds}
              />
            );
          })
        : null}
      {showHeader ? (
        <ColumnHeaderRows
          groupId={node.id}
          headerGroups={headerGroups}
          stickyTop={columnHeaderStickyTop(node.depth)}
          boxed={boxed}
          rails={rails}
          scope={{
            label: node.path.join(' '),
            ids: rows.map(getRowId),
          }}
        />
      ) : null}
      {open
        ? rows.map((item) => {
            const row = rowById.get(getRowId(item));
            return row ? (
              <DataRow
                key={row.id}
                row={row}
                boxed={boxed}
                rails={rails}
              />
            ) : null;
          })
        : null}
      {showAdd ? (
        <AddRow
          columnCount={span}
          viewportWidth={viewportWidth}
          rails={rails}
          boxed={boxed}
          padEnd={padEnd}
          bottomBorder={
            node.leaf && node.depth === 0 ? !hasNextSibling : true
          }
          label={`在${node.path.join('的')}新增${itemName}`}
          text={`新增${itemName}`}
          onAdd={() => onAdd?.(node.values)}
        />
      ) : null}
    </>
  );
}

export type DataTableProps<TData extends { id: string }> = {
  className?: string;
  /** Starting rows. Copied once; later edits stay inside the table. */
  data: readonly TData[];
  /**
   * Data columns, without selection or actions; the table adds those.
   * See `columns.tsx` for the `meta` fields the table reads.
   */
  columns: ColumnDef<TData>[];
  /**
   * Fields the 分群 menu offers, with their titles and order. Grouping
   * by a key not listed here still works; its titles are raw values.
   */
  groupingConfig?: GroupingConfig;
  /** Starting grouping keys, outer first. `[]` is flat. */
  grouping?: readonly string[];
  /** What one row is called in labels, e.g. 任務. */
  itemName?: string;
  /** Accessible name of a row, used by its checkbox. */
  rowLabel: (row: TData) => string;
  /**
   * Builds the row that 新增 adds. `values` holds the group's field
   * values when it is added inside a group. Leave out to hide 新增.
   */
  createRow?: (values: Partial<TData>) => TData;
};

export function DataTable<TData extends { id: string }>({
  className,
  data,
  columns: dataColumns,
  groupingConfig = {},
  grouping = [],
  itemName = '項目',
  rowLabel,
  createRow,
}: DataTableProps<TData>) {
  const [rows, setRows] = useState<TData[]>(() => [...data]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState('');
  const [groupingKeys, setGroupingKeys] =
    useState<readonly string[]>(grouping);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  // Only the middle fields. select and actions stay pinned at the ends.
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    [],
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    {},
  );
  const editRequestId = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  // Sides where columns are scrolled out of view, for the pinned shadows.
  const [hiddenEdges, setHiddenEdges] = useState({
    start: false,
    end: false,
  });

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const updateEdges = () => {
      const start = element.scrollLeft > 0;
      const end =
        element.scrollLeft + element.clientWidth <
        element.scrollWidth - 1;
      setHiddenEdges((prev) =>
        prev.start === start && prev.end === end
          ? prev
          : { start, end },
      );
    };
    const update = () => {
      setViewportWidth(element.clientWidth);
      updateEdges();
    };
    update();
    element.addEventListener('scroll', updateEdges, {
      passive: true,
    });
    // The table's own width changes with column sizes and visibility.
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(update);
    observer?.observe(element);
    if (element.firstElementChild) {
      observer?.observe(element.firstElementChild);
    }
    return () => {
      element.removeEventListener('scroll', updateEdges);
      observer?.disconnect();
    };
  }, []);

  const updateRow = useCallback(
    (id: string, patch: Partial<TData>) => {
      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, ...patch } : row,
        ),
      );
    },
    [],
  );

  const removeRows = useCallback((ids: readonly string[]) => {
    const doomed = new Set(ids);
    setRows((prev) => prev.filter((row) => !doomed.has(row.id)));
    setRowSelection((current) =>
      nextRowSelection(current, ids, false),
    );
  }, []);

  const removeRow = useCallback(
    (id: string) => removeRows([id]),
    [removeRows],
  );

  const addRow = useMemo(
    () =>
      createRow
        ? (values: Partial<TData>) => {
            const row = createRow(values);
            editRequestId.current = row.id;
            setRows((prev) => [...prev, row]);
          }
        : undefined,
    [createRow],
  );

  const columns = useMemo(
    () => [
      selectColumn(rowLabel),
      ...dataColumns,
      actionsColumn<TData>(),
    ],
    [dataColumns, rowLabel],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      globalFilter: query,
      rowSelection,
      columnVisibility,
      columnOrder,
    },
    initialState: {
      columnPinning: { left: ['select'], right: ['actions'] },
    },
    meta: { updateRow, removeRow, editRequestId },
    defaultColumn: { minSize: 48, maxSize: 480 },
    columnResizeMode: 'onChange',
    // Every sortable column cycles 正序 → 倒序 → 解除, numbers included.
    sortDescFirst: false,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getColumnCanGlobalFilter: (column) =>
      column.columnDef.meta?.searchable === true,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const modelRows = table.getRowModel().rows;
  const tree = buildGroupTree(
    modelRows.map((row) => row.original),
    groupingKeys,
    groupingConfig,
  );
  const rowById = new Map(modelRows.map((row) => [row.id, row]));
  const leafColumns = getLeafColumnsInDisplayOrder(table);
  const headerGroups = table.getHeaderGroups();
  const columnCount = leafColumns.length + 1;
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn,
  );
  // Only rows the search still shows. A hidden selected row is never
  // counted or deleted from the bar.
  const selectedIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.id);
  const visibleCount = table.getFilteredRowModel().rows.length;
  const fields = table
    .getAllLeafColumns()
    .filter(
      (column) => column.id !== 'select' && column.id !== 'actions',
    )
    .map((column) => ({
      id: column.id,
      label: columnLabel(column),
      locked: !column.getCanHide(),
    }));
  const groupingFields = Object.entries(groupingConfig).map(
    ([id, config]) => ({ id, label: config.label }),
  );
  const getRowId = (row: TData) => row.id;
  const addText = `新增${itemName}`;

  const toggleGroup = useCallback((id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: prev[id] === false,
    }));
  }, []);

  const selectIds = useCallback(
    (ids: readonly string[], selected: boolean) => {
      setRowSelection((current) =>
        nextRowSelection(current, ids, selected),
      );
    },
    [],
  );

  return (
    <Card className={cn('w-full max-w-4xl', className)}>
      <ActionBar
        query={query}
        searchPlaceholder={`搜尋${itemName}`}
        groupingKeys={groupingKeys}
        groupingFields={groupingFields}
        fields={fields}
        visibility={columnVisibility}
        onQueryChange={setQuery}
        onGroupingChange={setGroupingKeys}
        columnOrder={columnOrder}
        searchRef={searchRef}
        onColumnsChange={(visibility, order) => {
          setColumnVisibility(visibility);
          setColumnOrder(order);
        }}
      />
      <Table
        containerRef={containerRef}
        className={cn(
          'table-fixed border-separate border-spacing-0',
          isResizing && '[&_*]:cursor-col-resize',
        )}
        containerClassName="max-h-[560px] overflow-auto"
        style={{
          width: table.getTotalSize(),
          minWidth: '100%',
          ...pinShadowVars(hiddenEdges),
        }}
      >
        <colgroup>
          {Array.from(
            { length: Math.max(0, groupingKeys.length - 1) },
            (_, index) => (
              <col
                key={`gutter-${index}`}
                style={{ width: NESTED_GUTTER }}
              />
            ),
          )}
          {leafColumns.flatMap((column) => {
            const col = (
              <col
                key={column.id}
                style={{ width: column.getSize() }}
              />
            );
            const firstRight =
              column.getIsPinned() === 'right' &&
              column.getIsFirstColumn('right');
            return firstRight
              ? [<col key={`${column.id}-filler`} />, col]
              : [col];
          })}
        </colgroup>
        {groupingKeys.length === 0 ? (
          <>
            <TableHeader>
              <ColumnHeaderRows
                headerGroups={headerGroups}
                topBorder
              />
            </TableHeader>
            <TableBody>
              {tree.map((node) => {
                if (node.kind !== 'row') return null;
                const row = rowById.get(getRowId(node.row));
                return row ? (
                  <DataRow key={row.id} row={row} />
                ) : null;
              })}
              {addRow ? (
                <AddRow
                  columnCount={columnCount}
                  viewportWidth={viewportWidth}
                  label={addText}
                  text={addText}
                  sticky
                  onAdd={() => addRow({})}
                />
              ) : null}
            </TableBody>
          </>
        ) : (
          <TableBody>
            {tree.map((node, index) => {
              const next = tree[index + 1];
              return node.kind === 'group' ? (
                <GroupBlock
                  key={node.id}
                  node={node}
                  expanded={expanded}
                  columnCount={columnCount}
                  viewportWidth={viewportWidth}
                  nestColumns={Math.max(0, groupingKeys.length - 1)}
                  headerGroups={headerGroups}
                  rowById={rowById}
                  getRowId={getRowId}
                  itemName={itemName}
                  onToggle={toggleGroup}
                  onAdd={addRow}
                  onSelectIds={selectIds}
                  hasNextSibling={index < tree.length - 1}
                  nextCollapsed={
                    next?.kind === 'group' &&
                    expanded[next.id] === false
                  }
                />
              ) : null;
            })}
            {tree.length === 0 && addRow ? (
              <AddRow
                columnCount={
                  columnCount + Math.max(0, groupingKeys.length - 1)
                }
                viewportWidth={viewportWidth}
                label={addText}
                text={addText}
                onAdd={() => addRow({})}
              />
            ) : null}
          </TableBody>
        )}
      </Table>
      <SelectionBar
        label={`已選取的${itemName}`}
        selectedCount={selectedIds.length}
        totalCount={visibleCount}
        onSelectAll={() => table.toggleAllPageRowsSelected(true)}
        // Both empty the selection, which removes the focused button
        // with the bar. Hand focus to the search box first.
        onDelete={() => {
          searchRef.current?.focus();
          removeRows(selectedIds);
        }}
        onClear={() => {
          searchRef.current?.focus();
          table.resetRowSelection(true);
        }}
      />
    </Card>
  );
}
