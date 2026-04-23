import Checkbox from '@/components/checkbox/Checkbox';
import Mask from '@/components/mask/Mask';
import SearchBar from '@/components/search-bar/SearchBar';
import Tag from '@/components/tag/Tag';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { cn } from '@/utils/cn';
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import type {
  Placement,
  UseFloatingReturn,
  UseInteractionsReturn,
} from '@floating-ui/react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CSSProperties, ReactNode } from 'react';

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
      <div
        ref={containerRef}
        style={{ width: width ?? '100%', ...style }}
        className={cn('relative', className)}
      >
        {children}
      </div>
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
    <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
      {value?.label}
    </div>
  );

  return (
    <div
      tabIndex={0}
      onClick={() => setOpen(!open)}
      ref={floatingRefs.setReference}
      {...getReferenceProps()}
      data-testid={'select-trigger'}
      style={style}
      className={cn(
        'box-border font-sans',
        'w-full h-8 py-2 pl-3 pr-1.5',
        'bg-white border border-grayscale-300 rounded',
        'text-grayscale-800 font-normal text-sm leading-5',
        'flex items-center justify-between gap-2',
        'cursor-pointer transition-colors duration-200',
        'hover:border-grayscale-500',
        'focus:border-primary-500',
        isError && 'border-alarm-500 hover:border-alarm-500',
        disabled &&
          'bg-grayscale-200 text-grayscale-500 pointer-events-none',
      )}
    >
      {hasValue ? (
        contentJSX
      ) : (
        <span className="text-grayscale-400 align-baseline">
          {placeholder}
        </span>
      )}

      {clearable ? (
        <div
          data-testid="clear-button"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
          className={cn(
            'w-5 h-5 grid place-content-center',
            'hover:[&_svg>path]:transition-colors hover:[&_svg>path]:duration-200',
            'hover:[&_svg>path]:fill-grayscale-700',
          )}
        >
          <ClearIcon width={20} />
        </div>
      ) : (
        <div
          className={cn(
            'w-5 h-5 flex justify-center items-center',
            disabled ? 'text-grayscale-500' : 'text-grayscale-700',
          )}
        >
          {open ? (
            <ChevronUpIcon width={14} />
          ) : (
            <ChevronDownIcon width={14} />
          )}
        </div>
      )}
    </div>
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
    <div className="flex gap-1 overflow-hidden items-center flex-nowrap [&_.tag]:min-w-0 [&_.tag>[role='button']]:min-w-0 [&_.tag>[role='button']>div]:whitespace-nowrap [&_.tag>[role='button']>div]:overflow-hidden [&_.tag>[role='button']>div]:text-ellipsis">
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
    </div>
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
      <div
        style={{
          ...floatingStyles,
          height: height ?? 'auto',
          display: open ? 'flex' : 'none',
        }}
        ref={floatingRefs.setFloating}
        {...getFloatingProps()}
        className={cn(
          'w-full max-h-75 py-2 flex-col',
          'bg-white rounded shadow-emphasis z-9999',
        )}
      >
        {children}
      </div>
    </FloatingPortal>
  );
};
export interface HeaderProps {
  children: ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return <div>{children}</div>;
};

export interface MenuProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Menu = ({ children, style }: MenuProps) => {
  return (
    <Mask>
      <div style={style}>{children}</div>
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
    <div
      onClick={isMultiple ? handleSelectMultiple : handleSelect}
      style={style}
      className={cn(
        'font-normal text-sm leading-5',
        'py-1.5 px-5 flex gap-2 items-center',
        'cursor-pointer select-none transition-colors duration-200',
        'break-anywhere',
        'hover:bg-grayscale-100',
        'active:bg-grayscale-200',
        isSelected && !hasCheckbox && 'text-primary-500',
        !isSelected && 'text-grayscale-800',
        hasCheckbox && 'text-grayscale-800',
        disabled && 'text-grayscale-500 pointer-events-none',
      )}
    >
      {prefixIcon && (
        <div className="grid place-content-center">{prefixIcon}</div>
      )}
      {hasCheckbox && <Checkbox checked={isSelected} />}

      {children ? children : item.label}

      {suffixIcon && (
        <div className="ms-auto grid place-content-center">
          {suffixIcon}
        </div>
      )}
    </div>
  );
};

export interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Title = ({ children, style }: TitleProps) => {
  return (
    <div
      style={style}
      className={cn(
        'font-medium text-xs leading-4',
        'text-grayscale-500 py-1.5 px-5',
        'not-first-of-type:pt-4',
      )}
    >
      {children}
    </div>
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
    <div className="py-2 px-4">
      <SearchBar placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export interface EmptyTextProps {
  text: string;
}
const EmptyText = ({ text }: EmptyTextProps) => {
  return (
    <div className="flex justify-center items-center py-6 text-[13px] text-grayscale-600">
      {text}
    </div>
  );
};

const Separator = () => {
  return <div className="bg-grayscale-300 h-px mx-4 my-2" />;
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

export {
  Select,
  Content as SelectContent,
  EmptyText as SelectEmptyText,
  Header as SelectHeader,
  Item as SelectItem,
  Menu as SelectMenu,
  SearchInput as SelectSearchBar,
  Separator as SelectSeparator,
  Title as SelectTitle,
  Trigger as SelectTrigger,
};
export default Select;
