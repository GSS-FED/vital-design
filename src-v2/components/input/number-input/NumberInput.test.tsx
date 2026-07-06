import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputSteppers,
} from './NumberInput';

function renderNumberInput(
  props: Partial<React.ComponentProps<typeof NumberInput>> = {},
) {
  return render(
    <NumberInput {...props}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>,
  );
}

it('renders the Base UI primitives with shadcn slot hooks', () => {
  renderNumberInput({ defaultValue: 3 });

  const control = screen.getByRole('textbox');
  expect(control).toHaveAttribute(
    'data-slot',
    'number-input-control',
  );

  const increment = screen.getByLabelText('Increase');
  expect(increment).toHaveAttribute(
    'data-slot',
    'number-input-increment',
  );

  const decrement = screen.getByLabelText('Decrease');
  expect(decrement).toHaveAttribute(
    'data-slot',
    'number-input-decrement',
  );
});

it('shows the initial formatted value', () => {
  renderNumberInput({ defaultValue: 12 });

  expect(screen.getByRole('textbox')).toHaveValue('12');
});

it('increments and decrements via the stepper buttons', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  renderNumberInput({ defaultValue: 1, onValueChange });

  await user.click(screen.getByLabelText('Increase'));
  expect(onValueChange).toHaveBeenLastCalledWith(
    2,
    expect.anything(),
  );

  await user.click(screen.getByLabelText('Decrease'));
  expect(onValueChange).toHaveBeenLastCalledWith(
    1,
    expect.anything(),
  );
});

it('clamps to the configured min and max via stepper buttons', async () => {
  const user = userEvent.setup();
  renderNumberInput({ defaultValue: 1, min: 0, max: 1 });

  const increment = screen.getByLabelText('Increase');
  expect(increment).toBeDisabled();

  await user.click(screen.getByLabelText('Decrease'));
  expect(screen.getByRole('textbox')).toHaveValue('0');
  expect(screen.getByLabelText('Decrease')).toBeDisabled();
});

it('disables every stepper and the input when disabled', () => {
  renderNumberInput({ defaultValue: 0, disabled: true });

  expect(screen.getByRole('textbox')).toBeDisabled();
  expect(screen.getByLabelText('Increase')).toBeDisabled();
  expect(screen.getByLabelText('Decrease')).toBeDisabled();
});

it('applies error styling when aria-invalid is set on the control', () => {
  render(
    <NumberInput defaultValue={0}>
      <NumberInputGroup>
        <NumberInputControl aria-invalid placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>,
  );

  expect(screen.getByRole('textbox')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

it('forwards refs to the input control', () => {
  const ref = { current: null as HTMLInputElement | null };

  render(
    <NumberInput defaultValue={0}>
      <NumberInputGroup>
        <NumberInputControl ref={ref} placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>,
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});

it('lets users compose increment and decrement buttons explicitly', () => {
  render(
    <NumberInput defaultValue={0}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0" />
        <NumberInputSteppers>
          <NumberInputIncrement aria-label="custom-up" />
          <NumberInputDecrement aria-label="custom-down" />
        </NumberInputSteppers>
      </NumberInputGroup>
    </NumberInput>,
  );

  expect(screen.getByLabelText('custom-up')).toHaveAttribute(
    'data-slot',
    'number-input-increment',
  );
  expect(screen.getByLabelText('custom-down')).toHaveAttribute(
    'data-slot',
    'number-input-decrement',
  );
});

it('emits the typed value through onValueChange', () => {
  const onValueChange = vi.fn();

  renderNumberInput({ onValueChange });

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '42' },
  });

  expect(onValueChange).toHaveBeenCalledWith(42, expect.anything());
});
