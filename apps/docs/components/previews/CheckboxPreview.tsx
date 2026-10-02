'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Label } from '@/components/label/Label';
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
    <div
      className="group flex items-start gap-2 font-sans text-sm leading-5 text-grayscale-opacity-800"
      data-disabled={disabled ? true : undefined}
    >
      <div className="flex h-5 flex-none items-center">
        <Checkbox
          checked={checked}
          className={
            disabled
              ? 'data-checked:opacity-40 data-indeterminate:opacity-40'
              : undefined
          }
          disabled={disabled}
          id={id}
          indeterminate={indeterminate}
          onCheckedChange={onCheckedChange}
        />
      </div>
      <Label
        className={
          disabled
            ? 'cursor-not-allowed font-normal leading-5 text-grayscale-opacity-500'
            : 'cursor-pointer font-normal leading-5 text-grayscale-opacity-800'
        }
        htmlFor={id}
      >
        {children}
      </Label>
    </div>
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
