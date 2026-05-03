import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

const searchIconVariants = cva(
  [
    'flex items-center transition-all duration-200',
    '[&_svg]:transition-all [&_svg]:duration-200',
    'group-focus-within:[&_svg]:fill-primary-500',
  ],
  {
    variants: {
      disabled: {
        true: '[&_svg]:fill-grayscale-300',
        false: '[&_svg]:fill-grayscale-500',
      },
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: { disabled: false, clickable: false },
  },
);

export type SearchIconVariants = VariantProps<
  typeof searchIconVariants
>;

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

export function SearchBar(props: SearchBarProps) {
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
    <InputGroup
      className={cn('rounded-[20px] pl-2 pr-4', className)}
      style={{ width: width ?? '100%', ...style }}
    >
      <InputGroupAddon
        data-testid="search-icon"
        onClick={handleSearchIconClick}
        className={searchIconVariants({
          disabled,
          clickable: isSearchIconClickable && !disabled,
        })}
      >
        <SearchIcon width={18} height={18} />
      </InputGroupAddon>

      <InputGroupInput
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
        className={cn(
          'ml-0 mr-4 max-w-[calc(100%-18px)]',
          'whitespace-nowrap text-ellipsis overflow-hidden',
        )}
      />
    </InputGroup>
  );
}
