import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Avatar from './Avatar';

// Mock Radix Avatar components (Root/Image/Fallback)
vi.mock('@radix-ui/react-avatar', () => ({
  Root: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
  }) => <div {...props}>{children}</div>,
  Image: ({
    src,
    alt,
    onLoadingStatusChange,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (
      status: 'idle' | 'loading' | 'loaded' | 'error',
    ) => void;
  }) => {
    // Simulate Radix's loading status callback immediately for testing
    onLoadingStatusChange?.('loaded');
    return <img src={src} alt={alt} {...props} />;
  },
  Fallback: ({
    children,
  }: {
    children?: React.ReactNode;
    delayMs?: number;
  }) => <div>{children}</div>,
}));

describe('Avatar', () => {
  it('should render default Avatar', () => {
    render(<Avatar />);
    const avatarImage = screen.getByRole('img', { name: 'Avatar' });
    expect(avatarImage).toBeInTheDocument();
  });

  it('should use custom alt text', () => {
    render(<Avatar alt="自定義頭像" />);
    const avatarImage = screen.getByRole('img', {
      name: '自定義頭像',
    });
    expect(avatarImage).toBeInTheDocument();
  });

  it('should use custom image source', () => {
    const customSrc = 'https://example.com/custom-avatar.jpg';
    render(<Avatar src={customSrc} alt="自定義頭像" />);
    const avatarImage = screen.getByRole('img', {
      name: '自定義頭像',
    });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', customSrc);
  });

  it('should apply custom styles', () => {
    const customStyle = { border: '2px solid red' };
    render(<Avatar style={customStyle} />);
    const avatarImage = screen.getByRole('img', { name: 'Avatar' });
    expect(avatarImage).toBeInTheDocument();
  });

  it('should call onClick when avatar is clicked', () => {
    const handleClick = vi.fn();
    render(<Avatar onClick={handleClick} />);
    const avatarImage = screen.getByRole('img', { name: 'Avatar' });
    fireEvent.click(avatarImage);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('Disabled state', () => {
    it('should display disabled icon when disabled', () => {
      const { container } = render(<Avatar disabled />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const disabledSvg = container.querySelector(
        'svg[viewBox="0 0 42 42"]',
      );
      expect(disabledSvg).toBeInTheDocument();
    });

    it('should not display disabled icon when not disabled', () => {
      const { container } = render(<Avatar disabled={false} />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const disabledSvg = container.querySelector(
        'svg[viewBox="0 0 42 42"]',
      );
      expect(disabledSvg).not.toBeInTheDocument();
    });
  });

  describe('Fallback rendering', () => {
    it('should render custom fallback node when provided', () => {
      render(
        <Avatar
          fallback={<span data-testid="custom-fallback">FB</span>}
        />,
      );
      const fb = screen.getByTestId('custom-fallback');
      expect(fb).toBeInTheDocument();
    });

    it('should render name as fallback when provided and no custom fallback', () => {
      render(<Avatar name="A B" alt="頭像" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('should render first letter when name is single word', () => {
      render(<Avatar name="John" alt="頭像" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should format name correctly for multiple words', () => {
      render(<Avatar name="John Doe" alt="頭像" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should format name correctly for three or more words', () => {
      render(<Avatar name="John Doe Smith" alt="頭像" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render UserIcon when no name or custom fallback', () => {
      const { container } = render(<Avatar alt="avatar" />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const userIcon = container.querySelector(
        'svg[viewBox="0 0 448 512"]',
      );
      expect(userIcon).toBeInTheDocument();
    });
  });

  describe('Loading status callback', () => {
    it('should call onLoadingStatusChange when image status changes', () => {
      const handleStatus = vi.fn();
      render(<Avatar onLoadingStatusChange={handleStatus} />);
      expect(handleStatus).toHaveBeenCalledWith('loaded');
    });
  });

  describe('Combination tests', () => {
    it('should support custom image and disabled state together', () => {
      const customSrc = 'https://example.com/custom-avatar.jpg';
      const { container } = render(
        <Avatar
          src={customSrc}
          alt="自定義頭像"
          disabled
          size="lg"
        />,
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const disabledSvg = container.querySelector(
        'svg[viewBox="0 0 42 42"]',
      );
      expect(disabledSvg).toBeInTheDocument();

      const avatarImage = screen.getByRole('img', {
        name: '自定義頭像',
      });
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', customSrc);
    });
  });

  describe('Accessibility', () => {
    it('should render Avatar component', () => {
      render(<Avatar alt="使用者頭像" />);
      const avatarImage = screen.getByRole('img', {
        name: '使用者頭像',
      });
      expect(avatarImage).toBeInTheDocument();
    });

    it('should render disabled icon when disabled', () => {
      const { container } = render(
        <Avatar disabled alt="已禁用的頭像" />,
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const disabledSvg = container.querySelector(
        'svg[viewBox="0 0 42 42"]',
      );
      expect(disabledSvg).toBeInTheDocument();
    });
  });
});
