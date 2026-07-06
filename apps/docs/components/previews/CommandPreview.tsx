'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/command/Command';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function CommandPreview() {
  return (
    <ComponentPreview name="CommandPreview" centered={false}>
      <Command
        label="Command palette"
        className="h-[300px] w-[280px]"
      >
        <CommandInput placeholder="Type a command or search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>New file</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Open file</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Save</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Preferences</CommandItem>
            <CommandItem>Keyboard shortcuts</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </ComponentPreview>
  );
}
