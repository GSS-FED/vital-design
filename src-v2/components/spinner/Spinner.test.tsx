import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Spinner } from './Spinner';

it('renders a loading status svg', () => {
  render(<Spinner />);
  const spinner = screen.getByRole('status', { name: 'Loading' });

  expect(spinner).toBeInTheDocument();
  expect(spinner.tagName).toBe('svg');
  expect(spinner).toHaveClass('size-4', 'animate-spin');
});

it('applies custom svg props', () => {
  render(
    <Spinner
      aria-label="Saving"
      className="size-5 text-primary-500"
      data-testid="spinner"
    />,
  );
  const spinner = screen.getByRole('status', { name: 'Saving' });

  expect(spinner).toHaveAttribute('data-testid', 'spinner');
  expect(spinner).toHaveClass('size-5', 'text-primary-500');
});
