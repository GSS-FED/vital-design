import { useRef } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { styles } from 'src/constants';
import colors from 'src/constants/colors';
import { SearchIcon } from 'src/icons';

export type SearchBarProps = {
  placeholder: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  isSearchIconClickable?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  width?: string;
  className?: string;
  style?: CSSProperties;
};

type SearchBarWrapperProps = {
  $width?: string;
  $disabled?: boolean;
  $isSearchIconClickable?: boolean;
};

export default function SearchBar(props: SearchBarProps) {
  const {
    placeholder,
    onSearch,
    isSearchIconClickable,
    onChange,
    disabled = false,
    defaultValue,
    className,
    style,
    width,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!disabled && inputRef.current) {
      const value = inputRef.current.value;
      onSearch?.(value);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange?.(event.target.value);
  };

  const handleSearchIconClick = () => {
    if (isSearchIconClickable) {
      handleSearch();
    }
  };

  return (
    <SearchBarWrapper
      $width={width}
      $disabled={disabled}
      $isSearchIconClickable={isSearchIconClickable}
      className={className}
      style={style}
    >
      <SearchIconBox onClick={handleSearchIconClick}>
        <SearchIcon width={18} height={18} />
      </SearchIconBox>

      <SearchInput
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
      />
    </SearchBarWrapper>
  );
}

SearchBar.displayName = 'SearchBar';

const SearchIconBox = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  all: unset;
  ${styles.boxSizing}
  ${styles.typography}
  flex:1;
  max-width: calc(100% - 18px);
  margin: 0 16px 0 8px;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &::placeholder {
    ${styles.typography}
    color: ${colors.grayscale400};
  }
`;

const SearchBarWrapper = styled.div<SearchBarWrapperProps>`
  ${styles.boxSizing}
  ${styles.typography}
  
  width: ${({ $width }) => $width ?? '100%'};
  display: flex;
  align-items: center;
  padding: 6px 16px 6px 8px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 20px;
  background-color: ${({ $disabled }) =>
    $disabled ? colors.grayscale200 : colors.white};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ $disabled }) =>
      $disabled ? colors.grayscale300 : colors.grayscale500};
  }

  &:focus-within {
    border-color: ${colors.primary500};

    ${SearchIconBox} {
      svg {
        fill: ${colors.primary500};
      }
    }
  }

  ${SearchIconBox} {
    svg {
      transition: all 0.2s;
      fill: ${({ $disabled }) =>
        $disabled ? colors.grayscale300 : colors.grayscale500};
    }

    &:hover {
      cursor: ${({ $disabled, $isSearchIconClickable }) =>
        !$isSearchIconClickable || $disabled ? 'default' : 'pointer'};
    }
  }

  ${SearchInput} {
    color: ${({ $disabled }) => $disabled && colors.grayscale500};
  }
`;
