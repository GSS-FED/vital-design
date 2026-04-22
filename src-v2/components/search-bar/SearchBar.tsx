import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

const searchBarVariants = cva(
  [
    'group flex items-center py-1.5 pl-2 pr-4',
    'border border-grayscale-300 rounded-[20px]',
    'transition-all duration-200',
    'font-sans box-border',
    'focus-within:border-primary-500',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-grayscale-200',
        false: 'bg-white hover:border-grayscale-500',
      },
    },
    defaultVariants: { disabled: false },
  },
);

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

export type SearchBarVariants = VariantProps<
  typeof searchBarVariants
>;
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
    <div
      className={cn(searchBarVariants({ disabled }), className)}
      style={{ width: width ?? '100%', ...style }}
    >
      <div
        onClick={handleSearchIconClick}
        className={searchIconVariants({
          disabled,
          clickable: isSearchIconClickable && !disabled,
        })}
      >
        <SearchIcon width={18} height={18} />
      </div>

      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
        className={cn(
          'flex-1 max-w-[calc(100%-18px)] ml-2 mr-4',
          'font-normal text-sm font-sans',
          'whitespace-nowrap text-ellipsis overflow-hidden',
          'outline-none border-none bg-transparent',
          'placeholder:text-grayscale-400',
          disabled && 'text-grayscale-500',
        )}
      />
    </div>
  );
}

SearchBar.displayName = 'SearchBar';
