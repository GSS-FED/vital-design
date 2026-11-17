'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { ClearIcon } from '@/icons/ClearIcon';

export function AlertWithIconExample() {
  return (
    <Alert role="status" className="w-105 max-w-full">
      <ClearIcon className="text-destructive-500" />
      <AlertTitle>Payment method expired</AlertTitle>
      <AlertDescription>
        Update the billing card before the next renewal date to avoid
        service interruption.
      </AlertDescription>
    </Alert>
  );
}
