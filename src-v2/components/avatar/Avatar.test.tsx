import '@testing-library/jest-dom';

/* eslint-disable react/prop-types */
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  AvatarRoot,
} from './Avatar';

type LoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

vi.mock('@base-ui/react/avatar', () => ({
  Avatar: {
    Root: ({
      children,
      render: renderProp,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      children?: React.ReactNode;
      render?: React.ReactElement;
    }) => {
      if (React.isValidElement(renderProp)) {
        return React.cloneElement(renderProp, props, children);
      }

      return <span {...props}>{children}</span>;
    },
    Image: ({
      src,
      alt,
      onLoadingStatusChange,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & {
      onLoadingStatusChange?: (status: LoadingStatus) => void;
    }) => {
      onLoadingStatusChange?.('loaded');
      return <img src={src} alt={alt} {...props} />;
    },
    Fallback: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLSpanElement> & {
      children?: React.ReactNode;
      delay?: number;
    }) => <span {...props}>{children}</span>,
  },
}));

describe('Avatar', () => {
  it('renders the unified Avatar with default image alt text', () => {
    render(<Avatar />);

    expect(
      screen.getByRole('img', { name: 'Avatar' }),
    ).toBeInTheDocument();
  });

  it('uses custom alt text and image source', () => {
    const customSrc = 'https://example.com/custom-avatar.jpg';

    render(<Avatar src={customSrc} alt="自定義頭像" />);

    const avatarImage = screen.getByRole('img', {
      name: '自定義頭像',
    });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', customSrc);
  });

  it('passes className, style, and data attributes to the root', () => {
    render(
      <Avatar
        data-testid="avatar"
        className="custom-avatar"
        style={{ border: '2px solid red' }}
      />,
    );

    const root = screen.getByTestId('avatar');
    expect(root).toHaveAttribute('data-slot', 'avatar');
    expect(root).toHaveClass('custom-avatar');
    expect(root).toHaveStyle({ border: '2px solid red' });
  });

  it('renders a button root and calls onClick when clickable', () => {
    const handleClick = vi.fn();

    render(<Avatar data-testid="avatar" onClick={handleClick} />);

    const root = screen.getByTestId('avatar');
    expect(root.tagName).toBe('BUTTON');

    fireEvent.click(root);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('suppresses onClick when disabled', () => {
    const handleClick = vi.fn();

    render(
      <Avatar data-testid="avatar" disabled onClick={handleClick} />,
    );

    const root = screen.getByTestId('avatar');
    fireEvent.click(root);

    expect(handleClick).not.toHaveBeenCalled();
    expect(root).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders the disabled overlay when disabled', () => {
    const { container } = render(<Avatar disabled />);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(
        '[data-slot="avatar-disabled-overlay"]',
      ),
    ).toBeInTheDocument();
  });

  it('does not render the disabled overlay when enabled', () => {
    const { container } = render(<Avatar disabled={false} />);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(
        '[data-slot="avatar-disabled-overlay"]',
      ),
    ).not.toBeInTheDocument();
  });

  it('renders custom fallback node when provided', () => {
    render(
      <Avatar
        fallback={<span data-testid="custom-fallback">FB</span>}
      />,
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });

  it('renders initials from the first two name words', () => {
    render(<Avatar name="John Doe Smith" alt="頭像" />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('trims extra spaces when building initials', () => {
    render(<Avatar name="  John   Doe  " alt="頭像" />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders one initial for a single word name', () => {
    render(<Avatar name="John" alt="頭像" />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders UserIcon when no name or custom fallback is provided', () => {
    const { container } = render(<Avatar alt="avatar" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- data-slot is the documented styling hook; structural assertion is intentional
    const placeholder = container.querySelector(
      '[data-slot="avatar-placeholder-icon"]',
    );
    expect(placeholder).toBeInTheDocument();
    expect(placeholder?.tagName.toLowerCase()).toBe('svg');
  });

  it('calls onLoadingStatusChange when image status changes', () => {
    const handleStatus = vi.fn();

    render(<Avatar onLoadingStatusChange={handleStatus} />);

    expect(handleStatus).toHaveBeenCalledWith('loaded');
  });

  it('exports AvatarRoot, AvatarImage, and AvatarFallback as parts', () => {
    render(
      <AvatarRoot data-testid="avatar-root" color="blue" size="lg">
        <AvatarImage
          src="https://example.com/a.jpg"
          alt="Arthur Lu"
        />
        <AvatarFallback color="blue">AL</AvatarFallback>
      </AvatarRoot>,
    );

    expect(screen.getByTestId('avatar-root')).toHaveAttribute(
      'data-slot',
      'avatar',
    );
    expect(screen.getByTestId('avatar-root')).toHaveAttribute(
      'data-size',
      'lg',
    );
    expect(screen.getByTestId('avatar-root')).toHaveAttribute(
      'data-color',
      'blue',
    );
    expect(
      screen.getByRole('img', { name: 'Arthur Lu' }),
    ).toHaveAttribute('data-slot', 'avatar-image');
    expect(screen.getByText('AL')).toHaveAttribute(
      'data-slot',
      'avatar-fallback',
    );
  });

  it('renders AvatarGroup and count with Vital avatar sizing hooks', () => {
    const { container } = render(
      <AvatarGroup data-testid="avatar-group">
        <Avatar name="Arthur Lu" size="xl" />
        <AvatarGroupCount data-testid="avatar-group-count">
          +2
        </AvatarGroupCount>
      </AvatarGroup>,
    );

    expect(screen.getByTestId('avatar-group')).toHaveAttribute(
      'data-slot',
      'avatar-group',
    );
    expect(screen.getByTestId('avatar-group-count')).toHaveAttribute(
      'data-slot',
      'avatar-group-count',
    );
    expect(screen.getByTestId('avatar-group-count')).toHaveClass(
      'size-10',
      'border-border',
      'bg-background',
      'text-grayscale-opacity-700',
      'group-has-data-[size=xl]/avatar-group:size-[60px]',
    );
    expect(screen.getByTestId('avatar-group')).toHaveClass(
      '*:data-[color=default]:bg-background',
    );
    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[data-slot="avatar"][data-size="xl"]'),
    ).toBeInTheDocument();
  });
});
