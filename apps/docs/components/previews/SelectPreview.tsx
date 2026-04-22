'use client';

import Select from '@/components/select/Select';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

interface ItemType {
  id: string | number;
  label: string;
}

const options: ItemType[] = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
];

export function SelectPreview() {
  const [value, setValue] = useState<ItemType | undefined>(undefined);

  return (
    <ComponentPreview>
      <Select value={value} onChange={setValue} width="200px">
        <Select.Trigger placeholder="Select an option" />
        <Select.Content>
          <Select.Menu>
            <Select.Item item={{ id: 1, label: 'Option 1' }} />
            <Select.Item item={{ id: 2, label: 'Option 2' }} />
            <Select.Item item={{ id: 3, label: 'Option 3' }} />
          </Select.Menu>
        </Select.Content>
      </Select>
    </ComponentPreview>
  );
}

export function SelectMultiPreview() {
  const [values, setValues] = useState<ItemType[]>([]);

  const toggleItem = (item: ItemType) => {
    setValues((prev) =>
      prev.some((v) => v.id === item.id)
        ? prev.filter((v) => v.id !== item.id)
        : [...prev, item],
    );
  };

  return (
    <ComponentPreview>
      <Select
        value={values}
        onChange={toggleItem}
        isMultiple
        width="240px"
      >
        <Select.Trigger
          placeholder="Select options"
          clearable
          onClear={() => setValues([])}
        />
        <Select.Content>
          <Select.Menu>
            {options.map((item) => (
              <Select.Item key={item.id} item={item} hasCheckbox />
            ))}
          </Select.Menu>
        </Select.Content>
      </Select>
    </ComponentPreview>
  );
}
