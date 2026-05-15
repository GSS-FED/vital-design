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
import { Switch } from '@/components/switch/Switch';
import { Tag } from '@/components/tag/Tag';
import { Toolbar, ToolbarSpacer } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { ComponentProps, ReactNode } from 'react';
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

export interface Candidate {
  id: string;
  name: string;
  experience: string;
  owner: string | null;
  leader: string;
  leaderColor: ComponentProps<typeof Avatar>['color'];
  stage: null;
  skills: string[];
  updated: string;
  jobTitle: string;
}

export const candidates: Candidate[] = [
  {
    id: '1',
    name: '黃○鋪',
    experience: '3年',
    owner: null,
    leader: '林○方',
    leaderColor: 'tiffany',
    stage: null,
    skills: ['.Net', 'C#'],
    updated: '2025/09/22 12:01',
    jobTitle: '.Net 工程師',
  },
  {
    id: '2',
    name: '陳○樣',
    experience: '4年',
    owner: null,
    leader: '林○方',
    leaderColor: 'tiffany',
    stage: null,
    skills: ['.Net'],
    updated: '2025/09/18 17:29',
    jobTitle: '.Net 工程師',
  },
  {
    id: '3',
    name: '張○安',
    experience: '5年',
    owner: '康',
    leader: '方○廚',
    leaderColor: 'blue',
    stage: null,
    skills: ['.Net'],
    updated: '2025/09/18 17:28',
    jobTitle: '.Net 工程師',
  },
  {
    id: '4',
    name: '張○昂',
    experience: '2年',
    owner: null,
    leader: '陳○思',
    leaderColor: 'default',
    stage: null,
    skills: ['Microsoft Office'],
    updated: '2025/09/10 14:56',
    jobTitle: 'HR 導入顧問',
  },
  {
    id: '5',
    name: '林○樣',
    experience: '4年',
    owner: null,
    leader: '陳○思',
    leaderColor: 'default',
    stage: null,
    skills: ['Microsoft Office'],
    updated: '2025/09/10 14:56',
    jobTitle: 'HR 導入顧問',
  },
];

export const candidateColumns: ColumnDef<Candidate>[] = [
  {
    id: 'select',
    header: () => <Checkbox aria-label="Select all" />,
    cell: ({ row }) => (
      <Checkbox aria-label={`Select ${row.original.name}`} />
    ),
    size: 40,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: '姓名',
    cell: ({ row }) => row.original.name,
    size: 86,
  },
  {
    accessorKey: 'experience',
    header: '工作經歷',
    cell: ({ row }) => row.original.experience,
    size: 92,
  },
  {
    accessorKey: 'owner',
    header: '負責人',
    cell: ({ row }) =>
      row.original.owner ? (
        <UserCell
          name={row.original.owner}
          fallback={row.original.owner.slice(0, 1)}
          color="orange"
        />
      ) : (
        <UserCell name="未指派" fallback="?" color="default" muted />
      ),
    size: 120,
  },
  {
    accessorKey: 'leader',
    header: '委託主管',
    cell: ({ row }) => (
      <UserCell
        name={row.original.leader}
        fallback={row.original.leader.slice(0, 1)}
        color={row.original.leaderColor}
      />
    ),
    size: 120,
  },
  {
    accessorKey: 'stage',
    header: '面試階段',
    cell: ({ row }) => (
      <CandidateStage count={row.index % 2 == 0 ? 3 : 5} />
    ),
    size: 108,
  },
  {
    accessorKey: 'skills',
    header: '專業技能',
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.skills.map((s) => (
          <Tag key={s} color="default">
            {s}
          </Tag>
        ))}
      </div>
    ),
    size: 130,
  },
  {
    accessorKey: 'updated',
    header: '最後更新時間',
    cell: ({ row }) => row.original.updated,
    size: 124,
  },
  {
    id: 'actions',
    header: '',
    cell: () => <MoreButton />,
    size: 40,
    enableSorting: false,
  },
];

export interface Emission {
  id: number;
  source: string;
  formula: string;
  count: number;
  owner: string;
  reviewer: string;
  template: string;
  reference: string | null;
  tag: string | null;
  quantified: boolean;
  category: string;
  subcategory: string;
}

export type EmissionTreeRow =
  | {
      id: string;
      kind: 'category';
      title: string;
      subRows: EmissionTreeRow[];
    }
  | {
      id: string;
      kind: 'subcategory';
      title: string;
      subRows: EmissionTreeRow[];
    }
  | (Emission & {
      kind: 'source';
    });

export const emissions: Emission[] = [
  {
    id: 1,
    source: '緊急發電機(柴油)',
    formula: '柴油(固)',
    count: 3,
    owner: '張',
    reviewer: '張',
    template: '自訂欄位',
    reference: '車用汽…',
    tag: '電力',
    quantified: true,
    category: '類別1：直接',
    subcategory: '1.1 固定燃燒之直接排放',
  },
  {
    id: 2,
    source: '公務車(汽油)',
    formula: '車用汽油(移)-氧化觸媒',
    count: 3,
    owner: '張',
    reviewer: '張',
    template: '自訂欄位',
    reference: null,
    tag: null,
    quantified: true,
    category: '類別1：直接',
    subcategory: '1.1 固定燃燒之直接排放',
  },
  {
    id: 3,
    source: '公務車空調_R-134A',
    formula: '車輛空調冷媒_HFC-134a/R-134a…',
    count: 3,
    owner: '張',
    reviewer: '張',
    template: '自訂欄位',
    reference: null,
    tag: null,
    quantified: true,
    category: '類別1：直接',
    subcategory: '1.4 逸散源之直接排放',
  },
  {
    id: 6,
    source: '滅火器(CO2)',
    formula: '滅火器(CO2)',
    count: 3,
    owner: '未指派',
    reviewer: '未指派',
    template: '自訂欄位',
    reference: null,
    tag: null,
    quantified: false,
    category: '類別1：直接',
    subcategory: '1.4 逸散源之直接排放',
  },
  {
    id: 7,
    source: '外購電力',
    formula: '台電',
    count: 3,
    owner: '未指派',
    reviewer: '未指派',
    template: '台電電費單',
    reference: null,
    tag: '綠電',
    quantified: true,
    category: '類別2：能源間接',
    subcategory: '2.1 輸入電力之間接排放',
  },
];

