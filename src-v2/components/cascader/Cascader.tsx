import {
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandRoot,
  CommandSeparator,
} from '@/components/command/Command';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { cn } from '@/utils/cn';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  HTMLAttributes,
  Key,
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
} from 'react';

type CascaderContextValue = {
  back: () => void;
  canGoBack: boolean;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  open: boolean;
  pageKey: Key | null;
  searchValue: string;
  setOpen: (open: boolean) => void;
  setSearchValue: (value: string) => void;
};

const CascaderContext = createContext<CascaderContextValue | null>(
  null,
);

function useCascaderContext() {
  const context = useContext(CascaderContext);

  if (!context) {
    throw new Error(
      'Cascader compound components must be used within Cascader',
    );
  }

  return context;
}

function assignRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export type CascaderProps = Omit<
  ComponentPropsWithoutRef<typeof BasePopover.Root>,
  'children' | 'defaultOpen' | 'onOpenChange' | 'open'
> & {
  canGoBack?: boolean;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  defaultSearchValue?: string;
  onBack?: () => void;
  onOpenChange?: (open: boolean) => void;
  onSearchValueChange?: (value: string) => void;
  open?: boolean;
  pageKey?: Key | null;
  searchValue?: string;
  style?: CSSProperties;
  width?: string;
};

function CascaderRoot({
  canGoBack: canGoBackProp,
  children,
  className,
  defaultOpen = false,
  defaultSearchValue = '',
  onBack,
  onOpenChange,
  onSearchValueChange,
  open: openProp,
  pageKey = null,
  searchValue: searchValueProp,
  style,
  width,
  ...rootProps
}: CascaderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] =
    useState(defaultOpen);
  const [uncontrolledSearchValue, setUncontrolledSearchValue] =
    useState(defaultSearchValue);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wasOpenRef = useRef(openProp ?? defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const searchValue = searchValueProp ?? uncontrolledSearchValue;
  const canGoBack = Boolean(canGoBackProp && onBack);

  const setSearchValue = useCallback(
    (nextValue: string) => {
      if (searchValueProp === undefined) {
        setUncontrolledSearchValue(nextValue);
      }

      onSearchValueChange?.(nextValue);
    },
    [onSearchValueChange, searchValueProp],
  );

  const resetSearch = useCallback(() => {
    if (searchValue.length === 0) return;

    setSearchValue('');
  }, [searchValue, setSearchValue]);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [onOpenChange, openProp],
  );

  const back = useCallback(() => {
    if (!canGoBack) return;

    resetSearch();
    onBack?.();
  }, [canGoBack, onBack, resetSearch]);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;

    if (wasOpen && !open) {
      resetSearch();
    }
  }, [open, resetSearch]);

  const contextValue = useMemo(
    () => ({
      back,
      canGoBack,
      inputRef,
      open,
      pageKey,
      searchValue,
      setOpen,
      setSearchValue,
    }),
    [
      back,
      canGoBack,
      inputRef,
      open,
      pageKey,
      searchValue,
      setOpen,
      setSearchValue,
    ],
  );

  return (
    <CascaderContext.Provider value={contextValue}>
      <BasePopover.Root
        open={open}
        onOpenChange={setOpen}
        {...rootProps}
      >
        <div
          data-slot="cascader-root"
          className={cn('relative font-sans', className)}
          style={{ width: width ?? '100%', ...style }}
        >
          {children}
        </div>
      </BasePopover.Root>
    </CascaderContext.Provider>
  );
}

export type CascaderTriggerProps = ComponentPropsWithoutRef<
  typeof BasePopover.Trigger
> & {
  clearable?: boolean;
  isError?: boolean;
  onClear?: () => void;
  placeholder?: ReactNode;
};

const CascaderTrigger = forwardRef<
  HTMLButtonElement,
  CascaderTriggerProps
