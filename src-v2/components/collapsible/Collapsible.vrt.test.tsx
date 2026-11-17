import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { CollapsibleExample } from './examples/CollapsibleExample';
import { CollapsibleProductDetailsExample } from './examples/CollapsibleProductDetailsExample';

describe('Collapsible open', () => {
  test('default', async () => {
    await render(<CollapsibleExample />);
    await screen
      .getByRole('button', { name: 'Can I use this in my project?' })
      .click();
    await vi.waitFor(() =>
      screen
        .getByText('Yes. Free to use', { exact: false })
        .element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'collapsible-open',
    );
  });

  test('product details', async () => {
    await render(<CollapsibleProductDetailsExample />);
    await screen
      .getByRole('button', { name: 'Show details' })
      .click();
    await vi.waitFor(() =>
      screen.getByText('Ships within 2 business days.').element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'collapsible-product-details-open',
    );
  });
});
