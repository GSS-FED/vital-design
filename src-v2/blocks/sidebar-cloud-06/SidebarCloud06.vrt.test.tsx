import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { SidebarCloud06Example } from './examples/SidebarCloud06Example';

async function openMenu(name: string | RegExp) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('menu').element());
}

describe('SidebarCloud06', () => {
  test('collapsed', async () => {
    await render(<SidebarCloud06Example />);
    const trigger = screen.getByRole('button', {
      name: 'Toggle Sidebar',
      expanded: true,
    });
    await trigger.click();
    // The trigger moves with the panel; a late hover change would restart
    // its color transition mid-screenshot.
    await trigger.unhover();
    await vi.waitFor(() =>
      screen
        .getByRole('button', {
          name: 'Toggle Sidebar',
          expanded: false,
        })
        .element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'sidebar-cloud-06-collapsed',
    );
  });

  test('submenu closed', async () => {
    await render(<SidebarCloud06Example />);
    await screen
      .getByRole('button', { name: 'Projects', expanded: true })
      .click();
    await vi.waitFor(() =>
      screen
        .getByRole('button', { name: 'Projects', expanded: false })
        .element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'sidebar-cloud-06-submenu-closed',
    );
  });

  test('account menu', async () => {
    await render(<SidebarCloud06Example />);
    await openMenu(/Ray/);
    await expect(await renderedRegion()).toMatchScreenshot(
      'sidebar-cloud-06-account-menu',
    );
  });
});
