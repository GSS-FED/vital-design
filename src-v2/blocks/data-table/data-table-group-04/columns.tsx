import { Avatar } from '@/components/avatar/Avatar';
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';
import { Tag } from '@/components/tag/Tag';
import type { ColumnDef } from '@tanstack/react-table';
import {
  type EmissionRow,
  PERSON_OPTIONS,
  TAG_OPTIONS,
  type TagOption,
} from './data';
import { PopoverEditTrigger } from './popover-edit';

export type ColumnContext = {
  updateRow: (id: string, patch: Partial<EmissionRow>) => void;
};

function TagsCell({ tags }: { tags: TagOption[] }) {
  if (tags.length === 0) {
    return (
      <span className="truncate text-grayscale-opacity-400">
        ＋ 新增標籤
      </span>
    );
  }

  const firstTag = tags[0];
  if (!firstTag) return null;

  const hiddenCount = tags.length - 1;

  return (
    <span className="flex min-w-0 items-center gap-1 overflow-hidden">
      <Tag key={firstTag.id} color="default" className="shrink-0">
        {firstTag.label}
      </Tag>
      {hiddenCount > 0 ? (
        <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-grayscale-opacity-100 px-2 font-sans text-xs leading-5 text-grayscale-opacity-700">
          +{hiddenCount}
        </span>
      ) : null}
    </span>
  );
}

export function buildColumns({
  updateRow,
}: ColumnContext): ColumnDef<EmissionRow>[] {
  return [
    {
      id: 'source',
      header: '排放源',
      size: 180,
      cell: ({ row }) => (
        <Editable
          value={row.original.source}
          onCommit={(next) =>
            updateRow(row.original.id, { source: next })
          }
          placeholder="輸入排放源"
          className="h-11"
        >
          <EditableDisplay className="h-full rounded-none px-3 py-1" />
          <EditableInput className="h-full rounded-none px-3 py-1" />
        </Editable>
      ),
    },
    {
      id: 'factor',
      header: '係數名稱',
      size: 180,
      cell: ({ row }) => (
        <Editable
          value={row.original.factor}
          onCommit={(next) =>
            updateRow(row.original.id, { factor: next })
          }
          placeholder="輸入係數名稱"
          className="h-11"
        >
          <EditableDisplay className="h-full rounded-none px-3 py-1" />
          <EditableInput className="h-full rounded-none px-3 py-1" />
        </Editable>
      ),
    },
    {
      id: 'owner',
      header: '負責人',
      size: 140,
      cell: ({ row }) => {
        const person = PERSON_OPTIONS.find(
          (p) => p.id === row.original.ownerId,
        );
        return (
          <PopoverEditTrigger
            className="h-11 rounded-none px-3 py-1"
            payload={{
              kind: 'person',
              value: row.original.ownerId,
              onCommit: (next) =>
                updateRow(row.original.id, { ownerId: next }),
            }}
          >
            {person ? (
              <span className="inline-flex items-center gap-1.5 text-grayscale-opacity-800">
                <Avatar
                  fallback={person.name.slice(0, 1)}
                  size="xs"
                  color={person.color}
                />
                {person.name}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-grayscale-opacity-500">
                <Avatar fallback="?" size="xs" color="default" />
                未指派
              </span>
            )}
          </PopoverEditTrigger>
        );
      },
    },
    {
      id: 'tags',
      header: '標籤',
      size: 200,
      cell: ({ row }) => {
        const tags = row.original.tagIds.flatMap((id) => {
          const found = TAG_OPTIONS.find((t) => t.id === id);
          return found ? [found] : [];
        });
        return (
          <PopoverEditTrigger
            className="h-11 rounded-none px-3 py-1"
            payload={{
              kind: 'tags',
              value: row.original.tagIds,
              onCommit: (next) =>
                updateRow(row.original.id, { tagIds: next }),
            }}
          >
            <TagsCell tags={tags} />
          </PopoverEditTrigger>
        );
      },
    },
    {
      id: 'updatedAt',
      header: '更新日',
      size: 140,
      cell: ({ row }) => (
        <PopoverEditTrigger
          className="h-11 rounded-none px-3 py-1"
          payload={{
            kind: 'date',
            value: row.original.updatedAt,
            onCommit: (next) =>
              updateRow(row.original.id, { updatedAt: next }),
          }}
        >
          {row.original.updatedAt ?? (
            <span className="text-grayscale-opacity-400">
              選擇日期
            </span>
          )}
        </PopoverEditTrigger>
      ),
    },
  ];
}
