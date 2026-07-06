import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Input } from './Input';

it('renders the input primitive with shadcn slot hooks', () => {
  render(<Input placeholder="Email" />);
  const input = screen.getByRole('textbox');

  expect(input).toHaveAttribute('data-slot', 'input');
  expect(input).toHaveClass('border-grayscale-opacity-300');
});

it('renders with placeholder', () => {
  const placeholderText = 'Enter text here';
  render(<Input placeholder={placeholderText} />);
  const input = screen.getByRole('textbox');
  const inputPlaceholder =
    screen.getByPlaceholderText(placeholderText);
  expect(input).toBeInTheDocument();
  expect(inputPlaceholder).toBeInTheDocument();
});

it('should display the initial value', () => {
  render(<Input defaultValue="default value" />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('default value');
});

it('should call the native onChange callback when value changed', () => {
  const props = {
    onChange: vi.fn(),
  };
  render(<Input {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Hello' } });
  expect(props.onChange).toHaveBeenCalled();
});

it('should call the Base UI onValueChange callback when value changed', () => {
  const onValueChange = vi.fn((value: string) => value);
  render(<Input onValueChange={onValueChange} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Hello' } });
  expect(onValueChange).toHaveBeenCalledWith(
    'Hello',
    expect.anything(),
  );
});

it('applies error style when aria-invalid is true', () => {
  render(<Input aria-invalid />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveClass('aria-invalid:border-destructive-500');
});

it('cannot focus when disabled', () => {
  const props = {
    disabled: true,
  };
  render(<Input {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.focus(input);
  expect(input).not.toHaveFocus();
});
