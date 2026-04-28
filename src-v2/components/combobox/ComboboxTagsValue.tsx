import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/utils/cn';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';

function getSelectedItemLabel(item: unknown): ReactNode {
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  }

  if (item && typeof item === 'object' && 'label' in item) {
    return item.label as ReactNode;
  }

  return '';
}

function getSelectedItemKey(
  item: unknown,
  index: number,
): string | number {
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  }

  if (item && typeof item === 'object' && 'value' in item) {
    const value = item.value;

    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
  }

  return index;
}

function getChipRemoveLabel(label: ReactNode) {
  if (typeof label === 'string' || typeof label === 'number') {
    return `Remove ${label}`;
  }

  return 'Remove item';
}

export type ComboboxChipsProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Chips
>;

const Chips = forwardRef<
  ElementRef<typeof BaseCombobox.Chips>,
  ComboboxChipsProps
>(function ComboboxChips({ className, ...props }, ref) {
  return (
    <BaseCombobox.Chips
      ref={ref}
      data-slot="combobox-chips"
      className={cn(
        'flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxChipProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.Chip
>;

const Chip = forwardRef<
  ElementRef<typeof BaseCombobox.Chip>,
  ComboboxChipProps
>(function ComboboxChip({ className, ...props }, ref) {
  return (
    <BaseCombobox.Chip
      ref={ref}
      data-slot="combobox-chip"
      className={cn(
        'inline-flex h-5 min-w-0 max-w-full shrink-0 items-center gap-1 overflow-hidden rounded-full bg-grayscale-700 px-2.5 text-xs leading-5 text-white outline-none',
        'data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxChipRemoveProps = ComponentPropsWithoutRef<
  typeof BaseCombobox.ChipRemove
>;

const ChipRemove = forwardRef<
  ElementRef<typeof BaseCombobox.ChipRemove>,
  ComboboxChipRemoveProps
>(function ComboboxChipRemove(
  { children, className, ...props },
  ref,
) {
  return (
    <BaseCombobox.ChipRemove
      ref={ref}
      data-slot="combobox-chip-remove"
      className={cn(
        '-mr-2.5 grid h-5 w-5 shrink-0 cursor-pointer place-content-center rounded-r-full text-white outline-none',
        'transition-colors duration-100 hover:bg-white/20',
        '[&_svg]:h-2.25 [&_svg]:w-2.25',
        className,
      )}
      {...props}
    >
      {children ?? <CloseIcon />}
    </BaseCombobox.ChipRemove>
  );
});

export type ComboboxOverflowChipProps =
  ComponentPropsWithoutRef<'span'>;

const OverflowChip = forwardRef<
  HTMLSpanElement,
  ComboboxOverflowChipProps
>(function ComboboxOverflowChip({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="combobox-overflow-chip"
      className={cn(
        'inline-flex h-5 shrink-0 items-center rounded-full bg-grayscale-200 px-2.5 text-xs leading-5 text-grayscale-700',
        className,
      )}
      {...props}
    />
  );
});

export type ComboboxTagsValueProps = Omit<
  ComponentPropsWithoutRef<typeof BaseCombobox.Value>,
  'children'
> & {
  getItemKey?: (item: unknown, index: number) => string | number;
  getItemLabel?: (item: unknown) => ReactNode;
  inputPlaceholder?: string;
  maxDisplayCount?: number;
  overflowLabel?: (count: number) => ReactNode;
};

const TagsValue = ({
  getItemKey = getSelectedItemKey,
  getItemLabel = getSelectedItemLabel,
  inputPlaceholder,
  maxDisplayCount,
  overflowLabel = (count) => `+${count}`,
  placeholder,
  ...props
}: ComboboxTagsValueProps) => {
  const resolvedInputPlaceholder =
    inputPlaceholder ??
    (typeof placeholder === 'string' ? placeholder : undefined);

  return (
    <BaseCombobox.Value placeholder={placeholder} {...props}>
      {(selectedValue: unknown) => {
        const selectedItems = Array.isArray(selectedValue)
          ? selectedValue
          : [];
        const visibleCount =
          typeof maxDisplayCount === 'number'
            ? Math.max(0, maxDisplayCount)
            : selectedItems.length;
        const visibleItems = selectedItems.slice(0, visibleCount);
        const hiddenCount =
          selectedItems.length - visibleItems.length;

        return (
          <Chips>
            {visibleItems.map((item, index) => {
              const label = getItemLabel(item);

              return (
                <Chip key={getItemKey(item, index)}>
                  <span className="min-w-0 truncate">{label}</span>
                  <ChipRemove
                    aria-label={getChipRemoveLabel(label)}
                  />
                </Chip>
              );
            })}
            {hiddenCount > 0 ? (
              <OverflowChip>
                {overflowLabel(hiddenCount)}
              </OverflowChip>
            ) : null}
            {selectedItems.length === 0 ? (
              <span className="min-w-0 flex-1 truncate text-grayscale-400">
                {resolvedInputPlaceholder}
              </span>
            ) : null}
          </Chips>
        );
      }}
    </BaseCombobox.Value>
  );
};

export { Chip, ChipRemove, Chips, OverflowChip, TagsValue };
