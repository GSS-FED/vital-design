import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { expect, it, vi } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

it('renders navigation, list and link semantics with stable slots', () => {
  render(
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  );

  expect(
    screen.getByRole('navigation', { name: 'pagination' }),
  ).toHaveAttribute('data-slot', 'pagination');
  expect(screen.getByRole('list')).toHaveAttribute(
    'data-slot',
    'pagination-content',
  );
  expect(screen.getByRole('listitem')).toHaveAttribute(
    'data-slot',
    'pagination-item',
  );
  const link = screen.getByRole('link', {
    name: '2',
    current: 'page',
  });
  expect(link).toHaveAttribute('href', '?page=2');
  expect(link).toHaveAttribute('data-slot', 'pagination-link');
});

it('updates aria-current when the caller changes the active page', () => {
  const { rerender } = render(
    <PaginationLink href="?page=2" isActive>
      2
    </PaginationLink>,
  );
  expect(screen.getByRole('link')).toHaveAttribute(
    'aria-current',
    'page',
  );
  rerender(<PaginationLink href="?page=2">2</PaginationLink>);
  expect(screen.getByRole('link')).not.toHaveAttribute(
    'aria-current',
  );
});

it('provides accessible names and distinct slots for directional links', () => {
  render(
    <>
      <PaginationFirst href="?page=1" />
      <PaginationPrevious href="?page=1" />
      <PaginationNext href="?page=3" />
      <PaginationLast href="?page=10" />
    </>,
  );
  for (const direction of ['first', 'previous', 'next', 'last']) {
    expect(
      screen.getByRole('link', { name: `Go to ${direction} page` }),
    ).toHaveAttribute('data-slot', `pagination-${direction}`);
  }
});

it('supports localised labels and custom link content', () => {
  render(
    <PaginationNext href="?page=3" aria-label="下一頁">
      下一頁
    </PaginationNext>,
  );
  expect(
    screen.getByRole('link', { name: '下一頁' }),
  ).toHaveTextContent('下一頁');
});

it('forwards link props and refs for router composition', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(
    <PaginationLink
      ref={ref}
      href="?page=2"
      render={<a data-router="true" />}
      className="custom"
      target="_blank"
    >
      2
    </PaginationLink>,
  );
  const link = screen.getByRole('link');
  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('data-router', 'true');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveClass('custom');
});

it('uses native button keyboard behaviour for client-side pagination', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(
    <PaginationLink
      render={<button type="button" />}
      onClick={onClick}
    >
      2
    </PaginationLink>,
  );
  await user.tab();
  expect(screen.getByRole('button', { name: '2' })).toHaveFocus();
  await user.keyboard('{Enter}');
  await user.keyboard(' ');
  expect(onClick).toHaveBeenCalledTimes(2);
});

it('removes disabled links from keyboard navigation and blocks activation', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(
    <>
      <PaginationPrevious
        href="?page=0"
        disabled
        onClick={onClick}
        data-testid="previous"
      />
      <PaginationLink href="?page=2">2</PaginationLink>
    </>,
  );
  const previous = screen.getByTestId('previous');
  expect(previous).toHaveAttribute('aria-disabled', 'true');
  expect(previous).toHaveAttribute('tabindex', '-1');
  expect(previous).not.toHaveAttribute('href');
  expect(fireEvent.click(previous)).toBe(false);
  expect(onClick).not.toHaveBeenCalled();
  await user.tab();
  expect(screen.getByRole('link', { name: '2' })).toHaveFocus();
});

it('blocks disabled button composition and resumes clicks after re-enabling', async () => {
  const onClick = vi.fn();
  const renderClick = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(
    <PaginationNext
      render={<button type="button" onClick={renderClick} />}
      disabled
      onClick={onClick}
    />,
  );
  await user.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
  expect(renderClick).not.toHaveBeenCalled();
  rerender(
    <PaginationNext
      render={<button type="button" onClick={renderClick} />}
      onClick={onClick}
    />,
  );
  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(renderClick).toHaveBeenCalledTimes(1);
});

it('blocks auxiliary activation of a disabled router link', () => {
  const onAuxClick = vi.fn();
  render(
    <PaginationNext
      render={<a href="?page=3" onAuxClick={onAuxClick} />}
      disabled
    />,
  );
  const link = screen.getByRole('link');
  expect(
    fireEvent(
      link,
      new MouseEvent('auxclick', {
        bubbles: true,
        cancelable: true,
        button: 1,
      }),
    ),
  ).toBe(false);
  expect(onAuxClick).not.toHaveBeenCalled();
});

it('keeps disabled default anchors identifiable as links', () => {
  render(<PaginationPrevious href="?page=0" disabled />);
  expect(
    screen.getByRole('link', { name: 'Go to previous page' }),
  ).toHaveAttribute('aria-disabled', 'true');
});

it('forwards auxiliary events while enabled', () => {
  const onAuxClick = vi.fn();
  const onAuxClickCapture = vi.fn();
  render(
    <PaginationLink
      href="?page=2"
      onAuxClick={onAuxClick}
      onAuxClickCapture={onAuxClickCapture}
    >
      2
    </PaginationLink>,
  );
  expect(
    fireEvent(
      screen.getByRole('link'),
      new MouseEvent('auxclick', {
        bubbles: true,
        cancelable: true,
        button: 1,
      }),
    ),
  ).toBe(true);
  expect(onAuxClickCapture).toHaveBeenCalledTimes(1);
  expect(onAuxClick).toHaveBeenCalledTimes(1);
});

it('keeps ellipsis descriptive and non-interactive', () => {
  render(<PaginationEllipsis>更多頁面</PaginationEllipsis>);
  expect(screen.getByText('更多頁面')).toHaveClass('sr-only');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
