import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Label } from '../label/Label';
import { Checkbox } from './Checkbox';

function CheckboxField({
  checked = false,
  disabled,
  indeterminate,
  label = 'Option',
  onCheckedChange = vi.fn(),
}: {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const id = `checkbox-test-${label}`;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        disabled={disabled}
        id={id}
        indeterminate={indeterminate}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

it('renders an unchecked checkbox', () => {
  render(<CheckboxField />);

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

it('renders a checked checkbox', () => {
  render(<CheckboxField checked />);

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeChecked();
});

it('renders an indeterminate checkbox', () => {
  render(<CheckboxField indeterminate />);

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBePartiallyChecked();
});

it('renders an invalid checkbox', () => {
  render(
    <div className="flex items-center gap-2">
      <Checkbox aria-invalid id="checkbox-test-required" />
      <Label htmlFor="checkbox-test-required">Option</Label>
    </div>,
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
  expect(checkbox).toHaveAttribute('aria-invalid', 'true');
});

it('calls onCheckedChange when clicked', async () => {
  const onCheckedChange = vi.fn();

  render(<CheckboxField onCheckedChange={onCheckedChange} />);

  await userEvent.click(
    screen.getByRole('checkbox', { name: 'Option' }),
  );

  expect(onCheckedChange).toHaveBeenCalledWith(
    true,
    expect.any(Object),
  );
});

it('does not call onCheckedChange when clicked if disabled', async () => {
  const onCheckedChange = vi.fn();

  render(
    <CheckboxField disabled onCheckedChange={onCheckedChange} />,
  );

  await userEvent.click(
    screen.getByRole('checkbox', { name: 'Option' }),
  );

  expect(onCheckedChange).not.toHaveBeenCalled();
});

it('keeps selected disabled states in the primary style', () => {
  render(
    <>
      <Checkbox checked disabled aria-label="Checked disabled" />
      <Checkbox
        disabled
        indeterminate
        aria-label="Indeterminate disabled"
      />
    </>,
  );

  expect(
    screen.getByRole('checkbox', { name: 'Checked disabled' }),
  ).toHaveClass(
    'data-disabled:data-checked:border-primary-500',
    'data-disabled:data-checked:bg-primary-500',
    'data-disabled:data-checked:opacity-40',
  );
  expect(
    screen.getByRole('checkbox', {
      name: 'Indeterminate disabled',
    }),
  ).toHaveClass(
    'data-disabled:data-indeterminate:border-primary-500',
    'data-disabled:data-indeterminate:bg-primary-500',
    'data-disabled:data-indeterminate:opacity-40',
  );
});

it('applies custom class names and styles to the checkbox', () => {
  const style = {
    color: '#FED655',
    backgroundColor: '#655FED',
  };

  render(
    <Checkbox
      className="custom-class-1 custom-class-2"
      style={style}
    />,
  );

  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).toHaveClass('custom-class-1 custom-class-2');
  expect(checkbox).toHaveStyle(style);
});
