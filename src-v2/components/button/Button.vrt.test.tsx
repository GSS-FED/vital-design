import { afterEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { page as screen, userEvent } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { Button, LinkButton } from './Button';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

describe('Button', () => {
  test.each([
    ['button', 'light'],
    ['button', 'dark'],
    ['link', 'light'],
    ['link', 'dark'],
  ] as const)(
    'focus shows only the focus ring (%s, %s)',
    async (role, mode) => {
      document.documentElement.classList.toggle(
        'dark',
        mode === 'dark',
      );
      await render(
        role === 'button' ? (
          <Button>Button</Button>
        ) : (
          <LinkButton href="#" variant="text">
            Link
          </LinkButton>
        ),
      );
      await userEvent.keyboard('{Tab}');
      const element = screen.getByRole(role).element();
      expect(element).toHaveFocus();
      expect(getComputedStyle(element).outlineStyle).toBe('none');
      await expect(await renderedRegion()).toMatchScreenshot(
        `button-focus-${role}${mode === 'dark' ? '--dark' : ''}`,
      );
    },
  );

  test('focus ring when focusable while disabled', async () => {
    await render(
      <div className="flex gap-5">
        <Button theme="primary" disabled focusableWhenDisabled>
          Default
        </Button>
        <Button
          variant="text"
          theme="primary"
          disabled
          focusableWhenDisabled
        >
          Text
        </Button>
      </div>,
    );
    await userEvent.keyboard('{Tab}');
    await expect(await renderedRegion()).toMatchScreenshot(
      'button-focusable-when-disabled',
    );
  });
});
