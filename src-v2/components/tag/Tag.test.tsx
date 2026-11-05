import { FlagIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Tag } from './Tag';

it('renders a tag', () => {
  render(<Tag>Tag</Tag>);
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
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

it('exposes selection on the action button only when selected is set', () => {
  const onClick = vi.fn();
  const { rerender } = render(<Tag onClick={onClick}>Tag</Tag>);
  const action = screen.getByRole('button', { name: 'Tag' });
  expect(action).not.toHaveAttribute('aria-pressed');

  rerender(
    <Tag onClick={onClick} selected>
      Tag
    </Tag>,
  );
  expect(action).toHaveAttribute('aria-pressed', 'true');

  rerender(
    <Tag onClick={onClick} selected={false}>
      Tag
    </Tag>,
  );
  expect(action).toHaveAttribute('aria-pressed', 'false');
});

it('renders a selected static tag without selection semantics', () => {
  const { container } = render(<Tag selected>Tag</Tag>);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const tag = container.querySelector('[data-slot="tag"]');
  expect(tag).toHaveClass('outline-primary-500');
  expect(tag).not.toHaveAttribute('role');
  expect(tag).not.toHaveAttribute('aria-selected');
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
  const { container } = render(<Tag {...props}>Tag</Tag>);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const tag = container.querySelector('[data-slot="tag"]');
  expect(tag).toBeInTheDocument();
  expect(tag).toHaveClass(props.className);
  expect(tag).toHaveStyle(props.style);
});
