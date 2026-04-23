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

it('applies error and disabled state to the shell', () => {
  render(
    <InputGroup disabled isError data-testid="group">
      <InputGroupInput />
    </InputGroup>,
  );

  expect(screen.getByTestId('group')).toHaveClass(
    'border-grayscale-300',
  );
  expect(screen.getByTestId('group')).toHaveAttribute(
    'data-disabled',
  );
  expect(screen.getByRole('textbox')).toBeDisabled();
});

it('supports textarea controls', () => {
  render(
    <InputGroup>
      <InputGroupTextarea placeholder="Message" resizable />
    </InputGroup>,
  );

  expect(screen.getByPlaceholderText('Message')).toHaveClass(
    'resize',
  );
});

it('disables action buttons when the group is disabled', () => {
  const onClick = vi.fn();

  render(
    <InputGroup disabled>
      <InputGroupInput placeholder="Amount" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Clear" onClick={onClick}>
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
