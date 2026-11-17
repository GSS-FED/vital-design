'use client';

import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';

export function ButtonLoadingWithSpinnerExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button theme="primary" disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button theme="default" disabled>
        Loading
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  );
}
