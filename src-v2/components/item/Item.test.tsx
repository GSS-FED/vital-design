import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './Item';

describe('Item', () => {
  it('renders compound item parts with data slots', () => {
    render(
      <Item>
        <ItemMedia variant="icon">I</ItemMedia>
        <ItemContent>
          <ItemTitle>Profile verified</ItemTitle>
          <ItemDescription>
            Your profile has been verified.
          </ItemDescription>
        </ItemContent>
        <ItemActions>Action</ItemActions>
      </Item>,
    );

    expect(screen.getByText('Profile verified')).toHaveAttribute(
      'data-slot',
      'item-title',
    );
    expect(screen.getByText('I')).toHaveAttribute(
      'data-slot',
      'item-media',
    );
    expect(screen.getByText('Action')).toHaveAttribute(
      'data-slot',
      'item-actions',
    );
  });

  it('applies variant and size state to the root', () => {
    render(
      <Item variant="outline" size="list" data-testid="item">
        Content
      </Item>,
    );

    const item = screen.getByTestId('item');

    expect(item).toHaveAttribute('data-slot', 'item');
    expect(item).toHaveAttribute('data-variant', 'outline');
    expect(item).toHaveAttribute('data-size', 'list');
    expect(item).toHaveClass('border-grayscale-300', 'px-5');
  });

  it('supports render prop for links', () => {
    render(
      <Item render={<a href="/dashboard" />}>
        <ItemContent>
          <ItemTitle>Dashboard</ItemTitle>
        </ItemContent>
      </Item>,
    );

    const link = screen.getByRole('link', { name: 'Dashboard' });

    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveAttribute('data-slot', 'item');
  });

  it('renders list semantics for grouped items', () => {
    render(
      <ItemGroup data-testid="item-group">
        <Item>
          <ItemHeader>Header</ItemHeader>
          <ItemContent>
            <ItemTitle>Title</ItemTitle>
          </ItemContent>
          <ItemFooter>Footer</ItemFooter>
        </Item>
        <ItemSeparator data-testid="separator" />
      </ItemGroup>,
    );

    expect(screen.getByTestId('item-group')).toHaveAttribute(
      'data-slot',
      'item-group',
    );
    expect(screen.getByRole('list')).toBe(
      screen.getByTestId('item-group'),
    );
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-slot',
      'item',
    );
    expect(screen.getByTestId('separator')).toHaveAttribute(
      'data-slot',
      'item-separator',
    );
    expect(screen.getByText('Header')).toHaveAttribute(
      'data-slot',
      'item-header',
    );
    expect(screen.getByText('Footer')).toHaveAttribute(
      'data-slot',
      'item-footer',
    );
  });

  it('clamps long descriptions by default', () => {
    render(
      <ItemDescription>
        A very long description can wrap without forcing every row in
        a list to grow without a cap.
      </ItemDescription>,
    );

    expect(screen.getByText(/A very long description/)).toHaveClass(
      'line-clamp-2',
    );
  });
});
