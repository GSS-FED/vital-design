'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import type {
  ColumnDef,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';
import { createContext, useContext } from 'react';
import { RowActionsMenu } from './action-bar';

/** Rows a repeated header checkbox may select. Flat tables leave this empty. */
export type SelectionScope = {
  label: string;
  ids: readonly string[];
};

export const SelectionScopeContext =
  createContext<SelectionScope | null>(null);

export function selectionFlags(
  ids: readonly string[],
  isSelected: (id: string) => boolean,
) {
  let selected = 0;
  for (const id of ids) {
    if (isSelected(id)) selected += 1;
  }
  return {
    checked: ids.length > 0 && selected === ids.length,
    indeterminate: selected > 0 && selected < ids.length,
  };
}

export function nextRowSelection(
  current: RowSelectionState,
  ids: readonly string[],
  selected: boolean,
): RowSelectionState {
  const next = { ...current };
  for (const id of ids) {
    if (selected) next[id] = true;
    else delete next[id];
  }
  return next;
}

function SelectAllCheckbox<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const scope = useContext(SelectionScopeContext);
  if (!scope) {
    return (
      <Checkbox
        aria-label="全選"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
      />
    );
  }

  const flags = selectionFlags(scope.ids, (id) =>
    table.getRow(id).getIsSelected(),
  );

  return (
    <Checkbox
      aria-label={`全選 ${scope.label}`}
      checked={flags.checked}
      indeterminate={flags.indeterminate}
      disabled={scope.ids.length === 0}
      onCheckedChange={(value) =>
        table.setRowSelection(
          nextRowSelection(
            table.getState().rowSelection,
            scope.ids,
            Boolean(value),
          ),
        )
      }
    />
  );
}

/** Pinned left. Names each row checkbox after `rowLabel`. */
export function selectColumn<TData>(
  rowLabel: (row: TData) => string,
): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => (
      <Checkbox
        aria-label={`選取 ${rowLabel(row.original)}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(Boolean(value))
        }
      />
    ),
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  };
}

/** Pinned right. The row menu; 刪除 removes the row. */
export function actionsColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'actions',
    header: () => <span className="sr-only">操作</span>,
    // text icon-md is 1em (14px). The pinned cell pads 12px on each side.
    size: 38,
    minSize: 38,
    maxSize: 38,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    cell: ({ row, table }) => (
      <RowActionsMenu
        onDelete={() => table.options.meta?.removeRow(row.id)}
      />
    ),
  };
}
