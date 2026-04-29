import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Label } from '../label/Label';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

function RadioOption({
  disabled,
  label,
  value,
}: {
  disabled?: boolean;
  label: string;
  value: string;
}) {
  const id = `radio-test-${value}`;

  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem disabled={disabled} id={id} value={value} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

it('renders a radio button', () => {
  render(
    <RadioGroup value="">
      <RadioOption label="Option 1" value="option-1" />
    </RadioGroup>,
  );

  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toBeChecked();
});

it('renders a checked radio button', () => {
  render(
    <RadioGroup value="option-1">
      <RadioOption label="Option 1" value="option-1" />
    </RadioGroup>,
  );

  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toBeChecked();
});

it('renders a disabled radio button', () => {
  render(
    <RadioGroup value="">
      <RadioOption disabled label="Option 1" value="option-1" />
    </RadioGroup>,
  );

  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toBeChecked();
});

it('renders a disabled radio button which is also checked', () => {
  render(
    <RadioGroup value="option-1">
      <RadioOption disabled label="Option 1" value="option-1" />
    </RadioGroup>,
  );

  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toBeChecked();
  expect(radioButton).toHaveClass(
    'data-disabled:cursor-not-allowed',
    'data-disabled:opacity-50',
  );
});

it('renders multiple radio buttons', () => {
  render(
    <RadioGroup value="option-1">
      <RadioOption label="Option 1" value="option-1" />
      <RadioOption label="Option 2" value="option-2" />
      <RadioOption disabled label="Option 3" value="option-3" />
    </RadioGroup>,
  );

  ['Option 1', 'Option 2', 'Option 3'].forEach((name) => {
    expect(screen.getByRole('radio', { name })).toBeInTheDocument();
  });
});

it('calls onValueChange when an unchecked radio button is clicked', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(
    <RadioGroup value="option-1" onValueChange={onValueChange}>
      <RadioOption label="Option 1" value="option-1" />
      <RadioOption label="Option 2" value="option-2" />
    </RadioGroup>,
  );

  await user.click(screen.getByRole('radio', { name: 'Option 2' }));

  expect(onValueChange).toHaveBeenCalledWith(
    'option-2',
    expect.any(Object),
  );
});

it('does not call onValueChange when a disabled radio button is clicked', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(
    <RadioGroup value="option-1" onValueChange={onValueChange}>
      <RadioOption label="Option 1" value="option-1" />
      <RadioOption disabled label="Option 2" value="option-2" />
    </RadioGroup>,
  );

  await user.click(screen.getByRole('radio', { name: 'Option 2' }));

  expect(onValueChange).not.toHaveBeenCalled();
});

it('applies custom class names and styles', () => {
  const style = {
    color: '#FED655',
    backgroundColor: '#655FED',
  };

  render(
    <RadioGroup
      className="custom-class-1 custom-class-2"
      style={style}
      value="option-1"
    >
      <RadioOption label="Option 1" value="option-1" />
    </RadioGroup>,
  );

  const radioGroup = screen.getByRole('radiogroup');

  expect(radioGroup).toBeInTheDocument();
  expect(radioGroup).toHaveClass('custom-class-1 custom-class-2');
  expect(radioGroup).toHaveStyle(style);
});

it('does not clear the value when clicking the selected radio button', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(
    <RadioGroup value="option-1" onValueChange={onValueChange}>
      <RadioOption label="Option 1" value="option-1" />
      <RadioOption label="Option 2" value="option-2" />
    </RadioGroup>,
  );

  const selectedRadioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });

  expect(selectedRadioButton).toBeChecked();

  await user.click(selectedRadioButton);

  expect(onValueChange).not.toHaveBeenCalled();
});

it('supports composed label content', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(
    <RadioGroup value="basic" onValueChange={onValueChange}>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-test-basic" value="basic" />
        <Label htmlFor="radio-test-basic">Basic plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-test-pro" value="pro" />
        <Label htmlFor="radio-test-pro">Pro plan</Label>
        <span>Recommended</span>
      </div>
    </RadioGroup>,
  );

  expect(
    screen.getByRole('radio', { name: /Basic plan/ }),
  ).toBeChecked();

  await user.click(screen.getByRole('radio', { name: /Pro plan/ }));

  expect(onValueChange).toHaveBeenCalledWith(
    'pro',
    expect.any(Object),
  );
  expect(screen.getByText('Recommended')).toBeInTheDocument();
});
