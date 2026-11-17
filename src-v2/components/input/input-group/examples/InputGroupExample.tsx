'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { XmarkIcon } from '@/icons/XmarkIcon';
import { useState } from 'react';

export function InputGroupExample() {
  const [query, setQuery] = useState('');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <MagnifyingGlassIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        placeholder="Search..."
        value={query}
        onValueChange={setQuery}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Clear"
          size="icon-xs"
          onClick={() => setQuery('')}
        >
          <XmarkIcon className="size-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
