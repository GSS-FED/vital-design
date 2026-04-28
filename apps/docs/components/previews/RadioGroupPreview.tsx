'use client';

import { RadioGroup } from '@/components/radio-group/RadioGroup';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export function RadioGroupPreview() {
  const [value, setValue] = useState('a');
  return (
    <ComponentPreview>
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        direction="horizontal"
      />
    </ComponentPreview>
  );
}

export function RadioGroupVerticalPreview() {
  const [value, setValue] = useState('a');
  return (
    <ComponentPreview>
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        direction="vertical"
      />
    </ComponentPreview>
  );
}
