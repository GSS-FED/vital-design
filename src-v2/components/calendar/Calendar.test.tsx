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

  it('marks today on the day button when it is not selected', () => {
    render(
      <Calendar mode="single" defaultMonth={FIXED} today={FIXED} />,
    );
    expect(
      screen.getByRole('button', { name: /january 15/i }),
    ).toHaveAttribute('data-today', 'true');
  });

  it('does not mark the day button as today when it is selected', () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        today={FIXED}
        selected={FIXED}
      />,
    );
    expect(
      screen.getByRole('button', { name: /january 15/i }),
    ).not.toHaveAttribute('data-today');
  });

  it('renders year-jump and month-step navigation', () => {
    render(<Calendar mode="single" defaultMonth={FIXED} />);
    expect(
      screen.getByRole('button', { name: /previous year/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next year/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous month/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next month/i }),
    ).toBeInTheDocument();
  });

  it('jumps a full year when the year nav is clicked', () => {
    const onMonthChange = vi.fn<[Date], void>();
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        onMonthChange={onMonthChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /next year/i }),
    );

    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const arg = onMonthChange.mock.calls[0]?.[0];
    expect(arg?.getFullYear()).toBe(2025);
    expect(arg?.getMonth()).toBe(0);
  });

  it('clamps year jumps to endMonth', () => {
    const onMonthChange = vi.fn<[Date], void>();
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        endMonth={new Date(2024, 5)} // June 2024
        onMonthChange={onMonthChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /next year/i }),
    );

    const arg = onMonthChange.mock.calls[0]?.[0];
    expect(arg?.getFullYear()).toBe(2024);
    expect(arg?.getMonth()).toBe(5);
  });

  it('renders custom month and year dropdown triggers in dropdown caption layout', () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={FIXED}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />,
    );
    expect(
      screen.getByRole('button', { name: /choose the month/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /choose the year/i }),
    ).toBeInTheDocument();
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
