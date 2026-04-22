import masks from '@/constants/mask';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, UIEvent } from 'react';

type ScrollInfo = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};
export type MaskProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Mask({
  children,
  height,
  width,
  className,
  style,
}: MaskProps) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });
  const maskRef = useRef<HTMLDivElement>(null);

  const detectScrollAtTop = (info: ScrollInfo): boolean => {
    return info.scrollTop === 0;
  };

  const detectScrollAtBottom = (info: ScrollInfo): boolean => {
    return (
      Math.abs(
        info.scrollHeight - info.scrollTop - info.clientHeight,
      ) < 1
    );
  };

  // Check for overflow on mount and when content changes
  useEffect(() => {
    if (!maskRef.current) return;

    const detectOverflow = (element: HTMLElement): boolean => {
      return element.scrollHeight > element.clientHeight; // 10px threshold;
    };

    const checkOverflow = () => {
      if (maskRef.current) {
        const overflow = detectOverflow(maskRef.current);

        setHasOverflow(overflow);

        // Initialize scroll info
        const { scrollTop, scrollHeight, clientHeight } =
          maskRef.current;
        setScrollInfo({ scrollTop, scrollHeight, clientHeight });
      }
    };

    checkOverflow();

    // Use ResizeObserver to detect content changes
    const resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(maskRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget;
    const newScrollInfo = { scrollTop, scrollHeight, clientHeight };
    setScrollInfo(newScrollInfo);
  };

  const isScrollAtTop = detectScrollAtTop(scrollInfo);
  const isScrollAtBottom = detectScrollAtBottom(scrollInfo);

  // Determine mask-image based on scroll position
  const getMaskImage = (): string | undefined => {
    if (!hasOverflow) {
      return 'none';
    }

    if (isScrollAtTop) {
      return masks.HIDE_TOP_MASK;
    } else if (isScrollAtBottom) {
      return masks.HIDE_BOTTOM_MASK;
    } else {
      return masks.FULL_MASK;
    }
  };

  return (
    <div
      ref={maskRef}
      onScroll={handleScroll}
      className={cn(
        'overflow-auto',
        'scrollbar-none',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        maskImage: getMaskImage(),
        WebkitMaskImage: getMaskImage(),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
