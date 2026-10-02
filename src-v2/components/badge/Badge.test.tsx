import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Badge } from './Badge';

it('renders a number badge by default', () => {
  render(<Badge>9</Badge>);
  const badge = screen.getByRole('status');
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveTextContent('9');
  expect(badge).toHaveAttribute('data-variant', 'primary');
  expect(badge).toHaveAttribute('data-size', 'lg');
  expect(badge).toHaveAttribute('data-type', 'number');
});

it('renders a text badge', () => {
  render(<Badge type="text">文字</Badge>);
  const badge = screen.getByRole('status');
  expect(badge).toHaveTextContent('文字');
  expect(badge).toHaveAttribute('data-type', 'text');
});

it.each([
  ['primary', 'bg-primary-500'],
  ['success', 'bg-success-500'],
  ['warning', 'bg-warning-500'],
  ['destructive', 'bg-destructive-500'],
  ['info', 'bg-info-500'],
] as const)(
  'renders %s variant with %s class',
  (variant, expectedClass) => {
    render(<Badge variant={variant}>9</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('data-variant', variant);
    expect(badge).toHaveClass(expectedClass);
  },
);

it('allows caller to override background via className', () => {
  render(
    <Badge variant="success" className="bg-success-600">
      9
    </Badge>,
  );
  const badge = screen.getByRole('status');
  expect(badge).toHaveClass('bg-success-600');
  expect(badge).not.toHaveClass('bg-success-500');
});

it('renders a dot when size is sm and ignores children', () => {
  render(<Badge size="sm">should not show</Badge>);
  const badge = screen.getByRole('status');
  expect(badge).toBeInTheDocument();
  expect(badge).toBeEmptyDOMElement();
  expect(badge).toHaveAttribute('data-size', 'sm');
});

it('applies custom className and style', () => {
  render(
    <Badge className="custom-class" style={{ marginLeft: 4 }}>
      9
    </Badge>,
  );
  const badge = screen.getByRole('status');
  expect(badge).toHaveClass('custom-class');
  expect(badge).toHaveStyle({ marginLeft: '4px' });
});

it('renders md size', () => {
  render(<Badge size="md">9</Badge>);
  const badge = screen.getByRole('status');
  expect(badge).toHaveAttribute('data-size', 'md');
  expect(badge).toHaveClass('h-4');
});
