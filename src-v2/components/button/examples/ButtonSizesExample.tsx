'use client';

import { Button } from '@/components/button/Button';

export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button size="md" theme="primary">
        Medium
      </Button>
      <Button size="lg" theme="primary">
        Large
      </Button>
    </div>
  );
}
