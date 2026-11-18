'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';

export function FieldHorizontalExample() {
  return (
    <Field orientation="horizontal" className="w-80">
      <FieldLabel
        htmlFor="field-horizontal-email"
        className="w-[100px]"
      >
        Email
      </FieldLabel>
      <FieldContent>
        <Input
          id="field-horizontal-email"
          placeholder="name@example.com"
        />
        <FieldDescription>Used for account alerts.</FieldDescription>
      </FieldContent>
    </Field>
  );
}
