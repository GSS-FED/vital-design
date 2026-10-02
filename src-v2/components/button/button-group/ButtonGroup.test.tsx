import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from './ButtonGroup';

it('renders a horizontal button group by default', () => {
  render(
    <ButtonGroup>
      <button type="button">One</button>
      <ButtonGroupSeparator />
      <button type="button">Two</button>
    </ButtonGroup>,
  );

  expect(screen.getByRole('group')).toHaveAttribute(
    'data-orientation',
    'horizontal',
  );
  expect(screen.getByRole('separator')).toHaveAttribute(
    'data-orientation',
    'vertical',
  );
  expect(screen.getByRole('separator')).toHaveClass('w-px');
});

it('renders vertical orientation and flips separator direction', () => {
  render(
    <ButtonGroup orientation="vertical">
      <ButtonGroupText>Status</ButtonGroupText>
      <ButtonGroupSeparator />
    </ButtonGroup>,
  );

  expect(screen.getByRole('group')).toHaveAttribute(
    'data-orientation',
    'vertical',
  );
  expect(screen.getByText('Status')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toHaveAttribute(
    'data-orientation',
    'horizontal',
  );
  expect(screen.getByRole('separator')).toHaveClass('h-px');
});

it('lets button group text render with a different tag', () => {
  render(
    <ButtonGroup>
      <ButtonGroupText
        render={<div data-testid="button-group-text-render" />}
      >
        Status
      </ButtonGroupText>
    </ButtonGroup>,
  );

  const text = screen.getByTestId('button-group-text-render');

  expect(text.tagName).toBe('DIV');
  expect(text).toHaveAttribute('data-slot', 'button-group-text');
  expect(text).toHaveTextContent('Status');
});
