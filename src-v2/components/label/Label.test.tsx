import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Label } from './Label';

it('renders a label element', () => {
  render(<Label>Email</Label>);
  const label = screen.getByText('Email');

  expect(label.tagName).toBe('LABEL');
  expect(label).toHaveAttribute('data-slot', 'label');
  expect(label).toHaveClass('text-sm', 'font-medium', 'select-none');
});

it('associates with a control through htmlFor', () => {
  render(
    <div>
      <Label htmlFor="email">Email</Label>
      <input id="email" />
    </div>,
  );

  expect(screen.getByLabelText('Email')).toHaveAttribute(
    'id',
    'email',
  );
});

it('marks required labels with a visual data attribute only', () => {
  render(
    <Label required data-testid="label">
      Email
    </Label>,
  );
  const label = screen.getByTestId('label');

  expect(label).toHaveAttribute('data-required', 'true');
  expect(label).not.toBeRequired();
  expect(label).toHaveClass(
    'data-[required=true]:before:-left-2',
    'data-[required=true]:before:bg-destructive-500',
  );
});

it('applies custom label props', () => {
  render(
    <Label
      className="text-primary-500"
      data-testid="label"
      style={{ marginTop: '4px' }}
    >
      Custom
    </Label>,
  );
  const label = screen.getByTestId('label');

  expect(label).toHaveClass('text-primary-500');
  expect(label).toHaveStyle({ marginTop: '4px' });
});
