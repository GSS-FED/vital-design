import { Avatar } from '@/components/avatar/Avatar';
import { Button } from '@/components/button/Button';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/progress/Progress';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { Toolbar, ToolbarSpacer } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { DataTableColumnHeader } from './DataTableColumnHeader';

export function FilterButton({ children }: { children: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            theme="default"
            className="h-8 rounded-full px-3 font-normal"
          >
            {children}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>全部</DropdownMenuItem>
        <DropdownMenuItem>已指派</DropdownMenuItem>
        <DropdownMenuItem>未指派</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ActionBar({
  searchPlaceholder,
  left,
  right,
  raised = false,
  minWidthClassName,
}: {
  searchPlaceholder: string;
  left?: ReactNode;
  right?: ReactNode;
  raised?: boolean;
  minWidthClassName?: string;
}) {
  return (
    <Toolbar
      size="sm"
      className={cn(
        'h-12 flex-nowrap gap-6 overflow-x-auto overflow-y-hidden rounded bg-white px-3 py-2',
        '[&_[data-slot=toolbar-group]]:shrink-0',
        raised && 'shadow-emphasis',
        minWidthClassName,
      )}
    >
      <SearchBar
        placeholder={searchPlaceholder}
        width="200px"
        className="h-8 shrink-0 rounded border-none"
      />
      {left}
      <ToolbarSpacer />
      {right}
    </Toolbar>
  );
}

export function MoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            aria-label="更多操作"
            variant="text"
            size="icon-md"
            theme="default"
          >
            <EllipsisIcon />
          </Button>
        }
      />
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>編輯</DropdownMenuItem>
          <DropdownMenuItem>複制</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>刪除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface EsgTopic {
  id: number;
  topic: string;
  cycle: '每年' | '每季' | '每月';
  owner: string;
  reviewer: string;
  progress: 'yearly' | 'quarterly' | 'monthly';
  status: 'todo' | 'review' | 'done';
  due: string;
  updated: string;
  pillar: 'E - 環境保護' | 'S - 社會責任' | 'G - 公司治理';
}

export const esgData: EsgTopic[] = [
  {
    id: 1,
    topic: '溫室氣體排放',
    cycle: '每年',
    owner: '張',
    reviewer: '張',
    progress: 'yearly',
    status: 'todo',
    due: '2025/03/01',
    updated: '1年前',
    pillar: 'E - 環境保護',
  },
  {
    id: 2,
    topic: '氣候相關議題管理',
    cycle: '每季',
    owner: '張',
    reviewer: '張',
    progress: 'quarterly',
    status: 'review',
    due: '2025/03/01',
    updated: '3個月前',
    pillar: 'E - 環境保護',
  },
  {
    id: 3,
    topic: '能源管理',
    cycle: '每月',
    owner: '張',
    reviewer: '蔡',
    progress: 'monthly',
    status: 'done',
    due: '2025/03/01',
    updated: '1個月前',
    pillar: 'E - 環境保護',
  },
  {
    id: 6,
    topic: '人力發展',
    cycle: '每年',
    owner: 'PC',
    reviewer: 'FW',
    progress: 'yearly',
    status: 'done',
    due: '2025/03/01',
    updated: '1年前',
    pillar: 'S - 社會責任',
  },
  {
    id: 7,
    topic: '食品安全',
    cycle: '每年',
    owner: 'PC',
    reviewer: 'FW',
    progress: 'yearly',
    status: 'done',
    due: '2025/03/01',
    updated: '5天前',
    pillar: 'S - 社會責任',
  },
  {
    id: 8,
    topic: '董事會',
    cycle: '每年',
    owner: '張',
    reviewer: '張',
    progress: 'yearly',
    status: 'todo',
    due: '2025/03/01',
    updated: '1年前',
    pillar: 'G - 公司治理',
  },
];

function ProgressChart({ value }: { value: EsgTopic['progress'] }) {
  if (value === 'yearly') {
    return (
      <span className="block h-1.5 w-[118px] rounded bg-success-500" />
    );
  }

  const colors =
    value === 'quarterly'
      ? [
          'bg-success-500',
          'bg-warning-500',
          'bg-grayscale-opacity-500',
        ]
      : [
          'bg-success-500',
          'bg-warning-500',
          'bg-grayscale-opacity-500',
          'bg-destructive-500',
          'bg-grayscale-opacity-300',
          'bg-grayscale-opacity-300',
          'bg-grayscale-opacity-300',
          'bg-grayscale-opacity-300',
          'bg-grayscale-opacity-300',
          'bg-grayscale-opacity-300',
        ];

  return (
    <span className="inline-flex w-[118px] items-center gap-1">
      {colors.map((color, index) => (
        <span
          key={index}
          className={cn(
            'h-1.5 flex-1 rounded',
            color,
            color === 'bg-grayscale-opacity-300' && 'h-0.5',
          )}
        />
      ))}
    </span>
  );
}

export const esgColumns: ColumnDef<EsgTopic>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select row ${row.original.id}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(Boolean(value))
        }
      />
    ),
    size: 40,
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="議題編號" />
    ),
    cell: ({ row }) => row.original.id,
    size: 96,
  },
  {
    accessorKey: 'topic',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="指標議題" />
    ),
    cell: ({ row }) => row.original.topic,
  },
  {
    accessorKey: 'cycle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="週期" />
    ),
    cell: ({ row }) => row.original.cycle,
    size: 80,
  },
  {
    accessorKey: 'owner',
    header: '負責人',
    cell: ({ row }) => (
      <Avatar
        fallback={row.original.owner}
        size="sm"
        color="tiffany"
      />
    ),
    size: 80,
    enableSorting: false,
  },
  {
    accessorKey: 'reviewer',
    header: '覆核人',
    cell: ({ row }) => (
      <Avatar
        fallback={row.original.reviewer}
        size="sm"
        color="tiffany"
      />
    ),
    size: 80,
    enableSorting: false,
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="進度" />
    ),
    cell: ({ row }) => (
      <ProgressChart value={row.original.progress} />
    ),
    size: 142,
  },
  {
    accessorKey: 'due',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="期限" />
    ),
    cell: ({ row }) => row.original.due,
    size: 110,
  },
  {
    accessorKey: 'updated',
    header: '最後更新',
    cell: ({ row }) => row.original.updated,
    size: 100,
    enableSorting: false,
  },
];

