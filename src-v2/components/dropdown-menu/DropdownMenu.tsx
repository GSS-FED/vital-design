import { CheckIcon } from '@/icons/CheckIcon';
import { ChevronRightIcon } from '@/icons/ChevronIcon';
import { cn } from '@/lib/utils';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const ITEM_BASE_CLASSES =
  'relative flex cursor-pointer items-center gap-2 py-1.5 px-3 text-sm leading-5 font-normal text-grayscale-800 outline-none select-none transition-colors duration-200';

const ITEM_STATE_CLASSES =
  'data-[highlighted]:bg-grayscale-100 data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-500';

export type DropdownMenuProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Root
>;

const DropdownMenu = BaseMenu.Root;

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Trigger
>;

const DropdownMenuTrigger = BaseMenu.Trigger;

export type DropdownMenuPortalProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Portal
>;

const DropdownMenuPortal = BaseMenu.Portal;

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Group
>;

const DropdownMenuGroup = BaseMenu.Group;

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof BaseMenu.RadioGroup
>;

const DropdownMenuRadioGroup = BaseMenu.RadioGroup;

export type DropdownMenuSubProps = ComponentPropsWithoutRef<
  typeof BaseMenu.SubmenuRoot
>;

const DropdownMenuSub = BaseMenu.SubmenuRoot;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Popup
> &
  Pick<
    ComponentPropsWithoutRef<typeof BaseMenu.Positioner>,
    'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
  > & {
    positionerClassName?: string;
  };

const DropdownMenuContent = forwardRef<
  ElementRef<typeof BaseMenu.Popup>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    align = 'start',
    alignOffset,
    anchor,
    children,
    className,
    positionerClassName,
    side = 'bottom',
    sideOffset = 4,
    ...props
  },
  ref,
) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-9999', positionerClassName)}
      >
        <BaseMenu.Popup
          ref={ref}
          data-slot="dropdown-menu-content"
          className={cn(
            'box-border min-w-32 origin-(--transform-origin) overflow-hidden rounded bg-white py-2 font-sans shadow-emphasis outline-none duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
});

export type DropdownMenuSubContentProps = DropdownMenuContentProps;

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof BaseMenu.Popup>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent(
  {
    align = 'start',
    alignOffset,
    children,
    className,
    positionerClassName,
    side = 'right',
    sideOffset = 4,
    ...props
  },
  ref,
) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-9999', positionerClassName)}
      >
        <BaseMenu.Popup
          ref={ref}
          data-slot="dropdown-menu-sub-content"
          className={cn(
            'box-border min-w-32 origin-(--transform-origin) overflow-hidden rounded bg-white py-2 font-sans shadow-emphasis outline-none duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
});

export type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Item
>;

const DropdownMenuItem = forwardRef<
  ElementRef<typeof BaseMenu.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <BaseMenu.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(ITEM_BASE_CLASSES, ITEM_STATE_CLASSES, className)}
      {...props}
    />
  );
});

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof BaseMenu.SubmenuTrigger
>;

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof BaseMenu.SubmenuTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { children, className, ...props },
  ref,
) {
  return (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        ITEM_BASE_CLASSES,
        ITEM_STATE_CLASSES,
        'pr-2 data-[popup-open]:bg-grayscale-100',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon
        aria-hidden="true"
        className="ml-auto text-grayscale-500"
      />
    </BaseMenu.SubmenuTrigger>
  );
});

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.CheckboxItem
>;

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof BaseMenu.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  { children, className, ...props },
  ref,
) {
  return (
    <BaseMenu.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        ITEM_BASE_CLASSES,
        ITEM_STATE_CLASSES,
        'pl-8',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute left-3 grid h-4 w-4 place-content-center text-primary-500"
      >
        <BaseMenu.CheckboxItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
          <CheckIcon width={12} height={9} />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
});

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.RadioItem
>;

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof BaseMenu.RadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem(
  { children, className, ...props },
  ref,
) {
  return (
    <BaseMenu.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        ITEM_BASE_CLASSES,
        ITEM_STATE_CLASSES,
        'pl-8',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute left-3 grid h-4 w-4 place-content-center"
      >
        <BaseMenu.RadioItemIndicator data-slot="dropdown-menu-radio-item-indicator">
          <span className="h-2 w-2 rounded-full bg-primary-500" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
});

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<
  typeof BaseMenu.GroupLabel
>;

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof BaseMenu.GroupLabel>,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <BaseMenu.GroupLabel
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(
        'px-3 py-1.5 text-xs leading-4 font-medium text-grayscale-500 not-first-of-type:pt-4',
        className,
      )}
      {...props}
    />
  );
});

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Separator
>;

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof BaseMenu.Separator>,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <BaseMenu.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn(
        'pointer-events-none mx-3 my-2 h-px bg-grayscale-300',
        className,
      )}
      {...props}
    />
  );
});

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
