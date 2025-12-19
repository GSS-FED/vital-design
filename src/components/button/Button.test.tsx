import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  FILLED_THEME_COLOR,
  TEXT_THEME_COLOR,
} from 'src/components/button/styles';
import Button from './Button';

describe('Filled Button', () => {
  describe('Basic Functionality', () => {
    it('defaults to filled variant', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });

      await user.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
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

      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('does not show data-loading when disabled but not loading', () => {
      render(<Button disabled>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).not.toHaveAttribute('data-loading', 'true');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<Button style={customStyle}>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
  });

  describe('Theme', () => {
    it('renders with primary theme and correct colors', () => {
      const theme = 'primary';
      render(<Button theme={theme}>Primary Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with default theme and correct colors', () => {
      const theme = 'default';
      render(<Button theme={theme}>Default Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with success theme and correct colors', () => {
      const theme = 'success';
      render(<Button theme={theme}>Success Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with info theme and correct colors', () => {
      const theme = 'info';
      render(<Button theme={theme}>Info Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with warning theme and correct colors', () => {
      const theme = 'warning';
      render(<Button theme={theme}>Warning Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with alarm theme and correct colors', () => {
      const theme = 'alarm';
      render(<Button theme={theme}>Alarm Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });

    it('renders with dangerous theme and correct colors', () => {
      const theme = 'dangerous';
      render(<Button theme={theme}>Dangerous Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
      expect(button).toHaveStyle({
        color: FILLED_THEME_COLOR[theme].color.default,
        background: FILLED_THEME_COLOR[theme].background.default,
      });
    });
  });

  describe('Loading State', () => {
    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <Button isLoading onClick={mockOnClick}>
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-loading', 'true');

      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading and disabled', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <Button isLoading disabled onClick={mockOnClick}>
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toBeDisabled();

      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('hides children when loading', () => {
      render(<Button isLoading>Button Text</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveTextContent('Button Text');
    });

    it('shows SpinnerIcon when loading', () => {
      render(<Button isLoading>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-loading', 'true');
      // eslint-disable-next-line testing-library/no-node-access
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});

describe('Text Button', () => {
  describe('Basic Functionality', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <Button variant="text" onClick={mockOnClick}>
          Text Button
        </Button>,
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
      render(
        <Button variant="text" disabled>
          Text Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-variant', 'text');
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <Button variant="text" disabled onClick={mockOnClick}>
          Text Button
        </Button>,
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('renders with custom className', () => {
      render(
        <Button variant="text" className="custom-class">
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red' };
      render(
        <Button variant="text" style={customStyle}>
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
  });

  describe('Theme', () => {
    it('renders with primary theme and correct colors', () => {
      const theme = 'primary';
      render(
        <Button variant="text" theme={theme}>
          Primary Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });

    it('renders with default theme and correct colors', () => {
      const theme = 'default';
      render(
        <Button variant="text" theme={theme}>
          Default Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });

    it('renders with success theme and correct colors', () => {
      const theme = 'success';
      render(
        <Button variant="text" theme={theme}>
          Success Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });

    it('renders with info theme and correct colors', () => {
      const theme = 'info';
      render(
        <Button variant="text" theme={theme}>
          Info Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });

    it('renders with warning theme and correct colors', () => {
      const theme = 'warning';
      render(
        <Button variant="text" theme={theme}>
          Warning Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });

    it('renders with alarm theme and correct colors', () => {
      const theme = 'alarm';
      render(
        <Button variant="text" theme={theme}>
          Alarm Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveStyle({
        color: TEXT_THEME_COLOR[theme].color.default,
      });
    });
  });

  describe('Loading State', () => {
    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <Button variant="text" isLoading onClick={mockOnClick}>
          Text Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-loading', 'true');

      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('hides children when loading', () => {
      render(
        <Button variant="text" isLoading>
          Button Text
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).not.toHaveTextContent('Button Text');
    });

    it('shows SpinnerIcon when loading', () => {
      render(
        <Button variant="text" isLoading>
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-loading', 'true');
      // eslint-disable-next-line testing-library/no-node-access
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
