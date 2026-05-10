import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

const FIXED = new Date(2024, 0, 15); // Jan 15, 2024 (Monday)

describe('Calendar', () => {
  it('renders the visible month with day cells', () => {
    render(<Calendar mode="single" defaultMonth={FIXED} />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('marks the selected date with data-selected-single', () => {
    const { baseElement } = render(
      <Calendar
        mode="single"
        selected={FIXED}
        defaultMonth={FIXED}
      />,
    );
    const button = queryByAttribute(
      'data-selected-single',
      baseElement,
      'true',
    );
    expect(button).toHaveTextContent('15');
  });

  it('calls onSelect with the clicked date in single mode', () => {
    const onSelect = vi.fn<[Date | undefined], void>();
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByText('20'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    const arg = onSelect.mock.calls[0]?.[0];
    expect(arg).toBeDefined();
    expect(arg?.getDate()).toBe(20);
    expect(arg?.getMonth()).toBe(0);
    expect(arg?.getFullYear()).toBe(2024);
  });

  it('supports custom weekday labels via formatters', () => {
    const labels = ['日', '一', '二', '三', '四', '五', '六'];
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        formatters={{
          formatWeekdayName: (d) => labels[d.getDay()] ?? '',
        }}
      />,
    );
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('disables days outside min/max', () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        startMonth={FIXED}
        endMonth={FIXED}
        disabled={[{ before: FIXED }]}
      />,
    );
    expect(
      screen.getByRole('button', { name: /january 5/i }),
    ).toBeDisabled();
  });
});
