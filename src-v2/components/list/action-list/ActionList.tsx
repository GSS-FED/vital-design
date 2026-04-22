import type { Option } from '@/components/list/components/ListContainer';
import ListContainer from '@/components/list/components/ListContainer';
import { ListItem } from '@/components/list/components/ListItem';
import SearchBar from '@/components/search-bar/SearchBar';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import type { CSSProperties } from 'react';

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
    <div
      style={{ width: width ?? '100%', ...style }}
      className={cn('shadow-emphasis rounded', className)}
    >
      {hasSearchBar && (
        <div className="pt-3 px-3 pb-0">
          <SearchBar
            placeholder={placeholder}
            onSearch={onSearch}
            onChange={handleChange}
            style={searchBarStyle}
            className={searchBarClassName}
          />
        </div>
      )}

      <ListContainer
        items={filteredItems}
        height={listHeight}
        style={listContainerStyle}
        className={listContainerClassName}
      >
        {filteredItems?.length > 0 &&
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="content-visibility-auto"
              style={{ containIntrinsicSize: ITEM_HEIGHT }}
            >
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
            </div>
          ))}
        {filteredItems?.length === 0 && (
          <p className="text-sm text-grayscale-500 text-center">
            {noMatchingResultsText}
          </p>
        )}
      </ListContainer>
    </div>
  );
}

ActionList.displayName = 'ActionList';
