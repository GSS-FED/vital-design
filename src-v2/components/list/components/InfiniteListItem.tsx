import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { ListItem } from './ListItem';

type BaseItem = {
  id: string | number;
  displayName: string;
  disabled?: boolean;
};

export type InfiniteListItemProps<T extends BaseItem> = {
  index: number;
  isItemLoaded: (index: number) => boolean;
  setRowHeight: (index: number, size: number) => void;
  item: T | undefined;
  listItem: (item: T) => JSX.Element;
};

export const InfiniteListItem = <T extends BaseItem>({
  index,
  isItemLoaded,
  setRowHeight,
  listItem,
  item,
}: InfiniteListItemProps<T>) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(index, rowRef.current.clientHeight);
    }
  }, [index, rowRef, setRowHeight]);

  if (!isItemLoaded(index)) {
    return (
      <ListItem className="justify-center text-grayscale-300">
        <SpinnerIcon width={18} height={18} />
      </ListItem>
    );
  }

  return <div ref={rowRef}>{item && listItem(item)}</div>;
};
