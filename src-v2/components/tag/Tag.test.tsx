import { FlagIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Tag } from './Tag';

it('renders a tag', () => {
  render(<Tag>Tag</Tag>);
  expect(screen.getByRole('option')).toBeInTheDocument();
  expect(screen.getByText('Tag')).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Tag' }),
  ).not.toBeInTheDocument();
});

it('renders a tag with an icon', () => {
  render(<Tag icon={<FlagIcon data-testid="tag-icon" />}>Tag</Tag>);
  expect(screen.getByText('Tag')).toBeInTheDocument();
  expect(screen.getByTestId('tag-icon')).toBeInTheDocument();
});

it('renders a removable tag', () => {
  const props = {
    removable: true,
  };
  render(<Tag {...props}>Tag</Tag>);
  const removeButton = screen.getByLabelText('Remove');
  expect(screen.getByText('Tag')).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
});

it('renders a selected tag', () => {
  const props = {
    selected: true,
  };
  render(<Tag {...props}>Tag</Tag>);
  const tag = screen.getByRole('option');
  expect(tag).toBeInTheDocument();
  expect(tag).toHaveAttribute('aria-selected', 'true');
});

it('calls the onClick callback when clicked', async () => {
  const props = {
    onClick: vi.fn(),
  };
  render(<Tag {...props}>Tag</Tag>);
  const tagContent = screen.getByRole('button', { name: 'Tag' });
  expect(tagContent).toBeInTheDocument();
  await userEvent.click(tagContent);
  expect(props.onClick).toBeCalled();
});

it('calls the onRemove callback when remove button clicked', async () => {
  const props = {
    removable: true,
    onRemove: vi.fn(),
  };
  render(<Tag {...props}>Tag</Tag>);
  const removeButton = screen.getByLabelText('Remove');
  expect(screen.getByText('Tag')).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
  await userEvent.click(removeButton);
  expect(props.onRemove).toBeCalled();
});

it('does not call the onClick callback when remove button clicked', async () => {
  const props = {
    removable: true,
    onRemove: vi.fn(),
    onClick: vi.fn(),
  };
  render(<Tag {...props}>Tag</Tag>);
  const removeButton = screen.getByLabelText('Remove');
  expect(
    screen.getByRole('button', { name: 'Tag' }),
  ).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
  await userEvent.click(removeButton);
  expect(props.onRemove).toBeCalled();
  expect(props.onClick).not.toBeCalled();
});

it('applies custom class names and styles', () => {
  const props = {
    className: 'custom-class-1 custom-class-2',
    style: {
      color: '#FED655',
      backgroundColor: '#655FED',
    },
  };
  render(<Tag {...props}>Tag</Tag>);
  const tag = screen.getByRole('option');
  expect(tag).toBeInTheDocument();
  expect(tag).toHaveClass(props.className);
  expect(tag).toHaveStyle(props.style);
});
