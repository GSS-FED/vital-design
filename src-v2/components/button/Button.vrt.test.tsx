import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { Button } from './Button';

describe('Button', () => {
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
