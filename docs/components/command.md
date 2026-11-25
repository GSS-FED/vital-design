# Command

> A composable command palette primitive built on cmdk, with input, list, items, groups, and shortcut display.

## Preview

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/Command';

export function CommandExample() {
  return (
    <Command label="Command palette" className="h-[300px] w-[280px]">
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
  );
}
```

## Usage

`Command` is a thin styled wrapper around [cmdk](https://github.com/pacocoursey/cmdk). Use it to build command palettes, custom searchable popups, paged hierarchical pickers, or any list UI with keyboard-driven filtering.

> Filtering is handled by cmdk based on the typed `CommandInput` value
> matching each `CommandItem`'s text content. Pass `shouldFilter={false}`
> on `Command` to opt out and run your own filter logic.

## When to Use

| Need                                     | Component             |
| ---------------------------------------- | --------------------- |
| Flat value picker                        | `Select`              |
| Searchable value picker (input + popup)  | `Combobox`            |
| Hierarchical path picker                 | `Command` + `Popover` |
| Action menu                              | `DropdownMenu`        |
| Command palette / custom searchable list | `Command`             |

`Command` does not include a popover or trigger — pair it with `Popover` (or your own surface) when you need a floating panel. The [Tree Select](/docs/blocks/tree-select) block is a paged tree picker built from `Command` and `Popover`.

## States

Put `CommandLoading` in the list while items load. `CommandEmpty` shows when no item matches the search.

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/ui/Command';

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
```

## Exports

| Export              | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| `Command`           | Root container; accepts cmdk props (`shouldFilter`, `filter`, `label`, …) |
| `CommandInput`      | Search input row with leading search icon                                 |
| `CommandList`       | Scrollable list primitive                                                 |
| `CommandEmpty`      | Empty state shown when no items match                                     |
| `CommandGroup`      | Grouped items with optional `heading`                                     |
| `CommandSeparator`  | Horizontal divider between groups                                         |
| `CommandItem`       | Selectable row; fires `onSelect`                                          |
| `CommandShortcut`   | Right-aligned keyboard hint inside an item                                |
| `CommandLoading`    | Loading row with default spinner                                          |
| `CommandHeader`     | Header slot above input (used for back button)                            |
| `CommandBackButton` | Styled back button for paged flows                                        |
