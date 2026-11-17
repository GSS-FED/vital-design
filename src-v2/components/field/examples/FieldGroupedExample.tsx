'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/field/Field';
import { Input } from '@/components/input/input/Input';

export function FieldGroupedExample() {
  return (
    <FieldSet className="w-80">
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-role">Role</FieldLabel>
          <Input id="field-role" placeholder="Researcher" />
        </Field>
        <FieldSeparator>Optional</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-public" />
          <FieldContent>
            <FieldTitle>Public profile</FieldTitle>
            <FieldDescription>
              Show this profile in team directories.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
