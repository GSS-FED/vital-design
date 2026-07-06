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
