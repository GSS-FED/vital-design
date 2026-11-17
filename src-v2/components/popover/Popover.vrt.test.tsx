import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { PopoverExample } from './examples/PopoverExample';
import { PopoverMultipleTriggersExample } from './examples/PopoverMultipleTriggersExample';
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
});
