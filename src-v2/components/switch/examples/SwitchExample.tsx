'use client';

import { Field, FieldLabel } from '@/components/field/Field';
import { Switch } from '@/components/switch/Switch';
import { useState } from 'react';

export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Field orientation="horizontal" className="w-auto items-center">
      <Switch
        id="switch-notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldLabel htmlFor="switch-notifications">
        Email notifications
      </FieldLabel>
    </Field>
  );
}
