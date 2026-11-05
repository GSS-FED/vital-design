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

it('forwards label association, form props, and ref to the input', () => {
  const ref = { current: null as HTMLInputElement | null };
  const onBlur = vi.fn();
  render(
    <>
      <label htmlFor="current-password">Password</label>
      <PasswordInput
        ref={ref}
        id="current-password"
        name="password"
        autoComplete="current-password"
        onBlur={onBlur}
      />
    </>,
  );

  const input = screen.getByLabelText('Password');
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute('name', 'password');
  expect(input).toHaveAttribute('autocomplete', 'current-password');

  fireEvent.blur(input);
  expect(onBlur).toHaveBeenCalledTimes(1);
});

it('names the toggle after the action it performs next', () => {
  const { rerender } = render(<PasswordInput />);

  fireEvent.click(
    screen.getByRole('button', { name: 'Show password' }),
  );
  expect(
    screen.getByRole('button', { name: 'Hide password' }),
  ).toBeInTheDocument();

  rerender(
    <PasswordInput
      showPasswordLabel="顯示密碼"
      hidePasswordLabel="隱藏密碼"
    />,
  );
  expect(
    screen.getByRole('button', { name: '隱藏密碼' }),
  ).toBeInTheDocument();
});

it('runs caller input and key handlers alongside onChange and onEnter', () => {
  const onInput = vi.fn();
  const onChange = vi.fn();
  const onKeyDown = vi.fn();
  const onEnter = vi.fn();
  render(
    <PasswordInput
      onInput={onInput}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onEnter={onEnter}
    />,
  );
  const input = screen.getByTestId('password-input');

  fireEvent.input(input, { target: { value: 'secret' } });
  expect(onInput).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('secret');

  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(onEnter).toHaveBeenCalledWith('secret');
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
