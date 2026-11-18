'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '@/components/button/Button';

export function AlertWithActionExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Delete this draft?</AlertTitle>
      <AlertDescription>
        The draft and its attachments will be removed.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Delete
        </Button>
      </AlertAction>
    </Alert>
  );
}
