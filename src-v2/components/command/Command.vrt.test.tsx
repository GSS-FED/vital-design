import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { CommandHierarchicalPickerExample } from './examples/CommandHierarchicalPickerExample';

describe('Command hierarchical picker', () => {
  test('open', async () => {
    await render(<CommandHierarchicalPickerExample />);
    await screen.getByRole('combobox').click();
    await vi.waitFor(() =>
      screen.getByRole('option', { name: 'Taiwan' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'command-hierarchical-picker-open',
    );
  });

  test('child page with back button', async () => {
    await render(<CommandHierarchicalPickerExample />);
    await screen.getByRole('combobox').click();
    await screen.getByRole('option', { name: 'Taiwan' }).click();
    await vi.waitFor(() =>
      screen.getByRole('option', { name: 'Kaohsiung' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'command-hierarchical-picker-page',
    );
  });
});
