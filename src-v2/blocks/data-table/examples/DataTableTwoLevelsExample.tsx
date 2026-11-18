'use client';

import { ReviewTaskTable } from '@/blocks/data-table/components/review-task-table';

export function DataTableTwoLevelsExample() {
  return <ReviewTaskTable grouping={['project', 'status']} />;
}
