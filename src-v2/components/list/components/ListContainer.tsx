import masks from '@/constants/mask';
import { cn } from '@/utils/cn';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, UIEvent } from 'react';

const ITEM_HEIGHT = 32;

export type ListContainerProps = {
  items: Option[];
  style?: CSSProperties;
  className?: string;
  width?: string;
  height?: number;
  children?: ReactNode;
};

export type Option = {
  id: string | number;
  displayName: string;
  disabled?: boolean;
};

export function ListContainer(props: ListContainerProps) {
  const {
    items = [],
    style,
    className,
    width,
    height,
    children,
  } = props;
  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });
  const maskRef = useRef<HTMLDivElement | null>(null);

  const hasOverflow = useMemo(
    () => (height ? items.length * ITEM_HEIGHT > height : false),
    [items.length, height],
  );

  const maskImage = useMemo(() => {
    if (!hasOverflow) return undefined;

    // 某些瀏覽器的 scroll 有緩衝
    const isScrollAtTop = scrollInfo.scrollTop <= 0;
    const isScrollAtBottom =
      scrollInfo.scrollHeight > 0 &&
      Math.abs(scrollInfo.scrollTop + scrollInfo.clientHeight) >=
        scrollInfo.scrollHeight;

    if (isScrollAtTop) return masks.HIDE_TOP_MASK;
    if (isScrollAtBottom) return masks.HIDE_BOTTOM_MASK;
    return masks.FULL_MASK;
  }, [
    hasOverflow,
    scrollInfo.scrollTop,
    scrollInfo.scrollHeight,
    scrollInfo.clientHeight,
  ]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget;

    setScrollInfo({ scrollTop, scrollHeight, clientHeight });
  };

  // 當 items 改變時（例如搜尋結果改變），重置滾動位置到頂部
  useEffect(() => {
    if (maskRef.current) {
      // 重置滾動位置到頂部
      maskRef.current.scrollTop = 0;

      // 更新滾動資訊狀態
      const { scrollHeight, clientHeight } = maskRef.current;
      setScrollInfo({
        scrollTop: 0,
        scrollHeight,
        clientHeight,
      });
    }
  }, [items]);

  return (
    <div
      style={{ width: width ?? '100%', ...style }}
      className={cn('min-w-30 overflow-auto py-2', className)}
    >
      <div
        ref={maskRef}
        onScroll={handleScroll}
        className={cn(
          'overflow-auto scrollbar-none',
          '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        )}
        style={{
          height: height ? `${height}px` : undefined,
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <ul className="py-2 m-0 list-none">{children}</ul>
      </div>
    </div>
  );
}

// Export for backward compatibility
export const ListWrapper = ({
  $width,
  children,
  style,
  className,
}: {
  $width?: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    style={{ width: $width ?? '100%', ...style }}
    className={cn('min-w-30 overflow-auto py-2', className)}
  >
    {children}
  </div>
);

export const List = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <ul className={cn('py-2 m-0 list-none', className)}>{children}</ul>
);

export const MaskComponent = ({
  $maskImage,
  $height,
  children,
  onScroll,
  className,
}: {
  $maskImage?: string;
  $height?: number;
  children: ReactNode;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  className?: string;
}) => (
  <div
    onScroll={onScroll}
    className={cn(
      'overflow-auto scrollbar-none',
      '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
      className,
    )}
    style={{
      height: $height ? `${$height}px` : undefined,
      maskImage: $maskImage,
      WebkitMaskImage: $maskImage,
    }}
  >
    {children}
  </div>
);

// Backward compatible export alias
export { MaskComponent as Mask };
