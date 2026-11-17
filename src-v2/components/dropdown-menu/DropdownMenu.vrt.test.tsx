import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { DropdownMenuExample } from './examples/DropdownMenuExample';
import { DropdownMenuWithCheckboxItemsExample } from './examples/DropdownMenuWithCheckboxItemsExample';
import { DropdownMenuWithIconsExample } from './examples/DropdownMenuWithIconsExample';
import { DropdownMenuWithRadioGroupExample } from './examples/DropdownMenuWithRadioGroupExample';
import { DropdownMenuWithSplitButtonTriggerExample } from './examples/DropdownMenuWithSplitButtonTriggerExample';
import { DropdownMenuWithSubmenuExample } from './examples/DropdownMenuWithSubmenuExample';

async function open(name: string) {
  await screen.getByRole('button', { name }).click();
  await vi.waitFor(() => screen.getByRole('menu').element());
}

describe('DropdownMenu open', () => {
  test('separators and labels', async () => {
    await render(<DropdownMenuExample />);
    await open('Account');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open',
    );
  });

  test('icons', async () => {
    await render(<DropdownMenuWithIconsExample />);
    await open('Quick actions');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open-icons',
    );
  });

  test('checkbox items', async () => {
    await render(<DropdownMenuWithCheckboxItemsExample />);
    await open('View');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open-checkbox-items',
    );
  });

  test('radio group', async () => {
    await render(<DropdownMenuWithRadioGroupExample />);
    await open('Panel position');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open-radio-group',
    );
  });

  test('submenu', async () => {
    await render(<DropdownMenuWithSubmenuExample />);
    await open('File');
    await screen
      .getByRole('menuitem', { name: 'Open recent' })
      .click();
    await vi.waitFor(() =>
      screen.getByRole('menuitem', { name: 'notes.md' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open-submenu',
    );
  });

  test('split button trigger', async () => {
    await render(<DropdownMenuWithSplitButtonTriggerExample />);
    await open('More options');
    await expect(await renderedRegion()).toMatchScreenshot(
      'dropdown-menu-open-split-button',
    );
  });
});
