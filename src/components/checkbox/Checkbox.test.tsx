import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Checkbox from './Checkbox';

it('renders an unchecked checkbox', () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('data-state', 'unchecked');
});

it('renders a checked checkbox', () => {
  const props = {
    checked: true,
    onChange: vi.fn(),
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('data-state', 'checked');
});

it('renders an indeterminate checkbox', () => {
  const props = {
    checked: 'indeterminate' as const,
    onChange: vi.fn(),
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
});

it('renders a required checkbox', () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
    required: true,
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  expect(checkbox).toHaveAttribute('data-invalid');
});

it('calls the onChange callback when clicked', async () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  await userEvent.click(checkbox);
  expect(props.onChange).toHaveBeenCalledWith(true);
});

it('does not call the onChange callback when clicked if disabled', async () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
    disabled: true,
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  const checkbox = screen.getByLabelText('Option');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeDisabled();
  await userEvent.click(checkbox);
  expect(props.onChange).not.toHaveBeenCalled();
});

it('applies custom class names and styles to the container', () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
    className: 'custom-class-1 custom-class-2',
    style: {
      color: '#FED655',
      backgroundColor: '#655FED',
    },
  };
  render(<Checkbox {...props}>Option</Checkbox>);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByLabelText('Option').closest('label');
  expect(container).toBeInTheDocument();
  expect(container).toHaveClass(props.className);
  expect(container).toHaveStyle(props.style);
});
