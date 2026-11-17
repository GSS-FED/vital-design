'use client';

import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from '@/components/progress/Progress';

export function ProgressWithLabelExample() {
  return (
    <ProgressRoot value={42} className="w-80">
      <div className="flex items-center gap-3">
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}
