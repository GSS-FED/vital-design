import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { PopoverAnchorExample } from './examples/PopoverAnchorExample';
import { PopoverExample } from './examples/PopoverExample';
import { PopoverMultipleTriggersExample } from './examples/PopoverMultipleTriggersExample';
import { PopoverPortalContainerExample } from './examples/PopoverPortalContainerExample';
import { PopoverRichContentExample } from './examples/PopoverRichContentExample';
import { PopoverSidePlacementExample } from './examples/PopoverSidePlacementExample';

async function open(name: string) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('dialog').element());
}

describe('Popover open', () => {
  test('default', async () => {
    await render(<PopoverExample />);
    await open('Open');
    await expect(await renderedRegion()).toMatchScreenshot(
      'popover-open',
    );
  });

  test.each(['top', 'right', 'bottom', 'left'])(
    'side %s',
    async (side) => {
      await render(
        <div className="p-12">
          <PopoverSidePlacementExample />
        </div>,
      );
      await open(side);
      await expect(await renderedRegion()).toMatchScreenshot(
        `popover-open-side-${side}`,
      );
    },
  );

  test('rich content', async () => {
    await render(<PopoverRichContentExample />);
    await open('View profile');
    await expect(await renderedRegion()).toMatchScreenshot(
      'popover-open-rich-content',
    );
  });

  test('multiple triggers share one popup', async () => {
    await render(<PopoverMultipleTriggersExample />);
    await open('Status');
    await vi.waitFor(() => screen.getByText('In review').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'popover-open-multiple-triggers',
    );
  });

  test('anchored to a list row', async () => {
    await render(<PopoverAnchorExample />);
    await screen
      .getByRole('button', { name: 'Details' })
      .nth(1)
      .click();
    const popup = await vi.waitFor(() =>
      screen.getByRole('dialog').element(),
    );
    await vi.waitFor(() =>
      screen.getByText('Jamie Chen').nth(1).element(),
    );
    const row = screen
      .getByRole('button', { name: 'Details' })
      .nth(1)
      .element()
      .closest('[data-slot="item"]')!;
    const rowBox = row.getBoundingClientRect();
    await vi.waitFor(() => {
      const popupBox = popup.getBoundingClientRect();
      // side="right", align="start": next to the row, top edges aligned.
      expect(popupBox.left).toBeCloseTo(rowBox.right + 4, 0);
      expect(popupBox.top).toBeCloseTo(rowBox.top, 0);
    });
    await expect(await renderedRegion()).toMatchScreenshot(
      'popover-open-anchor',
    );
  });

  test('portaled into a custom container', async () => {
    await render(<PopoverPortalContainerExample />);
    await open('Open in scope');
    const trigger = screen
      .getByRole('button', { name: 'Open in scope' })
      .element();
    const scope = trigger.parentElement!;
    expect(scope.contains(screen.getByRole('dialog').element())).toBe(
      true,
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'popover-open-portal-container',
    );
  });
});
