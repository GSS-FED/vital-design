'use client';

import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/progress/Progress';

export function ProgressSegmentsExample() {
  return (
    <div className="flex flex-col gap-6">
      <ProgressSegments
        aria-label="Monthly status"
        className="w-[118px] gap-0.5"
      >
        <ProgressSegment className="w-2 bg-success-500" />
        <ProgressSegment className="w-2 bg-warning-500" />
        <ProgressSegment className="w-2 bg-grayscale-opacity-600" />
        <ProgressSegment className="w-2 bg-destructive-500" />
        {Array.from({ length: 8 }, (_, index) => (
          <ProgressSegment
            key={index}
            className="w-2"
            data-state="inactive"
          />
        ))}
      </ProgressSegments>
      <ProgressSegments
        aria-label="Quarterly status"
        className="w-[118px] gap-[3px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
        <ProgressSegment className="flex-1 bg-warning-500" />
        <ProgressSegment className="flex-1 bg-grayscale-opacity-600" />
        <ProgressSegment className="flex-1" data-state="inactive" />
      </ProgressSegments>
      <ProgressSegments
        aria-label="Yearly status"
        className="w-[118px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
      </ProgressSegments>
    </div>
  );
}
