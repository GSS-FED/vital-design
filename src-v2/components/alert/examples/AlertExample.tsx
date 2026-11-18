'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '@/components/button/Button';

export function AlertExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Request submitted</AlertTitle>
      <AlertDescription>
        The approval flow has started. You can keep editing the draft
        until the reviewer opens it.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="primary">
          View request
        </Button>
      </AlertAction>
    </Alert>
  );
}
