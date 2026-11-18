'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
} from '@/components/autocomplete/Autocomplete';
import { useState } from 'react';

const commands = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export function AutocompleteCommandPickerExample() {
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  return (
    <div className="flex w-80 flex-col gap-2">
      <Autocomplete<string> items={commands} openOnInputClick>
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Run command..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompleteContent emptyText="No commands found.">
          {(item: string) => (
            <AutocompleteItem
              key={item}
              value={item}
              onClick={() => setLastCommand(item)}
            >
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
      {lastCommand ? (
        <p className="text-sm text-grayscale-opacity-600">
          Ran: {lastCommand}
        </p>
      ) : null}
    </div>
  );
}
