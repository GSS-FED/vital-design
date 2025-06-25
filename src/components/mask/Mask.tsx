import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { masks } from 'src/constants';

type ScrollInfo = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};
type MaskProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
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

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget;
    const newScrollInfo = { scrollTop, scrollHeight, clientHeight };
    setScrollInfo(newScrollInfo);
  };

  const isScrollAtTop = detectScrollAtTop(scrollInfo);
  const isScrollAtBottom = detectScrollAtBottom(scrollInfo);

  return (
    <StyledMask
      ref={maskRef}
      $height={height}
      $width={width}
      onScroll={handleScroll}
      $hasOverflow={hasOverflow}
      $isScrollAtTop={isScrollAtTop}
      $isScrollAtBottom={isScrollAtBottom}
      className={className}
      style={style}
    >
      {children}
    </StyledMask>
  );
}

interface StyledMaskProps {
  $hasOverflow: boolean;
  $isScrollAtTop: boolean;
  $isScrollAtBottom: boolean;
  $height?: string;
  $width?: string;
}

const StyledMask = styled.div<StyledMaskProps>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $height }) => ($height ? $height : '100%')};
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  ${({ $hasOverflow, $isScrollAtTop, $isScrollAtBottom }) => {
    if (!$hasOverflow) {
      return css`
        mask-image: none;
      `;
    }

    if ($isScrollAtTop) {
      return css`
        mask-image: ${masks.HIDE_TOP_MASK};
      `;
    } else if ($isScrollAtBottom) {
      return css`
        mask-image: ${masks.HIDE_BOTTOM_MASK};
      `;
    } else {
      return css`
        mask-image: ${masks.FULL_MASK};
      `;
    }
  }}
`;
