'use client';

import ActionInfiniteList from '@/components/list/action-infinite-list/ActionInfiniteList';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const ALL_ITEMS = [
  { id: 1, displayName: 'Alice Chen' },
  { id: 2, displayName: 'Bob Wang' },
  { id: 3, displayName: 'Carol Lin' },
  { id: 4, displayName: 'David Wu' },
  { id: 5, displayName: 'Eva Liu' },
];

export function ActionInfiniteListPreview() {
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState(ALL_ITEMS);

  return (
    <ComponentPreview centered={false}>
      {selected && (
        <p
          className="text-sm mb-2"
          style={{ color: 'var(--grayscale-500)' }}
        >
          Selected: <strong>{selected}</strong>
        </p>
      )}
      <ActionInfiniteList
        items={items}
        onSelect={(item) => setSelected(item.displayName)}
        onSearchTermChange={(term) =>
          setItems(
            term
              ? ALL_ITEMS.filter((i) =>
                  i.displayName
                    .toLowerCase()
                    .includes(term.toLowerCase()),
                )
              : ALL_ITEMS,
          )
        }
        hasNextPage={false}
        loadNextPage={() => {}}
        isLoading={false}
        noMatchingResultsText="No matching results"
        placeholder="Search..."
        listHeight={200}
        width="240px"
      />
    </ComponentPreview>
  );
}
