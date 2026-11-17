import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document. Named `screen` for the
// testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../../visual/capture';
import { PasswordInputExample } from './examples/PasswordInputExample';

describe('PasswordInput', () => {
  test('revealed', async () => {
    await render(<PasswordInputExample />);
    await screen
      .getByLabelText('Password', { exact: true })
      .fill('correct-horse');
    await screen
      .getByRole('button', { name: 'Show password' })
      .click();
    await vi.waitFor(() =>
      screen.getByRole('button', { name: 'Hide password' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'password-input-revealed',
    );
  });
});
