'use client';

import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';

export function FieldInvalidExample() {
  return (
    <Field className="w-80" data-invalid="true">
      <FieldLabel htmlFor="field-invalid-email" required>
        Email
      </FieldLabel>
      <Input
        id="field-invalid-email"
        placeholder="name@example.com"
        required
        aria-invalid
      />
      <FieldError errors={[{ message: 'Enter a valid email.' }]} />
    </Field>
  );
}
