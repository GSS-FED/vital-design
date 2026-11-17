'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/command/Command';

export function CommandStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      <span>Loading</span>
      <Command label="Loading" className="max-h-[300px] w-[260px]">
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandLoading />
        </CommandList>
      </Command>
      <span>Empty</span>
      <Command label="Empty" className="max-h-[300px] w-[260px]">
        <CommandInput placeholder="Search" value="Durian" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
