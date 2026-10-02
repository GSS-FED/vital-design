import {
  fireEvent,
  queryAllByAttribute,
  render,
  screen,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './TimePicker';

const at = (h: number, m: number, s = 0) => {
  const d = new Date(2024, 0, 15);
  d.setHours(h, m, s, 0);
  return d;
};

describe('TimePicker', () => {
  it('renders three columns by default', () => {
    const { baseElement } = render(<TimePicker value={at(9, 30)} />);
    const columns = queryAllByAttribute(
      'data-slot',
      baseElement,
      'time-picker-column',
    );
    expect(columns).toHaveLength(3);
  });

  it('hides the seconds column when showSeconds is false', () => {
    const { baseElement } = render(
      <TimePicker value={at(9, 30)} showSeconds={false} />,
    );
    const columns = queryAllByAttribute(
      'data-slot',
      baseElement,
      'time-picker-column',
    );
    expect(columns).toHaveLength(2);
  });

  it('marks the selected item with data-selected', () => {
    const { baseElement } = render(
      <TimePicker value={at(9, 30, 0)} />,
    );
    const selected = queryAllByAttribute(
      'data-selected',
      baseElement,
      'true',
    );
    const values = selected.map((el) =>
      el.getAttribute('data-value'),
    );
    expect(values).toEqual(['9', '30', '0']);
  });

  it('emits a Date with the chosen hours when an item is clicked', () => {
    const onValueChange = vi.fn<[Date], void>();
    const initial = at(9, 30, 0);
    render(
      <TimePicker value={initial} onValueChange={onValueChange} />,
    );

    const hourFive = screen.getAllByText('05')[0];
    if (!hourFive) throw new Error('hour 05 not found');
    fireEvent.click(hourFive);

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const arg = onValueChange.mock.calls[0]?.[0];
    expect(arg).toBeInstanceOf(Date);
    expect(arg?.getHours()).toBe(5);
    expect(arg?.getMinutes()).toBe(30);
    expect(arg?.getSeconds()).toBe(0);
    // Date portion preserved
    expect(arg?.getFullYear()).toBe(2024);
    expect(arg?.getMonth()).toBe(0);
    expect(arg?.getDate()).toBe(15);
  });

  it('does not emit when disabled', () => {
    const onValueChange = vi.fn();
    render(
      <TimePicker
        value={at(9, 30)}
        onValueChange={onValueChange}
        disabled
      />,
    );

    const hourFive = screen.getAllByText('05')[0];
    if (!hourFive) throw new Error('hour 05 not found');
    fireEvent.click(hourFive);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('respects hourStep / minuteStep / secondStep', () => {
    const { baseElement } = render(
      <TimePicker
        value={at(0, 0)}
        hourStep={6}
        minuteStep={15}
        secondStep={30}
      />,
    );
    const columns = queryAllByAttribute(
      'data-slot',
      baseElement,
      'time-picker-column',
    );
    expect(columns).toHaveLength(3);
    const [hourCol, minuteCol, secondCol] = columns;
    if (!hourCol || !minuteCol || !secondCol)
      throw new Error('columns missing');
    expect(within(hourCol).getAllByRole('option')).toHaveLength(4);
    expect(within(minuteCol).getAllByRole('option')).toHaveLength(4);
    expect(within(secondCol).getAllByRole('option')).toHaveLength(2);
  });
});
