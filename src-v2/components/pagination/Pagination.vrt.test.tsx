import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { PaginationMorePagesExample } from './examples/PaginationMorePagesExample';

describe('Pagination', () => {
  test('ellipsis menu open', async () => {
    await render(<PaginationMorePagesExample />);
    await screen
      .getByRole('button', { name: 'More pages' })
      .last()
      .click();
    await vi.waitFor(() => screen.getByRole('menu').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'pagination-ellipsis-open',
    );
  });
});
