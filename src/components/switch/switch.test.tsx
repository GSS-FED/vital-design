import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Switch from './switch';

it('renders an unchecked Switch', () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('data-state', 'unchecked');
});

it('renders a checked Switch', () => {
  const props = {
    checked: true,
    onChange: vi.fn(),
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('data-state', 'checked');
});

it('calls the onChange callback when clicked', async () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  await userEvent.click(element);
  expect(props.onChange).toHaveBeenCalledWith(true);
});

it('does not call the onChange callback when clicked if disabled', async () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
    disabled: true,
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  await userEvent.click(element);
  expect(props.onChange).not.toHaveBeenCalled();
});

it('applies custom class names and styles', () => {
  const props = {
    checked: false,
    onChange: vi.fn(),
    className: 'custom-class-1 custom-class-2',
    style: {
      color: '#FED655',
      backgroundColor: '#655FED',
    },
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(props.className);
  expect(element).toHaveStyle(props.style);
});
