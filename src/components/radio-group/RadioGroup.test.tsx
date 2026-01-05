import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import RadioGroup from './RadioGroup';

it('renders a radio button', () => {
  const props = {
    options: [{ label: 'Option 1', value: 'option-1' }],
    value: '',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByLabelText('Option 1');
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toHaveValue('option-1');
  expect(radioButton).toHaveAttribute('data-state', 'unchecked');
});

it('renders a checked radio button', () => {
  const props = {
    options: [{ label: 'Option 1', value: 'option-1' }],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByLabelText('Option 1');
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toHaveValue('option-1');
  expect(radioButton).toHaveAttribute('data-state', 'checked');
});

it('renders a disabled radio button', () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1', disabled: true },
    ],
    value: '',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByLabelText('Option 1');
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toHaveValue('option-1');
  expect(radioButton).toHaveAttribute('data-state', 'unchecked');
});

it('renders a disabled radio button which is also checked', () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1', disabled: true },
    ],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByLabelText('Option 1');
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toHaveValue('option-1');
  expect(radioButton).toHaveAttribute('data-state', 'checked');
});

it('renders multiple radio buttons', () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3', disabled: true },
    ],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  props.options.forEach((option) => {
    const radioButton = screen.getByLabelText(option.label);
    expect(radioButton).toBeInTheDocument();
  });
});

it('calls the onChange callback when an unchecked radio button is clicked', async () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  props.options.forEach((option) => {
    const radioButton = screen.getByLabelText(option.label);
    expect(radioButton).toBeInTheDocument();
  });
  const secondRadioButton = screen.getByLabelText('Option 2');
  await userEvent.click(secondRadioButton);
  expect(props.onChange).toHaveBeenCalledWith('option-2');
});

it('does not call the onChange callback when a disabled radio button is clicked', async () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2', disabled: true },
    ],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  props.options.forEach((option) => {
    const radioButton = screen.getByLabelText(option.label);
    expect(radioButton).toBeInTheDocument();
  });
  const secondRadioButton = screen.getByLabelText('Option 2');
  await userEvent.click(secondRadioButton);
  expect(props.onChange).not.toHaveBeenCalled();
});

it('applies custom class names and styles', () => {
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    value: 'option-1',
    onChange: vi.fn(),
    className: 'custom-class-1 custom-class-2',
    style: {
      color: '#FED655',
      backgroundColor: '#655FED',
    },
  };
  render(<RadioGroup {...props} />);
  const radioGroup = screen.getByRole('radiogroup');
  expect(radioGroup).toBeInTheDocument();
  expect(radioGroup).toHaveClass(props.className);
  expect(radioGroup).toHaveStyle(props.style);
});
it('calls onChange with empty string when clicking selected radio button and allowCancel is true', async () => {
  const onChange = vi.fn();
  const props = {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    value: 'option-1',
    onChange,
    allowCancel: true,
  };
  render(<RadioGroup {...props} />);

  const selectedRadioButton = screen.getByLabelText('Option 1');
  expect(selectedRadioButton).toBeInTheDocument();
  expect(selectedRadioButton).toHaveAttribute(
    'data-state',
    'checked',
  );

  await userEvent.click(selectedRadioButton);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('');
});
