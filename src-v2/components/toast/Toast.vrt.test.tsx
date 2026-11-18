import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import type { ToastStatus } from './Toast';
import { ToastAnchoredExample } from './examples/ToastAnchoredExample';
import { ToastLoadingExample } from './examples/ToastLoadingExample';
import { ToastPositionsExample } from './examples/ToastPositionsExample';
import { ToastSolidBottomRightExample } from './examples/ToastSolidBottomRightExample';
import { ToastStackedExample } from './examples/ToastStackedExample';
import { ToastSubtleTopRightExample } from './examples/ToastSubtleTopRightExample';
import { ToastWithActionExample } from './examples/ToastWithActionExample';
import { ToastWithDescriptionExample } from './examples/ToastWithDescriptionExample';
import { ToastWithIconExample } from './examples/ToastWithIconExample';

// Fake timers so toasts never auto-dismiss and the loading example never
// resolves before the screenshot.
beforeEach(() => {
  vi.useFakeTimers({
    now: new Date('2026-01-01T00:00:00Z'),
    toFake: ['Date', 'setTimeout', 'clearTimeout'],
  });
});

async function show(button: string, title: string) {
  await screen.getByRole('button', { name: button }).click();
  await vi.waitFor(() => screen.getByText(title).element());
}

const titles: Record<Exclude<ToastStatus, 'loading'>, string> = {
  success: 'Changes saved',
  warning: 'Storage almost full',
  error: 'Upload failed',
  info: 'New version available',
};

describe('Toast shown', () => {
  for (const [status, title] of Object.entries(titles)) {
    test(`solid ${status}, bottom-right`, async () => {
      await render(<ToastSolidBottomRightExample />);
      await show(status, title);
      await expect(await renderedRegion()).toMatchScreenshot(
        `toast-solid-${status}`,
      );
    });

    test(`subtle ${status}, top-right`, async () => {
      await render(<ToastSubtleTopRightExample />);
      await show(status, title);
      await expect(await renderedRegion()).toMatchScreenshot(
        `toast-subtle-${status}`,
      );
    });
  }

  test('top-center', async () => {
    await render(<ToastPositionsExample />);
    await show('top-center', 'Shown at top-center');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-top-center',
    );
  });

  test('with description', async () => {
    await render(<ToastWithDescriptionExample />);
    await show('Toast with description', 'Changes saved');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-with-description',
    );
  });

  test('with action', async () => {
    await render(<ToastWithActionExample />);
    await show('Toast with action', 'Item archived');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-with-action',
    );
  });

  test('with icon', async () => {
    await render(<ToastWithIconExample />);
    await show('Toast with icon', 'Maintenance starts at 22:00');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-with-icon',
    );
  });

  test('loading with cancel', async () => {
    await render(<ToastLoadingExample />);
    await show('Loading toast', 'Uploading…');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-loading',
    );
  });

  test('stacked', async () => {
    await render(<ToastStackedExample />);
    await show('Stack three toasts', 'Sync failed');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-stacked',
    );
  });

  test('anchored', async () => {
    await render(<ToastAnchoredExample />);
    await show('Copy', 'Copied! (1)');
    await expect(await renderedRegion()).toMatchScreenshot(
      'toast-anchored',
    );
  });
});
