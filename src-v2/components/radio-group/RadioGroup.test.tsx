import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

it('renders a radio button', () => {
  const props = {
    options: [{ label: 'Option 1', value: 'option-1' }],
    value: '',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toBeChecked();
});

it('renders a checked radio button', () => {
  const props = {
    options: [{ label: 'Option 1', value: 'option-1' }],
    value: 'option-1',
    onChange: vi.fn(),
  };
  render(<RadioGroup {...props} />);
  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toBeChecked();
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
  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toBeChecked();
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
  const radioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });
  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toBeChecked();
  expect(radioButton).toHaveClass(
    'data-disabled:data-checked:border-transparent',
    'data-disabled:data-checked:bg-primary-500',
    'opacity-40',
  );
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
    const radioButton = screen.getByRole('radio', {
      name: `${option.label}`,
    });
    expect(radioButton).toBeInTheDocument();
  });
});

it('calls the onChange callback when an unchecked radio button is clicked', async () => {
  const user = userEvent.setup();
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
    const radioButton = screen.getByRole('radio', {
      name: `${option.label}`,
    });
    expect(radioButton).toBeInTheDocument();
  });
  const secondRadioButton = screen.getByRole('radio', {
    name: 'Option 2',
  });
  await user.click(secondRadioButton);
  expect(props.onChange).toHaveBeenCalledWith('option-2');
});

it('does not call the onChange callback when a disabled radio button is clicked', async () => {
  const user = userEvent.setup();
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
    const radioButton = screen.getByRole('radio', {
      name: `${option.label}`,
    });
    expect(radioButton).toBeInTheDocument();
  });
  const secondRadioButton = screen.getByRole('radio', {
    name: 'Option 2',
  });
  await user.click(secondRadioButton);
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
  const user = userEvent.setup();
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

  const selectedRadioButton = screen.getByRole('radio', {
    name: 'Option 1',
  });
  expect(selectedRadioButton).toBeInTheDocument();
  expect(selectedRadioButton).toBeChecked();

  await user.click(selectedRadioButton);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('');
});

it('supports compound items with custom label content', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(
    <RadioGroup value="basic" onChange={onChange}>
      <RadioGroupItem value="basic">
        <span>Basic plan</span>
      </RadioGroupItem>
      <RadioGroupItem value="pro">
        <span>Pro plan</span>
        <span>Recommended</span>
      </RadioGroupItem>
    </RadioGroup>,
  );

  expect(
    screen.getByRole('radio', { name: /Basic plan/ }),
  ).toBeChecked();
  await user.click(screen.getByRole('radio', { name: /Pro plan/ }));
  expect(onChange).toHaveBeenCalledWith('pro');
  expect(screen.getByText('Recommended')).toBeInTheDocument();
});
