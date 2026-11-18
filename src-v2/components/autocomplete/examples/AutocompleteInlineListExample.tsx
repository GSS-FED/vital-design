'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from '@/components/autocomplete/Autocomplete';
import { useState } from 'react';

const commands = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export function AutocompleteInlineListExample() {
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  return (
    <div className="flex w-80 flex-col gap-2">
      <Autocomplete<string> items={commands} inline>
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Filter inline commands..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <div className="rounded bg-background py-2 shadow-emphasis">
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem
                key={item}
                value={item}
                onClick={() => setLastCommand(item)}
              >
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteEmpty>No commands found.</AutocompleteEmpty>
        </div>
      </Autocomplete>
      {lastCommand ? (
        <p className="text-sm text-grayscale-opacity-600">
          Ran: {lastCommand}
        </p>
      ) : null}
    </div>
  );
}
