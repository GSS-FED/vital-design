import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen, userEvent } from 'vitest/browser';
import { renderedRegion } from '../../../../visual/capture';
import { SplitButton } from './SplitButton';
import { SplitButtonExample } from './examples/SplitButtonExample';

describe('SplitButton', () => {
  test('menu open', async () => {
    await render(<SplitButtonExample />);
    // Open from the keyboard: a click leaves the pointer on the lg button,
    // whose hover lift moves the anchor while the menu is positioned.
    await userEvent.keyboard('{Tab}{Tab}{Enter}');
    await vi.waitFor(() => screen.getByRole('menu').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'split-button-open',
    );
  });

  test('focus ring when focusable while disabled', async () => {
    await render(
      <SplitButton theme="primary" disabled focusableWhenDisabled>
        Tab to me
      </SplitButton>,
    );
    await userEvent.keyboard('{Tab}');
    await expect(await renderedRegion()).toMatchScreenshot(
      'split-button-focusable-when-disabled',
    );
  });
});
