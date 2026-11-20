import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { TreeSelectExample } from './examples/TreeSelectExample';

describe('TreeSelect', () => {
  test('open', async () => {
    await render(<TreeSelectExample />);
    await screen.getByRole('combobox', { name: 'Locations' }).click();
    await vi.waitFor(() =>
      screen.getByRole('option', { name: 'Taiwan' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'tree-select-open',
    );
  });

  test('child page with back button', async () => {
    await render(<TreeSelectExample />);
    await screen.getByRole('combobox', { name: 'Locations' }).click();
    await screen.getByRole('option', { name: 'Taiwan' }).click();
    await vi.waitFor(() =>
      screen.getByRole('option', { name: 'Kaohsiung' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'tree-select-page',
    );
  });
});
