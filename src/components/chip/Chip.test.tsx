import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { FlagIcon } from 'src/icons';
import Chip from './Chip';

it('renders an unselected chip', () => {
  const props = {
    selected: false,
    onChange: vi.fn(),
  };
  render(<Chip {...props}>Chip</Chip>);
  const chip = screen.getByRole('button');
  expect(chip).toBeInTheDocument();
  expect(chip).toHaveAttribute('data-state', 'unselected');
});

it('renders a selected chip', () => {
  const props = {
    selected: true,
    onChange: vi.fn(),
  };
  render(<Chip {...props}>Chip</Chip>);
  const chip = screen.getByRole('button');
  expect(chip).toBeInTheDocument();
  expect(chip).toHaveAttribute('data-state', 'selected');
});

it('renders a chip with an icon', () => {
  const props = {
    selected: false,
    onChange: vi.fn(),
    icon: <FlagIcon />,
  };
  render(<Chip {...props}>Chip</Chip>);
  const chip = screen.getByRole('button');
  const icon = screen.getByTestId('flag-icon');
  expect(chip).toBeInTheDocument();
  expect(chip).toHaveAttribute('data-state', 'unselected');
  expect(icon).toBeInTheDocument();
});

it('calls the onChange callback when clicked', async () => {
  const props = {
    selected: false,
    onChange: vi.fn(),
  };
  render(<Chip {...props}>Chip</Chip>);
  const chip = screen.getByRole('button');
  expect(chip).toBeInTheDocument();
  await userEvent.click(chip);
  expect(props.onChange).toHaveBeenCalledWith(true);
});

it('applies custom class names and styles', () => {
  const props = {
    selected: false,
    onChange: vi.fn(),
    className: 'custom-class-1 custom-class-2',
    style: {
      color: '#FED655',
      backgroundColor: '#655FED',
    },
  };
  render(<Chip {...props}>Chip</Chip>);
  const chip = screen.getByRole('button');
  expect(chip).toBeInTheDocument();
  expect(chip).toHaveClass(props.className);
  expect(chip).toHaveStyle(props.style);
});
