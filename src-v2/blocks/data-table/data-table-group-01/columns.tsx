import { Avatar } from '@/components/avatar/Avatar';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/progress/Progress';
import { Tag } from '@/components/tag/Tag';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { ComponentProps } from 'react';
import { MoreButton } from './action-bar';
import type { CandidateTreeRow } from './data';

function UserCell({
  name,
  fallback,
  color = 'tiffany',
  muted = false,
}: {
  name?: string;
  fallback: string;
  color?: ComponentProps<typeof Avatar>['color'];
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        muted ? 'text-grayscale-500' : 'text-grayscale-800',
      )}
    >
      <Avatar fallback={fallback} size="xs" color={color} />
      {name}
    </span>
  );
}

function CandidateStage({ count = 3 }: { count?: number }) {
  return (
    <ProgressSegments className="gap-1">
      {Array.from({ length: count }).map((_, index) => (
        <ProgressSegment
          key={index}
          className="flex-1"
          data-state="inactive"
        />
      ))}
    </ProgressSegments>
  );
}

export const candidateColumns: ColumnDef<CandidateTreeRow>[] = [
  {
    id: 'select',
    header: () => <Checkbox aria-label="Select all" />,
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? (
        <Checkbox aria-label={`Select ${row.original.name}`} />
      ) : null,
    size: 40,
    enableSorting: false,
  },
  {
    id: 'name',
    accessorFn: (row) => (row.kind === 'candidate' ? row.name : ''),
    header: '姓名',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? row.original.name : null,
    size: 86,
  },
  {
    id: 'experience',
    accessorFn: (row) =>
      row.kind === 'candidate' ? row.experience : '',
    header: '工作經歷',
    cell: ({ row }) =>
      row.original.kind === 'candidate'
        ? row.original.experience
        : null,
    size: 92,
  },
  {
    id: 'owner',
    accessorFn: (row) => (row.kind === 'candidate' ? row.owner : ''),
    header: '負責人',
    cell: ({ row }) => {
      if (row.original.kind !== 'candidate') return null;
      return row.original.owner ? (
        <UserCell
          name={row.original.owner}
          fallback={row.original.owner.slice(0, 1)}
          color="orange"
        />
      ) : (
        <UserCell name="未指派" fallback="?" color="default" muted />
      );
    },
    size: 120,
  },
  {
    id: 'leader',
    accessorFn: (row) => (row.kind === 'candidate' ? row.leader : ''),
    header: '委託主管',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? (
        <UserCell
          name={row.original.leader}
          fallback={row.original.leader.slice(0, 1)}
          color={row.original.leaderColor}
        />
      ) : null,
    size: 120,
  },
  {
    id: 'stage',
    header: '面試階段',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? (
        <CandidateStage count={row.index % 2 === 0 ? 3 : 5} />
      ) : null,
    size: 108,
    enableSorting: false,
  },
  {
    id: 'skills',
    accessorFn: (row) =>
      row.kind === 'candidate' ? row.skills.join(',') : '',
    header: '專業技能',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? (
        <div className="flex gap-1">
          {row.original.skills.map((s) => (
            <Tag key={s} color="default">
              {s}
            </Tag>
          ))}
        </div>
      ) : null,
    size: 130,
  },
  {
    id: 'updated',
    accessorFn: (row) =>
      row.kind === 'candidate' ? row.updated : '',
    header: '最後更新時間',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? row.original.updated : null,
    size: 124,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      row.original.kind === 'candidate' ? <MoreButton /> : null,
    size: 40,
    enableSorting: false,
  },
];
