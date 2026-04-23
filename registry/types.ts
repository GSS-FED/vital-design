import type { RegistryItem } from 'shadcn/schema';

export type RegistryItemName =
  | 'utils'
  | 'vital-theme'
  | 'vital-constants'
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
  | 'avatar'
  | 'button'
  | 'split-button'
  | 'checkbox'
  | 'chip'
  | 'radio-group'
  | 'switch'
  | 'tag'
  | 'mask'
  | 'search-bar'
  | 'text-input'
  | 'textarea-input'
  | 'password-input'
  | 'list-components'
  | 'select'
  | 'action-list'
  | 'action-infinite-list'
  | 'tree-select';

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
