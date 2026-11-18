'use client';

import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';

export function FieldExample() {
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" placeholder="name@example.com" />
      <FieldDescription>
        Used for notifications and account recovery.
      </FieldDescription>
    </Field>
  );
}
