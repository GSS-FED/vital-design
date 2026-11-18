'use client';

import { Field, FieldLabel } from '@/components/field/Field';
import { PasswordInput } from '@/components/input/password-input/PasswordInput';
import { useState } from 'react';

export function PasswordInputExample() {
  const [password, setPassword] = useState('');

  return (
    <Field className="w-112.5">
      <FieldLabel htmlFor="current-password">Password</FieldLabel>
      <PasswordInput
        id="current-password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      />
    </Field>
  );
}
