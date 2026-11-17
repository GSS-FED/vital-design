'use client';

import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/progress/Progress';

export function ProgressCustomSegmentsExample() {
  return (
    <ProgressSegments
      aria-label="Review status"
      className="w-[118px] gap-0"
      joint="connected"
    >
      <ProgressSegment
        aria-label="Complete"
        className="flex-1 bg-success-500"
      />
      <ProgressSegment
        aria-label="Pending review"
        className="flex-1 bg-warning-500"
      />
      <ProgressSegment
        aria-label="Waiting"
        className="flex-1 bg-grayscale-opacity-600"
      />
      <ProgressSegment
        aria-label="Not started"
        className="flex-1"
        data-state="inactive"
      />
    </ProgressSegments>
  );
}
