import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from './Popover';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

function renderPopover(props: { defaultOpen?: boolean } = {}) {
  return render(
    <Popover defaultOpen={props.defaultOpen}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description text</PopoverDescription>
      </PopoverContent>
    </Popover>,
  );
}

describe('Popover', () => {
  it('renders trigger and stays closed by default', () => {
    renderPopover();

    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('opens when the trigger is clicked', async () => {
    renderPopover();

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('opens when the trigger renders a Button', async () => {
    render(
      <Popover>
        <PopoverTrigger render={<Button>View details</Button>} />
        <PopoverContent>
          <PopoverTitle>Details</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByText('View details'));

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });
  });

  it('honors the defaultOpen prop', () => {
    renderPopover({ defaultOpen: true });

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('fires onOpenChange when state changes', async () => {
    const onOpenChange = vi.fn<[boolean, unknown], void>();

    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalled();
    });
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(true);
  });
});
