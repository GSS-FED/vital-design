'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';

export function FieldWithContentExample() {
  return (
    <Field orientation="horizontal" className="w-80">
      <Checkbox id="field-notifications" />
      <FieldContent>
        <FieldLabel htmlFor="field-notifications">
          Notifications
        </FieldLabel>
        <FieldDescription>
          Email, SMS, and push delivery options.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}
