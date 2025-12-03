import {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import masks from 'src/constants/mask';

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

type MaskProps = {
  $maskImage?: string;
  $height?: number;
};

export default function ListContainer(props: ListContainerProps) {
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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
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
    <ListWrapper style={style} className={className} $width={width}>
      <Mask
        ref={maskRef}
        onScroll={handleScroll}
        $maskImage={maskImage}
        $height={height}
      >
        <List>{children}</List>
      </Mask>
    </ListWrapper>
  );
}

export const ListWrapper = styled.div<{ $width?: string }>`
  min-width: 120px;
  width: ${({ $width }) => $width ?? '100%'};
  overflow: auto;
  padding: 8px 0;
`;

export const List = styled.ul`
  padding: 8px 0px;
  margin: 0;
  list-style-type: none;
`;

export const Mask = styled.div<MaskProps>`
  height: ${({ $height }) => ($height ? `${$height}px` : 'none')};
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  ${({ $maskImage }) =>
    $maskImage &&
    css`
      mask-image: ${$maskImage};
    `}
`;
