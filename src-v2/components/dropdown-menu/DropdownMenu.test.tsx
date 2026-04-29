import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('DropdownMenu', () => {
  it('opens on trigger click and renders items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>First</DropdownMenuItem>
          <DropdownMenuItem>Second</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('First')).toBeInTheDocument();
    });
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('fires onClick on item select', async () => {
    const onClick = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick}>
            Take action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Take action')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Take action'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not fire onClick on disabled item', async () => {
    const onClick = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onClick={onClick}>
            Disabled action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Disabled action')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Disabled action'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('toggles a checkbox item via onCheckedChange', async () => {
    const onCheckedChange = vi.fn<(checked: boolean) => void>();

    function Harness() {
      const [checked, setChecked] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={(next) => {
                setChecked(next);
                onCheckedChange(next);
              }}
            >
              Toggle me
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<Harness />);

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Toggle me')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Toggle me'));

    expect(onCheckedChange).toHaveBeenCalled();
    expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
  });

  it('selects a radio item exclusively', async () => {
    const onValueChange = vi.fn<(value: string) => void>();

    function Harness() {
      const [value, setValue] = useState('a');

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={value}
              onValueChange={(next: unknown) => {
                const nextValue = String(next);
                setValue(nextValue);
                onValueChange(nextValue);
              }}
            >
              <DropdownMenuRadioItem value="a">
                Option A
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="b">
                Option B
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<Harness />);

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Option B')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Option B'));

    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0]?.[0]).toBe('b');
  });
});
