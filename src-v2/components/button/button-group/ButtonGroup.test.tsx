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
