import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { TableOfContentsExample } from './examples/TableOfContentsExample';

describe('TableOfContents', () => {
  test('expanded on hover', async () => {
    await render(<TableOfContentsExample />);
    const nav = screen.getByRole('navigation', {
      name: 'Table of contents',
    });
    await nav.hover();
    await vi.waitFor(() => {
      if (nav.element().getAttribute('data-state') !== 'open') {
        throw new Error('Table of contents did not expand');
      }
    });
    await expect(await renderedRegion()).toMatchScreenshot(
      'table-of-contents-expanded',
    );
  });
});
