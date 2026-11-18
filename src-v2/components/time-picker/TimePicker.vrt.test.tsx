import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { TimePickerInsideTimePickerExample } from './examples/TimePickerInsideTimePickerExample';

describe('TimePicker open', () => {
  test('time picker popover', async () => {
    await render(<TimePickerInsideTimePickerExample />);
    await screen.getByPlaceholder('Pick a time').click();
    await vi.waitFor(() =>
      screen.getByRole('listbox').first().element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'time-picker-open',
    );
  });
});
