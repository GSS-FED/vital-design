import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { DataTableExample } from './examples/DataTableExample';

async function openPopover(name: string) {
  await screen
    .getByRole('button', { name, exact: true })
    .first()
    .click();
  await vi.waitFor(() => screen.getByRole('dialog').element());
}

describe('DataTable open', () => {
  test('status editor', async () => {
    await render(<DataTableExample />);
    await openPopover('狀態 待覆核');
    await expect(await renderedRegion()).toMatchScreenshot(
      'data-table-status-editor',
    );
  });

  test('column visibility card', async () => {
    await render(<DataTableExample />);
    await openPopover('顯示欄位');
    await expect(await renderedRegion()).toMatchScreenshot(
      'data-table-column-visibility',
    );
  });

  test('grouping menu', async () => {
    await render(<DataTableExample />);
    await openPopover('分群：無');
    await expect(await renderedRegion()).toMatchScreenshot(
      'data-table-grouping',
    );
  });
});
