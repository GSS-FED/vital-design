import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { CalendarDropdownCaptionExample } from './examples/CalendarDropdownCaptionExample';
import { CalendarInsideDatePickerExample } from './examples/CalendarInsideDatePickerExample';

describe('Calendar open', () => {
  test('date picker popover', async () => {
    await render(<CalendarInsideDatePickerExample />);
    await screen.getByPlaceholder('Pick a date').click();
    await vi.waitFor(() =>
      screen.getByRole('button', { name: /january 15/i }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'calendar-open-date-picker',
    );
  });

  test('month dropdown', async () => {
    await render(<CalendarDropdownCaptionExample />);
    await screen
      .getByRole('button', { name: /choose the month/i })
      .click();
    await vi.waitFor(() =>
      screen.getByRole('button', { name: 'March' }).element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'calendar-open-month-dropdown',
    );
  });

  test('year dropdown', async () => {
    await render(<CalendarDropdownCaptionExample />);
    await screen
      .getByRole('button', { name: /choose the year/i })
      .click();
    // The list centers the selected year two frames after opening, while
    // the popup is still zooming in, so the scroll offset varies by a few
    // pixels between runs. Re-center it the same way once the popup has
    // settled.
    await vi.waitFor(() => {
      const year = screen
        .getByRole('button', { name: '2026' })
        .element();
      expect(year.parentElement?.scrollTop).toBeGreaterThan(0);
    });
    for (const animation of document.getAnimations()) {
      animation.finish();
    }
    const year = screen
      .getByRole('button', { name: '2026' })
      .element() as HTMLElement;
    const list = year.parentElement;
    if (!list) throw new Error('year list not found');
    list.scrollTop = 0;
    list.scrollTop =
      year.getBoundingClientRect().top -
      list.getBoundingClientRect().top -
      (list.clientHeight - year.offsetHeight) / 2;
    await expect(await renderedRegion()).toMatchScreenshot(
      'calendar-open-year-dropdown',
    );
  });
});
