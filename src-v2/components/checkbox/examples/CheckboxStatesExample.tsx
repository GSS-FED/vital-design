'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';

const states = [
  { label: 'Unchecked', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Checked', props: { checked: true } },
  {
    label: 'Disabled checked',
    props: { checked: true, disabled: true },
  },
  { label: 'Indeterminate', props: { indeterminate: true } },
  {
    label: 'Disabled indeterminate',
    props: { disabled: true, indeterminate: true },
  },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function CheckboxStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[repeat(2,auto)] gap-x-10 gap-y-3">
      {states.map(({ label, props }) => {
        const id = `checkbox-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <Field
            key={label}
            orientation="horizontal"
            className="w-auto"
            data-disabled={props.disabled}
          >
            <Checkbox id={id} {...props} />
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
          </Field>
        );
      })}
    </div>
  );
}
