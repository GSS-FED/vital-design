import { Spinner } from '@/components/spinner/Spinner';
import { FlagIcon } from '@/icons/FlagIcon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

const filledThemeCases = [
  ['primary', 'bg-[image:var(--gradient-primary-button)]'],
  ['default', 'bg-white'],
  ['success', 'bg-success-500'],
  ['info', 'bg-info-500'],
  ['warning', 'bg-warning-500'],
  ['alarm', 'bg-alarm-500'],
  ['dangerous', 'text-alarm-500'],
] as const;

const textThemeCases = [
  ['primary', 'text-primary-500'],
  ['default', 'text-grayscale-800'],
  ['success', 'text-success-500'],
  ['info', 'text-info-500'],
  ['warning', 'text-warning-500'],
  ['alarm', 'text-alarm-500'],
] as const;

describe('Button', () => {
  it('renders the default filled button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveAttribute('data-variant', 'filled');
    expect(button).toHaveAttribute('data-size', 'md');
    expect(button).toHaveClass(
      'bg-[image:var(--gradient-primary-button)]',
    );
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Button</Button>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<Button onClick={mockOnClick}>Click me</Button>);

    await user.click(
      screen.getByRole('button', { name: 'Click me' }),
    );
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <Button disabled onClick={mockOnClick}>
        Button
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    await user.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('is not HTML-disabled when focusableWhenDisabled is true', () => {
    render(
      <Button disabled focusableWhenDisabled>
        Button
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onClick when focusableWhenDisabled is disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <Button disabled focusableWhenDisabled onClick={mockOnClick}>
        Button
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('renders the text variant with the default text theme', () => {
    render(<Button variant="text">Text Button</Button>);
    const button = screen.getByRole('button', {
      name: 'Text Button',
    });

    expect(button).toHaveAttribute('data-variant', 'text');
    expect(button).toHaveClass('text-grayscale-800');
  });

  it.each(filledThemeCases)(
    'renders the filled %s theme',
    (theme, expectedClass) => {
      render(<Button theme={theme}>Button</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    },
  );

  it.each(textThemeCases)(
    'renders the text %s theme',
    (theme, expectedClass) => {
      render(
        <Button variant="text" theme={theme}>
          Button
        </Button>,
      );

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    },
  );

  it('uses v0 side padding for a start icon', () => {
    render(
      <Button>
        <FlagIcon data-icon="inline-start" data-testid="start-icon" />
        New Branch
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'New Branch' });
    const icon = screen.getByTestId('start-icon');

    expect(icon).toBeInTheDocument();
    expect(button).toHaveClass(
      'px-4',
      'has-[_[data-icon=inline-start]]:pl-3',
    );
    expect(button).toHaveClass('has-[_[data-icon=inline-end]]:pr-3');
  });

  it('uses v0 side padding for an end icon', () => {
    render(
      <Button>
        Download
        <FlagIcon data-icon="inline-end" data-testid="end-icon" />
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Download' });
    const icon = screen.getByTestId('end-icon');

    expect(icon).toBeInTheDocument();
    expect(button).toHaveClass(
      'px-4',
      'has-[_[data-icon=inline-end]]:pr-3',
    );
    expect(button).toHaveClass(
      'has-[_[data-icon=inline-start]]:pl-3',
    );
  });

  it('supports icon-only buttons with icon size variants', () => {
    render(
      <Button aria-label="Next" size="icon-md">
        <FlagIcon data-icon="inline-end" data-testid="end-icon" />
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Next' });

    expect(button).toHaveAttribute('data-size', 'icon-md');
    expect(button).toHaveClass('h-[30px]', 'px-3');
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('uses md bordered theme styles for icon-md buttons', () => {
    render(
      <Button aria-label="Clear" size="icon-md" theme="default">
        <FlagIcon data-icon="inline-end" />
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Clear' })).toHaveClass(
      'border',
      'border-grayscale-300',
    );
  });

  it('scales icon-only button icons with large icon size', () => {
    render(
      <Button aria-label="Next" size="icon-lg">
        <FlagIcon data-icon="inline-end" data-testid="end-icon" />
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Next' });

    expect(button).toHaveAttribute('data-size', 'icon-lg');
    expect(button).toHaveClass(
      'h-8',
      'px-3',
      'data-[size=icon-lg]:[&_[data-icon]]:size-3.5',
    );
  });

  it('uses lg shadow styles for icon-lg buttons', () => {
    render(
      <>
        <Button aria-label="Search" size="icon-lg" theme="primary">
          <FlagIcon data-icon="inline-end" />
        </Button>
        <Button aria-label="Clear" size="icon-lg" theme="default">
          <FlagIcon data-icon="inline-end" />
        </Button>
      </>,
    );

    expect(
      screen.getByRole('button', { name: 'Search' }),
    ).toHaveClass(
      'shadow-button-primary',
      'active:not-disabled:not-data-[disabled]:shadow-button-primary-active',
    );
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveClass(
      'shadow-base',
      'active:not-disabled:not-data-[disabled]:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
    );
  });

  it('uses spinner children for loading state', () => {
    render(
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>,
    );
    const button = screen.getByRole('button', { name: /saving/i });

    expect(button).toBeDisabled();
    expect(
      screen.getByRole('status', { name: 'Loading' }),
    ).toHaveAttribute('data-icon', 'inline-start');
    expect(button).toHaveClass('[&_[data-icon]]:size-3');
  });

  it('applies custom className and styles', () => {
    render(
      <Button
        className="custom-class"
        style={{ backgroundColor: 'red' }}
      >
        Button
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('does not expose raw CVA helpers through the component API', async () => {
    const buttonModule = await import('./Button');

    expect(buttonModule).not.toHaveProperty('buttonVariants');
  });
});
