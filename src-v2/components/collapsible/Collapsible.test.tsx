import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

it('toggles the panel open and closed when the trigger is clicked', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();

  render(
    <Collapsible onOpenChange={onOpenChange}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden content</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Toggle' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.getByText('Hidden content')).toBeInTheDocument();
});

it('renders an open default state when defaultOpen is set', () => {
  render(
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent data-testid="collapsible-panel">
        Visible content
      </CollapsibleContent>
    </Collapsible>,
  );

  expect(screen.getByText('Visible content')).toBeVisible();
  expect(
    screen.getByRole('button', { name: 'Toggle' }),
  ).toHaveAttribute('aria-expanded', 'true');
});

it('respects the controlled open prop', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();

  render(
    <Collapsible open={false} onOpenChange={onOpenChange}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Controlled content</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Toggle' });
  await user.click(trigger);

  expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(Object));
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

it('disables interaction when disabled is true', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();

  render(
    <Collapsible disabled onOpenChange={onOpenChange}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Disabled content</CollapsibleContent>
    </Collapsible>,
  );

  const trigger = screen.getByRole('button', { name: 'Toggle' });
  await user.click(trigger);

  expect(onOpenChange).not.toHaveBeenCalled();
  expect(trigger).toHaveAttribute('aria-disabled', 'true');
  expect(trigger).toHaveAttribute('data-disabled');
});

it('exposes data-slot hooks on each part', () => {
  render(
    <Collapsible defaultOpen data-testid="collapsible">
      <CollapsibleTrigger data-testid="collapsible-trigger">
        Toggle
      </CollapsibleTrigger>
      <CollapsibleContent data-testid="collapsible-content">
        Content
      </CollapsibleContent>
    </Collapsible>,
  );

  expect(screen.getByTestId('collapsible')).toHaveAttribute(
    'data-slot',
    'collapsible',
  );
  expect(screen.getByTestId('collapsible-trigger')).toHaveAttribute(
    'data-slot',
    'collapsible-trigger',
  );
  expect(screen.getByTestId('collapsible-content')).toHaveAttribute(
    'data-slot',
    'collapsible-content',
  );
});
