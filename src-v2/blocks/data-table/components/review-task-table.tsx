'use client';

import { reviewTaskColumns } from './columns';
import {
  PROJECT_ORDER,
  type ReviewTask,
  reviewGroupingConfig,
  reviewTasks,
} from './data';
import { DataTable } from './data-table';

function createReviewTask(values: Partial<ReviewTask>): ReviewTask {
  return {
    title: '',
    project: PROJECT_ORDER[0],
    status: 'todo',
    collaboratorIds: [],
    due: '',
    tagIds: [],
    note: '',
    // A row added inside a group starts with that group's values.
    ...values,
    id: `task-${crypto.randomUUID()}`,
  };
}

function taskLabel(task: ReviewTask) {
  return task.title;
}

/**
 * The review-task example: `DataTable` wired to `columns.tsx` and
 * `data.ts`. Copy this file's shape for your own rows.
 */
export function ReviewTaskTable({
  className,
  data = reviewTasks,
  grouping = [],
}: {
  className?: string;
  data?: readonly ReviewTask[];
  /** Starting grouping keys, outer first, e.g. `['project', 'status']`. */
  grouping?: readonly string[];
}) {
  return (
    <DataTable
      className={className}
      data={data}
      columns={reviewTaskColumns}
      groupingConfig={reviewGroupingConfig}
      grouping={grouping}
      itemName="任務"
      rowLabel={taskLabel}
      createRow={createReviewTask}
    />
  );
}
