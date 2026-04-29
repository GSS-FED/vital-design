import type { VitalRegistryItem } from './types';

export const ui = [
  {
    name: 'alert',
    type: 'registry:ui',
    title: 'Alert',
    description:
      'Composable alert component with title, description, and action slots',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/alert/Alert.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'avatar',
    type: 'registry:ui',
    title: 'Avatar',
    description:
      'Avatar component with image, fallback, and multiple color variants',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-disabled',
      '@vital-design/icon-user',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/avatar/Avatar.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'button',
    type: 'registry:ui',
    title: 'Button',
    description:
      'Button component with filled and text variants, multiple themes and sizes',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/button/Button.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'button-group',
    type: 'registry:ui',
    title: 'Button Group',
    description: 'Composable button group layout primitive',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/button/button-group/ButtonGroup.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'split-button',
    type: 'registry:ui',
    title: 'Split Button',
    description:
      'Split button component with main action and dropdown trigger',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/button',
      '@vital-design/button-group',
      '@vital-design/icon-chevron',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/button/split-button/SplitButton.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'checkbox',
    type: 'registry:ui',
    title: 'Checkbox',
    description:
      'Checkbox component with indeterminate state support',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-check',
      '@vital-design/icon-minus',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/checkbox/Checkbox.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'chip',
    type: 'registry:ui',
    title: 'Chip',
    description: 'Chip component for selection and filtering',
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-close',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/chip/Chip.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'radio-group',
    type: 'registry:ui',
    title: 'Radio Group',
    description:
      'Radio group component with horizontal and vertical layouts',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/radio-group/RadioGroup.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'switch',
    type: 'registry:ui',
    title: 'Switch',
    description: 'Toggle switch component with on/off labels',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/switch/Switch.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'tag',
    type: 'registry:ui',
    title: 'Tag',
    description:
      'Tag component with multiple colors, variants, and removable option',
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/tag/Tag.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'mask',
    type: 'registry:ui',
    title: 'Mask',
    description: 'Scrollable container with gradient mask effect',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-constants',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/mask/Mask.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'skeleton',
    type: 'registry:ui',
    title: 'Skeleton',
    description: 'Loading placeholder with pulse animation',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/skeleton/Skeleton.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'spinner',
    type: 'registry:ui',
    title: 'Spinner',
    description: 'Loading indicator with accessible status text',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-spinner',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/spinner/Spinner.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'search-bar',
    type: 'registry:ui',
    title: 'Search Bar',
    description: 'Search input with icon and enter key support',
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/input-group',
      '@vital-design/icon-search',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/search-bar/SearchBar.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'input-group',
    type: 'registry:ui',
    title: 'Input Group',
    description: 'Composable input group with addons and actions',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/input/input-group/InputGroup.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'text-input',
    type: 'registry:ui',
    title: 'Text Input',
    description:
      'Text input component with prefix/suffix slots and error state',
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/input-group',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/input/text-input/TextInput.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'textarea-input',
    type: 'registry:ui',
    title: 'Textarea Input',
    description: 'Multiline text input component',
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/input-group',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/input/textarea-input/TextareaInput.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'password-input',
    type: 'registry:ui',
    title: 'Password Input',
    description: 'Password input with visibility toggle',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/text-input',
      '@vital-design/input-group',
      '@vital-design/icon-eye',
      '@vital-design/icon-eye-slash',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/input/password-input/PasswordInput.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'list-components',
    type: 'registry:ui',
    title: 'List Components',
    description:
      'Reusable list container and item components with mask effect',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-constants',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/list/components/ListContainer.tsx',
        type: 'registry:ui',
      },
      {
        path: 'src-v2/components/list/components/ListItem.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'select',
    type: 'registry:ui',
    title: 'Select',
    description: 'Single and multiple dropdown for flat option lists',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-check',
      '@vital-design/icon-chevron',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/select/Select.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'combobox',
    type: 'registry:ui',
    title: 'Combobox',
    description: 'Searchable input picker with chip selection',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-check',
      '@vital-design/icon-chevron',
      '@vital-design/icon-clear',
      '@vital-design/icon-close',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/combobox/Combobox.tsx',
        type: 'registry:ui',
      },
      {
        path: 'src-v2/components/combobox/ComboboxTagsValue.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'command',
    type: 'registry:ui',
    title: 'Command',
    description:
      'Composable command palette primitive with input, list, and items',
    dependencies: [
      '@radix-ui/react-icons',
      'cmdk',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-constants',
      '@vital-design/icon-search',
      '@vital-design/icon-spinner',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/command/Command.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'cascader',
    type: 'registry:ui',
    title: 'Cascader',
    description: 'Nested path picker for hierarchical option lists',
    dependencies: [
      '@base-ui/react',
      '@radix-ui/react-icons',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/command',
      '@vital-design/utils',
      '@vital-design/icon-chevron',
      '@vital-design/icon-clear',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/cascader/Cascader.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'popover',
    type: 'registry:ui',
    title: 'Popover',
    description:
      'Floating panel anchored to a trigger; for tooltips with rich content, profile cards, and contextual overlays',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/popover/Popover.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'dropdown-menu',
    type: 'registry:ui',
    title: 'Dropdown Menu',
    description:
      'Action menu with checkbox items, radio items, and submenus',
    dependencies: [
      '@base-ui/react',
      '@radix-ui/react-icons',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-check',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/dropdown-menu/DropdownMenu.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'dialog',
    type: 'registry:ui',
    title: 'Dialog',
    description:
      'Accessible modal dialog with composed trigger, overlay, popup, header, body, and footer parts',
    dependencies: [
      '@base-ui/react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-close',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/dialog/Dialog.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'slider',
    type: 'registry:ui',
    title: 'Slider',
    description:
      'Simple slider component built on Base UI primitives',
    dependencies: ['@base-ui/react', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/slider/Slider.tsx',
        type: 'registry:ui',
      },
    ],
  },
] satisfies VitalRegistryItem[];
