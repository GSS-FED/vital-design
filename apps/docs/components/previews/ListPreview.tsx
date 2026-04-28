'use client';

import { ListContainer } from '@/components/list/components/ListContainer';
import { ListItem } from '@/components/list/components/ListItem';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const ITEMS = [
  { id: 1, displayName: 'Apple' },
  { id: 2, displayName: 'Banana' },
  { id: 3, displayName: 'Cherry' },
  { id: 4, displayName: 'Durian' },
  { id: 5, displayName: 'Elderberry' },
];

export function ListPreview() {
  const [selected, setSelected] = useState<
    string | number | undefined
  >(undefined);

  return (
    <ComponentPreview centered={false}>
      <div className="shadow-emphasis rounded w-52">
        <ListContainer items={ITEMS}>
          {ITEMS.map((item) => (
            <ListItem
              key={item.id}
              $selected={selected === item.id}
              onClick={() => setSelected(item.id)}
            >
              {item.displayName}
            </ListItem>
          ))}
        </ListContainer>
      </div>
    </ComponentPreview>
  );
}

const MANY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  displayName: `Option ${i + 1}`,
}));

export function ListOverflowPreview() {
  const [selected, setSelected] = useState<
    string | number | undefined
  >(undefined);

  return (
    <ComponentPreview centered={false}>
      <div className="shadow-emphasis rounded w-52">
        <ListContainer items={MANY_ITEMS} height={160}>
          {MANY_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              $selected={selected === item.id}
              onClick={() => setSelected(item.id)}
            >
              {item.displayName}
            </ListItem>
          ))}
        </ListContainer>
      </div>
    </ComponentPreview>
  );
}
