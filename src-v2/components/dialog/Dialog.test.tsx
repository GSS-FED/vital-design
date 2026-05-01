import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from './Dialog';

function renderDialog({
  defaultOpen,
  onOpenChange = vi.fn(),
}: {
  defaultOpen?: boolean;
  onOpenChange?: DialogPropsOnOpenChange;
} = {}) {
  render(
    <Dialog defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogHeader data-testid="dialog-header">
              <div>
                <DialogTitle>Confirm changes</DialogTitle>
                <DialogDescription>
                  Review your updates before continuing.
                </DialogDescription>
              </div>
              <DialogClose />
            </DialogHeader>
            <DialogBody>Dialog body content</DialogBody>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>,
  );
}

type DialogPropsOnOpenChange = NonNullable<
  React.ComponentProps<typeof Dialog>['onOpenChange']
>;

it('opens the dialog from the trigger and renders title and description', async () => {
  const user = userEvent.setup();
  renderDialog();

  await user.click(
    screen.getByRole('button', { name: 'Open Dialog' }),
  );

  expect(
    await screen.findByRole('dialog', { name: 'Confirm changes' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Confirm changes')).toBeInTheDocument();
  expect(
    screen.getByText('Review your updates before continuing.'),
  ).toBeInTheDocument();
});

it('closes the dialog and calls onOpenChange when the close button is clicked', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  renderDialog({ onOpenChange });

  await user.click(
    screen.getByRole('button', { name: 'Open Dialog' }),
  );
  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(Object));
  expect(onOpenChange).toHaveBeenCalledWith(
    false,
    expect.any(Object),
  );
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

it('renders in controlled open mode', () => {
  render(
    <Dialog open>
      <DialogPortal>
        <DialogViewport>
          <DialogPopup>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              Controlled description
            </DialogDescription>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>,
  );

  expect(
    screen.getByRole('dialog', { name: 'Controlled dialog' }),
  ).toBeInTheDocument();
});

it('applies popup size, custom className, and style', () => {
  render(
    <Dialog defaultOpen>
      <DialogPortal>
        <DialogViewport>
          <DialogPopup
            size="large"
            className="custom-dialog-popup"
            style={{ width: '520px' }}
            data-testid="dialog-popup"
          >
            <DialogTitle>Styled dialog</DialogTitle>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>,
  );

  const popup = screen.getByTestId('dialog-popup');
  expect(popup).toHaveClass('max-w-[640px]');
  expect(popup).toHaveClass('custom-dialog-popup');
  expect(popup).toHaveStyle({ width: '520px' });
});

it('supports the styled parts', () => {
  renderDialog({ defaultOpen: true });

  expect(
    screen.getByRole('dialog', { name: 'Confirm changes' }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('dialog-header')).toHaveClass(
    'bg-(image:--gradient-primary)',
  );
  expect(screen.getByText('Confirm changes')).toHaveClass(
    'text-white',
  );
  expect(
    screen.getByText('Review your updates before continuing.'),
  ).toHaveClass('text-white');
  expect(screen.getByRole('button', { name: 'Close' })).toHaveClass(
    'text-white',
  );
  expect(screen.getByText('Dialog body content')).toBeInTheDocument();
});

it('supports the named export surface', () => {
  render(
    <Dialog defaultOpen>
      <DialogTrigger>Open named dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Named dialog</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                Named exports compose the same dialog parts.
              </DialogDescription>
            </DialogBody>
            <DialogFooter>
              <DialogClose>Done</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>,
  );

  expect(
    screen.getByRole('dialog', { name: 'Named dialog' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Named exports compose the same dialog parts.'),
  ).toBeInTheDocument();
});
