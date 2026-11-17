import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { SheetExample } from './examples/SheetExample';
import { SheetHiddenCloseButtonExample } from './examples/SheetHiddenCloseButtonExample';
import { SheetNonModalDockedPanelExample } from './examples/SheetNonModalDockedPanelExample';
import { SheetSidesExample } from './examples/SheetSidesExample';

async function open(name: string) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('dialog').element());
}

describe('Sheet open', () => {
  test('default', async () => {
    await render(<SheetExample />);
    await open('Open Sheet');
    await expect(await renderedRegion()).toMatchScreenshot(
      'sheet-open',
    );
  });

  test.each(['top', 'right', 'bottom', 'left'])(
    'side %s',
    async (side) => {
      await render(<SheetSidesExample />);
      await open(side);
      await expect(await renderedRegion()).toMatchScreenshot(
        `sheet-open-side-${side}`,
      );
    },
  );

  test('non-modal docked panel', async () => {
    await render(<SheetNonModalDockedPanelExample />);
    await open('Open docked panel');
    await expect(await renderedRegion()).toMatchScreenshot(
      'sheet-open-non-modal',
    );
  });

  test('hidden close button', async () => {
    await render(<SheetHiddenCloseButtonExample />);
    await open('Open without close button');
    await expect(await renderedRegion()).toMatchScreenshot(
      'sheet-open-hidden-close-button',
    );
  });
});
