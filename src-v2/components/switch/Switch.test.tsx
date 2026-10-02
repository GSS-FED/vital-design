import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Switch } from './Switch';

it('renders an unchecked Switch', () => {
  const props = {
    checked: false,
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).not.toBeChecked();
});

it('renders a checked Switch', () => {
  const props = {
    checked: true,
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).toBeChecked();
});

it('calls the onCheckedChange callback when clicked', async () => {
  const props = {
    checked: false,
    onCheckedChange: vi.fn(),
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  await userEvent.click(element);
  expect(props.onCheckedChange).toHaveBeenCalledTimes(1);
  expect(props.onCheckedChange).toHaveBeenCalledWith(
    true,
    expect.any(Object),
  );
});

it('supports uncontrolled Base UI props', () => {
  render(
    <form aria-label="settings">
      <Switch
        aria-label="Notifications"
        data-testid="notifications-switch"
        defaultChecked
        id="notifications"
        name="notifications"
        value="on"
      />
    </form>,
  );
  const element = screen.getByRole('switch');
  const form = screen.getByRole<HTMLFormElement>('form', {
    name: 'settings',
  });
  expect(element).toBeInTheDocument();
  expect(element).toBeChecked();
  expect(element).toHaveAttribute('aria-label', 'Notifications');
  expect(element).toHaveAttribute(
    'data-testid',
    'notifications-switch',
  );
  expect(new FormData(form).get('notifications')).toBe('on');
});

it('does not call the onCheckedChange callback when clicked if disabled', async () => {
  const props = {
    checked: false,
    onCheckedChange: vi.fn(),
    disabled: true,
  };
  render(<Switch {...props} />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  await userEvent.click(element);
  expect(props.onCheckedChange).not.toHaveBeenCalled();
});

it('supports aria-invalid styling', () => {
  render(<Switch aria-invalid />);
  const element = screen.getByRole('switch');
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('aria-invalid', 'true');
  expect(element).toHaveClass('aria-invalid:border-destructive-500');
});

it('applies custom class names and styles', () => {
  const props = {
    checked: false,
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
