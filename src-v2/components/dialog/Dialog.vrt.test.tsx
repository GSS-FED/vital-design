import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { DialogExample } from './examples/DialogExample';
import { DialogSizesExample } from './examples/DialogSizesExample';

async function open(name: string) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('dialog').element());
}

describe('Dialog open', () => {
  test('default', async () => {
    await render(<DialogExample />);
    await open('Open dialog');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dialog-open',
    );
  });

  test.each(['small', 'medium', 'large'])('size %s', async (size) => {
    await render(<DialogSizesExample />);
    await open(size);
    await expect(await renderedRegion()).toMatchScreenshot(
      `dialog-open-${size}`,
    );
  });
});
