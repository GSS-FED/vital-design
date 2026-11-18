'use client';

import { SearchBar } from '@/components/search-bar/SearchBar';
import { useState } from 'react';

export function SearchBarExample() {
  const [lastSearch, setLastSearch] = useState('');

  return (
    <div className="flex flex-col items-center gap-2">
      <SearchBar
        aria-label="Search"
        isSearchIconClickable
        placeholder="Search..."
        width="280px"
        onSearch={setLastSearch}
      />
      {lastSearch && (
        <p className="text-sm text-grayscale-opacity-500">
          Searched: <strong>{lastSearch}</strong>
        </p>
      )}
    </div>
  );
}
