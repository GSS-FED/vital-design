import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SPLIT_THEME_COLOR } from 'src/components/button/styles';
import SplitButton from './SplitButton';

describe('Basic Functionality', () => {
  it('renders children correctly', () => {
    render(<SplitButton open={false}>Click me</SplitButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
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

describe('Theme', () => {
  it('renders with primary theme', () => {
    const theme = 'primary';
    render(
      <SplitButton open={false} theme={theme}>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    // eslint-disable-next-line testing-library/no-node-access
    const container = buttons[0]!.parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      color: SPLIT_THEME_COLOR[theme].color.default,
      background: SPLIT_THEME_COLOR[theme].background.default,
    });
  });

  it('renders with default theme', () => {
    const theme = 'default';
    render(
      <SplitButton open={false} theme={theme}>
        Button
      </SplitButton>,
    );
    const buttons = screen.getAllByRole('button');
    // eslint-disable-next-line testing-library/no-node-access
    const container = buttons[0]!.parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      color: SPLIT_THEME_COLOR[theme].color.default,
      background: SPLIT_THEME_COLOR[theme].background.default,
    });
  });

  it('defaults to default theme', () => {
    const theme = 'default';
    render(<SplitButton open={false}>Button</SplitButton>);
    const buttons = screen.getAllByRole('button');
    // eslint-disable-next-line testing-library/no-node-access
    const container = buttons[0]!.parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      color: SPLIT_THEME_COLOR[theme].color.default,
      background: SPLIT_THEME_COLOR[theme].background.default,
    });
  });
});
