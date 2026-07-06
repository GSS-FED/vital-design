import { CheckIcon } from '@/icons/CheckIcon';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import { cn } from '@/lib/utils';
import { Select as BaseSelect } from '@base-ui/react/select';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';

export type SelectProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Root
>;

const Select = BaseSelect.Root;

export type SelectGroupProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Group
>;

const SelectGroup = forwardRef<
  ElementRef<typeof BaseSelect.Group>,
  SelectGroupProps
>(function SelectGroup({ className, ...props }, ref) {
  return (
    <BaseSelect.Group
      ref={ref}
      data-slot="select-group"
      className={className}
      {...props}
    />
  );
});

export type SelectValueProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Value
>;

const SelectValue = forwardRef<
  ElementRef<typeof BaseSelect.Value>,
  SelectValueProps
>(function SelectValue({ className, ...props }, ref) {
  return (
    <BaseSelect.Value
      ref={ref}
      data-slot="select-value"
      className={cn(
        'min-w-0 flex-1 truncate text-left',
        'data-[placeholder]:text-grayscale-opacity-400',
        className,
      )}
      {...props}
    />
  );
});

export type SelectTriggerProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Trigger
> & {
  placeholder?: ReactNode;
};

const SelectTrigger = forwardRef<
  ElementRef<typeof BaseSelect.Trigger>,
  SelectTriggerProps
>(function SelectTrigger(
  { children, className, placeholder = '', ...props },
  ref,
) {
  return (
    <BaseSelect.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        'group box-border flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded border border-grayscale-opacity-300 bg-white py-2 pr-1.5 pl-3 font-sans text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200',
        'hover:border-grayscale-opacity-500 focus:border-primary-500 focus:outline-none',
        'disabled:pointer-events-none disabled:bg-grayscale-opacity-200 disabled:text-grayscale-opacity-500',
        'data-[popup-open]:border-primary-500',
        'aria-invalid:border-destructive-500 aria-invalid:hover:border-destructive-500',
        className,
      )}
      {...props}
    >
      {children ?? <SelectValue placeholder={placeholder} />}
      <BaseSelect.Icon
        render={
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-opacity-700">
            <span className="block group-data-[popup-open]:hidden">
              <ChevronDownIcon className="size-3.5" />
            </span>
            <span className="hidden group-data-[popup-open]:block">
              <ChevronUpIcon className="size-3.5" />
            </span>
          </span>
        }
      />
    </BaseSelect.Trigger>
  );
});

export type SelectContentProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Popup
> &
  Pick<
    ComponentPropsWithoutRef<typeof BaseSelect.Positioner>,
    | 'align'
    | 'alignOffset'
    | 'side'
    | 'sideOffset'
    | 'alignItemWithTrigger'
  > & {
    listClassName?: SelectListProps['className'];
    listRender?: SelectListProps['render'];
    listWrapper?: (list: ReactNode) => ReactNode;
    showScrollButtons?: boolean;
  };

const SelectContent = forwardRef<
  ElementRef<typeof BaseSelect.Popup>,
  SelectContentProps
>(function SelectContent(
  {
    align = 'start',
    alignItemWithTrigger = false,
    alignOffset,
    children,
    className,
    listClassName,
    listRender,
    listWrapper,
    showScrollButtons = true,
    side,
    sideOffset = 4,
    ...props
  },
  ref,
) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="z-9999"
      >
        <BaseSelect.Popup
          ref={ref}
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'box-border max-h-75 w-[var(--anchor-width)] origin-(--transform-origin) overflow-hidden rounded bg-white py-2 font-sans shadow-emphasis duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {showScrollButtons ? <SelectScrollUpButton /> : null}
          {listWrapper?.(
            <SelectList className={listClassName} render={listRender}>
              {children}
            </SelectList>,
          ) ?? (
            <SelectList className={listClassName} render={listRender}>
              {children}
            </SelectList>
          )}
          {showScrollButtons ? <SelectScrollDownButton /> : null}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
});

export type SelectListProps = ComponentPropsWithoutRef<
  typeof BaseSelect.List
>;

const SelectList = forwardRef<
  ElementRef<typeof BaseSelect.List>,
  SelectListProps
>(function SelectList({ className, ...props }, ref) {
  return (
    <BaseSelect.List
      ref={ref}
      data-slot="select-list"
      className={cn(
        'min-h-0 overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        className,
      )}
      {...props}
    />
  );
});

export type SelectLabelProps = ComponentPropsWithoutRef<
  typeof BaseSelect.GroupLabel
>;

