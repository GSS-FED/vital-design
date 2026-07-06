'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemCheckbox,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

function isSingleValue(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isMultipleValue(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string')
  );
}

export function SelectPreview() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComponentPreview name="SelectPreview">
      <div className="w-50">
        <Select
          items={options}
          value={value}
          onValueChange={(nextValue) => {
            if (isSingleValue(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ComponentPreview>
  );
}

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export function SelectMultiplePreview() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <ComponentPreview name="SelectMultiplePreview">
      <div className="w-60">
        <Select
          multiple
          items={frameworks}
          value={values}
          onValueChange={(nextValue) => {
            if (isMultipleValue(nextValue)) {
              setValues(nextValue);
            }
          }}
        >
          <SelectTrigger placeholder="Select options" />
          <SelectContent>
            {frameworks.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemCheckbox />
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ComponentPreview>
  );
}
