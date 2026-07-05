import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Command,
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandShortcut,
} from './Command';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

function renderCommand() {
  return render(
    <Command label="Command test" className="h-[300px] w-[194px]">
      <CommandInput placeholder="Search commands" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>,
  );
}

describe('Command', () => {
  it('renders primitives with data-slot attributes', () => {
    renderCommand();

    expect(
      screen.getByPlaceholderText('Search commands'),
    ).toHaveAttribute('data-slot', 'command-input-control');
    expect(screen.getByText('Apple')).toHaveAttribute(
      'data-slot',
      'command-item',
    );
    expect(screen.getByText('⌘S')).toHaveAttribute(
      'data-slot',
      'command-shortcut',
    );
  });

  it('renders the input and items', () => {
    renderCommand();

    expect(
      screen.getByPlaceholderText('Search commands'),
    ).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('⌘S')).toBeInTheDocument();
  });

  it('filters items when typing in the input', async () => {
    const user = userEvent.setup();

    renderCommand();

    await act(async () => {
      await user.type(
        screen.getByPlaceholderText('Search commands'),
        'Ban',
      );
    });

    expect(screen.getByText('Banana')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('supports the named export surface for utility parts', () => {
    const onBack = vi.fn();

    render(
      <div>
        <CommandBackButton onClick={onBack}>Back</CommandBackButton>
        <CommandLoading />
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(onBack).toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Back' }),
    ).toHaveAttribute('data-slot', 'command-back-button');
    expect(
      screen.getByRole('progressbar', { name: /Loading/ }),
    ).toBeInTheDocument();
  });
});
