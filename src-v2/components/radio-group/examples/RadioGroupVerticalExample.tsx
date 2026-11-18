'use client';

import { Field, FieldLabel } from '@/components/field/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';
import { useState } from 'react';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupVerticalExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="w-auto gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field key={option.value} orientation="horizontal">
          <RadioGroupItem
            id={`radio-vertical-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-vertical-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
