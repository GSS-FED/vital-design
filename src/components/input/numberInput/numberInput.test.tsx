import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { colors } from '../../../constants';
import NumberInput from './numberInput';

it('should call the onChange callback when positive value is typed', async () => {
  const props = {
    value: 0,
    onChange: vi.fn(),
  };
  render(<NumberInput {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.input(input, { value: 4 });
  expect(input).toBeInTheDocument();
  await userEvent.type(input, '4');
  expect(props.onChange).toHaveBeenCalledWith(4);
  expect(input).toHaveValue('4');
});

it('should call the onChange callback when negative value is typed', async () => {
  const props = {
    value: -2,
    onChange: vi.fn(),
  };
  render(<NumberInput {...props} />);
  const input = screen.getByRole('textbox');
  fireEvent.input(input, { value: '-4' });
  expect(input).toBeInTheDocument();
  await userEvent.type(input, '{backspace}-4');
  expect(props.onChange).toHaveBeenCalledWith(-4);
  expect(input).toHaveValue('-4');
});

it('should increase value when up icon is clicked', () => {
  const props = { value: 0, onChange: vi.fn() };
  render(<NumberInput {...props} />);
  const increaseButton = screen.getByTestId('increase-value');
  const input = screen.getByRole('textbox');
  fireEvent.click(increaseButton);
  expect(props.onChange).toHaveBeenCalledWith(1);
  expect(input).toHaveValue('1');
});

it('should decrease value when down icon is clicked', () => {
  const props = { value: 0, onChange: vi.fn() };
  render(<NumberInput {...props} />);
  const decreaseButton = screen.getByTestId('decrease-value');
  const input = screen.getByRole('textbox');
  fireEvent.click(decreaseButton);
  expect(props.onChange).toHaveBeenCalledWith(-1);
  expect(input).toHaveValue('-1');
});

it('should applies error style when isError prop is true', () => {
  const props = { value: 0, onChange: vi.fn(), isError: true };
  const errorStyle = { border: `1px solid ${colors.alarm500}` };
  render(<NumberInput {...props} />);
  const numberInputContainer = screen.getByTestId(
    'numberInput-container',
  );
  expect(numberInputContainer).toHaveStyle(errorStyle);
});

it('cannot focus when disabled', () => {
  const props = { value: 0, onChange: vi.fn(), disabled: true };
  render(<NumberInput {...props} />);
  const numberInput = screen.getByRole('textbox');
  fireEvent.focus(numberInput);
  expect(numberInput).not.toHaveFocus();
});
