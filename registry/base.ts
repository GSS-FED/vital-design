import type { VitalRegistryItem } from './types';
import { vitalThemeCssVars } from './vital-theme-vars';

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
  },
  {
    name: 'vital-constants',
    type: 'registry:lib',
    title: 'Vital Constants',
    description: 'Mask constants for scroll containers',
    files: [
      {
        path: 'src-v2/constants/mask.ts',
        type: 'registry:lib',
        target: 'src/lib/constants/mask.ts',
      },
      {
        path: 'src-v2/constants/index.ts',
        type: 'registry:lib',
        target: 'src/lib/constants/index.ts',
      },
    ],
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
      '@vital-design/vital-constants',
    ],
  },
  {
    name: 'vital-icons',
    type: 'registry:lib',
    title: 'Vital Icons',
    description: 'Custom SVG icon components',
    files: [
      {
        path: 'src-v2/icons/CheckIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/CheckIcon.tsx',
      },
      {
        path: 'src-v2/icons/ChevronIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/ChevronIcon.tsx',
      },
      {
        path: 'src-v2/icons/ClearIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/ClearIcon.tsx',
      },
      {
        path: 'src-v2/icons/CloseIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/CloseIcon.tsx',
      },
      {
        path: 'src-v2/icons/DisabledIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/DisabledIcon.tsx',
      },
      {
        path: 'src-v2/icons/EyeIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/EyeIcon.tsx',
      },
      {
        path: 'src-v2/icons/EyeSlashIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/EyeSlashIcon.tsx',
      },
      {
        path: 'src-v2/icons/FlagIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/FlagIcon.tsx',
      },
      {
        path: 'src-v2/icons/MinusIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/MinusIcon.tsx',
      },
      {
        path: 'src-v2/icons/SearchIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/SearchIcon.tsx',
      },
      {
        path: 'src-v2/icons/SpinnerIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/SpinnerIcon.tsx',
      },
      {
        path: 'src-v2/icons/UserIcon.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/UserIcon.tsx',
      },
      {
        path: 'src-v2/icons/index.tsx',
        type: 'registry:lib',
        target: 'src/lib/icons/index.tsx',
      },
    ],
  },
] satisfies VitalRegistryItem[];
