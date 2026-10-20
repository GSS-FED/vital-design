import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';

export type AutocompleteProps<ItemValue = unknown> =
  BaseAutocomplete.Root.Props<ItemValue>;

const Autocomplete = BaseAutocomplete.Root as <ItemValue = unknown>(
  props: AutocompleteProps<ItemValue>,
) => ReactElement | null;

export type AutocompleteValueProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Value
>;

const Value = (props: AutocompleteValueProps) => {
  return <BaseAutocomplete.Value {...props} />;
};

export type AutocompleteInputGroupProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.InputGroup
>;

const InputGroup = function AutocompleteInputGroup({
  className,
  ref,
  ...props
}: Omit<AutocompleteInputGroupProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.InputGroup>>;
}) {
  return (
    <BaseAutocomplete.InputGroup
      ref={ref}
      data-slot="autocomplete-input-group"
      className={cn(
        'group box-border flex min-h-8 w-full cursor-text items-center gap-1 rounded border border-grayscale-opacity-300 bg-white py-1 pr-1.5 pl-3 font-sans text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200',
        'hover:border-grayscale-opacity-500 focus-within:border-primary-500 focus-within:outline-none',
        'data-[popup-open]:border-primary-500 data-[disabled]:pointer-events-none data-[disabled]:bg-grayscale-opacity-200 data-[disabled]:text-grayscale-opacity-500',
        'aria-invalid:border-destructive-500 aria-invalid:hover:border-destructive-500',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteInputProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Input
>;

const Input = function AutocompleteInput({
  className,
  ref,
  ...props
}: Omit<AutocompleteInputProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Input>>;
}) {
  return (
    <BaseAutocomplete.Input
      ref={ref}
      data-slot="autocomplete-input"
      className={cn(
        'min-w-16 flex-1 bg-transparent font-sans text-sm leading-5 text-grayscale-opacity-800 outline-none placeholder:text-grayscale-opacity-400',
        'data-[disabled]:cursor-not-allowed data-[disabled]:text-grayscale-opacity-500',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteTriggerProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Trigger
>;

const Trigger = function AutocompleteTrigger({
  children,
  className,
  ref,
  ...props
}: Omit<AutocompleteTriggerProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Trigger>>;
}) {
  return (
    <BaseAutocomplete.Trigger
      ref={ref}
      data-slot="autocomplete-trigger"
      className={cn(
        'grid h-5 w-5 shrink-0 cursor-pointer place-content-center text-grayscale-opacity-700 outline-none transition-colors duration-200',
        'hover:text-grayscale-opacity-900 focus-visible:shadow-focus-primary',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <ChevronDownIcon
            data-slot="autocomplete-trigger-icon-down"
            className="block size-3.5 group-data-[popup-open]:hidden"
          />
          <ChevronUpIcon
            data-slot="autocomplete-trigger-icon-up"
            className="hidden size-3.5 group-data-[popup-open]:block"
          />
        </>
      )}
    </BaseAutocomplete.Trigger>
  );
};

export type AutocompleteIconProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Icon
>;

const Icon = function AutocompleteIcon({
  children,
  className,
  ref,
  ...props
}: Omit<AutocompleteIconProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Icon>>;
}) {
  return (
    <BaseAutocomplete.Icon
      ref={ref}
      data-slot="autocomplete-icon"
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-opacity-500 group-focus-within:text-primary-500',
        className,
      )}
      {...props}
    >
      {children ?? <SearchIcon className="size-4.5" />}
    </BaseAutocomplete.Icon>
  );
};

export type AutocompleteClearProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Clear
>;

const Clear = function AutocompleteClear({
  children,
  className,
  ref,
  ...props
}: Omit<AutocompleteClearProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Clear>>;
}) {
  return (
    <BaseAutocomplete.Clear
      ref={ref}
      data-slot="autocomplete-clear"
      className={cn(
        'grid h-5 w-5 shrink-0 cursor-pointer place-content-center text-grayscale-opacity-900 outline-none',
        'hover:[&_svg>path]:fill-grayscale-opacity-700 hover:[&_svg>path]:transition-colors hover:[&_svg>path]:duration-200',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? <ClearIcon className="size-5" />}
    </BaseAutocomplete.Clear>
  );
};

export type AutocompletePortalProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Portal
>;

const Portal = BaseAutocomplete.Portal;

export type AutocompleteBackdropProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Backdrop
>;

const Backdrop = function AutocompleteBackdrop({
  className,
  ref,
  ...props
}: Omit<AutocompleteBackdropProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Backdrop>>;
}) {
  return (
    <BaseAutocomplete.Backdrop
      ref={ref}
      data-slot="autocomplete-backdrop"
      className={className}
      {...props}
    />
  );
};

export type AutocompletePositionerProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Positioner
>;

const Positioner = function AutocompletePositioner({
  className,
  ref,
  ...props
}: Omit<AutocompletePositionerProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Positioner>>;
}) {
  return (
    <BaseAutocomplete.Positioner
      ref={ref}
      data-slot="autocomplete-positioner"
      className={cn('z-9999', className)}
      {...props}
    />
  );
};

export type AutocompletePopupProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Popup
>;

const Popup = function AutocompletePopup({
  className,
  ref,
  ...props
}: Omit<AutocompletePopupProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Popup>>;
}) {
  return (
    <BaseAutocomplete.Popup
      ref={ref}
      data-slot="autocomplete-popup"
      className={cn(
        'box-border flex max-h-75 w-[var(--anchor-width)] min-w-36 origin-(--transform-origin) flex-col overflow-hidden rounded bg-white py-2 font-sans shadow-emphasis duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteContentProps = Omit<
  AutocompletePopupProps,
  'children'
> &
  Pick<
    AutocompletePositionerProps,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    children?:
      | ReactNode
      | ComponentPropsWithoutRef<
          typeof BaseAutocomplete.List
        >['children'];
    emptyText?: ReactNode;
    listClassName?: string;
    positionerClassName?: string;
  };

const Content = function AutocompleteContent({
  align = 'start',
  alignOffset,
  children,
  className,
  emptyText,
  listClassName,
  positionerClassName,
  side,
  sideOffset = 4,
  ref,
  ...props
}: Omit<AutocompleteContentProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Popup>>;
}) {
  return (
    <Portal>
      <Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={positionerClassName}
      >
        <Popup ref={ref} className={className} {...props}>
          {typeof children === 'function' ? (
            <BaseAutocomplete.List
              data-slot="autocomplete-list"
              className={cn(
                'min-h-0 overflow-auto',
                '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
                listClassName,
              )}
            >
              {children}
            </BaseAutocomplete.List>
          ) : (
            children
          )}
          {emptyText ? <Empty>{emptyText}</Empty> : null}
        </Popup>
      </Positioner>
    </Portal>
  );
};

export type AutocompleteListProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.List
>;

const List = function AutocompleteList({
  className,
  onScroll,
  ref,
  ...props
}: Omit<AutocompleteListProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.List>>;
}) {
  return (
    <BaseAutocomplete.List
      ref={ref}
      data-slot="autocomplete-list"
      onScroll={onScroll}
      className={cn(
        'min-h-0 overflow-auto',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteItemProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Item
>;

const Item = function AutocompleteItem({
  className,
  ref,
  ...props
}: Omit<AutocompleteItemProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Item>>;
}) {
  return (
    <BaseAutocomplete.Item
      ref={ref}
      data-slot="autocomplete-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 px-5 py-1.5 text-sm leading-5 font-normal text-grayscale-opacity-800 outline-none select-none',
        'wrap-anywhere transition-colors duration-200',
        'data-[highlighted]:bg-grayscale-opacity-100 data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-opacity-500',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteItemTextProps =
  ComponentPropsWithoutRef<'span'>;

const ItemText = function AutocompleteItemText({
  className,
  ref,
  ...props
}: Omit<AutocompleteItemTextProps, 'ref'> & {
  ref?: Ref<HTMLSpanElement>;
}) {
  return (
    <span
      ref={ref}
      data-slot="autocomplete-item-text"
      className={cn('min-w-0 flex-1', className)}
      {...props}
    />
  );
};

export type AutocompleteStatusProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Status
>;

const Status = function AutocompleteStatus({
  className,
  ref,
  ...props
}: Omit<AutocompleteStatusProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Status>>;
}) {
  return (
    <BaseAutocomplete.Status
      ref={ref}
      data-slot="autocomplete-status"
      className={cn(
        'px-5 py-2 text-xs text-grayscale-opacity-600',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteEmptyProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Empty
>;

const Empty = function AutocompleteEmpty({
  children,
  className,
  ref,
  ...props
}: Omit<AutocompleteEmptyProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Empty>>;
}) {
  return (
    <BaseAutocomplete.Empty
      ref={ref}
      data-slot="autocomplete-empty"
      className={cn(
        'text-[13px] text-grayscale-opacity-600',
        className,
      )}
      {...props}
    >
      <span className="flex items-center justify-center px-4 py-6">
        {children}
      </span>
    </BaseAutocomplete.Empty>
  );
};

export type AutocompleteGroupProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Group
>;

const Group = function AutocompleteGroup({
  className,
  ref,
  ...props
}: Omit<AutocompleteGroupProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Group>>;
}) {
  return (
    <BaseAutocomplete.Group
      ref={ref}
      data-slot="autocomplete-group"
      className={className}
      {...props}
    />
  );
};

export type AutocompleteGroupLabelProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.GroupLabel
>;

const GroupLabel = function AutocompleteGroupLabel({
  className,
  ref,
  ...props
}: Omit<AutocompleteGroupLabelProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.GroupLabel>>;
}) {
  return (
    <BaseAutocomplete.GroupLabel
      ref={ref}
      data-slot="autocomplete-group-label"
      className={cn(
        'px-5 py-1.5 text-xs leading-4 font-medium text-grayscale-opacity-500 not-first-of-type:pt-4',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteRowProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Row
>;

const Row = function AutocompleteRow({
  className,
  ref,
  ...props
}: Omit<AutocompleteRowProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Row>>;
}) {
  return (
    <BaseAutocomplete.Row
      ref={ref}
      data-slot="autocomplete-row"
      className={cn('flex items-center', className)}
      {...props}
    />
  );
};

export type AutocompleteCollectionProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Collection
>;

const Collection = BaseAutocomplete.Collection;

export type AutocompleteSeparatorProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Separator
>;

const Separator = function AutocompleteSeparator({
  className,
  ref,
  ...props
}: Omit<AutocompleteSeparatorProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Separator>>;
}) {
  return (
    <BaseAutocomplete.Separator
      ref={ref}
      data-slot="autocomplete-separator"
      className={cn(
        'mx-4 my-2 h-px bg-grayscale-opacity-300',
        className,
      )}
      {...props}
    />
  );
};

export type AutocompleteArrowProps = ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Arrow
>;

const Arrow = function AutocompleteArrow({
  className,
  ref,
  ...props
}: Omit<AutocompleteArrowProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseAutocomplete.Arrow>>;
}) {
  return (
    <BaseAutocomplete.Arrow
      ref={ref}
      data-slot="autocomplete-arrow"
      className={cn('text-white', className)}
      {...props}
    />
  );
};

export {
  Autocomplete,
  Arrow as AutocompleteArrow,
  Backdrop as AutocompleteBackdrop,
  Clear as AutocompleteClear,
  Collection as AutocompleteCollection,
  Content as AutocompleteContent,
  Empty as AutocompleteEmpty,
  Group as AutocompleteGroup,
  GroupLabel as AutocompleteGroupLabel,
  Icon as AutocompleteIcon,
  Input as AutocompleteInput,
  InputGroup as AutocompleteInputGroup,
  Item as AutocompleteItem,
  ItemText as AutocompleteItemText,
  List as AutocompleteList,
  Popup as AutocompletePopup,
  Portal as AutocompletePortal,
  Positioner as AutocompletePositioner,
  Row as AutocompleteRow,
  Separator as AutocompleteSeparator,
  Status as AutocompleteStatus,
  Trigger as AutocompleteTrigger,
  Value as AutocompleteValue,
};
