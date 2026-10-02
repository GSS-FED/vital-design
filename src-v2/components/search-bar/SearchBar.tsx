import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef, useRef } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  KeyboardEvent,
} from 'react';

const searchIconVariants = cva(
  [
    'flex items-center transition-all duration-200',
    '[&_svg]:transition-all [&_svg]:duration-200',
    'group-focus-within:[&_svg]:fill-primary-500',
  ],
  {
    variants: {
      disabled: {
        true: '[&_svg]:fill-grayscale-opacity-300',
        false: '[&_svg]:fill-grayscale-opacity-500',
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

export type SearchBarProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'className'
  | 'defaultValue'
  | 'onChange'
  | 'style'
  | 'type'
  | 'value'
> & {
  /** Controlled value. Use `defaultValue` instead for uncontrolled usage. */
  value?: string;
  /** Initial value for uncontrolled usage. Ignored when `value` is set. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  isSearchIconClickable?: boolean;
  width?: string;
  /** Applied to the InputGroup shell, not the inner `<input>`. */
  className?: string;
  style?: CSSProperties;
};

const SearchBar = forwardRef<ElementRef<'input'>, SearchBarProps>(
  function SearchBar(props, ref) {
    const {
      className,
      defaultValue,
      disabled = false,
      isSearchIconClickable,
      onChange,
      onKeyUp,
      onSearch,
      placeholder,
      style,
      value,
      width,
      ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleSearch = () => {
      if (!disabled && inputRef.current) {
        onSearch?.(inputRef.current.value);
      }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyUp?.(event);
      if (event.key === 'Enter') {
        handleSearch();
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
        data-slot="search-bar"
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
          <SearchIcon className="size-4.5" />
        </InputGroupAddon>

        <InputGroupInput
          {...inputProps}
          {...(value !== undefined ? { value } : { defaultValue })}
          type="text"
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          disabled={disabled}
          ref={setInputRef}
          className={cn(
            'ml-0 mr-4 max-w-[calc(100%-18px)]',
            'whitespace-nowrap text-ellipsis overflow-hidden',
          )}
        />
      </InputGroup>
    );
  },
);

export { SearchBar };
