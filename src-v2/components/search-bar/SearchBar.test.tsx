import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

it('calls onChange when the input changes', () => {
  const onChange = vi.fn();
  render(<SearchBar placeholder="Search" onChange={onChange} />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'query' },
  });

  expect(onChange).toHaveBeenCalledWith('query');
});

it('calls onSearch on Enter and clickable icon', () => {
  const onSearch = vi.fn();
  render(
    <SearchBar
      placeholder="Search"
      onSearch={onSearch}
      isSearchIconClickable
    />,
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'query' } });
  fireEvent.keyUp(input, { key: 'Enter' });
  expect(onSearch).toHaveBeenCalledWith('query');

  fireEvent.click(screen.getByTestId('search-icon'));
  expect(onSearch).toHaveBeenCalledTimes(2);
});

it('supports controlled value and forwards input props', () => {
  const ref = { current: null as HTMLInputElement | null };
  render(
    <SearchBar
      ref={ref}
      aria-label="Filter rows"
      id="row-filter"
      value="from-url"
      onChange={() => {}}
    />,
  );

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('from-url');
  expect(input).toHaveAttribute('aria-label', 'Filter rows');
  expect(input).toHaveAttribute('id', 'row-filter');
  expect(ref.current).toBe(input);
});

it('reflects an externally cleared value', () => {
  const { rerender } = render(
    <SearchBar value="query" onChange={() => {}} />,
  );
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('query');

  rerender(<SearchBar value="" onChange={() => {}} />);
  expect(input).toHaveValue('');
});
