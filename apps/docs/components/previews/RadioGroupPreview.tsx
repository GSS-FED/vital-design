'use client';

import { Label } from '@/components/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

function RadioOption({
  idPrefix,
  label,
  value,
}: {
  idPrefix: string;
  label: string;
  value: string;
}) {
  const id = `${idPrefix}-${value}`;

  return (
    <div className="group flex items-center gap-2">
      <div className="flex h-5 flex-none items-center">
        <RadioGroupItem
          className="group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)"
          id={id}
          value={value}
        />
      </div>
      <Label
        className="cursor-pointer font-normal leading-5 text-grayscale-800"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
}

export function RadioGroupPreview() {
  const [value, setValue] = useState('a');
  return (
    <ComponentPreview>
      <RadioGroup
        className="flex flex-row flex-wrap gap-4 font-sans text-sm leading-5 text-grayscale-800"
        value={value}
        onValueChange={setValue}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            idPrefix="radio-preview-horizontal"
            {...option}
          />
        ))}
      </RadioGroup>
    </ComponentPreview>
  );
}

export function RadioGroupVerticalPreview() {
  const [value, setValue] = useState('a');
  return (
    <ComponentPreview>
      <RadioGroup
        className="flex flex-col flex-wrap gap-4 font-sans text-sm leading-5 text-grayscale-800"
        value={value}
        onValueChange={setValue}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            idPrefix="radio-preview-vertical"
            {...option}
          />
        ))}
      </RadioGroup>
    </ComponentPreview>
  );
}
