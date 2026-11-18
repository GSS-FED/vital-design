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

export function RadioGroupExample() {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      className="flex flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option) => (
        <Field
          key={option.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`radio-${option.value}`}
            value={option.value}
          />
          <FieldLabel htmlFor={`radio-${option.value}`}>
            {option.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
