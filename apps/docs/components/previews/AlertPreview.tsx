'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '@/components/button/Button';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { ClearIcon } from '@/icons/ClearIcon';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function AlertPreview() {
  return (
    <ComponentPreview centered={false} className="grid gap-4">
      <Alert>
        <AlertTitle>Request submitted</AlertTitle>
        <AlertDescription>
          The approval flow has started. You can keep editing the
          draft until the reviewer opens it.
        </AlertDescription>
        <AlertAction>
          <Button size="medium" variant="text" theme="primary">
            View request
          </Button>
        </AlertAction>
      </Alert>
    </ComponentPreview>
  );
}

export function AlertWithIconPreview() {
  return (
    <ComponentPreview centered={false} className="grid gap-4">
      <Alert role="status">
        <ClearIcon className="text-alarm-500" />
        <AlertTitle>Payment method expired</AlertTitle>
        <AlertDescription>
          Update the billing card before the next renewal date to
          avoid service interruption.
        </AlertDescription>
      </Alert>
    </ComponentPreview>
  );
}

export function AlertCustomContentPreview() {
  const [hiddenToday, setHiddenToday] = useState(false);

  return (
    <ComponentPreview centered={false} className="grid gap-4">
      <Alert>
        <AlertTitle>Unsaved changes</AlertTitle>
        <AlertDescription>
          Leaving this page will discard the edits in the current
          form.
          <div className="mt-4">
            <Checkbox checked={hiddenToday} onChange={setHiddenToday}>
              Do not remind me again today
            </Checkbox>
          </div>
        </AlertDescription>
        <AlertAction>
          <Button size="medium" variant="text" theme="default">
            Cancel
          </Button>
          <Button size="medium" variant="text" theme="primary">
            Continue
          </Button>
        </AlertAction>
      </Alert>
    </ComponentPreview>
  );
}
