import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

type SheetSide = NonNullable<
  React.ComponentProps<typeof SheetContent>['side']
>;

function renderSheet({
  side,
  showCloseButton,
  defaultOpen,
  onOpenChange = vi.fn(),
}: {
  side?: SheetSide;
  showCloseButton?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: SheetOnOpenChange;
} = {}) {
  render(
    <Sheet defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <SheetBody>Sheet body content</SheetBody>
        <SheetFooter>
          <SheetClose>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>,
  );
}

type SheetOnOpenChange = NonNullable<
  React.ComponentProps<typeof Sheet>['onOpenChange']
>;

it('opens the sheet from the trigger and renders title and description', async () => {
  const user = userEvent.setup();
  renderSheet();

  await user.click(
    screen.getByRole('button', { name: 'Open Sheet' }),
  );

  expect(
    await screen.findByRole('dialog', { name: 'Sheet title' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Sheet description')).toBeInTheDocument();
  expect(screen.getByText('Sheet body content')).toBeInTheDocument();
});

it('closes the sheet via the built-in close button and calls onOpenChange', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  renderSheet({ onOpenChange });

  await user.click(
    screen.getByRole('button', { name: 'Open Sheet' }),
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

it('omits the overlay when the sheet is non-modal', () => {
  const { baseElement } = render(
    <Sheet defaultOpen modal={false}>
      <SheetContent data-testid="sheet-content">
        <SheetTitle>No overlay</SheetTitle>
      </SheetContent>
    </Sheet>,
  );

  expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  const overlay = baseElement.querySelector(
    '[data-slot="sheet-overlay"]',
  );
  expect(overlay).toBeNull();
});

it('renders the overlay by default for modal sheets', () => {
  const { baseElement } = render(
    <Sheet defaultOpen>
      <SheetContent>
        <SheetTitle>With overlay</SheetTitle>
      </SheetContent>
    </Sheet>,
  );

  // eslint-disable-next-line testing-library/no-node-access
  const overlay = baseElement.querySelector(
    '[data-slot="sheet-overlay"]',
  );
  expect(overlay).not.toBeNull();
});

it('hides the built-in close button when showCloseButton is false', () => {
  renderSheet({ defaultOpen: true, showCloseButton: false });

  expect(
    screen.queryByRole('button', { name: 'Close' }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Cancel' }),
  ).toBeInTheDocument();
});

it.each(['top', 'right', 'bottom', 'left'] as const)(
  'applies the correct side variant for side=%s',
  (side) => {
    renderSheet({ side, defaultOpen: true });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-side', side);
    expect(dialog).toHaveAttribute('data-slot', 'sheet-content');
  },
);

it('exposes data-slot hooks on the parts', () => {
  renderSheet({ defaultOpen: true });

  expect(screen.getByRole('dialog')).toHaveAttribute(
    'data-slot',
    'sheet-content',
  );
  expect(screen.getByText('Sheet title')).toHaveAttribute(
    'data-slot',
    'sheet-title',
  );
  expect(screen.getByText('Sheet description')).toHaveAttribute(
    'data-slot',
    'sheet-description',
  );
});

it('supports controlled open mode', () => {
  render(
    <Sheet open>
      <SheetContent>
        <SheetTitle>Controlled sheet</SheetTitle>
      </SheetContent>
    </Sheet>,
  );

  expect(
    screen.getByRole('dialog', { name: 'Controlled sheet' }),
  ).toBeInTheDocument();
});
