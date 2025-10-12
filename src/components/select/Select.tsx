import {
  FloatingPortal,
  Placement,
  UseFloatingReturn,
  UseInteractionsReturn,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import {
  CSSProperties,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import Checkbox from 'src/components/checkbox/Checkbox';
import SearchBar from 'src/components/search-bar/SearchBar';
import Tag from 'src/components/tag/Tag';
import { colors, shadows, styles } from 'src/constants';
import { ChevronDownIcon, ChevronUpIcon, ClearIcon } from 'src/icons';
import Mask from '../mask/Mask';

/* -------------------- Context for the Select component -------------------- */
export interface ItemType {
  id: string | number;
  label: string;
}
interface SelectContextType {
  value: undefined | ItemType | ItemType[];
  onChange: (item: ItemType) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isMultiple: boolean;
  disabled: boolean;
  floatingRefs: UseFloatingReturn['refs'];
  floatingStyles: CSSProperties;
  getReferenceProps: UseInteractionsReturn['getReferenceProps'];
  getFloatingProps: UseInteractionsReturn['getFloatingProps'];
  isError: boolean;
}

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select compound components must be used within a Select component',
    );
  }
  return context;
};

/* ----------------------------- Main Component ----------------------------- */
export interface SelectProps {
  value: undefined | ItemType | ItemType[];
  onChange: (item: ItemType) => void;
  children: ReactNode;
  isMultiple?: boolean;
  disabled?: boolean;
  isError?: boolean;
  width?: string;
  className?: string;
  style?: CSSProperties;
  placement?: Placement;
}
function Select({
  width,
  value,
  children,
  style,
  className,
  onChange,
  isMultiple = false,
  disabled = false,
  isError = false,
  placement = 'bottom-start',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    refs,
    floatingStyles,
    context: floatingContext,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: placement,
    middleware: [
      offset(4),
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });
  const dismiss = useDismiss(floatingContext);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
  ]);

  const context = useMemo(
    () => ({
      value,
      onChange,
      open,
      setOpen,
      isMultiple,
      disabled,
      isError,
      floatingRefs: refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      onChange,
      open,
      value,
      isMultiple,
      isError,
      refs,
      floatingStyles,
      disabled,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <SelectContext.Provider value={context}>
      <RootContainer
        $width={width}
        ref={containerRef}
        style={style}
        className={className}
      >
        {children}
      </RootContainer>
    </SelectContext.Provider>
  );
}

/* ----------------------------- Sub-components ----------------------------- */
export interface TriggerProps {
  onClear?: () => void;
  clearable?: boolean;
  placeholder?: string;
  maxDisplayCount?: 1 | 2 | 3 | 6;
  children?: ReactNode;
  style?: CSSProperties;
}
const Trigger = ({
  onClear,
  clearable = false,
  maxDisplayCount = 2,
  placeholder = '',
  style,
}: TriggerProps) => {
  const {
    open,
    setOpen,
    value,
    disabled,
    isError,
    onChange,
    floatingRefs,
    getReferenceProps,
  } = useSelectContext();

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
  const contentJSX = Array.isArray(value) ? (
    <MultipleValue
      value={value}
      handleRemove={(item) => onChange(item)}
      maxDisplayCount={maxDisplayCount}
    />
  ) : (
    <Text>{value?.label}</Text>
  );

  return (
    <StyledTrigger
      tabIndex={0}
      onClick={() => setOpen(!open)}
      ref={floatingRefs.setReference}
      $isError={isError}
      $disabled={disabled}
      {...getReferenceProps()}
      data-testid={'select-trigger'}
      style={style}
    >
      {hasValue ? (
        contentJSX
      ) : (
        <Placeholder>{placeholder}</Placeholder>
      )}

      {clearable ? (
        <ClearIconWrapper
          data-testid="clear-button"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
        >
          <ClearIcon width={20} />
        </ClearIconWrapper>
      ) : (
        <IconWrapper>
          {open ? (
            <ChevronUpIcon width={14} color={colors.grayscale700} />
          ) : (
            <ChevronDownIcon
              width={14}
              color={
                disabled ? colors.grayscale500 : colors.grayscale600
              }
            />
          )}
        </IconWrapper>
      )}
    </StyledTrigger>
  );
};

interface MultipleValueProps {
  value: ItemType[];
  handleRemove: (item: ItemType) => void;
  maxDisplayCount: 1 | 2 | 3 | 6;
}
const MultipleValue = ({
  value,
  handleRemove,
  maxDisplayCount,
}: MultipleValueProps) => {
  const isExceeded = value.length > maxDisplayCount;
  return (
    <TagsWrapper>
      {value.slice(0, maxDisplayCount).map((v) => {
        return (
          <Tag
            key={v.id}
            removable
            onRemove={() => handleRemove(v)}
            className="tag"
          >
            {v.label}
          </Tag>
        );
      })}
      {isExceeded && <Tag>+{value.length - maxDisplayCount}</Tag>}
    </TagsWrapper>
  );
};

export interface ContentProps {
  children: ReactNode;
  height?: string;
}
const Content = ({ children, height }: ContentProps) => {
  const { open, floatingRefs, floatingStyles, getFloatingProps } =
    useSelectContext();

  return (
    <FloatingPortal>
      <StyledContent
        $open={open}
        $height={height}
        style={floatingStyles}
        ref={floatingRefs.setFloating}
        {...getFloatingProps()}
      >
        {children}
      </StyledContent>
    </FloatingPortal>
  );
};
export interface HeaderProps {
  children: ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export interface MenuProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Menu = ({ children, style }: MenuProps) => {
  return (
    <Mask>
      <StyledMenu style={style}>{children}</StyledMenu>
    </Mask>
  );
};

export interface ItemProps {
  item: ItemType;
  children?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  hasCheckbox?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

const Item = ({
  item,
  children,
  prefixIcon,
  suffixIcon,
  style,
  hasCheckbox = false,
  disabled = false,
}: ItemProps) => {
  const {
    value: selectedValue,
    onChange,
    setOpen,
    isMultiple,
  } = useSelectContext();

  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.some((v) => v.id === item.id)
    : item.id === selectedValue?.id;

  const handleSelect = () => {
    onChange(item);
    setOpen(false);
  };
  const handleSelectMultiple = () => {
    onChange(item);
  };

  return (
    <StyledItem
      $disabled={disabled}
      $selected={isSelected}
      $hasCheckbox={hasCheckbox}
      onClick={isMultiple ? handleSelectMultiple : handleSelect}
      style={style}
    >
      {prefixIcon && (
        <PrefixIconWrapper>{prefixIcon}</PrefixIconWrapper>
      )}
      {hasCheckbox && (
        <Checkbox checked={isSelected} onChange={() => {}} />
      )}

      {children ? children : item.label}

      {suffixIcon && (
        <SuffixIconWrapper>{suffixIcon}</SuffixIconWrapper>
      )}
    </StyledItem>
  );
};

export interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Title = ({ children, style }: TitleProps) => {
  return (
    <StyledGroupTitle style={style}>{children}</StyledGroupTitle>
  );
};

export interface SearchInputProps {
  placeholder: string;
  onChange: (v: string) => void;
}
const SearchInput = ({ placeholder, onChange }: SearchInputProps) => {
  const { open } = useSelectContext();
  const prevOpen = useRef(open);

  useEffect(() => {
    // 選單從開啟變為關閉時，通知外部重置搜尋
    if (prevOpen.current && !open) {
      onChange('');
    }
    prevOpen.current = open;
  }, [open, onChange]);

  // 選單關閉時卸載元件，自動重置搜尋狀態
  if (!open) return null;

  return (
    <StyledSearchBar>
      <SearchBar placeholder={placeholder} onChange={onChange} />
    </StyledSearchBar>
  );
};

export interface EmptyTextProps {
  text: string;
}
const EmptyText = ({ text }: EmptyTextProps) => {
  return <StyledEmptyText>{text}</StyledEmptyText>;
};

const Separator = () => {
  return <StyledSeparator />;
};

Select.Trigger = Trigger;
Select.Content = Content;
Select.Header = Header;
Select.Menu = Menu;
Select.Item = Item;
Select.Title = Title;
Select.Separator = Separator;
Select.SearchBar = SearchInput;
Select.EmptyText = EmptyText;

Select.displayName = 'Select';

export default Select;

/* ---------------------------------- Style --------------------------------- */
interface RootContainerProps {
  $width?: string;
}
interface StyledTriggerProps {
  $isError?: boolean;
  $disabled?: boolean;
}
interface StyledContentProps {
  $open: boolean;
  $height?: string;
}
interface StyledItemProps {
  $selected: boolean;
  $disabled: boolean;
  $hasCheckbox: boolean;
}
const RootContainer = styled.div<RootContainerProps>`
  position: relative;
  width: ${({ $width }) => $width ?? '100%'};
`;
const StyledTrigger = styled.div<StyledTriggerProps>`
  ${styles.boxSizing}
  ${styles.typography}

  width: 100%;
  height: 32px;
  padding: 8px 6px 8px 12px;
  background-color: white;
  border: 1px solid ${colors.grayscale300};
  color: ${colors.grayscale800};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.2s ease;
  gap: 8px;

  &:hover {
    border-color: ${colors.grayscale500};
  }
  &:focus {
    border-color: ${colors.primary500};
  }

  ${({ $isError }) =>
    $isError &&
    css`
      border-color: ${colors.alarm500};

      &:hover {
        border-color: ${colors.alarm500};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: ${colors.grayscale200};
      color: ${colors.grayscale500};
      pointer-events: none;
    `}
`;
const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;
const Placeholder = styled.span`
  color: ${colors.grayscale400};
  vertical-align: baseline;
`;
const TagsWrapper = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  align-items: center;
  flex-wrap: nowrap;

  .tag {
    min-width: 0;

    & > div[role='button'] {
      min-width: 0;
    }

    & > div[role='button'] > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
const StyledContent = styled.div<StyledContentProps>`
  width: 100%;
  height: ${({ $height }) => $height ?? 'auto'};
  max-height: 300px;
  padding: 8px 0;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  box-shadow: ${shadows.EMPHASIS};
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  z-index: 9999;
`;
const StyledHeader = styled.div``;
const StyledMenu = styled.div``;
const StyledItem = styled.div<StyledItemProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) =>
    props.$selected ? colors.primary500 : colors.grayscale800};
  padding: 6px 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.2s ease;
  overflow-wrap: anywhere;

  &:hover {
    background-color: ${colors.grayscale100};
  }
  &:active {
    background-color: ${colors.grayscale200};
  }

  ${({ $hasCheckbox }) =>
    $hasCheckbox &&
    css`
      color: ${colors.grayscale800};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${colors.grayscale500};
      pointer-events: none;
    `}
`;
const PrefixIconWrapper = styled.div`
  display: grid;
  place-content: center;
`;
const SuffixIconWrapper = styled.div`
  margin-inline-start: auto;
  display: grid;
  place-content: center;
`;
const StyledGroupTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.grayscale500};
  padding: 6px 20px;

  &:not(:first-of-type) {
    padding-top: 16px;
  }
`;
const StyledSeparator = styled.div`
  background-color: ${colors.grayscale300};
  height: 1px;
  margin: 8px 16px;
`;
const StyledSearchBar = styled.div`
  padding: 8px 16px;
`;
const ClearIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;

  &:hover {
    svg > path {
      transition: fill 0.2s;
      fill: ${colors.grayscale700};
    }
  }
`;
const StyledEmptyText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  font-size: 13px;
  color: ${colors.grayscale600};
`;
const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
