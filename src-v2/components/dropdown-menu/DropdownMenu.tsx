import { CheckIcon } from '@/icons/CheckIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { cn } from '@/lib/utils';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  Ref,
} from 'react';

const ITEM_BASE_CLASSES =
  'relative flex cursor-pointer items-center gap-2 py-1.5 px-3 text-sm leading-5 font-normal text-grayscale-opacity-800 outline-none select-none transition-colors duration-200';

const ITEM_STATE_CLASSES =
  'data-[highlighted]:bg-grayscale-opacity-100 data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-opacity-500';

export type DropdownMenuProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Root
>;

const DropdownMenu = BaseMenu.Root;

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Trigger
>;

const DropdownMenuTrigger = function DropdownMenuTrigger({
  className,
  ref,
  ...props
}: Omit<DropdownMenuTriggerProps, 'ref'> & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <BaseMenu.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={className}
      {...props}
    />
  );
};

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
    /** Custom portal container. Defaults to `document.body`. */
    portalContainer?: DropdownMenuPortalProps['container'];
  };

const DropdownMenuContent = function DropdownMenuContent({
  align = 'start',
  alignOffset,
  anchor,
  children,
  className,
  portalContainer,
  positionerClassName,
  side = 'bottom',
  sideOffset = 4,
  ref,
  ...props
}: Omit<DropdownMenuContentProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.Popup>>;
}) {
  return (
    <BaseMenu.Portal container={portalContainer}>
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
};

export type DropdownMenuSubContentProps = DropdownMenuContentProps;

const DropdownMenuSubContent = function DropdownMenuSubContent({
  align = 'start',
  alignOffset,
  children,
  className,
  portalContainer,
  positionerClassName,
  side = 'right',
  sideOffset = 4,
  ref,
  ...props
}: Omit<DropdownMenuSubContentProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.Popup>>;
}) {
  return (
    <BaseMenu.Portal container={portalContainer}>
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
};

export type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Item
>;

const DropdownMenuItem = function DropdownMenuItem({
  className,
  ref,
  ...props
}: Omit<DropdownMenuItemProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.Item>>;
}) {
  return (
    <BaseMenu.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(ITEM_BASE_CLASSES, ITEM_STATE_CLASSES, className)}
      {...props}
    />
  );
};

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof BaseMenu.SubmenuTrigger
>;

const DropdownMenuSubTrigger = function DropdownMenuSubTrigger({
  children,
  className,
  ref,
  ...props
}: Omit<DropdownMenuSubTriggerProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.SubmenuTrigger>>;
}) {
  return (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        ITEM_BASE_CLASSES,
        ITEM_STATE_CLASSES,
        'pr-2 data-[popup-open]:bg-grayscale-opacity-100',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon
        aria-hidden="true"
        className="ml-auto text-grayscale-opacity-500"
      />
    </BaseMenu.SubmenuTrigger>
  );
};

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.CheckboxItem
>;

const DropdownMenuCheckboxItem = function DropdownMenuCheckboxItem({
  children,
  className,
  ref,
  ...props
}: Omit<DropdownMenuCheckboxItemProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.CheckboxItem>>;
}) {
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
          <CheckIcon className="size-3" />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
};

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof BaseMenu.RadioItem
>;

const DropdownMenuRadioItem = function DropdownMenuRadioItem({
  children,
  className,
  ref,
  ...props
}: Omit<DropdownMenuRadioItemProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.RadioItem>>;
}) {
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
};

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<
  typeof BaseMenu.GroupLabel
>;

const DropdownMenuLabel = function DropdownMenuLabel({
  className,
  ref,
  ...props
}: Omit<DropdownMenuLabelProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.GroupLabel>>;
}) {
  return (
    <BaseMenu.GroupLabel
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(
        'px-3 py-1.5 text-xs leading-4 font-medium text-grayscale-opacity-500 not-first-of-type:pt-4',
        className,
      )}
      {...props}
    />
  );
};

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof BaseMenu.Separator
>;

const DropdownMenuSeparator = function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: Omit<DropdownMenuSeparatorProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseMenu.Separator>>;
}) {
  return (
    <BaseMenu.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn(
        'pointer-events-none mx-3 my-2 h-px bg-grayscale-opacity-300',
        className,
      )}
      {...props}
    />
  );
};

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
