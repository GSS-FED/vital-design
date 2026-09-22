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
  type Table as ReactTable,
  flexRender,
} from '@tanstack/react-table';
import { type CSSProperties, type ReactNode, memo } from 'react';
import { DataTableResizeHandle } from './DataTableResizeHandle';
import {
  FILLER_COLUMN_WIDTH,
  columnSizeVar,
  getColumnSizeVars,
  getLeafColumnsInDisplayOrder,
} from './column-sizing';

export interface DataTableColumnClassNames {
  head?: string;
  cell?: string;
}

export interface DataTableProps<TData> {
  table: ReactTable<TData>;
  emptyMessage?: ReactNode;
  className?: string;
  containerClassName?: string;
  columnClassNames?: Record<string, DataTableColumnClassNames>;
  /**
   * 顯示欄寬拖曳把手。開啟後 table 改用 `table-fixed` + `<colgroup>`，
   * 欄寬由 `<table>` 上的 CSS variables 驅動（見 `column-sizing.ts`）。
   *
   * 拖曳行為由 table instance 決定：`columnResizeMode: 'onChange'` 即時跟隨，
   * `'onEnd'`（TanStack 預設）放開才套用。個別欄位以 `enableResizing: false`
   * 排除，並用 `minSize` / `maxSize` 設限。
   */
  resizable?: boolean;
}

interface DataTableBodyProps<TData> {
  table: ReactTable<TData>;
  emptyMessage: ReactNode;
  columnClassNames?: Record<string, DataTableColumnClassNames>;
  resizable: boolean;
  isResizing: boolean;
}

function DataTableBody<TData>({
  table,
  emptyMessage,
  columnClassNames,
  resizable,
}: DataTableBodyProps<TData>) {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={
              table.getVisibleLeafColumns().length +
              (resizable ? 1 : 0)
            }
            className="h-24 text-center text-grayscale-opacity-500"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          className="group"
          data-state={row.getIsSelected() ? 'selected' : undefined}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                // table-fixed cells must clip, otherwise long values bleed
                // into the neighbouring column once it is narrowed.
                resizable && 'overflow-hidden text-ellipsis',
                columnClassNames?.[cell.column.id]?.cell,
              )}
            >
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              )}
            </TableCell>
          ))}
          {resizable && <td aria-hidden="true" />}
        </TableRow>
      ))}
    </TableBody>
  );
}

/**
 * While a column is being dragged the widths come from CSS variables on
 * `<table>`, so the rows do not need to re-render — freeze them until the drag
 * ends. Outside of a drag this behaves like the plain component.
 */
const MemoDataTableBody = memo(
  DataTableBody,
  (prev, next) =>
    next.isResizing &&
    prev.table.options.data === next.table.options.data,
) as typeof DataTableBody;

export function DataTable<TData>({
  table,
  emptyMessage = 'No results.',
  className,
  containerClassName,
  columnClassNames,
  resizable = false,
}: DataTableProps<TData>) {
  const headerGroups = table.getHeaderGroups();
  const leafColumns = getLeafColumnsInDisplayOrder(table);
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn,
  );

  return (
    <Table
      className={cn(
        resizable && 'table-fixed',
        // Keep the col-resize cursor while the pointer wanders over cells
        // that set their own cursor mid-drag.
        isResizing && 'select-none [&_*]:cursor-col-resize',
        className,
      )}
      containerClassName={containerClassName}
      style={
        resizable
          ? {
              ...getColumnSizeVars(table),
              width: 'var(--table-total-size)',
              // Narrowing the columns below the container would otherwise end
              // the rows mid-frame; the trailing filler column takes the slack.
              minWidth: '100%',
            }
          : undefined
      }
    >
      {resizable && (
        <colgroup>
          {leafColumns.map((column) => (
            <col
              key={column.id}
              style={{ width: `var(${columnSizeVar(column.id)})` }}
            />
          ))}
          {/* Absorbs whatever space is left over, so the sized columns always
              render at exactly the width they were dragged to. */}
          <col style={{ width: FILLER_COLUMN_WIDTH }} />
        </colgroup>
      )}
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const size = header.getSize();
              // Widths live in the colgroup when resizing is on; otherwise
              // only emit a width for columns that opted out of the default.
              const style: CSSProperties | undefined =
                !resizable && size && size !== 150
                  ? { width: size }
                  : undefined;
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  data-column-id={header.column.id}
                  style={style}
                  className={
                    columnClassNames?.[header.column.id]?.head
                  }
                >
                  {header.isPlaceholder ? null : resizable ? (
                    <span className="block overflow-hidden text-ellipsis">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </span>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                  {resizable && !header.isPlaceholder && (
                    <DataTableResizeHandle header={header} />
                  )}
                </TableHead>
              );
            })}
            {resizable && (
              <td aria-hidden="true" className="bg-white" />
            )}
          </TableRow>
        ))}
      </TableHeader>
      <MemoDataTableBody
        table={table}
        emptyMessage={emptyMessage}
        columnClassNames={columnClassNames}
        resizable={resizable}
        isResizing={isResizing}
      />
    </Table>
  );
}
