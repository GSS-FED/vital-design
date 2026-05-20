import type { RegistryItem } from 'shadcn/schema';

export type RegistryItemName =
  | 'utils'
  | 'vital-theme'
  | 'vital-design-base'
  | 'vital-icons'
  | 'icon-calendar'
  | 'icon-check'
  | 'icon-chevron-down'
  | 'icon-chevron-up'
  | 'icon-chevron-left'
  | 'icon-chevron-right'
  | 'icon-chevron-double-left'
  | 'icon-chevron-double-right'
  | 'icon-clear'
  | 'icon-clock'
  | 'icon-close'
  | 'icon-disabled'
  | 'icon-ellipsis'
  | 'icon-eye'
  | 'icon-eye-slash'
  | 'icon-flag'
  | 'icon-minus'
  | 'icon-search'
  | 'icon-spinner'
  | 'icon-user'
  | 'use-debounce-value'
  | 'alert'
  | 'avatar'
  | 'badge'
  | 'button'
  | 'button-group'
  | 'split-button'
  | 'card'
  | 'checkbox'
  | 'chip'
  | 'field'
  | 'label'
  | 'radio-group'
  | 'switch'
  | 'tag'
  | 'skeleton'
  | 'spinner'
  | 'progress'
  | 'search-bar'
  | 'input-group'
  | 'input'
  | 'number-input'
  | 'item'
  | 'separator'
  | 'scroll-area'
  | 'textarea'
  | 'password-input'
  | 'select'
  | 'autocomplete'
  | 'combobox'
  | 'command'
  | 'popover'
  | 'tooltip'
  | 'toast'
  | 'dropdown-menu'
  | 'dialog'
  | 'resizable'
  | 'slider'
  | 'table'
  | 'tabs'
  | 'toolbar'
  | 'calendar'
  | 'time-picker'
  | 'collapsible'
  | 'sheet'
  | 'data-table-group-01'
  | 'data-table-group-02';

/**
 * Extends the official shadcn RegistryItem with:
 * - Typed registryDependencies (enforces @vital-design/ prefix + known item names)
 * - categories field used by blocks
 */
export type VitalRegistryItem = Omit<
  RegistryItem,
  'registryDependencies'
> & {
  registryDependencies?: `@vital-design/${RegistryItemName}`[];
  categories?: string[];
};

export type { RegistryItem };
