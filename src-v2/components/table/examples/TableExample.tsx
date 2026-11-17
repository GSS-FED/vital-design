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
import { useState } from 'react';

type TaskProgressState = 'complete' | 'review' | 'draft';

const tasks: {
  id: number;
  topic: string;
  cycle: string;
  owner: string;
  reviewer: string;
  progress: TaskProgressState;
  due: string;
  updated: string;
}[] = [
  {
    id: 1,
    topic: 'Greenhouse gas emissions',
    cycle: 'Yearly',
    owner: 'JC',
    reviewer: 'JC',
    progress: 'complete',
    due: '2025/03/01',
    updated: '1 year ago',
  },
  {
    id: 2,
    topic: 'Climate-related risks',
    cycle: 'Quarterly',
    owner: 'JC',
    reviewer: 'JC',
    progress: 'review',
    due: '2025/03/01',
    updated: '3 months ago',
  },
  {
    id: 3,
    topic: 'Energy management',
    cycle: 'Monthly',
    owner: 'JC',
    reviewer: 'TS',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 month ago',
  },
  {
    id: 4,
    topic: 'Water management',
    cycle: 'Monthly',
    owner: 'AL',
    reviewer: 'JC',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 day ago',
  },
  {
    id: 5,
    topic: 'Waste management',
    cycle: 'Monthly',
    owner: 'TS',
    reviewer: 'JC',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 month ago',
  },
];

function Assignee({ children }: { children: string }) {
  return (
    <Avatar
      fallback={children}
      name={children}
      size="sm"
      color={children === 'TS' ? 'orange' : 'tiffany'}
    />
  );
}

function TaskProgress({ state }: { state: TaskProgressState }) {
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
        <ProgressSegment className="flex-1 bg-grayscale-opacity-600" />
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
      {Array.from({ length: 8 }, (_, index) => (
        <ProgressSegment
          key={index}
          className="w-2"
          data-state="inactive"
        />
      ))}
    </ProgressSegments>
  );
}

export function TableExample() {
  const [selected, setSelected] = useState<number[]>([5]);
  const allSelected = selected.length === tasks.length;

  return (
    <Table
      striped
      containerClassName="max-w-5xl rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background shadow-(--shadow-base)"
    >
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all"
              checked={allSelected}
              indeterminate={selected.length > 0 && !allSelected}
              onCheckedChange={(checked) =>
                setSelected(
                  checked ? tasks.map((task) => task.id) : [],
                )
              }
            />
          </TableHead>
          <TableHead className="w-[72px] text-center">ID</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead className="w-[96px]">Cycle</TableHead>
          <TableHead className="w-[102px]">Owner</TableHead>
          <TableHead className="w-[102px]">Reviewer</TableHead>
          <TableHead className="w-[132px]">Progress</TableHead>
          <TableHead className="w-[104px]">Due</TableHead>
          <TableHead className="w-[112px]">Last updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          const isSelected = selected.includes(task.id);

          return (
            <TableRow
              key={task.id}
              data-state={isSelected ? 'selected' : undefined}
            >
              <TableCell>
                <Checkbox
                  aria-label={`Select ${task.topic}`}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    setSelected((current) =>
                      checked
                        ? [...current, task.id]
                        : current.filter((id) => id !== task.id),
                    )
                  }
                />
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
          );
        })}
      </TableBody>
    </Table>
  );
}
