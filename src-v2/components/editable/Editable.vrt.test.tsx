import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document. Named `screen` for the
// testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { EditableExample } from './examples/EditableExample';
import { EditableTextareaVariantExample } from './examples/EditableTextareaVariantExample';

describe('Editable editing', () => {
  test('input', async () => {
    await render(<EditableExample />);
    await screen
      .getByRole('button', { name: 'Click to edit' })
      .click();
    await vi.waitFor(() => screen.getByRole('textbox').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'editable-editing',
    );
  });

  test('textarea', async () => {
    await render(<EditableTextareaVariantExample />);
    await screen
      .getByRole('button', { name: 'A longer note. Click to edit.' })
      .click();
    await vi.waitFor(() => screen.getByRole('textbox').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'editable-textarea-editing',
    );
  });
});
