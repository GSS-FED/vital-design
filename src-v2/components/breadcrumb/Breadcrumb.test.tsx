import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

function renderBreadcrumb(size?: 'sm' | 'lg') {
  return render(
    <Breadcrumb>
      <BreadcrumbList size={size}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  );
}

it('renders a breadcrumb navigation landmark with slots', () => {
  renderBreadcrumb();

  const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
  expect(nav).toHaveAttribute('data-slot', 'breadcrumb');
  expect(screen.getByRole('list')).toHaveAttribute(
    'data-slot',
    'breadcrumb-list',
  );
});

it('renders links as anchors with muted and hover styles', () => {
  renderBreadcrumb();

  const link = screen.getByRole('link', { name: 'Home' });
  expect(link).toHaveAttribute('href', '/');
  expect(link).toHaveAttribute('data-slot', 'breadcrumb-link');
  expect(link).toHaveClass(
    'text-grayscale-500',
    'hover:text-primary-500',
  );
});

it('marks the current page', () => {
  renderBreadcrumb();

  const page = screen.getByText('Current');
  expect(page).toHaveAttribute('data-slot', 'breadcrumb-page');
  expect(page).toHaveAttribute('aria-current', 'page');
  expect(page).toHaveAttribute('aria-disabled', 'true');
  expect(page).toHaveClass('text-grayscale-900');
});

it('renders a presentational separator with default content', () => {
  render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator data-testid="separator" />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  );

  const separator = screen.getByTestId('separator');
  expect(separator).toHaveAttribute(
    'data-slot',
    'breadcrumb-separator',
  );
  expect(separator).toHaveAttribute('aria-hidden', 'true');
  expect(separator).not.toBeEmptyDOMElement();
});

it('uses small typography by default', () => {
  renderBreadcrumb();

  expect(screen.getByRole('list')).toHaveClass(
    'text-sm',
    'leading-5',
    'font-normal',
  );
});

it('applies the large size typography on the list', () => {
  renderBreadcrumb('lg');

  expect(screen.getByRole('list')).toHaveClass(
    'text-xl',
    'leading-8',
    'font-medium',
  );
});

it('supports the render prop for custom link elements', () => {
  render(
    <BreadcrumbLink render={<button type="button" />}>
      Back
    </BreadcrumbLink>,
  );

  const button = screen.getByRole('button', { name: 'Back' });
  expect(button).toHaveAttribute('data-slot', 'breadcrumb-link');
});

it('allows overriding the separator content', () => {
  render(
    <BreadcrumbSeparator data-testid="separator">
      /
    </BreadcrumbSeparator>,
  );

  expect(screen.getByTestId('separator')).toHaveTextContent('/');
});

it('renders an ellipsis with an accessible label', () => {
  render(<BreadcrumbEllipsis data-testid="ellipsis" />);

  const ellipsis = screen.getByTestId('ellipsis');
  expect(ellipsis).toHaveAttribute(
    'data-slot',
    'breadcrumb-ellipsis',
  );
  expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByText('More')).toHaveClass('sr-only');
});
