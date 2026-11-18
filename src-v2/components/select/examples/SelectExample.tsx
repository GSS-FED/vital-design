'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { useState } from 'react';

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function SelectExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select items={items} value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemCheck />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
