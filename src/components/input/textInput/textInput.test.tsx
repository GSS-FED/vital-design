import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { colors } from '../../../constants';
import TextInput from './textInput';

it('renders a textInput with placeholder', () => {
  const placeholderText = 'Enter text here';
  render(<TextInput placeholder={placeholderText} />);
  const input = screen.getByRole('textbox');
  const inputPlaceholder =
    screen.getByPlaceholderText(placeholderText);
  expect(input).toBeInTheDocument();
  expect(inputPlaceholder).toBeInTheDocument();
});

it('should display the initial value', () => {
  render(<TextInput defaultValue="default value" />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('default value');
});

it('should call the onChange callback when value changed', () => {
  const props = {
    value: '',
    onChange: vi.fn(),
  };
  render(<TextInput {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.input(input, { target: { value: 'Hello' } });
  expect(props.onChange).toHaveBeenCalledWith('Hello');
});

it('should call the onEnter callback when the user presses enter', () => {
  const props = {
    onEnter: vi.fn(),
  };
  render(<TextInput {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(props.onEnter).toHaveBeenCalled();
});

it('should applies error style when isError prop is true', () => {
  const props = {
    isError: true,
  };
  const errorStyle = { border: `1px solid ${colors.alarm500}` };
  render(<TextInput {...props} />);
  const inputContainer = screen.getByTestId('textInput-container');
  expect(inputContainer).toHaveStyle(errorStyle);
});

it('cannot focus when disabled', () => {
  const props = {
    disabled: true,
  };
  render(<TextInput {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.focus(input);
  expect(input).not.toHaveFocus();
});
