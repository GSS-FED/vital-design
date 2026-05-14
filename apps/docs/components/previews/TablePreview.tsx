'use client';

import { Avatar } from '@/components/avatar/Avatar';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/progress/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const tasks = [
  {
    id: 1,
    topic: '溫室氣體排放',
    cycle: '每年',
    owner: '張',
    reviewer: '張',
    progress: 'complete',
    due: '2025/03/01',
    updated: '1年前',
  },
  {
    id: 2,
    topic: '氣候相關議題管理',
    cycle: '每季',
    owner: '張',
    reviewer: '張',
    progress: 'review',
    due: '2025/03/01',
    updated: '3個月前',
  },
  {
    id: 3,
    topic: '能源管理',
    cycle: '每月',
    owner: '張',
    reviewer: '蔡',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1個月前',
  },
  {
    id: 4,
    topic: '水資源管理',
    cycle: '每月',
    owner: 'AL',
    reviewer: '張',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1天前',
  },
  {
    id: 5,
    topic: '廢棄物管理',
    cycle: '每月',
    owner: '蔡',
    reviewer: '張',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1個月前',
  },
];

function Assignee({ children }: { children: string }) {
  return (
    <Avatar
      fallback={children}
      name={children}
      size="sm"
      color={children === '蔡' ? 'orange' : 'tiffany'}
    />
  );
}

function TaskProgress({ state }: { state: string }) {
  if (state === 'complete') {
    return (
      <ProgressSegments
        aria-label="Yearly progress"
        className="w-[118px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
      </ProgressSegments>
    );
  }

  if (state === 'review') {
    return (
      <ProgressSegments
        aria-label="Quarterly progress"
        className="w-[118px] gap-[3px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
        <ProgressSegment className="flex-1 bg-warning-500" />
        <ProgressSegment className="flex-1 bg-grayscale-600" />
        <ProgressSegment className="flex-1" data-state="inactive" />
      </ProgressSegments>
    );
  }

  return (
    <ProgressSegments
      aria-label="Monthly progress"
      className="w-[118px] gap-0.5"
    >
      <ProgressSegment className="w-2 bg-success-500" />
      <ProgressSegment className="w-2 bg-warning-500" />
      <ProgressSegment className="w-2 bg-info-500" />
      <ProgressSegment className="w-2 bg-destructive-500" />
      {Array.from({ length: 8 }).map((_, index) => (
        <ProgressSegment
          key={index}
          className="w-2"
          data-state="inactive"
        />
      ))}
    </ProgressSegments>
  );
}

export function TablePreview() {
  return (
    <ComponentPreview centered={false}>
      <Table containerClassName="max-w-5xl rounded-(--radius-sm) border border-grayscale-300 bg-white shadow-(--shadow-base)">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead className="w-[72px] text-center">
              議題編號
            </TableHead>
            <TableHead>指標議題</TableHead>
            <TableHead className="w-[72px]">週期</TableHead>
            <TableHead className="w-[102px]">負責人</TableHead>
            <TableHead className="w-[102px]">覆核人</TableHead>
            <TableHead className="w-[132px]">進度</TableHead>
            <TableHead className="w-[104px]">期限</TableHead>
            <TableHead className="w-[104px]">最後更新</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              data-state={task.id === 5 ? 'selected' : undefined}
            >
              <TableCell>
                <Checkbox aria-label={`Select ${task.topic}`} />
              </TableCell>
              <TableCell className="text-center">{task.id}</TableCell>
              <TableCell>{task.topic}</TableCell>
              <TableCell>{task.cycle}</TableCell>
              <TableCell>
                <Assignee>{task.owner}</Assignee>
              </TableCell>
              <TableCell>
                <Assignee>{task.reviewer}</Assignee>
              </TableCell>
              <TableCell>
                <TaskProgress state={task.progress} />
              </TableCell>
              <TableCell>{task.due}</TableCell>
              <TableCell>{task.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ComponentPreview>
  );
}
