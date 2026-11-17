'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';
import { useState } from 'react';

export function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox
        id="checkbox-terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="checkbox-terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  );
}
