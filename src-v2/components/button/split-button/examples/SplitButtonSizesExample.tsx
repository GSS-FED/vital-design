'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';

export function SplitButtonSizesExample() {
  return (
    <div className="flex items-center gap-3">
      <SplitButton theme="primary" size="md">
        Medium
      </SplitButton>
      <SplitButton theme="primary" size="lg">
        Large
      </SplitButton>
    </div>
  );
}
