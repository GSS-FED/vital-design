import { CSSProperties, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import masks from '../../../constants/mask';

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
  $hasOverflow: boolean;
  $isScrollAtTop?: boolean;
  $isScrollAtBottom?: boolean;
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

  const hasOverflow = height
    ? items.length * ITEM_HEIGHT > height
    : false;

  const isScrollAtTop = scrollInfo.scrollTop === 0;
  const isScrollAtBottom = (() => {
    if (hasOverflow && !scrollInfo.scrollHeight) {
      return false;
    }
    return (
      scrollInfo.scrollHeight - scrollInfo.scrollTop ===
      scrollInfo.clientHeight
    );
  })();

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget;
    setScrollInfo({
      scrollTop,
      scrollHeight,
      clientHeight,
    });
  };

  return (
    <ListWrapper style={style} className={className} $width={width}>
      <Mask
        onScroll={handleScroll}
        $hasOverflow={hasOverflow}
        $isScrollAtTop={isScrollAtTop}
        $isScrollAtBottom={isScrollAtBottom}
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

  ${({ $hasOverflow }) =>
    $hasOverflow &&
    css`
      mask-image: ${masks.FULL_MASK};
    `}

  ${({ $isScrollAtTop, $hasOverflow }) =>
    $isScrollAtTop &&
    $hasOverflow &&
    css`
      mask-image: ${masks.HIDE_TOP_MASK};
    `}

  ${({ $isScrollAtBottom, $hasOverflow }) =>
    $isScrollAtBottom &&
    $hasOverflow &&
    css`
      mask-image: ${masks.HIDE_BOTTOM_MASK};
    `};
`;
