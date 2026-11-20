import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from './AlertDialog';
import type { AlertDialogProps } from './AlertDialog';

function renderAlertDialog({
  onOpenChange = vi.fn(),
  container,
}: {
  onOpenChange?: AlertDialogProps['onOpenChange'];
  container?: HTMLElement;
} = {}) {
  render(
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogPortal container={container}>
        <AlertDialogBackdrop data-testid="backdrop" />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogBody>
              <AlertDialogMedia>
                <svg data-testid="media-icon" />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                <AlertDialogDescription>
                  This can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogClose>Cancel</AlertDialogClose>
              <AlertDialogClose>Confirm delete</AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>,
  );
}

it('opens an alertdialog named and described by its title and description', async () => {
  const user = userEvent.setup();
  renderAlertDialog();

  await user.click(screen.getByRole('button', { name: 'Delete' }));

  const dialog = await screen.findByRole('alertdialog', {
    name: 'Delete this item?',
  });
  expect(dialog).toHaveAccessibleDescription("This can't be undone.");
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('stays open when the backdrop is clicked', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  renderAlertDialog({ onOpenChange });

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  await screen.findByRole('alertdialog');
  await user.click(screen.getByTestId('backdrop'));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalledWith(
    false,
    expect.anything(),
  );
});

it('closes from a footer action and reports the change', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  renderAlertDialog({ onOpenChange });

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  await user.click(
    await screen.findByRole('button', { name: 'Confirm delete' }),
  );

  expect(onOpenChange).toHaveBeenLastCalledWith(
    false,
    expect.any(Object),
  );
  await waitFor(() => {
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});

it('renders into a custom portal container', async () => {
  const user = userEvent.setup();
  const container = document.createElement('div');
  document.body.appendChild(container);
  renderAlertDialog({ container });

  await user.click(screen.getByRole('button', { name: 'Delete' }));

  expect(container).toContainElement(
    await screen.findByRole('alertdialog'),
  );
  container.remove();
});

it('hides the media icon from assistive technology', () => {
  render(
    <AlertDialog defaultOpen>
      <AlertDialogPortal>
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogMedia data-testid="media">
              <svg />
            </AlertDialogMedia>
            <AlertDialogTitle>Heads up</AlertDialogTitle>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>,
  );

  expect(screen.getByTestId('media')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});
