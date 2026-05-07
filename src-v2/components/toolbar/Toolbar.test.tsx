import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
} from './Toolbar';

it('renders with role="toolbar" and horizontal orientation by default', () => {
  render(
    <Toolbar data-testid="toolbar">
      <span>child</span>
    </Toolbar>,
  );
  const el = screen.getByTestId('toolbar');
  expect(el).toHaveAttribute('role', 'toolbar');
  expect(el).toHaveAttribute('aria-orientation', 'horizontal');
  expect(el).toHaveAttribute('data-slot', 'toolbar');
});

it('applies variant + size classes', () => {
  render(
    <Toolbar data-testid="toolbar" variant="outline" size="sm">
      child
    </Toolbar>,
  );
  const el = screen.getByTestId('toolbar');
  expect(el).toHaveAttribute('data-variant', 'outline');
  expect(el).toHaveClass(
    'border-b',
    'border-grayscale-200',
    'bg-white',
  );
  expect(el).toHaveClass('px-3', 'py-2');
});

it('renders ToolbarGroup, Spacer, Separator with data-slot', () => {
  render(
    <Toolbar>
      <ToolbarGroup data-testid="group">
        <button type="button">A</button>
      </ToolbarGroup>
      <ToolbarSpacer data-testid="spacer" />
      <ToolbarSeparator data-testid="separator" />
    </Toolbar>,
  );
  expect(screen.getByTestId('group')).toHaveAttribute(
    'data-slot',
    'toolbar-group',
  );
  expect(screen.getByTestId('spacer')).toHaveAttribute(
    'data-slot',
    'toolbar-spacer',
  );
  expect(screen.getByTestId('separator')).toHaveAttribute(
    'data-slot',
    'toolbar-separator',
  );
});
