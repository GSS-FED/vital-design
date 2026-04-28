import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { TextAreaInput } from './TextareaInput';

it('renders a textarea with placeholder', () => {
  const placeholderText = 'Enter text here';
  render(<TextAreaInput placeholder={placeholderText} />);
  const textarea = screen.getByRole('textbox');
  const placeholder = screen.getByPlaceholderText(placeholderText);
  expect(textarea).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
});

it('should call the onEnter callback when the user presses enter', () => {
  const props = {
    onEnter: vi.fn(),
  };
  render(<TextAreaInput {...props} />);
  const textarea = screen.getByRole('textbox');
  fireEvent.keyDown(textarea, { key: 'Enter' });
  expect(props.onEnter).toHaveBeenCalled();
});

it('should applies error style when isError prop is true', () => {
  const props = {
    isError: true,
  };
  render(<TextAreaInput {...props} />);
  const textareaContainer = screen.getByTestId('textarea-container');
  expect(textareaContainer).toBeInTheDocument();
  expect(textareaContainer).toHaveClass('border-alarm-500');
});

it('cannot focus when disabled', () => {
  const props = {
    disabled: true,
  };
  render(<TextAreaInput {...props} />);
  const textarea = screen.getByRole('textbox');
  fireEvent.focus(textarea);
  expect(textarea).not.toHaveFocus();
});

it('applies custom height to the textarea control', () => {
  render(<TextAreaInput height="40px" />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toHaveStyle({ height: '40px' });
});
