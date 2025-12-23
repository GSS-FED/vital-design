import { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import { Option } from 'src/components/list/components/ListContainer';
import ListContainer from 'src/components/list/components/ListContainer';
import { ListItem } from 'src/components/list/components/ListItem';
import SearchBar from 'src/components/search-bar/SearchBar';
import { colors, shadows } from 'src/constants';

const ITEM_HEIGHT = 32;

export type ActionListProps = {
  noMatchingResultsText: string;
  items: Option[];
  onSelect?: (value: string | number) => void;
  onSearchTermChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  hasSearchBar?: boolean;
  selectedItem?: string | number;
  width?: string;
  listHeight?: number;
  className?: string;
  style?: CSSProperties;
  listContainerStyle?: CSSProperties;
  listContainerClassName?: string;
  searchBarStyle?: CSSProperties;
  searchBarClassName?: string;
};

export default function ActionList(props: ActionListProps) {
  const {
    onSearchTermChange,
    onSelect,
    onSearch,
    noMatchingResultsText,
    items,
    placeholder = '',
    selectedItem,
    width,
    listHeight,
    style,
    className,
    listContainerStyle,
    listContainerClassName,
    searchBarStyle,
    searchBarClassName,
    hasSearchBar = true,
  } = props;

  const [searchKeyword, setSearchKeyword] = useState('');
  const filteredItems = items.filter((item) =>
    item.displayName
      .toLowerCase()
      .includes(searchKeyword.toLowerCase()),
  );

  const handleChange = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    setSearchKeyword(trimmedKeyword);
    onSearchTermChange?.(trimmedKeyword);
  };

  function handleSelect(value: string | number) {
    onSelect?.(value);
  }

  return (
    <Container $width={width} style={style} className={className}>
      {hasSearchBar && (
        <SearchBarWrapper>
          <SearchBar
            placeholder={placeholder}
            onSearch={onSearch}
            onChange={handleChange}
            style={searchBarStyle}
            className={searchBarClassName}
          />
        </SearchBarWrapper>
      )}

      <ListContainer
        items={filteredItems}
        height={listHeight}
        style={listContainerStyle}
        className={listContainerClassName}
      >
        {filteredItems?.length > 0 &&
          filteredItems.map((item) => (
            <ListItemWrapper key={item.id}>
              <ListItem
                $selected={selectedItem === item.id}
                $disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) {
                    return;
                  }
                  handleSelect(item.id);
                }}
              >
                {item.displayName}
              </ListItem>
            </ListItemWrapper>
          ))}
        {filteredItems?.length === 0 && (
          <NoMatchingResultsText>
            {noMatchingResultsText}
          </NoMatchingResultsText>
        )}
      </ListContainer>
    </Container>
  );
}

ActionList.displayName = 'ActionList';

const Container = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  box-shadow: ${shadows.EMPHASIS};
  border-radius: 4px;
`;

const ListItemWrapper = styled.div`
  content-visibility: auto;
  contain-intrinsic-size: ${ITEM_HEIGHT};
`;

const SearchBarWrapper = styled.div`
  padding: 12px 12px 0px 12px;
`;

const NoMatchingResultsText = styled.p`
  font-size: 14px;
  color: ${colors.grayscale500};
  text-align: center;
`;
