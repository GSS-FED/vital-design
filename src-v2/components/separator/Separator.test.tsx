import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Separator } from './Separator';

it('renders a horizontal separator by default', () => {
  render(<Separator data-testid="separator" />);
  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('data-slot', 'separator');
  expect(separator).toHaveAttribute('role', 'separator');
  expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  expect(separator).toHaveClass(
    'h-px',
    'w-full',
    'bg-grayscale-opacity-200',
  );
});

it('renders a vertical separator', () => {
  render(
    <Separator orientation="vertical" data-testid="separator" />,
  );
  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  expect(separator).toHaveAttribute('data-orientation', 'vertical');
  expect(separator).toHaveClass('h-full', 'w-px', 'min-h-4');
});

it('applies custom props', () => {
  render(
    <Separator
      className="bg-primary-500"
      data-testid="separator"
      style={{ marginTop: '4px' }}
    />,
  );
  const separator = screen.getByTestId('separator');

  expect(separator).toHaveClass('bg-primary-500');
  expect(separator).toHaveStyle({ marginTop: '4px' });
});
