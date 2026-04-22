import masks from '@/constants/mask';
import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';
import type { CSSProperties, JSX } from 'react';
import {
  type ListOnItemsRenderedProps,
  type ListOnScrollProps,
  VariableSizeList,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { InfiniteListItem } from './InfiniteListItem';

const DEFAULT_ITEM_HEIGHT = 32;

type BaseItem = {
  id: string | number;
  displayName: string;
  disabled?: boolean;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScrollRef = VariableSizeList<any> & {
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

  // Get the appropriate mask based on scroll position
  const getMaskImage = () => {
    if (isScrollAtTop) return masks.HIDE_TOP_MASK;
    if (isScrollAtBottom) return masks.HIDE_BOTTOM_MASK;
    return masks.FULL_MASK;
  };

  // List styles for hiding scrollbar and applying mask
  const listStyle: CSSProperties = {
    scrollbarWidth: 'none',
    backgroundColor: 'white',
    maskImage: getMaskImage(),
  };

  return (
    <div
      style={{
        ...infiniteListStyle,
        width: width ? `${width}px` : undefined,
      }}
      className={cn('min-w-30 py-2', className)}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadNextPage}
      >
        {({
          onItemsRendered,
          ref,
        }: {
          onItemsRendered: (props: ListOnItemsRenderedProps) => void;
          ref: (ref: VariableSizeList | null) => void;
        }) => (
          <VariableSizeList
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
            style={listStyle}
            className="[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent"
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
          </VariableSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}
