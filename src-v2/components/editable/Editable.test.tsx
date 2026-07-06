import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Editable, EditableDisplay, EditableInput } from './Editable';

function setup(
  props?: Partial<React.ComponentProps<typeof Editable>>,
) {
  const onCommit = vi.fn();
  render(
    <Editable defaultValue="hello" onCommit={onCommit} {...props}>
      <EditableDisplay />
      <EditableInput />
    </Editable>,
  );
  return { onCommit };
}

describe('Editable', () => {
  it('renders the display in idle state', () => {
    setup();
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(
      screen.queryByDisplayValue('hello'),
    ).not.toBeInTheDocument();
  });

  it('truncates the default display text', () => {
    setup({
      defaultValue: 'very long editable value',
    });
    expect(screen.getByText('very long editable value')).toHaveClass(
      'truncate',
    );
  });

  it('enters edit mode on click and focuses the input', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    const input = screen.getByDisplayValue('hello');
    expect(input).toHaveFocus();
  });

  it('places the caret at the end when editing starts', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    const input = screen.getByDisplayValue('hello');
    expect(input).toHaveProperty('selectionStart', 5);
    expect(input).toHaveProperty('selectionEnd', 5);
  });

  it('commits on blur with the new value', async () => {
    const { onCommit } = setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    const input = screen.getByDisplayValue('hello');
    await user.clear(input);
    await user.type(input, 'world');
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenCalledWith('world');
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  it('cancels on Escape and restores the display', async () => {
    const { onCommit } = setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    const input = screen.getByDisplayValue('hello');
    await user.clear(input);
    await user.type(input, 'nope{Escape}');
    expect(onCommit).not.toHaveBeenCalled();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('commits on Enter', async () => {
    const { onCommit } = setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    const input = screen.getByDisplayValue('hello');
    await user.clear(input);
    await user.type(input, 'enterval{Enter}');
    expect(onCommit).toHaveBeenCalledWith('enterval');
  });

  it('does not enter edit mode when disabled', async () => {
    setup({ disabled: true });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('does not enter edit mode when readOnly', async () => {
    setup({ readOnly: true });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('shows placeholder when value is empty', () => {
    setup({ defaultValue: '', placeholder: 'click to add' });
    expect(screen.getByText('click to add')).toBeInTheDocument();
  });

  it('does not fire onCommit when value is unchanged', async () => {
    const { onCommit } = setup();
    const user = userEvent.setup();
    await user.click(screen.getByText('hello'));
    fireEvent.blur(screen.getByDisplayValue('hello'));
    expect(onCommit).not.toHaveBeenCalled();
  });
});
