import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { AlertDialogCheckboxExample } from './examples/AlertDialogCheckboxExample';
import { AlertDialogExample } from './examples/AlertDialogExample';
import { AlertDialogMessageExample } from './examples/AlertDialogMessageExample';

async function open(name: string) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('alertdialog').element());
}

describe('AlertDialog open', () => {
  test('default', async () => {
    await render(<AlertDialogExample />);
    await open('Delete project');
    await expect(await renderedRegion()).toMatchScreenshot(
      'alert-dialog-open',
    );
  });

  test.each(['Warning', 'Success', 'Error'])(
    'message %s',
    async (status) => {
      await render(<AlertDialogMessageExample />);
      await open(status);
      await expect(await renderedRegion()).toMatchScreenshot(
        `alert-dialog-open-message-${status.toLowerCase()}`,
      );
    },
  );

  test('checkbox', async () => {
    await render(<AlertDialogCheckboxExample />);
    await open('Merge items');
    await expect(await renderedRegion()).toMatchScreenshot(
      'alert-dialog-open-checkbox',
    );
  });
});
