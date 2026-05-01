import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

it('renders correctly with default props', () => {
  render(<PasswordInput />);
  const input = screen.getByTestId('password-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'password');
});

it('supports uncontrolled input with defaultValue', () => {
  render(<PasswordInput defaultValue="secret" />);
  const input = screen.getByTestId('password-input');

  expect(input).toHaveValue('secret');
  fireEvent.input(input, { target: { value: 'changed' } });
  expect(input).toHaveValue('changed');
});

it('calls onChange when the value changes', () => {
  const onChange = vi.fn();
  render(<PasswordInput onChange={onChange} />);

  fireEvent.input(screen.getByTestId('password-input'), {
    target: { value: 'secret' },
  });

  expect(onChange).toHaveBeenCalledWith('secret');
});

it('toggles visibility when the visibility icon is clicked', () => {
  render(<PasswordInput />);
  const toggleButton = screen.getByTestId('visibility-toggle');
  const input = screen.getByTestId('password-input');
  // Assuming the initial state is 'invisible'
  expect(input).toHaveAttribute('data-state', 'invisible');
  expect(input).toHaveAttribute('type', 'password');
  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute('data-state', 'visible');
  expect(input).toHaveAttribute('type', 'text');
  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute('data-state', 'invisible');
  expect(input).toHaveAttribute('type', 'password');
});

it('calls onEnter when the user presses Enter', () => {
  const props = {
    value: 'secret',
    onChange: vi.fn(),
    onEnter: vi.fn(),
  };
  render(<PasswordInput {...props} />);
  const input = screen.getByTestId('password-input');

  fireEvent.keyDown(input, { key: 'Enter' });

  expect(props.onEnter).toHaveBeenCalledWith('secret');
});
