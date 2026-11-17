'use client';

import { ReviewTaskTable } from '@/blocks/data-table/components/review-task-table';

export function DataTableOneLevelExample() {
  return <ReviewTaskTable grouping={['project']} />;
}
