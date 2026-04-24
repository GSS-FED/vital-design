import type { VitalRegistryItem } from './types';

export const ui = [
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
      {
        path: 'src-v2/components/avatar/AvatarConstants.ts',
        type: 'registry:lib',
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
      '@vital-design/icon-spinner',
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
    dependencies: [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
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
        path: 'src-v2/components/input/textInput/TextInput.tsx',
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
        path: 'src-v2/components/input/textareaInput/TextareaInput.tsx',
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
        path: 'src-v2/components/input/passwordInput/PasswordInput.tsx',
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
    name: 'command',
    type: 'registry:ui',
    title: 'Command',
    description:
      'Composable command menu primitive with inline search, groups, and loading states',
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
    name: 'select',
    type: 'registry:ui',
    title: 'Select',
    description:
      'Compound select component with single/multiple selection support',
    dependencies: [
      '@base-ui/react',
      '@floating-ui/react',
      'clsx',
      'tailwind-merge',
    ],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/icon-chevron',
      '@vital-design/icon-clear',
      '@vital-design/checkbox',
      '@vital-design/search-bar',
      '@vital-design/tag',
      '@vital-design/mask',
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
    name: 'tree-select',
    type: 'registry:ui',
    title: 'Tree Select',
    description:
      'Hierarchical tree selection component with search and infinite loading',
    dependencies: ['@radix-ui/react-icons', 'clsx', 'tailwind-merge'],
    registryDependencies: [
      '@vital-design/utils',
      '@vital-design/vital-constants',
      '@vital-design/icon-spinner',
      '@vital-design/text-input',
      '@vital-design/vital-theme',
    ],
    files: [
      {
        path: 'src-v2/components/tree-select/TreeSelect.tsx',
        type: 'registry:ui',
      },
    ],
  },
] satisfies VitalRegistryItem[];
