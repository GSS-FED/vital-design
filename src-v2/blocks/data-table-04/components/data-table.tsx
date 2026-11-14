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
  type ColumnOrderState,
  type HeaderGroup,
  type Row,
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
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActionBar } from './action-bar';
import { AddTaskRow } from './add-row';
import {
  type SelectionScope,
  SelectionScopeContext,
  buildColumns,
  nextRowSelection,
  selectionFlags,
} from './columns';
import {
  COLUMN_FIELDS,
  type GroupingKeyConfig,
  PROJECT_ORDER,
  type ReviewGroupNode,
  type ReviewTask,
  buildReviewTree,
  fieldsFromRows,
  reviewGroupingConfig,
  reviewTasks,
} from './data';
import {
  GroupHeaderRow,
  GutterCells,
  NESTED_GUTTER,
  columnHeaderStickyTop,
} from './group-row';
import {
  getLeafColumnsInDisplayOrder,
  getPinningStyles,
} from './pinning';
import { ResizeHandle } from './resize-handle';
import { SelectionBar } from './selection-bar';

const EDITOR_COLUMNS = new Set(['title', 'status', 'note']);

/** Sort state for screen readers; unsorted arrows are hidden until hover. */
function ariaSort(column: Column<ReviewTask>) {
  if (!column.getCanSort()) return undefined;
  const sort = column.getIsSorted();
  if (sort === 'asc') return 'ascending';
  if (sort === 'desc') return 'descending';
  return 'none';
}

function columnLabel(id: string): string {
  return COLUMN_FIELDS.find((field) => field.id === id)?.label ?? id;
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

function ColumnHeaderRows({
  groupId,
  headerGroups,
  stickyTop,
  boxed = false,
  rails = [],
  scope = null,
  topBorder = false,
}: {
  groupId?: string;
  headerGroups: HeaderGroup<ReviewTask>[];
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
                  ? columnLabel(header.column.id)
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
                    label={`調整${columnLabel(header.column.id)}欄寬`}
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

function TaskRow({
  row,
  boxed = false,
  rails = [],
}: {
  row: Row<ReviewTask>;
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
        const editor = EDITOR_COLUMNS.has(cell.column.id);
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

function collectTaskIds(node: ReviewGroupNode): string[] {
  const ids: string[] = [];
  const walk = (current: ReviewGroupNode) => {
    for (const child of current.subRows) {
      if (child.kind === 'task') ids.push(child.task.id);
      else walk(child);
    }
  };
  walk(node);
  return ids;
}

function textValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function scopeLabel(node: ReviewGroupNode): string {
  const project = textValue(node.values.project);
  if (project && node.title !== project) {
    return `${project} ${node.title}`;
  }
  return node.title;
}

function addLabel(node: ReviewGroupNode): string {
  const project = textValue(node.values.project);
  if (textValue(node.values.status) && project) {
    return `在${project}的${node.title}新增任務`;
  }
  if (project) return `在${project}新增任務`;
  return `在${node.title}新增任務`;
}

function applyGroupValues(
  task: ReviewTask,
  values: Record<string, unknown>,
): ReviewTask {
  const next: ReviewTask & Record<string, unknown> = { ...task };
  for (const [key, value] of Object.entries(values)) {
    if (key === 'id') continue;
    if (Array.isArray(value)) {
      const copy: string[] = [];
      for (const item of value) {
        if (typeof item === 'string') copy.push(item);
      }
      next[key] = copy;
      continue;
    }
    next[key] = value;
  }
  return next;
}

function GroupBlock({
  node,
  expanded,
  columnCount,
  viewportWidth,
  nestColumns,
  headerGroups,
  rowById,
  ancestorRails = [],
  continued = false,
  hasNextSibling = false,
  nextCollapsed = false,
  padEnd = false,
  onToggle,
  onAdd,
  onSelectIds,
}: {
  node: ReviewGroupNode;
  expanded: Record<string, boolean>;
  columnCount: number;
  viewportWidth: number;
  /** Gutter columns reserved for every nesting level in this table. */
  nestColumns: number;
  headerGroups: HeaderGroup<ReviewTask>[];
  rowById: Map<string, Row<ReviewTask>>;
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
  onAdd: (values: Record<string, unknown>) => void;
  onSelectIds: (ids: readonly string[], selected: boolean) => void;
}) {
  const open = expanded[node.id] !== false;
  const groups = node.subRows.flatMap((child) =>
    child.kind === 'group' ? [child] : [],
  );
  const tasks = node.subRows.flatMap((child) =>
    child.kind === 'task' ? [child.task] : [],
  );
  // The innermost field owns the column header and the task rows.
  // An empty outer group has no child field to head, so the add row
  // sits on that group instead.
  const isLeaf = node.leaf;
  const showHeader = open && isLeaf;
  const showAdd =
    open && (isLeaf || (groups.length === 0 && tasks.length === 0));
  // Depth 0 stays on the left edge. Each deeper field takes one gutter,
  // and only the innermost of those draws the inset table.
  const rails = node.depth === 0 ? [] : [...ancestorRails, continued];
  const boxed = isLeaf && rails.length > 0;
  const span = columnCount + Math.max(0, nestColumns - rails.length);
  // On a screen with two or more levels, the outermost group can
  // select every task inside it. A single-level screen does not.
  const selectGroup = node.depth === 0 && nestColumns > 0;
  const groupIds = selectGroup ? collectTaskIds(node) : [];
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
            label: scopeLabel(node),
            ids: tasks.map((task) => task.id),
          }}
        />
      ) : null}
      {open
        ? tasks.map((task) => {
            const row = rowById.get(task.id);
            return row ? (
              <TaskRow
                key={task.id}
                row={row}
                boxed={boxed}
                rails={rails}
              />
            ) : null;
          })
        : null}
      {showAdd ? (
        <AddTaskRow
          columnCount={span}
          viewportWidth={viewportWidth}
          rails={rails}
          boxed={boxed}
          padEnd={padEnd}
          bottomBorder={
            node.leaf && node.depth === 0 ? !hasNextSibling : true
          }
          label={addLabel(node)}
          onAdd={() => onAdd(node.values)}
        />
      ) : null}
    </>
  );
}

