'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheckbox,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { useState } from 'react';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export function SelectMultipleExample() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <div className="w-60">
      <Select
        multiple
        items={frameworks}
        value={values}
        onValueChange={setValues}
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
  );
}
