import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import PasswordInput from './PasswordInput';

it('renders correctly with default props', () => {
  const props = { value: '', onChange: vi.fn() };
  render(<PasswordInput {...props} />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

it('toggles visibility when the visibility icon is clicked', () => {
  const props = { value: '', onChange: vi.fn() };
  render(<PasswordInput {...props} />);
  const toggleButton = screen.getByTestId('visibility-toggle');
  const input = screen.getByRole('textbox');
  // Assuming the initial state is 'invisible'
  expect(input).toHaveAttribute('data-state', 'invisible');
  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute('data-state', 'visible');
  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute('data-state', 'invisible');
});