export function DataTable({
  className,
  data = reviewTasks,
  grouping = [],
  groupingConfig = reviewGroupingConfig,
}: {
  className?: string;
  /**
   * Starting rows. Copied once; later edits stay inside the table.
   * Defaults to the review-task sample.
   */
  data?: ReviewTask[];
  /**
   * Starting grouping keys, outer first. `[]` is flat.
   * The toolbar replaces them after the first render.
   */
  grouping?: readonly string[];
  /** Titles and order for keys. Unknown keys use the raw field value. */
  groupingConfig?: Readonly<Record<string, GroupingKeyConfig>>;
}) {
  const [rows, setRows] = useState<ReviewTask[]>(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState('');
  const [groupingKeys, setGroupingKeys] =
    useState<readonly string[]>(grouping);
  const rememberedFields = useRef(fieldsFromRows(data));
  const groupingFields = useMemo(() => {
    const next = fieldsFromRows(rows);
    if (next.length > 0) rememberedFields.current = next;
    return next.length > 0 ? next : rememberedFields.current;
  }, [rows]);
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

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      setViewportWidth(element.clientWidth);
    };
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const updateRow = useCallback(
    (id: string, patch: Partial<ReviewTask>) => {
      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, ...patch } : row,
        ),
      );
    },
    [],
  );

  const removeRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setRowSelection((current) =>
      nextRowSelection(current, [id], false),
    );
  }, []);

  const removeRows = useCallback((ids: readonly string[]) => {
    const doomed = new Set(ids);
    setRows((prev) => prev.filter((row) => !doomed.has(row.id)));
    setRowSelection((current) =>
      nextRowSelection(current, ids, false),
    );
  }, []);

  const createTask = useCallback(
    (values: Record<string, unknown>) => {
      const id = `task-${crypto.randomUUID()}`;
      editRequestId.current = id;
      setRows((prev) => [
        ...prev,
        applyGroupValues(
          {
            id,
            title: '',
            project: PROJECT_ORDER[0],
            status: 'todo',
            collaboratorIds: [],
            due: '',
            note: '',
          },
          values,
        ),
      ]);
    },
    [],
  );

  const columns = useMemo(
    () =>
      buildColumns({
        updateRow,
        removeRow,
        editRequestId,
        rowIndent: 0,
      }),
    [updateRow, removeRow],
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
    globalFilterFn: (row, _columnId, filterValue) => {
      const needle = String(filterValue).trim();
      if (!needle) return true;
      return (
        row.original.title.includes(needle) ||
        row.original.note.includes(needle)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const modelRows = table.getRowModel().rows;
  const tree = buildReviewTree(
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
        groupingKeys={groupingKeys}
        groupingFields={groupingFields}
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
                if (node.kind !== 'task') return null;
                const row = rowById.get(node.task.id);
                return row ? (
                  <TaskRow key={node.task.id} row={row} />
                ) : null;
              })}
              <AddTaskRow
                columnCount={columnCount}
                viewportWidth={viewportWidth}
                label="新增任務"
                sticky
                onAdd={() => createTask({})}
              />
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
                  onToggle={toggleGroup}
                  onAdd={createTask}
                  onSelectIds={selectIds}
                  hasNextSibling={index < tree.length - 1}
                  nextCollapsed={
                    next?.kind === 'group' &&
                    expanded[next.id] === false
                  }
                />
              ) : null;
            })}
            {tree.length === 0 ? (
              <AddTaskRow
                columnCount={
                  columnCount + Math.max(0, groupingKeys.length - 1)
                }
                viewportWidth={viewportWidth}
                label="新增任務"
                onAdd={() => createTask({})}
              />
            ) : null}
          </TableBody>
        )}
      </Table>
      <SelectionBar
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
