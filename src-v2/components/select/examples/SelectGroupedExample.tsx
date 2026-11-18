'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@/components/select/Select';
import { useState } from 'react';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const vegetables = [
  { label: 'Carrot', value: 'carrot' },
  { label: 'Broccoli', value: 'broccoli' },
];

export function SelectGroupedExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select
        items={[...fruits, ...vegetables]}
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger placeholder="Select food" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
