'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

function CheckboxField({
  checked,
  children,
  disabled,
  id,
  indeterminate,
  onCheckedChange,
}: {
  checked?: boolean;
  children: ReactNode;
  disabled?: boolean;
  id: string;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <Field
      className="w-auto"
      data-disabled={disabled ? true : undefined}
      orientation="horizontal"
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        id={id}
        indeterminate={indeterminate}
        onCheckedChange={onCheckedChange}
      />
      <FieldLabel htmlFor={id}>{children}</FieldLabel>
    </Field>
  );
}

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentPreview name="CheckboxPreview">
      <CheckboxField
        checked={checked}
        id="checkbox-preview-terms"
        onCheckedChange={setChecked}
      >
        Accept terms and conditions
      </CheckboxField>
    </ComponentPreview>
  );
}

export function CheckboxStatesPreview() {
  return (
    <ComponentPreview name="CheckboxStatesPreview">
      <CheckboxField checked={false} id="checkbox-preview-unchecked">
        Unchecked
      </CheckboxField>
      <CheckboxField checked id="checkbox-preview-checked">
        Checked
      </CheckboxField>
      <CheckboxField
        checked={false}
        id="checkbox-preview-indeterminate"
        indeterminate
      >
        Indeterminate
      </CheckboxField>
      <CheckboxField
        checked={false}
        disabled
        id="checkbox-preview-disabled"
      >
        Disabled
      </CheckboxField>
    </ComponentPreview>
  );
}
