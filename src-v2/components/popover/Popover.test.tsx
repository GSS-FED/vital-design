import {
  fireEvent,
  queryAllByAttribute,
  queryByAttribute,
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

type SharedTriggerPayload =
  | { kind: 'assignee'; label: string }
  | { kind: 'status'; label: string };

const assigneePayload: SharedTriggerPayload = {
  kind: 'assignee',
  label: '林○方',
};

const statusPayload: SharedTriggerPayload = {
  kind: 'status',
  label: '審核中',
};

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

    expect(screen.getByText('Open')).toHaveAttribute(
      'data-slot',
      'popover-trigger',
    );
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

  it('includes the default popover motion classes', () => {
    const { baseElement } = renderPopover({ defaultOpen: true });

    const content = queryByAttribute(
      'data-slot',
      baseElement,
      'popover-content',
    );

    expect(content).toHaveClass(
      'origin-(--transform-origin)',
      'duration-100',
      'data-open:animate-in',
      'data-open:fade-in-0',
      'data-open:zoom-in-95',
      'data-closed:animate-out',
      'data-closed:fade-out-0',
      'data-closed:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
    );
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

  it('shares one content surface across multiple trigger payloads', async () => {
    const { baseElement } = render(
      <Popover<SharedTriggerPayload>>
        {({ payload }) => (
          <>
            <PopoverTrigger payload={assigneePayload}>
              Assignee
            </PopoverTrigger>
            <PopoverTrigger payload={statusPayload}>
              Status
            </PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>{payload?.label}</PopoverTitle>
            </PopoverContent>
          </>
        )}
      </Popover>,
    );

    fireEvent.click(screen.getByText('Assignee'));

    await waitFor(() => {
      expect(screen.getByText('林○方')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Status'));

    await waitFor(() => {
      expect(screen.getByText('審核中')).toBeInTheDocument();
    });
    expect(screen.queryByText('林○方')).not.toBeInTheDocument();
    expect(
      queryAllByAttribute(
        'data-slot',
        baseElement,
        'popover-content',
      ),
    ).toHaveLength(1);
  });
});
