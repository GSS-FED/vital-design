'use client';

import { Field, FieldLabel } from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';

export function FieldRequiredExample() {
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="field-required-email" required>
        Email
      </FieldLabel>
      <Input
        id="field-required-email"
        placeholder="name@example.com"
        required
      />
    </Field>
  );
}