const SelectLabel = forwardRef<
  ElementRef<typeof BaseSelect.GroupLabel>,
  SelectLabelProps
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      data-slot="select-label"
      className={cn(
        'px-5 py-1.5 text-xs leading-4 font-medium text-grayscale-opacity-500 not-first-of-type:pt-4',
        className,
      )}
      {...props}
    />
  );
});

export type SelectItemProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Item
>;

const SelectItem = forwardRef<
  ElementRef<typeof BaseSelect.Item>,
  SelectItemProps
>(function SelectItem({ className, ...props }, ref) {
  return (
    <BaseSelect.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 px-5 py-1.5 pr-8 text-sm leading-5 font-normal text-grayscale-opacity-800 outline-none select-none',
        'break-anywhere transition-colors duration-200',
        'data-[highlighted]:bg-grayscale-opacity-100 data-[active]:bg-grayscale-opacity-200',
        'data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-opacity-500',
        'data-[selected]:[&_[data-slot=select-item-check]]:text-primary-500',
        '[&[data-selected]_[data-slot=select-item-checkbox]]:border-primary-500 [&[data-selected]_[data-slot=select-item-checkbox]]:bg-primary-500',
        className,
      )}
      {...props}
    />
  );
});

export type SelectItemTextProps = ComponentPropsWithoutRef<
  typeof BaseSelect.ItemText
>;

const SelectItemText = forwardRef<
  ElementRef<typeof BaseSelect.ItemText>,
  SelectItemTextProps
>(function SelectItemText({ className, ...props }, ref) {
  return (
    <BaseSelect.ItemText
      ref={ref}
      data-slot="select-item-text"
      className={cn('min-w-0 flex-1', className)}
      {...props}
    />
  );
});

export type SelectItemCheckProps = ComponentPropsWithoutRef<
  typeof BaseSelect.ItemIndicator
>;

const SelectItemCheck = forwardRef<
  ElementRef<typeof BaseSelect.ItemIndicator>,
  SelectItemCheckProps
>(function SelectItemCheck({ children, className, ...props }, ref) {
  return (
    <BaseSelect.ItemIndicator
      ref={ref}
      data-slot="select-item-check"
      className={cn(
        'absolute right-5 grid h-4 w-4 place-content-center text-primary-500',
        className,
      )}
      {...props}
    >
      {children ?? <CheckIcon className="size-3" />}
    </BaseSelect.ItemIndicator>
  );
});

export type SelectItemCheckboxProps =
  ComponentPropsWithoutRef<'span'>;

const SelectItemCheckbox = forwardRef<
  HTMLSpanElement,
  SelectItemCheckboxProps
>(function SelectItemCheckbox(
  { children, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="select-item-checkbox"
      data-testid="select-checkbox"
      className={cn(
        'grid h-4 w-4 shrink-0 place-content-center rounded-xs border border-grayscale-opacity-300 bg-white text-white',
        'transition-colors duration-200',
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator data-slot="select-item-indicator">
        {children ?? <CheckIcon className="size-2.5" />}
      </BaseSelect.ItemIndicator>
    </span>
  );
});

export type SelectSeparatorProps = ComponentPropsWithoutRef<
  typeof BaseSelect.Separator
>;

const SelectSeparator = forwardRef<
  ElementRef<typeof BaseSelect.Separator>,
  SelectSeparatorProps
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <BaseSelect.Separator
      ref={ref}
      data-slot="select-separator"
      className={cn(
        'pointer-events-none mx-4 my-2 h-px bg-grayscale-opacity-300',
        className,
      )}
      {...props}
    />
  );
});

export type SelectScrollUpButtonProps = ComponentPropsWithoutRef<
  typeof BaseSelect.ScrollUpArrow
>;

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof BaseSelect.ScrollUpArrow>,
  SelectScrollUpButtonProps
>(function SelectScrollUpButton({ className, ...props }, ref) {
  return (
    <BaseSelect.ScrollUpArrow
      ref={ref}
      data-slot="select-scroll-up-button"
      className={cn(
        'top-0 flex w-full cursor-default items-center justify-center bg-white py-1 text-grayscale-opacity-700',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-3.5" />
    </BaseSelect.ScrollUpArrow>
  );
});

export type SelectScrollDownButtonProps = ComponentPropsWithoutRef<
  typeof BaseSelect.ScrollDownArrow
>;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof BaseSelect.ScrollDownArrow>,
  SelectScrollDownButtonProps
>(function SelectScrollDownButton({ className, ...props }, ref) {
  return (
    <BaseSelect.ScrollDownArrow
      ref={ref}
      data-slot="select-scroll-down-button"
      className={cn(
        'bottom-0 flex w-full cursor-default items-center justify-center bg-white py-1 text-grayscale-opacity-700',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-3.5" />
    </BaseSelect.ScrollDownArrow>
  );
});

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemCheck,
  SelectItemCheckbox,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
