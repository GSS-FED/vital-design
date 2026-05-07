import type { RegistryItem } from 'shadcn/schema';

export type RegistryItemName =
  | 'utils'
  | 'vital-theme'
  | 'vital-design-base'
  | 'vital-icons'
  | 'icon-check'
  | 'icon-chevron'
  | 'icon-clear'
  | 'icon-close'
  | 'icon-disabled'
  | 'icon-eye'
  | 'icon-eye-slash'
  | 'icon-flag'
  | 'icon-minus'
  | 'icon-search'
  | 'icon-spinner'
  | 'icon-user'
  | 'use-debounce-value'
  | 'use-scroll-mask'
  | 'alert'
  | 'avatar'
  | 'button'
  | 'button-group'
  | 'split-button'
  | 'checkbox'
  | 'chip'
  | 'field'
  | 'label'
  | 'radio-group'
  | 'switch'
  | 'tag'
  | 'skeleton'
  | 'spinner'
  | 'search-bar'
  | 'input-group'
  | 'input'
  | 'item'
  | 'separator'
  | 'textarea'
  | 'password-input'
  | 'select'
  | 'combobox'
  | 'command'
  | 'popover'
  | 'dropdown-menu'
  | 'dialog'
  | 'slider'
  | 'table'
  | 'toolbar';

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
