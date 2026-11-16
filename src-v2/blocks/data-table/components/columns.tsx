'use client';

import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/avatar/Avatar';
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';
import { Tag } from '@/components/tag/Tag';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { type RefObject, useEffect, useRef } from 'react';
import {
  PEOPLE,
  type ReviewTask,
  STATUS_META,
  STATUS_ORDER,
  TAG_OPTIONS,
  type TaskStatus,
} from './data';
import { DataTableColumnHeader } from './data-table-column-header';
import {
  DateEditor,
  PeopleEditor,
  PopoverEditCell,
  TagsEditor,
} from './popover-edit';

const STATUS_RANK: Record<TaskStatus, number> = {
  todo: 0,
  doing: 1,
  review: 2,
  done: 3,
};

const VISIBLE_COLLABORATORS = 3;

function Placeholder({ children }: { children: string }) {
  return (
    <span className="truncate text-grayscale-opacity-400">
      {children}
    </span>
  );
}

function CollaboratorsCell({ ids }: { ids: readonly string[] }) {
  const people = ids.flatMap((id) => {
    const person = PEOPLE.find((item) => item.id === id);
    return person ? [person] : [];
  });
  if (people.length === 0)
    return <Placeholder>新增協作者</Placeholder>;
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

function TagsCell({ ids }: { ids: readonly string[] }) {
  const tags = ids.flatMap((id) => {
    const tag = TAG_OPTIONS.find((item) => item.id === id);
    return tag ? [tag] : [];
  });
  const [first] = tags;
  if (!first) return <Placeholder>新增標籤</Placeholder>;

  return (
    <span className="flex min-w-0 items-center gap-1 overflow-hidden">
      <Tag color="default" className="shrink-0">
        {first.label}
      </Tag>
      {tags.length > 1 ? (
        <span className="text-xs text-grayscale-opacity-700">
          +{tags.length - 1}
        </span>
      ) : null}
    </span>
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
  /** Set by the table when 新增 adds a row; that row opens for editing. */
  editRequestId?: RefObject<string | null>;
  rowId?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!rowId || !editRequestId || editRequestId.current !== rowId) {
      return;
    }
    // Editable starts closed. Open it here so the shared primitive
    // stays unchanged. Clear the request after this effect, so a
    // strict-mode remount can still enter edit.
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

/**
 * The review-task columns. Replace these, `data.ts`, and the config in
 * `review-task-table.tsx` to show your own rows.
 *
 * `meta.label` names the column in 顯示欄位 and for screen readers.
 * `meta.editable` gives the cell the editable hover. `meta.searchable`
 * columns are what the search box matches. `enableHiding: false` locks
 * a column on in 顯示欄位.
 */
export const reviewTaskColumns: ColumnDef<ReviewTask>[] = [
  {
    id: 'title',
    accessorFn: (row) => row.title,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="任務" />
    ),
    meta: { label: '任務', editable: true, searchable: true },
    enableHiding: false,
    size: 220,
    cell: ({ row, table }) => (
      <TextCell
        value={row.original.title}
        placeholder="輸入任務"
        editRequestId={table.options.meta?.editRequestId}
        rowId={row.id}
        onCommit={(title) =>
          table.options.meta?.updateRow(row.id, { title })
        }
      />
    ),
  },
  {
    id: 'status',
    accessorFn: (row) => row.status,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="狀態" />
    ),
    meta: { label: '狀態', editable: true },
    size: 112,
    sortingFn: (a, b) =>
      STATUS_RANK[a.original.status] - STATUS_RANK[b.original.status],
    cell: ({ row, table }) => {
      const meta = STATUS_META[row.original.status];
      return (
        <PopoverEditCell
          label={`狀態 ${meta.label}`}
          editor={(close) => (
            <div className="flex flex-col gap-0.5">
              {STATUS_ORDER.map((id) => {
                const option = STATUS_META[id];
                const selected = id === row.original.status;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      table.options.meta?.updateRow(row.id, {
                        status: id,
                      });
                      close();
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
          )}
        >
          <Tag color={meta.color}>{meta.label}</Tag>
        </PopoverEditCell>
      );
    },
  },
  {
    id: 'collaborators',
    accessorFn: (row) => row.collaboratorIds.length,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="協作者" />
    ),
    meta: { label: '協作者', editable: true },
    size: 148,
    cell: ({ row, table }) => (
      <PopoverEditCell
        label="編輯協作者"
        editor={() => (
          <PeopleEditor
            value={row.original.collaboratorIds}
            options={PEOPLE}
            onCommit={(collaboratorIds) =>
              table.options.meta?.updateRow(row.id, {
                collaboratorIds,
              })
            }
          />
        )}
      >
        <CollaboratorsCell ids={row.original.collaboratorIds} />
      </PopoverEditCell>
    ),
  },
  {
    id: 'due',
    accessorFn: (row) => row.due,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="期限" />
    ),
    meta: { label: '期限', editable: true },
    size: 120,
    cell: ({ row, table }) => (
      <PopoverEditCell
        label={`期限 ${row.original.due || '未設定'}`}
        editor={(close) => (
          <DateEditor
            value={row.original.due}
            onCommit={(due) => {
              table.options.meta?.updateRow(row.id, { due });
              close();
            }}
          />
        )}
      >
        {row.original.due || <Placeholder>設定期限</Placeholder>}
      </PopoverEditCell>
    ),
  },
  {
    id: 'tags',
    accessorFn: (row) => row.tagIds.join('、'),
    header: '標籤',
    meta: { label: '標籤', editable: true },
    size: 140,
    enableSorting: false,
    cell: ({ row, table }) => (
      <PopoverEditCell
        label="編輯標籤"
        editor={() => (
          <TagsEditor
            value={row.original.tagIds}
            options={TAG_OPTIONS}
            onCommit={(tagIds) =>
              table.options.meta?.updateRow(row.id, { tagIds })
            }
          />
        )}
      >
        <TagsCell ids={row.original.tagIds} />
      </PopoverEditCell>
    ),
  },
  {
    id: 'note',
    accessorFn: (row) => row.note,
    header: '備註',
    meta: { label: '備註', editable: true, searchable: true },
    size: 360,
    enableSorting: false,
    cell: ({ row, table }) => (
      <TextCell
        value={row.original.note}
        placeholder="新增備註"
        onCommit={(note) =>
          table.options.meta?.updateRow(row.id, { note })
        }
      />
    ),
  },
];
