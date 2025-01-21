import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { SearchBar } from '../../..';
import { colors, shadows } from '../../../constants';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import InfiniteList from '../components/InfiniteList';
import { ListItem } from '../components/ListItem';

type BaseItem = {
  id: string | number;
  displayName: string;
};

export type ActionInfiniteListProps<T extends BaseItem> = {
  onSearchTermChange: (value: string) => void;
  onSelect: (item: T) => void;
  hasNextPage: boolean;
  items: T[] | undefined;
  loadNextPage: () => void | Promise<void>;
  noMatchingResultsText: string;
  isLoading: boolean;
  skeleton: ReactNode;
  listHeight: number;
  onSearch?: (value: string) => void;
  width?: string;
  placeholder?: string;
  hasSearchBar?: boolean;
  className?: string;
  style?: CSSProperties;
  infiniteListStyle?: CSSProperties;
  infiniteListClassName?: string;
  searchBarStyle?: CSSProperties;
  searchBarClassName?: string;
  listItemIcon?: (item: T) => JSX.Element;
};

export default function ActionInfiniteList<T extends BaseItem>(
  props: ActionInfiniteListProps<T>,
) {
  const {
    onSearchTermChange,
    onSearch,
    onSelect,
    loadNextPage,
    hasNextPage,
    items,
    placeholder = '',
    width,
    listHeight,
    style,
    className,
    infiniteListStyle,
    infiniteListClassName,
    searchBarStyle,
    searchBarClassName,
    hasSearchBar = true,
    noMatchingResultsText,
    isLoading,
    skeleton = <DefaultSkeleton />,
    listItemIcon,
  } = props;

  const handleOnChange = (value: string) => {
    onSearchTermChange(value);
  };

  const handleClick = (item: T) => {
    onSelect(item);
  };

  const renderItem = (item: T) => {
    return (
      <ListItem onClick={() => handleClick(item)}>
        {listItemIcon && listItemIcon(item)}
        <span>{item?.displayName}</span>
      </ListItem>
    );
  };

  return (
    <Container $width={width} style={style} className={className}>
      {hasSearchBar && (
        <SearchBarWrapper>
          <SearchBar
            placeholder={placeholder}
            onSearch={onSearch}
            onChange={handleOnChange}
            style={searchBarStyle}
            className={searchBarClassName}
          />
        </SearchBarWrapper>
      )}
      {isLoading && skeleton}
      {!isLoading && items && items.length > 0 && (
        <InfiniteList
          style={infiniteListStyle}
          className={infiniteListClassName}
          items={items}
          hasNextPage={hasNextPage}
          loadNextPage={loadNextPage}
          listHeight={listHeight}
          listItem={renderItem}
        />
      )}
      {!isLoading && items?.length === 0 && (
        <NoMatchingResultsText>
          {noMatchingResultsText}
        </NoMatchingResultsText>
      )}
    </Container>
  );
}

const DefaultSkeleton = () => {
  return (
    <DefaultSkeletonContainer>
      <SpinnerIcon
        width={18}
        height={18}
        fill={colors.grayscale300}
      />
    </DefaultSkeletonContainer>
  );
};

ActionInfiniteList.displayName = 'ActionInfiniteList';

const Container = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  $height: ${({ $height }) => $height ?? '100%'};
  box-shadow: ${shadows.EMPHASIS};
  background-color: ${colors.white};
  border-radius: 4px;
`;

const SearchBarWrapper = styled.div`
  padding: 12px 12px 0px 12px;
`;

const NoMatchingResultsText = styled.p`
  margin: 0;
  padding: 1.25rem;
  font-size: 14px;
  color: ${colors.grayscale500};
  text-align: center;
`;

const DefaultSkeletonContainer = styled.div`
  padding: 6px 20px;
  margin: 6px;
`;
