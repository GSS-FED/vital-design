import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  TreeSelect,
  type TreeSelectItem,
} from './components/tree-select';

// A class, not an arrow function: the mock is called with `new`.
vi.stubGlobal(
  'ResizeObserver',
  vi.fn(
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  ),
);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

const taiwan: TreeSelectItem = {
  label: 'Taiwan',
  parentValue: null,
  value: 'tw',
  hasChildren: true,
};
const taipei: TreeSelectItem = {
  label: 'Taipei',
  parentValue: 'tw',
  value: 'tpe',
};
const items: TreeSelectItem[] = [
  taiwan,
  {
    label: 'Japan',
    parentValue: null,
    value: 'jp',
    hasChildren: true,
  },
  taipei,
  { label: 'Tokyo', parentValue: 'jp', value: 'tky' },
];

function setup() {
  const onValueChange = vi.fn();
  render(
    <TreeSelect
      items={items}
      label="Locations"
      value={null}
      onValueChange={onValueChange}
      placeholder="Select location"
      searchPlaceholder="Search locations"
    />,
  );
  return { onValueChange, user: userEvent.setup() };
}

const option = (name: string) =>
  screen.queryByRole('option', { name });

describe('TreeSelect', () => {
  it('returns the full path when a leaf is selected', async () => {
    const { onValueChange, user } = setup();

    await user.click(
      screen.getByRole('combobox', { name: 'Locations' }),
    );
    await user.click(option('Taiwan')!);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(option('Tokyo')).not.toBeInTheDocument();

    await user.click(option('Taipei')!);

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith({
      label: 'Taipei',
      path: [taiwan, taipei],
      value: 'tpe',
    });
    expect(option('Taipei')).not.toBeInTheDocument();
  });

  it('searches only the current level', async () => {
    const { user } = setup();

    await user.click(
      screen.getByRole('combobox', { name: 'Locations' }),
    );
    await user.type(
      screen.getByPlaceholderText('Search locations'),
      'tai',
    );

    expect(option('Taiwan')).toBeInTheDocument();
    expect(option('Japan')).not.toBeInTheDocument();
    expect(option('Taipei')).not.toBeInTheDocument();
  });

  it('goes back on Backspace only when the search is empty', async () => {
    const { user } = setup();

    await user.click(
      screen.getByRole('combobox', { name: 'Locations' }),
    );
    await user.click(option('Taiwan')!);

    const input = screen.getByPlaceholderText('Search locations');
    await user.type(input, 'x{Backspace}');
    expect(option('Taipei')).toBeInTheDocument();

    await user.type(input, '{Backspace}');
    expect(option('Taiwan')).toBeInTheDocument();
    expect(option('Taipei')).not.toBeInTheDocument();
  });

  it('starts from the top level after closing', async () => {
    const { user } = setup();
    const trigger = screen.getByRole('combobox', {
      name: 'Locations',
    });

    await user.click(trigger);
    await user.click(option('Taiwan')!);
    await user.keyboard('{Escape}');
    await user.click(trigger);

    expect(option('Taiwan')).toBeInTheDocument();
    expect(option('Taipei')).not.toBeInTheDocument();
  });
});
