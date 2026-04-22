'use client';

import ActionList from '@/components/list/action-list/ActionList';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const items = [
  { id: 1, displayName: 'Apple' },
  { id: 2, displayName: 'Banana' },
  { id: 3, displayName: 'Cherry' },
  { id: 4, displayName: 'Durian' },
  { id: 5, displayName: 'Elderberry' },
];

export function ActionListPreview() {
  const [selected, setSelected] = useState<
    string | number | undefined
  >(undefined);
  return (
    <ComponentPreview centered={false}>
      <ActionList
        items={items}
        selectedItem={selected}
        onSelect={setSelected}
        placeholder="Search items..."
        noMatchingResultsText="No matching items"
        width="240px"
        listHeight={200}
      />
    </ComponentPreview>
  );
}
