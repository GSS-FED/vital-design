import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { SidebarCloud01Example } from './examples/SidebarCloud01Example';

describe('SidebarCloud01', () => {
  test('collapsed', async () => {
    await render(<SidebarCloud01Example />);
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
      'sidebar-cloud-01-collapsed',
    );
  });
});
