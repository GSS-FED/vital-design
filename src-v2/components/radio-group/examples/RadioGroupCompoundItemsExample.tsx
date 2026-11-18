'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';
import { useState } from 'react';

const plans = [
  {
    description: 'Good for individual use',
    label: 'Basic',
    value: 'basic',
  },
  {
    description: 'Recommended for teams',
    label: 'Pro',
    value: 'pro',
  },
];

export function RadioGroupCompoundItemsExample() {
  const [value, setValue] = useState('basic');

  return (
    <RadioGroup
      className="flex w-auto flex-wrap gap-4"
      value={value}
      onValueChange={setValue}
    >
      {plans.map((plan) => (
        <Field
          key={plan.value}
          orientation="horizontal"
          className="w-auto"
        >
          <RadioGroupItem
            id={`plan-${plan.value}`}
            value={plan.value}
          />
          <FieldContent>
            <FieldLabel htmlFor={`plan-${plan.value}`}>
              {plan.label}
            </FieldLabel>
            <FieldDescription>{plan.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  );
}