>(function CascaderTrigger(
  {
    'aria-invalid': ariaInvalid,
    children,
    className,
    clearable = false,
    disabled = false,
    isError = false,
    onKeyDown,
    onClear,
    placeholder = '',
    type = 'button',
    ...props
  },
  ref,
) {
  const { open, setOpen } = useCascaderContext();
  const canClear = clearable && !!onClear && !disabled;

  return (
    <BasePopover.Trigger
      ref={ref}
      data-slot="cascader-trigger"
      type={type}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-invalid={ariaInvalid ?? (isError || undefined)}
      disabled={disabled}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) return;

        if (
          canClear &&
          (event.key === 'Backspace' || event.key === 'Delete')
        ) {
          event.preventDefault();
          onClear();
          return;
        }

        const shouldOpen =
          event.key === 'ArrowDown' ||
          event.key === 'ArrowUp' ||
          event.key === 'Enter' ||
          event.key === ' ' ||
          event.key === 'Spacebar';

        if (shouldOpen) {
          event.preventDefault();
          setOpen(true);
        }
      }}
      {...props}
      className={cn(
        'box-border flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded border border-grayscale-300 bg-white py-2 pr-1.5 pl-3 text-left text-sm leading-5 font-normal text-grayscale-800 transition-colors duration-200',
        'hover:border-grayscale-500 focus:border-primary-500 focus:outline-none',
        'disabled:pointer-events-none disabled:bg-grayscale-200 disabled:text-grayscale-500',
        'aria-invalid:border-alarm-500 aria-invalid:hover:border-alarm-500',
        open && 'border-primary-500',
        isError && 'border-alarm-500 hover:border-alarm-500',
        className,
      )}
    >
      {children ?? <CascaderValueText placeholder={placeholder} />}
      {canClear ? (
        <span
          aria-hidden="true"
          data-slot="cascader-clear"
          data-testid="clear-button"
          onPointerDown={(event) => {
            event.preventDefault();
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClear?.();
          }}
          className="grid h-5 w-5 shrink-0 place-content-center hover:[&_svg>path]:fill-grayscale-700"
        >
          <ClearIcon width={20} />
        </span>
      ) : (
        <span
          data-slot="cascader-trigger-icon"
          className="flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-700"
        >
          {open ? (
            <ChevronUpIcon width={14} />
          ) : (
            <ChevronDownIcon width={14} />
          )}
        </span>
      )}
    </BasePopover.Trigger>
  );
});

export type CascaderValueProps = HTMLAttributes<HTMLSpanElement> & {
  placeholder?: ReactNode;
};

const CascaderValueText = forwardRef<
  HTMLSpanElement,
  CascaderValueProps
>(function CascaderValue(
  { children, className, placeholder = '', ...props },
  ref,
) {
  const hasValue =
    children !== undefined &&
    children !== null &&
    children !== '' &&
    (!Array.isArray(children) || children.length > 0);

  return (
    <span
      ref={ref}
      data-slot="cascader-value"
      className={cn(
        'min-w-0 flex-1 truncate text-left',
        !hasValue && 'text-grayscale-400',
        className,
      )}
      {...props}
    >
      {hasValue ? children : placeholder}
    </span>
  );
});

export type CascaderContentProps = Omit<
  ComponentPropsWithoutRef<typeof CommandRoot>,
  'onKeyDown'
> &
  Pick<
    ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > &
  Pick<
    ComponentPropsWithoutRef<typeof BasePopover.Popup>,
    'finalFocus' | 'initialFocus'
  > & {
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    popupClassName?: string;
    positionerClassName?: string;
  };

const CascaderContent = forwardRef<
  HTMLDivElement,
  CascaderContentProps
>(function CascaderContent(
  {
    align = 'start',
    alignOffset,
    children,
    className,
    finalFocus,
    initialFocus,
    onKeyDown,
    popupClassName,
    positionerClassName,
    shouldFilter = false,
    side,
    sideOffset = 4,
    ...props
  },
  ref,
) {
  const { back, canGoBack, inputRef, open, pageKey, searchValue } =
    useCascaderContext();

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();
  }, [inputRef, open, pageKey]);

  if (!open) return null;

  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-9999', positionerClassName)}
      >
        <BasePopover.Popup
          data-slot="cascader-popup"
          finalFocus={finalFocus}
          initialFocus={initialFocus ?? inputRef}
          className={cn('outline-none', popupClassName)}
        >
          <CommandRoot
            ref={ref}
            data-slot="cascader-content"
            shouldFilter={shouldFilter}
            className={cn(
              'max-h-75 w-[var(--anchor-width)]',
              className,
            )}
            onKeyDown={(event) => {
              onKeyDown?.(event);

              if (event.defaultPrevented) return;

              const shouldGoBack =
                event.key === 'Escape' ||
                event.key === 'ArrowLeft' ||
                (event.key === 'Backspace' &&
                  searchValue.length === 0);

              if (shouldGoBack && canGoBack) {
                event.preventDefault();
                back();
              }
            }}
            {...props}
          >
            {children}
          </CommandRoot>
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
});

export type CascaderBackItemProps = ComponentPropsWithoutRef<
  typeof CommandBackButton
>;

const CascaderBackItem = forwardRef<
  HTMLButtonElement,
  CascaderBackItemProps
>(function CascaderBackItem({ children, onClick, ...props }, ref) {
  const { back, canGoBack } = useCascaderContext();

  if (!canGoBack) return null;

  return (
    <CommandHeader>
      <CommandBackButton
        ref={ref}
        data-slot="cascader-back-item"
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            back();
          }
        }}
        {...props}
      >
        {children ?? 'Back'}
      </CommandBackButton>
    </CommandHeader>
  );
});

