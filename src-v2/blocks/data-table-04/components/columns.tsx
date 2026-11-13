'use client';

import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/avatar/Avatar';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { Tag } from '@/components/tag/Tag';
import { cn } from '@/lib/utils';
import type {
  ColumnDef,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';
import {
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RowActionsMenu } from './action-bar';
import {
  COLUMN_FIELDS,
  PEOPLE,
  type ReviewTask,
  STATUS_META,
  STATUS_ORDER,
  type TaskStatus,
} from './data';
import { DataTableColumnHeader } from './data-table-column-header';

export type ColumnContext = {
  updateRow: (id: string, patch: Partial<ReviewTask>) => void;
  removeRow: (id: string) => void;
  /** Set to a row id before that row renders. Cleared after edit starts. */
  editRequestId: RefObject<string | null>;
  /** Extra select-column width. Rows at a deeper group start further right. */
  rowIndent: number;
};

const STATUS_RANK: Record<TaskStatus, number> = {
  todo: 0,
  doing: 1,
  review: 2,
  done: 3,
};

const VISIBLE_COLLABORATORS = 3;

function CollaboratorsCell({ ids }: { ids: string[] }) {
  const people = ids.flatMap((id) => {
    const person = PEOPLE.find((item) => item.id === id);
    return person ? [person] : [];
  });
  const visible = people.slice(0, VISIBLE_COLLABORATORS);
  const hidden = people.length - visible.length;

  return (
    <AvatarGroup
      role="group"
      aria-label={people.map((person) => person.name).join('、')}
    >
      {visible.map((person) => (
        <Avatar
          key={person.id}
          size="xs"
          name={person.name}
          fallback={person.name.slice(0, 1)}
          color={person.color}
        />
      ))}
      {hidden > 0 ? (
        <AvatarGroupCount>+{hidden}</AvatarGroupCount>
      ) : null}
    </AvatarGroup>
  );
}

function StatusCell({
  status,
  onCommit,
}: {
  status: TaskStatus;
  onCommit: (next: TaskStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[status];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        aria-label={`狀態 ${meta.label}`}
        className="inline-flex h-11 w-full items-center rounded-none border border-transparent px-3 text-left outline-none hover:border-transparent focus-visible:border-primary-500 data-[popup-open]:border-primary-500"
      >
        <Tag color={meta.color}>{meta.label}</Tag>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1.5" align="start">
        <div className="flex flex-col gap-0.5">
          {STATUS_ORDER.map((id) => {
            const option = STATUS_META[id];
            const selected = id === status;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onCommit(id);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full rounded px-2 py-1.5 hover:bg-grayscale-opacity-150',
                  selected && 'bg-grayscale-opacity-150',
                )}
              >
                <Tag color={option.color}>{option.label}</Tag>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TextCell({
  value,
  placeholder,
  onCommit,
  editRequestId,
  rowId,
}: {
  value: string;
  placeholder: string;
  onCommit: (next: string) => void;
  editRequestId?: RefObject<string | null>;
  rowId?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!rowId || editRequestId?.current !== rowId) return;
    // Editable starts closed. Open it here so the shared primitive
    // stays unchanged. Clear the request after this effect, so a
    // strict-mode remount can still enter edit, without rebuilding columns.
    displayRef.current?.click();
    rootRef.current?.scrollIntoView?.({
      block: 'center',
      inline: 'nearest',
    });
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (editRequestId.current === rowId) {
        editRequestId.current = null;
      }
    });
    return () => {
      cancelled = true;
    };
  }, [editRequestId, rowId]);

  return (
    <Editable
      ref={rootRef}
      value={value}
      placeholder={placeholder}
      onCommit={onCommit}
      className="h-11"
    >
      <EditableDisplay
        ref={displayRef}
        className="h-full rounded-none border-transparent px-3 py-1 hover:border-transparent data-[empty]:border-transparent hover:data-[empty]:border-transparent focus-visible:border-primary-500 focus-visible:data-[empty]:border-primary-500"
      />
      <EditableInput
        placeholder={placeholder}
        className="h-full rounded-none px-3 py-1"
      />
    </Editable>
  );
}

/** Rows the repeated header checkbox may select. Flat tables leave this empty. */
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

function SelectAllCheckbox({ table }: { table: Table<ReviewTask> }) {
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

const LOCKED_FIELDS = new Set(
  COLUMN_FIELDS.filter((field) => field.locked).map(
    (field) => field.id,
  ),
);

export function buildColumns({
  updateRow,
  removeRow,
  editRequestId,
  rowIndent,
}: ColumnContext): ColumnDef<ReviewTask>[] {
  const selectSize = 40 + rowIndent;

  return [
    {
      id: 'select',
      header: ({ table }) => <SelectAllCheckbox table={table} />,
      cell: ({ row }) => (
        <Checkbox
          aria-label={`選取 ${row.original.title}`}
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(Boolean(value))
          }
        />
      ),
      size: selectSize,
      minSize: selectSize,
      maxSize: selectSize,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'title',
      enableHiding: !LOCKED_FIELDS.has('title'),
      accessorFn: (row) => row.title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="任務" />
      ),
      size: 220,
      cell: ({ row }) => (
        <TextCell
          value={row.original.title}
          placeholder="輸入任務"
          editRequestId={editRequestId}
          rowId={row.original.id}
          onCommit={(title) => updateRow(row.original.id, { title })}
        />
      ),
    },
    {
      id: 'status',
      enableHiding: !LOCKED_FIELDS.has('status'),
      accessorFn: (row) => row.status,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="狀態" />
      ),
      size: 112,
      sortingFn: (rowA, rowB) =>
        STATUS_RANK[rowA.original.status] -
        STATUS_RANK[rowB.original.status],
      filterFn: (row, _columnId, value: TaskStatus) =>
        row.original.status === value,
      cell: ({ row }) => (
        <StatusCell
          status={row.original.status}
          onCommit={(status) =>
            updateRow(row.original.id, { status })
          }
        />
      ),
    },
    {
      id: 'collaborators',
      enableHiding: !LOCKED_FIELDS.has('collaborators'),
      accessorFn: (row) => row.collaboratorIds.length,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="協作者" />
      ),
      size: 148,
      cell: ({ row }) => (
        <CollaboratorsCell ids={row.original.collaboratorIds} />
      ),
    },
    {
      id: 'due',
      enableHiding: !LOCKED_FIELDS.has('due'),
      accessorFn: (row) => row.due,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="期限" />
      ),
      size: 120,
      cell: ({ row }) => row.original.due,
    },
    {
      id: 'note',
      accessorFn: (row) => row.note,
      enableHiding: !LOCKED_FIELDS.has('note'),
      header: '備註',
      size: 360,
      enableSorting: false,
      cell: ({ row }) => (
        <TextCell
          value={row.original.note}
          placeholder="新增備註"
          onCommit={(note) => updateRow(row.original.id, { note })}
        />
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => <span className="sr-only">操作</span>,
      // text icon-md is 1em (14px). The pinned cell pads 12px on each side.
      size: 38,
      minSize: 38,
      maxSize: 38,
      enableSorting: false,
      cell: ({ row }) => (
        <RowActionsMenu onDelete={() => removeRow(row.original.id)} />
      ),
    },
  ];
}
