import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { colors } from '../../constants';
import TextAreaInput from './textareaInput';

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
  const errorStyle = { border: `1px solid ${colors.alarm500}` };
  render(<TextAreaInput {...props} />);
  const textareaContainer = screen.getByTestId('textarea-container');
  expect(textareaContainer).toHaveStyle(errorStyle);
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
