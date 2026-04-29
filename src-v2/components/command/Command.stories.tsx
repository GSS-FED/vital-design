import { type Meta, type StoryObj } from '@storybook/react';
import {
  Command,
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from './Command';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command label="Quick actions" className="h-[300px] w-[260px]">
      <CommandInput placeholder="Search actions" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>Cherry</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithGroupsAndSeparator: Story = {
  render: () => (
    <Command label="Grouped" className="h-[320px] w-[260px]">
      <CommandInput placeholder="Type a command" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Vegetables">
          <CommandItem>Carrot</CommandItem>
          <CommandItem>Daikon</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Command label="Shortcuts" className="h-[260px] w-[280px]">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandGroup heading="Editor">
          <CommandItem>
            <span>Save</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Find</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Replace</span>
            <CommandShortcut>⌘⇧F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Loading: Story = {
  render: () => (
    <Command label="Loading" className="h-[200px] w-[260px]">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandLoading />
      </CommandList>
    </Command>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <Command label="With back" className="h-[300px] w-[260px]">
      <CommandHeader>
        <CommandBackButton>Engineering</CommandBackButton>
      </CommandHeader>
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandGroup>
          <CommandItem>Frontend</CommandItem>
          <CommandItem>Backend</CommandItem>
          <CommandItem>Platform</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