export type CascaderSearchProps = Omit<
  ComponentPropsWithoutRef<typeof CommandInput>,
  'onValueChange' | 'value'
> & {
  onValueChange?: (value: string) => void;
};
export type CascaderInputProps = CascaderSearchProps;

const CascaderSearch = forwardRef<
  HTMLInputElement,
  CascaderSearchProps
>(function CascaderSearch({ onValueChange, ...props }, ref) {
  const { inputRef, searchValue, setSearchValue } =
    useCascaderContext();

  return (
    <CommandInput
      ref={(node) => {
        inputRef.current = node;
        assignRef(ref, node);
      }}
      data-slot="cascader-search"
      value={searchValue}
      onValueChange={(nextValue) => {
        setSearchValue(nextValue);
        onValueChange?.(nextValue);
      }}
      {...props}
    />
  );
});

export type CascaderListProps = ComponentPropsWithoutRef<
  typeof CommandList
>;

const CascaderList = forwardRef<
  ElementRef<typeof CommandList>,
  CascaderListProps
>(function CascaderList(props, ref) {
  return (
    <CommandList ref={ref} data-slot="cascader-list" {...props} />
  );
});

export type CascaderEmptyProps = ComponentPropsWithoutRef<
  typeof CommandEmpty
>;

const CascaderEmpty = forwardRef<
  ElementRef<typeof CommandEmpty>,
  CascaderEmptyProps
>(function CascaderEmpty(props, ref) {
  return (
    <CommandEmpty ref={ref} data-slot="cascader-empty" {...props} />
  );
});

export type CascaderLoadingProps = ComponentPropsWithoutRef<
  typeof CommandLoading
>;

const CascaderLoading = forwardRef<
  ElementRef<typeof CommandLoading>,
  CascaderLoadingProps
>(function CascaderLoading(props, ref) {
  return (
    <CommandLoading
      ref={ref}
      data-slot="cascader-loading"
      {...props}
    />
  );
});

export type CascaderSeparatorProps = ComponentPropsWithoutRef<
  typeof CommandSeparator
>;

const CascaderSeparator = forwardRef<
  ElementRef<typeof CommandSeparator>,
  CascaderSeparatorProps
>(function CascaderSeparator(props, ref) {
  return (
    <CommandSeparator
      ref={ref}
      data-slot="cascader-separator"
      {...props}
    />
  );
});

export type CascaderGroupProps = ComponentPropsWithoutRef<
  typeof CommandGroup
>;

const CascaderGroup = forwardRef<
  ElementRef<typeof CommandGroup>,
  CascaderGroupProps
>(function CascaderGroup(props, ref) {
  return (
    <CommandGroup ref={ref} data-slot="cascader-group" {...props} />
  );
});

export type CascaderItemProps = ComponentPropsWithoutRef<
  typeof CommandItem
> & {
  closeOnSelect?: boolean;
};

const CascaderItem = forwardRef<HTMLDivElement, CascaderItemProps>(
  function CascaderItem(
    { className, closeOnSelect = true, onSelect, ...props },
    ref,
  ) {
    const { setOpen } = useCascaderContext();

    return (
      <CommandItem
        ref={ref}
        data-slot="cascader-item"
        className={cn('px-4', className)}
        onSelect={(value) => {
          onSelect?.(value);

          if (closeOnSelect) {
            setOpen(false);
          }
        }}
        {...props}
      />
    );
  },
);

export type CascaderItemTextProps = ComponentPropsWithoutRef<'span'>;

const CascaderItemText = forwardRef<
  HTMLSpanElement,
  CascaderItemTextProps
>(function CascaderItemText({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="cascader-item-text"
      className={cn('min-w-0 flex-1 truncate', className)}
      {...props}
    />
  );
});

export type CascaderItemIndicatorProps =
  ComponentPropsWithoutRef<'span'>;

const CascaderItemIndicator = forwardRef<
  HTMLSpanElement,
  CascaderItemIndicatorProps
>(function CascaderItemIndicator(
  { children, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="cascader-item-indicator"
      className={cn(
        'ml-auto flex shrink-0 text-grayscale-500',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon width={20} height={20} />}
    </span>
  );
});

const CascaderInput = CascaderSearch;

export {
  CascaderRoot as Cascader,
  CascaderBackItem,
  CascaderContent,
  CascaderEmpty,
  CascaderGroup,
  CascaderInput,
  CascaderItem,
  CascaderItemIndicator,
  CascaderItemText,
  CascaderList,
  CascaderLoading,
  CascaderSearch,
  CascaderSeparator,
  CascaderTrigger,
  CascaderValueText as CascaderValue,
};
