'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '@/components/button/Button';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';
import { useState } from 'react';

export function AlertWithCustomExample() {
  const [hiddenToday, setHiddenToday] = useState(false);

  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>
        Leaving this page will discard the edits in the current form.
        <Field orientation="horizontal" className="mt-4 w-auto">
          <Checkbox
            id="alert-hide-today"
            checked={hiddenToday}
            onCheckedChange={setHiddenToday}
          />
          <FieldLabel htmlFor="alert-hide-today">
            Do not remind me again today
          </FieldLabel>
        </Field>
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Leave page
        </Button>
      </AlertAction>
    </Alert>
  );
}
