'use client';

import { Field, FieldLabel } from '@/components/field/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';

const states = [
  { label: 'Unchecked' },
  { label: 'Checked', checked: true },
  { label: 'Invalid', invalid: true },
  { label: 'Disabled', disabled: true },
  { label: 'Checked & disabled', checked: true, disabled: true },
  {
    label: 'Long label',
    checked: true,
    text: 'A long option label that wraps onto the next line and stays aligned with the radio button',
  },
];

export function RadioGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, checked, invalid, disabled, text }) => {
        const id = `radio-state-${label.toLowerCase().replace(/\W+/g, '-')}`;

        return (
          <div key={label} className="contents">
            <span className="leading-5">{label}</span>
            <RadioGroup
              aria-label={label}
              defaultValue={checked ? 'option' : undefined}
            >
              <Field
                orientation="horizontal"
                data-disabled={disabled}
              >
                <RadioGroupItem
                  aria-invalid={invalid}
                  disabled={disabled}
                  id={id}
                  value="option"
                />
                <FieldLabel htmlFor={id}>
                  {text ?? 'Option'}
                </FieldLabel>
              </Field>
            </RadioGroup>
          </div>
        );
      })}
    </div>
  );
}
