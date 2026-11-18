import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { SidebarCollapsibleOffcanvasExample } from './examples/SidebarCollapsibleOffcanvasExample';
import { SidebarExample } from './examples/SidebarExample';

// SidebarTrigger. SidebarRail has the same name but no aria-expanded.
async function collapse() {
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
}

describe('Sidebar collapsed', () => {
  test('icon rail', async () => {
    await render(<SidebarExample />);
    await collapse();
    await expect(await renderedRegion()).toMatchScreenshot(
      'sidebar-collapsed-icon',
    );
  });

  test('offcanvas', async () => {
    await render(<SidebarCollapsibleOffcanvasExample />);
    await collapse();
    await expect(await renderedRegion()).toMatchScreenshot(
      'sidebar-collapsed-offcanvas',
    );
  });
});
