import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

it('renders a skeleton element', () => {
  render(<Skeleton data-testid="skeleton" />);
  const element = screen.getByTestId('skeleton');

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('data-slot', 'skeleton');
  expect(element).toHaveClass(
    'animate-pulse',
    'rounded-md',
    'bg-accent',
  );
});

it('applies custom div props', () => {
  render(
    <Skeleton
      aria-label="Loading card"
      className="h-10 w-20"
      data-testid="skeleton"
      style={{ width: '80px' }}
    />,
  );
  const element = screen.getByLabelText('Loading card');

  expect(element).toHaveClass('h-10', 'w-20');
  expect(element).toHaveStyle({ width: '80px' });
});
