import { useRef, useState } from 'react';
import { ListOnScrollProps, VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import styled, { CSSProperties, css } from 'styled-components';
import { colors } from '../../../constants';
import masks from '../../../constants/mask';
import { InfiniteListItem } from './InfiniteListItem';

const DEFAULT_ITEM_HEIGHT = 32;

type BaseItem = {
  id: string | number;
  displayName: string;
  disabled?: boolean;
};

type ListProps = {
  $isScrollAtTop?: boolean;
  $isScrollAtBottom?: boolean;
};

export type InfiniteListProps<T extends BaseItem> = {
  hasNextPage: boolean;
  isNextPageLoading?: boolean;
  items: T[];
  loadNextPage: () => void | Promise<void>;
  style?: CSSProperties;
  className?: string;
  width?: string;
  listHeight: number;
  listItem: (item: T) => JSX.Element;
};

export type InstanceState = {
  scrollOffset?: number;
};

export type ScrollRef = VariableSizeList<unknown> & {
  state?: InstanceState;
};

export default function InfiniteList<T extends BaseItem>(
  props: InfiniteListProps<T>,
) {
  const {
    hasNextPage,
    items,
    loadNextPage,
    style: infiniteListStyle,
    className,
    width,
    listHeight,
    listItem,
  } = props;

  const listRef = useRef<ScrollRef | null>(null);
  const rowHeights = useRef<Record<number, number>>({});
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    scrollHeight: 0,
  });

  ////// 無限滾動邏輯 //////
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < items.length;

  ////// 處理 mask-image 效果 //////
  const isScrollAtTop = scrollInfo.scrollHeight === 0;

  const handleScroll = (event: ListOnScrollProps) => {
    if (!listRef.current || !outerRef.current) return;

    setScrollInfo({
      scrollHeight: listRef.current.state.scrollOffset ?? 0,
    });

    // 判斷是否已經滑至底部
    if (
      event.scrollOffset + outerRef.current.offsetHeight ===
      outerRef.current.scrollHeight
    ) {
      setIsScrollAtBottom(true);
      return;
    }
    setIsScrollAtBottom(false);
  };

  //////  動態調整 ROW height //////
  const getRowHeight = (index: number): number => {
    return rowHeights.current[index] ?? DEFAULT_ITEM_HEIGHT;
  };

  const setRowHeight = (index: number, size: number) => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }
  };

  return (
    <ListWrapper
      style={infiniteListStyle}
      $width={width}
      className={className}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadNextPage}
      >
        {({ onItemsRendered, ref }) => (
          <List
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={(elem) => {
              ref(elem);
              listRef.current = elem;
            }}
            outerRef={outerRef}
            itemSize={getRowHeight}
            itemData={items}
            height={listHeight}
            width={'100%'}
            onScroll={handleScroll}
            $isScrollAtTop={isScrollAtTop}
            $isScrollAtBottom={isScrollAtBottom}
          >
            {({ index, style }) => (
              <div style={style}>
                <InfiniteListItem
                  index={index}
                  isItemLoaded={isItemLoaded}
                  setRowHeight={setRowHeight}
                  item={items[index]}
                  listItem={listItem}
                />
              </div>
            )}
          </List>
        )}
      </InfiniteLoader>
    </ListWrapper>
  );
}

const ListWrapper = styled.div<{ $width?: string; $height?: number }>`
  min-width: 120px;
  width: ${({ $width }) => ($width ? `${$width}px` : 'none')};
  padding: 8px 0;
`;

const List = styled(VariableSizeList)<ListProps>`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  background-color: ${colors.white};
  mask-image: ${masks.FULL_MASK};

  ${({ $isScrollAtTop }) =>
    $isScrollAtTop &&
    css`
      mask-image: ${masks.HIDE_TOP_MASK};
    `}

  ${({ $isScrollAtBottom }) =>
    $isScrollAtBottom &&
    css`
      mask-image: ${masks.HIDE_BOTTOM_MASK};
    `};
`;
