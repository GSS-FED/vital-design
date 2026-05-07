import { FlagIcon } from '@/icons/FlagIcon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SplitButton } from './SplitButton';

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

  it('renders child icons with data-icon placement', () => {
    render(
      <SplitButton open={false}>
        <FlagIcon data-icon="inline-start" data-testid="start-icon" />
        Publish
      </SplitButton>,
    );
    const mainButton = screen.getAllByRole('button')[0]!;

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(mainButton).toHaveClass(
      'has-[_[data-icon=inline-start]]:pl-3',
    );
  });

  it('sets data-size on segment buttons for icon sizing', () => {
    render(
      <SplitButton open={false} size="lg">
        <FlagIcon data-icon="inline-start" />
        Publish
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveAttribute('data-size', 'lg');
    expect(buttons[1]).toHaveAttribute('data-size', 'icon-lg');
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
  it('paints the primary gradient on the wrapper with a light separator', () => {
    render(
      <SplitButton open={false} theme="primary">
        Button
      </SplitButton>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveClass(
      'bg-[image:var(--gradient-primary-button)]',
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-white');
    expect(buttons[1]).toHaveClass('text-white');
    expect(screen.getByRole('separator')).toHaveClass('bg-white/30');
  });

  it('paints a white surface and grayscale border for the default theme', () => {
    render(
      <SplitButton open={false} theme="default">
        Button
      </SplitButton>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveClass(
      'bg-white',
      'border',
      'border-grayscale-300',
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-grayscale-800');
    expect(screen.getByRole('separator')).toHaveClass(
      'bg-grayscale-300',
    );
  });

  it('keeps the grayscale border for large default buttons', () => {
    render(
      <SplitButton open={false} size="lg" theme="default">
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('group')).toHaveClass(
      'bg-white',
      'border',
      'border-grayscale-300',
      'shadow-base',
    );
  });

  it('puts the large primary shadow on the wrapper and resets child button surfaces', () => {
    render(
      <SplitButton open={false} size="lg" theme="primary">
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('group')).toHaveClass(
      'shadow-button-primary',
      '[&>[data-slot=button]]:shadow-none!',
      '[&>[data-slot=button]:active]:shadow-none!',
    );
  });

  it('dims the wrapper when disabled', () => {
    render(
      <SplitButton open={false} disabled>
        Button
      </SplitButton>,
    );
    expect(screen.getByRole('group')).toHaveClass('opacity-60');
  });

  it('defaults to the default theme with a separator', () => {
    render(<SplitButton open={false}>Button</SplitButton>);
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass('bg-white');
  });

  it('paints a white surface for the dangerous theme', () => {
    render(
      <SplitButton open={false} theme="dangerous">
        Delete
      </SplitButton>,
    );
    expect(screen.getByRole('group')).toHaveClass(
      'bg-white',
      'border',
      'border-grayscale-300',
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-destructive-500');
    expect(buttons[1]).toHaveClass('text-destructive-500');
  });

  it.each([
    ['success', 'bg-success-500'],
    ['info', 'bg-info-500'],
    ['warning', 'bg-warning-500'],
    ['alarm', 'bg-destructive-500'],
  ] as const)(
    'paints the %s solid surface with a light separator',
    (theme, surfaceClass) => {
      render(
        <SplitButton open={false} theme={theme}>
          Button
        </SplitButton>,
      );
      expect(screen.getByRole('group')).toHaveClass(surfaceClass);
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveClass('text-white');
      expect(buttons[1]).toHaveClass('text-white');
      expect(screen.getByRole('separator')).toHaveClass(
        'bg-white/30',
      );
    },
  );
});
