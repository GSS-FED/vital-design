import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SplitButton from './SplitButton';

describe('Basic Functionality', () => {
  it('renders children correctly', () => {
    render(<SplitButton open={false}>Click me</SplitButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('calls onClick when main button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <SplitButton open={false} onClick={mockOnClick}>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    const mainButton = buttons[0]!;

    await user.click(mainButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls splitOnClick when split button is clicked', async () => {
    const user = userEvent.setup();
    const mockSplitOnClick = vi.fn();

    render(
      <SplitButton open={false} splitOnClick={mockSplitOnClick}>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    const splitButton = buttons[1]!;

    await user.click(splitButton);
    expect(mockSplitOnClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <SplitButton open={false} disabled>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <SplitButton open={false} disabled onClick={mockOnClick}>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    const mainButton = buttons[0]!;

    await user.click(mainButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call splitOnClick when disabled', async () => {
    const user = userEvent.setup();
    const mockSplitOnClick = vi.fn();

    render(
      <SplitButton
        open={false}
        disabled
        splitOnClick={mockSplitOnClick}
      >
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    const splitButton = buttons[1]!;

    await user.click(splitButton);
    expect(mockSplitOnClick).not.toHaveBeenCalled();
  });
});

describe('focusableWhenDisabled', () => {
  it('buttons are not HTML-disabled when focusableWhenDisabled is true', () => {
    render(
      <SplitButton open={false} disabled focusableWhenDisabled>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeEnabled();
    expect(buttons[0]).toHaveAttribute('aria-disabled', 'true');
    expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onClick when disabled and focusableWhenDisabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <SplitButton
        open={false}
        disabled
        focusableWhenDisabled
        onClick={mockOnClick}
      >
        Button
      </SplitButton>,
    );
    await user.click(screen.getAllByRole('button')[0]!);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call splitOnClick when disabled and focusableWhenDisabled', async () => {
    const user = userEvent.setup();
    const mockSplitOnClick = vi.fn();

    render(
      <SplitButton
        open={false}
        disabled
        focusableWhenDisabled
        splitOnClick={mockSplitOnClick}
      >
        Button
      </SplitButton>,
    );
    await user.click(screen.getAllByRole('button')[1]!);
    expect(mockSplitOnClick).not.toHaveBeenCalled();
  });
});

describe('Theme', () => {
  it('renders a separator for the primary theme', () => {
    render(
      <SplitButton open={false} theme="primary">
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass(
      'bg-gradient-to-tr',
      'from-info-400',
      'to-primary-500',
    );
    expect(screen.getByRole('separator')).toHaveClass('bg-white/30');
  });

  it('renders a separator for the default theme', () => {
    render(
      <SplitButton open={false} theme="default">
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass(
      'bg-white',
      'border-grayscale-300',
    );
  });

  it('adds the right group styling for large primary buttons', () => {
    render(
      <SplitButton open={false} size="large" theme="primary">
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('group')).toHaveClass(
      'shadow-button-primary',
    );
  });

  it('defaults to the default theme with a separator', () => {
    render(<SplitButton open={false}>Button</SplitButton>);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
