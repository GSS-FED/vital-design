import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './InputGroup';

it('renders an input group with addons', () => {
  render(
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Amount" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Clear">x</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>,
  );

  expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
  expect(screen.getByText('$')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Clear' }),
  ).toBeInTheDocument();
});

it('styles from invalid and disabled controls', () => {
  render(
    <InputGroup data-testid="group">
      <InputGroupInput disabled aria-invalid />
    </InputGroup>,
  );

  expect(screen.getByTestId('group')).toHaveClass(
    'has-[:disabled]:bg-grayscale-200',
    'has-[[data-slot][aria-invalid=true]]:border-alarm-500',
  );
  expect(screen.getByRole('textbox')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  expect(screen.getByRole('textbox')).toBeDisabled();
});

it('does not implicitly pass shell aria state to controls', () => {
  render(
    <InputGroup aria-invalid>
      <InputGroupInput />
    </InputGroup>,
  );

  const input = screen.getByRole('textbox');

  expect(input).not.toHaveAttribute('aria-invalid');
});

it('supports textarea controls', () => {
  render(
    <InputGroup>
      <InputGroupTextarea placeholder="Message" />
    </InputGroup>,
  );

  expect(screen.getByPlaceholderText('Message')).toHaveClass(
    'resize-none',
  );
});

it('disables action buttons when the group is disabled', () => {
  const onClick = vi.fn();

  render(
    <InputGroup>
      <InputGroupInput placeholder="Amount" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Clear"
          disabled
          onClick={onClick}
        >
          x
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>,
  );

  const button = screen.getByRole('button', { name: 'Clear' });
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

it('focuses the control when a non-button addon is clicked', () => {
  render(
    <InputGroup>
      <InputGroupAddon data-testid="input-group-addon">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput id="amount" placeholder="Amount" />
    </InputGroup>,
  );

  fireEvent.click(screen.getByTestId('input-group-addon'));

  expect(screen.getByPlaceholderText('Amount')).toHaveFocus();
});

it('supports block addons', () => {
  render(
    <InputGroup data-testid="group">
      <InputGroupAddon align="block-start">Label</InputGroupAddon>
      <InputGroupTextarea placeholder="Message" />
    </InputGroup>,
  );

  expect(screen.getByText('Label')).toHaveAttribute(
    'data-align',
    'block-start',
  );
  expect(screen.getByTestId('group')).toHaveClass(
    'has-[>[data-align=block-start]]:flex-col',
  );
});
