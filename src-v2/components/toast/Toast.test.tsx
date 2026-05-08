import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import {
  ToastProvider,
  type ToastStatus,
  Toaster,
  type ToasterToastData,
} from './Toast';
import { useToast } from './useToast';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

function findSlot(container: HTMLElement, slot: string): HTMLElement {
  const el = queryByAttribute('data-slot', container, slot);
  if (!el) {
    throw new Error(`Could not find [data-slot="${slot}"]`);
  }
  return el;
}

function ToastTrigger({
  description,
  icon,
  status = 'success',
}: {
  description?: string;
  icon?: React.ReactNode;
  status?: ToastStatus;
}) {
  const toast = useToast<{ icon?: React.ReactNode }>();

  return (
    <Button
      onClick={() =>
        toast.add({
          type: status,
          title: `${status} 提示`,
          description,
          data: icon ? { icon } : undefined,
        })
      }
    >
      Open
    </Button>
  );
}

function renderToaster(
  node: React.ReactNode,
  toasterProps?: React.ComponentProps<typeof Toaster>,
) {
  return render(
    <ToastProvider>
      {node}
      <Toaster {...toasterProps} />
    </ToastProvider>,
  );
}

describe('Toast', () => {
  it('keeps the viewport empty until a toast is added', () => {
    const { baseElement } = renderToaster(<ToastTrigger />);

    expect(
      queryByAttribute('data-slot', baseElement, 'toast'),
    ).not.toBeInTheDocument();
  });

  it('renders the toast slot when add() is called', async () => {
    const { baseElement } = renderToaster(
      <ToastTrigger status="success" />,
    );

    fireEvent.click(screen.getByText('Open'));

    await screen.findByText('success 提示');
    const toast = findSlot(baseElement, 'toast');

    expect(toast).toHaveAttribute('data-status', 'success');
    expect(toast).toHaveClass('bg-success-500');
    expect(toast).toHaveClass('shadow-emphasis');
  });

  it('reflects warning, error, and info status backgrounds', async () => {
    const cases: Array<{ status: ToastStatus; bg: string }> = [
      { status: 'warning', bg: 'bg-warning-500' },
      { status: 'error', bg: 'bg-destructive-500' },
      { status: 'info', bg: 'bg-grayscale-700' },
    ];

    for (const { status, bg } of cases) {
      const { baseElement, unmount } = renderToaster(
        <ToastTrigger status={status} />,
      );

      fireEvent.click(screen.getByText('Open'));

      await screen.findByText(`${status} 提示`);
      const toast = findSlot(baseElement, 'toast');

      expect(toast).toHaveAttribute('data-status', status);
      expect(toast).toHaveClass(bg);

      unmount();
    }
  });

  it('renders the title, description, and close slot', async () => {
    const { baseElement } = renderToaster(
      <ToastTrigger description="完整描述" />,
    );

    fireEvent.click(screen.getByText('Open'));

    await screen.findByText('success 提示');
    expect(screen.getByText('完整描述')).toBeInTheDocument();
    expect(findSlot(baseElement, 'toast-close')).toHaveAttribute(
      'aria-label',
      'Close',
    );
  });

  it('omits the icon slot unless an icon is supplied via toast data', async () => {
    const { baseElement } = renderToaster(<ToastTrigger />);

    fireEvent.click(screen.getByText('Open'));

    await screen.findByText('success 提示');
    expect(
      queryByAttribute('data-slot', baseElement, 'toast-icon'),
    ).not.toBeInTheDocument();
  });

  it('renders the supplied icon inside the icon slot', async () => {
    const { baseElement } = renderToaster(
      <ToastTrigger
        icon={<span data-testid="custom-icon">!</span>}
      />,
    );

    fireEvent.click(screen.getByText('Open'));

    await screen.findByText('success 提示');
    const slot = findSlot(baseElement, 'toast-icon');
    expect(slot).toContainElement(screen.getByTestId('custom-icon'));
  });

  it('positions the viewport at bottom-right by default', async () => {
    const { baseElement } = renderToaster(<ToastTrigger />);

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('success 提示');

    const viewport = findSlot(baseElement, 'toast-viewport');
    expect(viewport).toHaveAttribute('data-position', 'bottom-right');
    expect(viewport).toHaveClass('bottom-4', 'right-4');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-position', 'bottom-right');
    expect(toast).toHaveClass('bottom-0', 'right-0');
  });

  it('honors the position prop on the viewport and toast anchor', async () => {
    const { baseElement } = renderToaster(<ToastTrigger />, {
      position: 'top-right',
    });

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('success 提示');

    const viewport = findSlot(baseElement, 'toast-viewport');
    expect(viewport).toHaveAttribute('data-position', 'top-right');
    expect(viewport).toHaveClass('top-4', 'right-4');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-position', 'top-right');
    expect(toast).toHaveClass('top-0', 'right-0');
  });

  it('hides the close X and renders cancel button when toast is loading', async () => {
    function LoadingTrigger() {
      const toast = useToast<ToasterToastData>();
      return (
        <Button
          onClick={() =>
            toast.add({
              type: 'loading',
              title: '上傳中',
              timeout: 0,
              data: {
                cancelProps: { children: '取消' },
              },
            })
          }
        >
          Open
        </Button>
      );
    }

    const { baseElement } = render(
      <ToastProvider>
        <LoadingTrigger />
        <Toaster />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('上傳中');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-status', 'loading');

    expect(
      queryByAttribute('data-slot', baseElement, 'toast-close'),
    ).not.toBeInTheDocument();

    const cancel = findSlot(baseElement, 'toast-cancel');
    expect(cancel).toHaveTextContent('取消');
  });

  it('closes the toast when the cancel button is clicked', async () => {
    const onCancel = vi.fn();

    function LoadingTrigger() {
      const toast = useToast<ToasterToastData>();
      return (
        <Button
          onClick={() =>
            toast.add({
              type: 'loading',
              title: '上傳中',
              timeout: 0,
              data: {
                cancelProps: { children: '取消', onClick: onCancel },
              },
            })
          }
        >
          Open
        </Button>
      );
    }

    const { baseElement } = render(
      <ToastProvider>
        <LoadingTrigger />
        <Toaster />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('上傳中');

    const cancel = findSlot(baseElement, 'toast-cancel');
    fireEvent.click(cancel);

    expect(onCancel).toHaveBeenCalled();
    await waitFor(() => {
      expect(
        queryByAttribute('data-slot', baseElement, 'toast'),
      ).not.toBeInTheDocument();
    });
  });

  it('switches to white-bg styling for the subtle variant', async () => {
    const { baseElement } = renderToaster(<ToastTrigger />, {
      variant: 'subtle',
    });

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('success 提示');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-variant', 'subtle');
    expect(toast).toHaveClass('bg-white');
    expect(toast).toHaveClass('text-grayscale-800');
    expect(toast).not.toHaveClass('bg-success-500');
  });

  it('closes the toast when the close button is clicked', async () => {
    const { baseElement } = renderToaster(<ToastTrigger />);

    fireEvent.click(screen.getByText('Open'));

    await screen.findByText('success 提示');

    const close = findSlot(baseElement, 'toast-close');
    fireEvent.click(close);

    await waitFor(() => {
      expect(
        queryByAttribute('data-slot', baseElement, 'toast'),
      ).not.toBeInTheDocument();
    });
  });
});
