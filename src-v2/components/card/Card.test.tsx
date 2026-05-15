import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

describe('Card', () => {
  it('renders the root with data-slot="card"', () => {
    render(<Card data-testid="card">content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-slot', 'card');
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        content
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('renders compound parts with the correct data-slot attributes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Title')).toHaveAttribute(
      'data-slot',
      'card-title',
    );
    expect(screen.getByText('Description')).toHaveAttribute(
      'data-slot',
      'card-description',
    );
    expect(screen.getByText('Action')).toHaveAttribute(
      'data-slot',
      'card-action',
    );
    expect(screen.getByText('Content')).toHaveAttribute(
      'data-slot',
      'card-content',
    );
    expect(screen.getByText('Footer')).toHaveAttribute(
      'data-slot',
      'card-footer',
    );
  });

  it('forwards ref to the root element', () => {
    let ref: HTMLDivElement | null = null;
    render(
      <Card
        ref={(node) => {
          ref = node;
        }}
        data-testid="card"
      />,
    );
    expect(ref).not.toBeNull();
    expect(ref).toBe(screen.getByTestId('card'));
  });
});
