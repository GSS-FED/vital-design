import type { VitalRegistryItem } from './types';
import { vitalThemeCssVars } from './vital-theme-vars';

const iconFiles = [
  {
    name: 'icon-check',
    title: 'Check Icon',
    path: 'src-v2/icons/CheckIcon.tsx',
    target: 'src/components/icons/CheckIcon.tsx',
  },
  {
    name: 'icon-chevron',
    title: 'Chevron Icons',
    path: 'src-v2/icons/ChevronIcon.tsx',
    target: 'src/components/icons/ChevronIcon.tsx',
  },
  {
    name: 'icon-clear',
    title: 'Clear Icon',
    path: 'src-v2/icons/ClearIcon.tsx',
    target: 'src/components/icons/ClearIcon.tsx',
  },
  {
    name: 'icon-close',
    title: 'Close Icon',
    path: 'src-v2/icons/CloseIcon.tsx',
    target: 'src/components/icons/CloseIcon.tsx',
  },
  {
    name: 'icon-disabled',
    title: 'Disabled Icon',
    path: 'src-v2/icons/DisabledIcon.tsx',
    target: 'src/components/icons/DisabledIcon.tsx',
  },
  {
    name: 'icon-eye',
    title: 'Eye Icon',
    path: 'src-v2/icons/EyeIcon.tsx',
    target: 'src/components/icons/EyeIcon.tsx',
  },
  {
    name: 'icon-eye-slash',
    title: 'Eye Slash Icon',
    path: 'src-v2/icons/EyeSlashIcon.tsx',
    target: 'src/components/icons/EyeSlashIcon.tsx',
  },
  {
    name: 'icon-flag',
    title: 'Flag Icon',
    path: 'src-v2/icons/FlagIcon.tsx',
    target: 'src/components/icons/FlagIcon.tsx',
  },
  {
    name: 'icon-minus',
    title: 'Minus Icon',
    path: 'src-v2/icons/MinusIcon.tsx',
    target: 'src/components/icons/MinusIcon.tsx',
  },
  {
    name: 'icon-search',
    title: 'Search Icon',
    path: 'src-v2/icons/SearchIcon.tsx',
    target: 'src/components/icons/SearchIcon.tsx',
  },
  {
    name: 'icon-spinner',
    title: 'Spinner Icon',
    path: 'src-v2/icons/SpinnerIcon.tsx',
    target: 'src/components/icons/SpinnerIcon.tsx',
  },
  {
    name: 'icon-user',
    title: 'User Icon',
    path: 'src-v2/icons/UserIcon.tsx',
    target: 'src/components/icons/UserIcon.tsx',
  },
] as const;

const iconItems = iconFiles.map((icon) => ({
  name: icon.name,
  type: 'registry:ui',
  title: icon.title,
  description: `${icon.title} component`,
  files: [
    {
      path: icon.path,
      type: 'registry:ui',
      target: icon.target,
    },
  ],
})) satisfies VitalRegistryItem[];

export const base = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'Utils',
    description: 'Utility functions including cn() for class merging',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [{ path: 'src-v2/utils/cn.ts', type: 'registry:lib' }],
  },
  {
    name: 'vital-theme',
    type: 'registry:theme',
    title: 'Vital Design Theme',
    description:
      'CSS variables and Tailwind v4 theme tokens for vital-design components',
    cssVars: vitalThemeCssVars,
    css: {
      '@custom-variant not-disabled (&:not(:disabled))': {},
      '@layer base': {
        '*, *::before, *::after': {
          'box-sizing': 'border-box',
        },
      },
    },
  },
  {
    name: 'vital-design-base',
    type: 'registry:base',
    title: 'Vital Design Base',
    description:
      'One-command setup for Vital Design: installs theme, utils, and icons',
    registryDependencies: [
      '@vital-design/vital-theme',
      '@vital-design/utils',
      '@vital-design/vital-icons',
    ],
  },
  ...iconItems,
  {
    name: 'vital-icons',
    type: 'registry:ui',
    title: 'Vital Icons',
    description: 'Custom SVG icon components',
    files: iconFiles.map((icon) => ({
      path: icon.path,
      type: 'registry:ui',
      target: icon.target,
    })),
  },
] satisfies VitalRegistryItem[];
