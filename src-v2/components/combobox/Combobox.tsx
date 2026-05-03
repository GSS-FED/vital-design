import { useScrollMask } from '@/hooks/useScrollMask';
import { CheckIcon } from '@/icons/CheckIcon';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { forwardRef, useRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Chip,
  ChipRemove,
  Chips,
  OverflowChip,
  TagsValue,
} from './ComboboxTagsValue';

export type {
  ComboboxChipProps,
  ComboboxChipRemoveProps,
  ComboboxChipsProps,
  ComboboxOverflowChipProps,
  ComboboxTagsValueProps,
} from './ComboboxTagsValue';

export type ComboboxProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> = Omit<
  BaseCombobox.Root.Props<Value, Multiple>,
  'autoHighlight'
> & {
  autoHighlight?: boolean | 'always';
};

const Combobox = BaseCombobox.Root as <
  Value = unknown,
  Multiple extends boolean | undefined = false,
>(
  props: ComboboxProps<Value, Multiple>,
) => ReactElement | null;

function assignRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export type ComboboxInputGroupProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.InputGroup
>;

const InputGroup = forwardRef<
  ElementRef<typeof BaseCombobox.InputGroup>,
  ComboboxInputGroupProps
>(function ComboboxInputGroup({ className, ...props }, ref) {
  return (
    <BaseCombobox.InputGroup
      ref={ref}
      data-slot="combobox-input-group"
      className={cn(
        'group box-border flex min-h-8 w-full cursor-text items-center gap-1 rounded border border-grayscale-300 bg-white py-1 pr-1.5 pl-3 font-sans text-sm leading-5 font-normal text-grayscale-800 transition-colors duration-200',
        'hover:border-grayscale-500 focus-within:border-primary-500 focus-within:outline-none',
        'data-[popup-open]:border-primary-500 data-[disabled]:pointer-events-none data-[disabled]:bg-grayscale-200 data-[disabled]:text-grayscale-500',
        'aria-invalid:border-alarm-500 aria-invalid:hover:border-alarm-500',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxValueProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Value
>;

const Value = (props: ComboboxValueProps) => {
  return <BaseCombobox.Value {...props} />;
};

export type ComboboxInputProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Input
>;

const Input = forwardRef<
  ElementRef<typeof BaseCombobox.Input>,
  ComboboxInputProps
>(function ComboboxInput({ className, ...props }, ref) {
  return (
    <BaseCombobox.Input
      ref={ref}
      data-slot="combobox-input"
      className={cn(
        'min-w-16 flex-1 bg-transparent font-sans text-sm leading-5 text-grayscale-800 outline-none placeholder:text-grayscale-400',
        'data-[disabled]:cursor-not-allowed data-[disabled]:text-grayscale-500',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxTriggerProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Trigger
>;

const Trigger = forwardRef<
  ElementRef<typeof BaseCombobox.Trigger>,
  ComboboxTriggerProps
>(function ComboboxTrigger({ children, className, ...props }, ref) {
  return (
    <BaseCombobox.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      className={cn(
        'group box-border flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded border border-grayscale-300 bg-white py-2 pr-1.5 pl-3 font-sans text-sm leading-5 font-normal text-grayscale-800 transition-colors duration-200',
        'hover:border-grayscale-500 focus:border-primary-500 focus:outline-none',
        'data-[placeholder]:text-grayscale-400 data-[popup-open]:border-primary-500',
        'data-[disabled]:pointer-events-none data-[disabled]:bg-grayscale-200 data-[disabled]:text-grayscale-500',
        className,
      )}
      {...props}
    >
      {children}
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-700">
        <span className="block group-data-[popup-open]:hidden">
          <ChevronDownIcon width={14} />
        </span>
        <span className="hidden group-data-[popup-open]:block">
          <ChevronUpIcon width={14} />
        </span>
      </span>
    </BaseCombobox.Trigger>
  );
});

export type ComboboxClearProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Clear
>;

const Clear = forwardRef<
  ElementRef<typeof BaseCombobox.Clear>,
  ComboboxClearProps
>(function ComboboxClear({ children, className, ...props }, ref) {
  return (
    <BaseCombobox.Clear
      ref={ref}
      data-slot="combobox-clear"
      className={cn(
        'grid h-5 w-5 shrink-0 cursor-pointer place-content-center outline-none',
        'hover:[&_svg>path]:fill-grayscale-700 hover:[&_svg>path]:transition-colors hover:[&_svg>path]:duration-200',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? <ClearIcon width={20} />}
    </BaseCombobox.Clear>
  );
});

export type ComboboxContentProps = Omit<
  ComponentPropsWithoutRef<typeof BaseCombobox.Popup>,
  'children'
> &
  Pick<
    ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    children?:
      | ReactNode
      | ComponentPropsWithoutRef<
          typeof BaseCombobox.List
        >['children'];
    emptyText?: ReactNode;
    listClassName?: string;
  };

const Content = forwardRef<
  ElementRef<typeof BaseCombobox.Popup>,
  ComboboxContentProps
>(function ComboboxContent(
  {
    align = 'start',
    alignOffset,
    children,
    className,
    emptyText,
    listClassName,
    side,
    sideOffset = 4,
    ...props
  },
  ref,
) {
  const listRef = useRef<ElementRef<typeof BaseCombobox.List> | null>(
    null,
  );
  const { maskStyle, onScroll } = useScrollMask(listRef);

  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="z-9999"
      >
        <BaseCombobox.Popup
          ref={ref}
          data-slot="combobox-content"
          className={cn(
            'box-border flex max-h-75 w-[var(--anchor-width)] min-w-36 flex-col overflow-hidden rounded bg-white py-2 font-sans shadow-emphasis',
            className,
          )}
          {...props}
        >
          {typeof children === 'function' ? (
            <BaseCombobox.List
              ref={listRef}
              data-slot="combobox-list"
              onScroll={onScroll}
              className={cn(
                'min-h-0 overflow-auto',
                '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
                listClassName,
              )}
              style={maskStyle}
            >
              {children}
            </BaseCombobox.List>
          ) : (
            children
          )}
          {emptyText ? <Empty>{emptyText}</Empty> : null}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
});

export type ComboboxHeaderProps = ComponentPropsWithoutRef<'div'>;

const Header = forwardRef<HTMLDivElement, ComboboxHeaderProps>(
  function ComboboxHeader({ className, ...props }, ref) {
    return <div ref={ref} className={className} {...props} />;
  },
);

export type ComboboxListProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.List
>;

const List = forwardRef<
  ElementRef<typeof BaseCombobox.List>,
  ComboboxListProps
>(function ComboboxList(
  { className, onScroll, style, ...props },
  ref,
) {
  const localRef = useRef<ElementRef<
    typeof BaseCombobox.List
  > | null>(null);
  const { maskStyle, onScroll: onMaskScroll } =
    useScrollMask(localRef);

  return (
    <BaseCombobox.List
      ref={(node: ElementRef<typeof BaseCombobox.List> | null) => {
        localRef.current = node;
        assignRef(ref, node);
      }}
      data-slot="combobox-list"
      onScroll={(event) => {
        onMaskScroll(event);
        onScroll?.(event);
      }}
      className={cn(
        'min-h-0 overflow-auto',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      style={{
        ...maskStyle,
        ...style,
      }}
      {...props}
    />
  );
});

export type ComboboxSearchBarProps = ComboboxInputProps & {
  inputClassName?: string;
};

const SearchBar = forwardRef<
  ElementRef<typeof BaseCombobox.Input>,
  ComboboxSearchBarProps
>(function ComboboxSearchBar(
  { className, inputClassName, ...props },
  ref,
) {
  return (
    <div className={cn('px-4 py-2', className)}>
      <div
        data-slot="combobox-search-bar"
        className={cn(
          'group box-border flex min-h-8 w-full items-center gap-2 rounded-[20px] border border-grayscale-300 bg-white py-1.5 pr-4 pl-2 font-sans text-grayscale-500 transition-colors duration-200',
          'hover:border-grayscale-500 focus-within:border-primary-500',
          'data-[disabled]:border-grayscale-300 data-[disabled]:bg-grayscale-200 data-[disabled]:text-grayscale-500',
        )}
      >
        <span className="flex shrink-0 items-center [&_svg]:fill-grayscale-500 group-focus-within:[&_svg]:fill-primary-500">
          <SearchIcon width={18} height={18} />
        </span>
        <BaseCombobox.Input
          ref={ref}
          data-slot="combobox-search-input"
          className={cn(
            'order-1 min-w-0 flex-1 appearance-none border-none bg-transparent p-0',
            'font-sans text-sm leading-5 font-normal text-grayscale-800',
            'outline-none placeholder:text-grayscale-400',
            'data-[disabled]:cursor-not-allowed data-[disabled]:text-grayscale-500',
            inputClassName,
          )}
          {...props}
        />
      </div>
    </div>
  );
});

export type ComboboxItemProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Item
>;

const Item = forwardRef<
  ElementRef<typeof BaseCombobox.Item>,
  ComboboxItemProps
>(function ComboboxItem({ className, ...props }, ref) {
  return (
    <BaseCombobox.Item
      ref={ref}
      data-slot="combobox-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 px-5 py-1.5 pr-8 text-sm leading-5 font-normal text-grayscale-800 outline-none select-none',
        'break-anywhere transition-colors duration-200',
        'data-[highlighted]:bg-grayscale-100 data-[active]:bg-grayscale-200',
        'data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-500',
        'data-[selected]:[&_[data-slot=combobox-item-check]]:text-primary-500',
        '[&[data-selected]_[data-slot=combobox-item-checkbox]]:border-primary-500 [&[data-selected]_[data-slot=combobox-item-checkbox]]:bg-primary-500',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxItemTextProps = ComponentPropsWithoutRef<'span'>;

const ItemText = forwardRef<HTMLSpanElement, ComboboxItemTextProps>(
  function ComboboxItemText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="combobox-item-text"
        className={cn('min-w-0 flex-1', className)}
        {...props}
      />
    );
  },
);

export type ComboboxItemCheckProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.ItemIndicator
>;

const ItemCheck = forwardRef<
  ElementRef<typeof BaseCombobox.ItemIndicator>,
  ComboboxItemCheckProps
>(function ComboboxItemCheck({ children, className, ...props }, ref) {
  return (
    <BaseCombobox.ItemIndicator
      ref={ref}
      data-slot="combobox-item-check"
      className={cn(
        'absolute right-5 grid h-4 w-4 place-content-center text-primary-500',
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon width={12} height={9} />}
    </BaseCombobox.ItemIndicator>
  );
});

export type ComboboxItemCheckboxProps =
  ComponentPropsWithoutRef<'span'>;

const ItemCheckbox = forwardRef<
  HTMLSpanElement,
  ComboboxItemCheckboxProps
>(function ComboboxItemCheckbox(
  { children, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="combobox-item-checkbox"
      className={cn(
        'grid h-4 w-4 shrink-0 place-content-center rounded-xs border border-grayscale-300 bg-white text-white',
        'transition-colors duration-200',
        className,
      )}
      {...props}
    >
      <BaseCombobox.ItemIndicator data-slot="combobox-item-indicator">
        {children ?? <CheckIcon width={10} height={8} />}
      </BaseCombobox.ItemIndicator>
    </span>
  );
});

export type ComboboxGroupProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Group
>;

const Group = forwardRef<
  ElementRef<typeof BaseCombobox.Group>,
  ComboboxGroupProps
>(function ComboboxGroup({ className, ...props }, ref) {
  return (
    <BaseCombobox.Group
      ref={ref}
      data-slot="combobox-group"
      className={className}
      {...props}
    />
  );
});

export type ComboboxLabelProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.GroupLabel
>;

const Label = forwardRef<
  ElementRef<typeof BaseCombobox.GroupLabel>,
  ComboboxLabelProps
>(function ComboboxLabel({ className, ...props }, ref) {
  return (
    <BaseCombobox.GroupLabel
      ref={ref}
      data-slot="combobox-label"
      className={cn(
        'px-5 py-1.5 text-xs leading-4 font-medium text-grayscale-500 not-first-of-type:pt-4',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxSeparatorProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Separator
>;

const Separator = forwardRef<
  ElementRef<typeof BaseCombobox.Separator>,
  ComboboxSeparatorProps
>(function ComboboxSeparator({ className, ...props }, ref) {
  return (
    <BaseCombobox.Separator
      ref={ref}
      data-slot="combobox-separator"
      className={cn('mx-4 my-2 h-px bg-grayscale-300', className)}
      {...props}
    />
  );
});

export type ComboboxEmptyProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Empty
>;

const Empty = forwardRef<
  ElementRef<typeof BaseCombobox.Empty>,
  ComboboxEmptyProps
>(function ComboboxEmpty({ children, className, ...props }, ref) {
  return (
    <BaseCombobox.Empty
      ref={ref}
      data-slot="combobox-empty"
      className={cn('text-[13px] text-grayscale-600', className)}
      {...props}
    >
      <span className="flex items-center justify-center px-4 py-6">
        {children}
      </span>
    </BaseCombobox.Empty>
  );
});

export {
  Combobox,
  Chip as ComboboxChip,
  ChipRemove as ComboboxChipRemove,
  Chips as ComboboxChips,
  Clear as ComboboxClear,
  Content as ComboboxContent,
  Empty as ComboboxEmpty,
  Group as ComboboxGroup,
  Header as ComboboxHeader,
  Input as ComboboxInput,
  InputGroup as ComboboxInputGroup,
  Item as ComboboxItem,
  ItemCheck as ComboboxItemCheck,
  ItemCheckbox as ComboboxItemCheckbox,
  ItemText as ComboboxItemText,
  Label as ComboboxLabel,
  List as ComboboxList,
  OverflowChip as ComboboxOverflowChip,
  Separator as ComboboxSeparator,
  SearchBar as ComboboxSearchBar,
  TagsValue as ComboboxTagsValue,
  Trigger as ComboboxTrigger,
  Value as ComboboxValue,
};