export const emissionColumns: ColumnDef<EmissionTreeRow>[] = [
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
      <DataTableColumnHeader column={column} title="序" />
    ),
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.id : null,
    size: 38,
  },
  {
    id: 'source',
    accessorFn: (row) => (row.kind === 'source' ? row.source : ''),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="排放源" />
    ),
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.source : null,
    size: 164,
  },
  {
    id: 'formula',
    accessorFn: (row) => (row.kind === 'source' ? row.formula : ''),
    header: '係數名稱',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.formula : null,
    size: 312,
    enableSorting: false,
  },
  {
    id: 'count',
    accessorFn: (row) => (row.kind === 'source' ? row.count : 0),
    header: '據點數',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.count : null,
    size: 66,
    enableSorting: false,
  },
  {
    id: 'owner',
    accessorFn: (row) => (row.kind === 'source' ? row.owner : ''),
    header: '負責人',
    cell: ({ row }) =>
      row.original.kind !== 'source' ? null : row.original.owner ===
        '未指派' ? (
        <Avatar fallback="?" size="sm" color="orange" />
      ) : (
        <Avatar
          fallback={row.original.owner}
          name={row.original.owner}
          size="sm"
          color="tiffany"
        />
      ),
    size: 102,
    enableSorting: false,
  },
  {
    id: 'reviewer',
    accessorFn: (row) => (row.kind === 'source' ? row.reviewer : ''),
    header: '審核人',
    cell: ({ row }) =>
      row.original.kind !== 'source' ? null : row.original
          .reviewer === '未指派' ? (
        <Avatar fallback="?" size="sm" color="orange" />
      ) : (
        <Avatar
          fallback={row.original.reviewer}
          name={row.original.reviewer}
          size="sm"
          color="tiffany"
        />
      ),
    size: 102,
    enableSorting: false,
  },
  {
    id: 'template',
    accessorFn: (row) => (row.kind === 'source' ? row.template : ''),
    header: '填報樣板',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.template : null,
    size: 116,
    enableSorting: false,
  },
  {
    id: 'reference',
    accessorFn: (row) =>
      row.kind === 'source' ? row.reference : null,
    header: '引用排放源',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.reference : null,
    size: 104,
    enableSorting: false,
  },
  {
    id: 'tag',
    accessorFn: (row) => (row.kind === 'source' ? row.tag : null),
    header: '標籤',
    cell: ({ row }) =>
      row.original.kind === 'source' && row.original.tag ? (
        <Tag color="gold" colorVariant="tint">
          {row.original.tag}
        </Tag>
      ) : null,
    size: 76,
    enableSorting: false,
  },
  {
    id: 'significant',
    header: '重大',
    cell: () => null,
    size: 48,
    enableSorting: false,
  },
  {
    id: 'quantified',
    header: '量化',
    cell: ({ row }) =>
      row.original.kind === 'source' ? (
        <Switch defaultChecked={row.original.quantified} />
      ) : null,
    size: 68,
    enableSorting: false,
  },
  {
    id: 'note',
    header: '備註',
    cell: () => null,
    size: 48,
    enableSorting: false,
  },
  {
    id: 'actions',
    header: '',
    cell: () => <MoreButton />,
    size: 36,
    enableSorting: false,
  },
];

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
      ? ['bg-success-500', 'bg-warning-500', 'bg-grayscale-500']
      : [
          'bg-success-500',
          'bg-warning-500',
          'bg-grayscale-500',
          'bg-destructive-500',
          'bg-grayscale-300',
          'bg-grayscale-300',
          'bg-grayscale-300',
          'bg-grayscale-300',
          'bg-grayscale-300',
          'bg-grayscale-300',
        ];

  return (
    <span className="inline-flex w-[118px] items-center gap-1">
      {colors.map((color, index) => (
        <span
          key={index}
          className={cn(
            'h-1.5 flex-1 rounded',
            color,
            color === 'bg-grayscale-300' && 'h-0.5',
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
            <span className="size-1.5 rounded-[3px] bg-grayscale-500" />
            <span className="text-base font-medium leading-6 text-grayscale-800 tabular-nums">
              {todo}
            </span>
            <span className="text-[13px] leading-5 text-grayscale-600">
              待填寫
            </span>
          </span>
          <span className="text-[13px] leading-5 text-grayscale-600">
            /
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-[3px] bg-warning-500" />
            <span className="text-base font-medium leading-6 text-grayscale-800 tabular-nums">
              {review}
            </span>
            <span className="text-[13px] leading-5 text-grayscale-600">
              待覆核
            </span>
          </span>
        </div>
        <span className="text-[13px] leading-5 text-grayscale-600 tabular-nums">
          共 {rows.length} 項
        </span>
      </div>
      <ProgressSegments
        aria-label="Group progress"
        joint="connected"
        className="h-1.5 w-full overflow-hidden rounded-[3px] bg-success-500"
      >
        <ProgressSegment
          className="bg-grayscale-500"
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
