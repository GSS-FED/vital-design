import {
  act,
  fireEvent,
  queryByAttribute,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import {
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from './Toast';

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

type Manager = ReturnType<
  typeof createToastManager<ToasterToastData>
>;

function setup(
  providerProps?: Omit<
    React.ComponentProps<typeof ToastProvider>,
    'toastManager' | 'children'
  >,
) {
  const manager = createToastManager<ToasterToastData>();
  const utils = render(
    <ToastProvider toastManager={manager} {...providerProps} />,
  );
  return { manager, ...utils };
}

function clickTrigger(
  manager: Manager,
  options: {
    status?: ToastStatus;
    description?: string;
    icon?: ReactNode;
  },
) {
  const { status = 'success', description, icon } = options;
  act(() => {
    manager.add({
      type: status,
      title: `${status} 提示`,
      description,
      data: icon ? { icon } : undefined,
    });
  });
}

describe('Toast', () => {
  it('keeps the viewport empty until a toast is added', () => {
    const { baseElement } = setup();

    expect(
      queryByAttribute('data-slot', baseElement, 'toast'),
    ).not.toBeInTheDocument();
  });

  it('renders the toast slot when add() is called', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, { status: 'success' });

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
      const { manager, baseElement, unmount } = setup();
      clickTrigger(manager, { status });

      await screen.findByText(`${status} 提示`);
      const toast = findSlot(baseElement, 'toast');

      expect(toast).toHaveAttribute('data-status', status);
      expect(toast).toHaveClass(bg);

      unmount();
    }
  });

  it('renders the title, description, and close slot', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, { description: '完整描述' });

    await screen.findByText('success 提示');
    expect(screen.getByText('完整描述')).toBeInTheDocument();
    expect(findSlot(baseElement, 'toast-close')).toHaveAttribute(
      'aria-label',
      'Close',
    );
  });

  it('omits the icon slot unless an icon is supplied via toast data', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, {});

    await screen.findByText('success 提示');
    expect(
      queryByAttribute('data-slot', baseElement, 'toast-icon'),
    ).not.toBeInTheDocument();
  });

  it('renders the supplied icon inside the icon slot', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, {
      icon: <span data-testid="custom-icon">!</span>,
    });

    await screen.findByText('success 提示');
    const slot = findSlot(baseElement, 'toast-icon');
    expect(slot).toContainElement(screen.getByTestId('custom-icon'));
  });

  it('positions the viewport at bottom-right by default', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, {});

    await screen.findByText('success 提示');

    const viewport = findSlot(baseElement, 'toast-viewport');
    expect(viewport).toHaveAttribute('data-position', 'bottom-right');
    expect(viewport).toHaveClass('bottom-4', 'right-4');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-position', 'bottom-right');
    expect(toast).toHaveClass('bottom-0', 'right-0');
  });

  it('honors position on the viewport and toast anchor', async () => {
    const { manager, baseElement } = setup({
      position: 'top-right',
    });
    clickTrigger(manager, {});

    await screen.findByText('success 提示');

    const viewport = findSlot(baseElement, 'toast-viewport');
    expect(viewport).toHaveAttribute('data-position', 'top-right');
    expect(viewport).toHaveClass('top-4', 'right-4');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-position', 'top-right');
    expect(toast).toHaveClass('top-0', 'right-0');
  });

  it('hides the close X and renders cancel button when toast is loading', async () => {
    const { manager, baseElement } = setup();
    act(() => {
      manager.add({
        type: 'loading',
        title: '上傳中',
        timeout: 0,
        data: { cancelProps: { children: '取消' } },
      });
    });

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
    const { manager, baseElement } = setup();
    act(() => {
      manager.add({
        type: 'loading',
        title: '上傳中',
        timeout: 0,
        data: {
          cancelProps: { children: '取消', onClick: onCancel },
        },
      });
    });

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
    const { manager, baseElement } = setup({ variant: 'subtle' });
    clickTrigger(manager, {});

    await screen.findByText('success 提示');

    const toast = findSlot(baseElement, 'toast');
    expect(toast).toHaveAttribute('data-variant', 'subtle');
    expect(toast).toHaveClass('bg-white');
    expect(toast).toHaveClass('text-grayscale-800');
    expect(toast).not.toHaveClass('bg-success-500');
  });

  it('closes the toast when the close button is clicked', async () => {
    const { manager, baseElement } = setup();
    clickTrigger(manager, {});

    await screen.findByText('success 提示');

    const close = findSlot(baseElement, 'toast-close');
    fireEvent.click(close);

    await waitFor(() => {
      expect(
        queryByAttribute('data-slot', baseElement, 'toast'),
      ).not.toBeInTheDocument();
    });
  });

  it('supports two managers side-by-side (different positions)', async () => {
    const topManager = createToastManager<ToasterToastData>();
    const bottomManager = createToastManager<ToasterToastData>();

    render(
      <>
        <ToastProvider
          toastManager={topManager}
          position="top-center"
        />
        <ToastProvider
          toastManager={bottomManager}
          position="bottom-right"
        />
      </>,
    );

    act(() => {
      topManager.add({ type: 'error', title: 'top toast' });
      bottomManager.add({ type: 'success', title: 'bottom toast' });
    });

    const topToast = await screen.findByText('top toast');
    const bottomToast = await screen.findByText('bottom toast');

    expect(topToast).toBeInTheDocument();
    expect(bottomToast).toBeInTheDocument();
  });

  it('renders a Button onClick that fires the manager from anywhere', async () => {
    const manager = createToastManager<ToasterToastData>();
    function Trigger() {
      return (
        <Button
          onClick={() =>
            manager.add({ type: 'info', title: 'from button' })
          }
        >
          Open
        </Button>
      );
    }
    const { baseElement } = render(
      <ToastProvider toastManager={manager}>
        <Trigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText('Open'));
    await screen.findByText('from button');
    expect(findSlot(baseElement, 'toast')).toHaveAttribute(
      'data-status',
      'info',
    );
  });
});
