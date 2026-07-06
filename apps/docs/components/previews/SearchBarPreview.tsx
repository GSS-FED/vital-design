'use client';

import { SearchBar } from '@/components/search-bar/SearchBar';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SearchBarPreview() {
  const [lastSearch, setLastSearch] = useState('');
  return (
    <ComponentPreview name="SearchBarPreview">
      <div className="flex flex-col items-center gap-2">
        <SearchBar placeholder="Search..." onSearch={setLastSearch} />
        {lastSearch && (
          <p
            className="text-sm"
            style={{ color: 'var(--grayscale-opacity-500)' }}
          >
            Searched: <strong>{lastSearch}</strong>
          </p>
        )}
      </div>
    </ComponentPreview>
  );
}

export function SearchBarDisabledPreview() {
  return (
    <ComponentPreview name="SearchBarDisabledPreview">
      <SearchBar placeholder="Search..." disabled />
    </ComponentPreview>
  );
}
