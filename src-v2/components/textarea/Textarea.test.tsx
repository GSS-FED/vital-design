import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

it('renders the textarea primitive with shadcn slot hooks', () => {
  render(<Textarea placeholder="Message" />);
  const textarea = screen.getByRole('textbox');

  expect(textarea).toHaveAttribute('data-slot', 'textarea');
  expect(textarea).toHaveClass('border-grayscale-opacity-300');
});

it('renders a textarea with placeholder', () => {
  const placeholderText = 'Enter text here';
  render(<Textarea placeholder={placeholderText} />);
  const textarea = screen.getByRole('textbox');
  const placeholder = screen.getByPlaceholderText(placeholderText);
  expect(textarea).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
});

it('should call the native onChange callback when value changed', () => {
  const props = {
    onChange: vi.fn(),
  };
  render(<Textarea {...props} />);
  const textarea = screen.getByRole('textbox');
  fireEvent.change(textarea, { target: { value: 'Hello' } });
  expect(props.onChange).toHaveBeenCalled();
});

it('applies error style when aria-invalid is true', () => {
  render(<Textarea aria-invalid />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toHaveAttribute('aria-invalid', 'true');
  expect(textarea).toHaveClass('aria-invalid:border-destructive-500');
});

it('cannot focus when disabled', () => {
  const props = {
    disabled: true,
  };
  render(<Textarea {...props} />);
  const textarea = screen.getByRole('textbox');
  fireEvent.focus(textarea);
  expect(textarea).not.toHaveFocus();
});

it('accepts native textarea props', () => {
  render(<Textarea rows={4} style={{ height: '120px' }} />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toHaveAttribute('rows', '4');
  expect(textarea).toHaveStyle({ height: '120px' });
});