export function PillarSummary({ rows }: { rows: EsgTopic[] }) {
  const todo = rows.filter((r) => r.status === 'todo').length;
  const review = rows.filter((r) => r.status === 'review').length;
  const done = rows.length - todo - review;
  return (
    <div className="flex w-[344px] flex-col gap-1 px-3">
      <div className="flex h-6 items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-[3px] bg-grayscale-opacity-500" />
            <span className="text-base font-medium leading-6 text-grayscale-opacity-800 tabular-nums">
              {todo}
            </span>
            <span className="text-[13px] leading-5 text-grayscale-opacity-600">
              待填寫
            </span>
          </span>
          <span className="text-[13px] leading-5 text-grayscale-opacity-600">
            /
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-[3px] bg-warning-500" />
            <span className="text-base font-medium leading-6 text-grayscale-opacity-800 tabular-nums">
              {review}
            </span>
            <span className="text-[13px] leading-5 text-grayscale-opacity-600">
              待覆核
            </span>
          </span>
        </div>
        <span className="text-[13px] leading-5 text-grayscale-opacity-600 tabular-nums">
          共 {rows.length} 項
        </span>
      </div>
      <ProgressSegments
        aria-label="Group progress"
        joint="connected"
        className="h-1.5 w-full overflow-hidden rounded-[3px] bg-success-500"
      >
        <ProgressSegment
          className="bg-grayscale-opacity-500"
          style={{ flex: todo || 0.001 }}
        />
        <ProgressSegment
          className="bg-warning-500"
          style={{ flex: review || 0.001 }}
        />
        <ProgressSegment
          className="bg-success-500"
          style={{ flex: done || 0.001 }}
        />
      </ProgressSegments>
    </div>
  );
}
