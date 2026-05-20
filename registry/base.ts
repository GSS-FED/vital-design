import type { VitalRegistryItem } from './types';
import { vitalThemeCssVars } from './vital-theme-vars';

type IconFile = { path: string; target: string };
const iconFile = (name: string): IconFile => ({
  path: `src-v2/icons/${name}.tsx`,
  target: `src/components/icons/${name}.tsx`,
});

const iconGroups = [
  {
    name: 'icon-calendar',
    title: 'Calendar Icon',
    files: ['CalendarIcon'],
  },
  { name: 'icon-check', title: 'Check Icon', files: ['CheckIcon'] },
  {
    name: 'icon-chevron-down',
    title: 'Chevron Down Icon',
    files: ['ChevronDownIcon'],
  },
  {
    name: 'icon-chevron-up',
    title: 'Chevron Up Icon',
    files: ['ChevronUpIcon'],
  },
  {
    name: 'icon-chevron-left',
    title: 'Chevron Left Icon',
    files: ['ChevronLeftIcon'],
  },
  {
    name: 'icon-chevron-right',
    title: 'Chevron Right Icon',
    files: ['ChevronRightIcon'],
  },
  {
    name: 'icon-chevron-double-left',
    title: 'Chevron Double Left Icon',
    files: ['ChevronDoubleLeftIcon'],
  },
  {
    name: 'icon-chevron-double-right',
    title: 'Chevron Double Right Icon',
    files: ['ChevronDoubleRightIcon'],
  },
  { name: 'icon-clear', title: 'Clear Icon', files: ['ClearIcon'] },
  { name: 'icon-clock', title: 'Clock Icon', files: ['ClockIcon'] },
  { name: 'icon-close', title: 'Close Icon', files: ['CloseIcon'] },
  {
    name: 'icon-disabled',
    title: 'Disabled Icon',
    files: ['DisabledIcon'],
  },
  {
    name: 'icon-ellipsis',
    title: 'Ellipsis Icon',
    files: ['EllipsisIcon'],
  },
  { name: 'icon-eye', title: 'Eye Icon', files: ['EyeIcon'] },
  {
    name: 'icon-eye-slash',
    title: 'Eye Slash Icon',
    files: ['EyeSlashIcon'],
  },
  { name: 'icon-flag', title: 'Flag Icon', files: ['FlagIcon'] },
  { name: 'icon-minus', title: 'Minus Icon', files: ['MinusIcon'] },
  {
    name: 'icon-search',
    title: 'Search Icon',
    files: ['SearchIcon'],
  },
  {
    name: 'icon-spinner',
    title: 'Spinner Icon',
    files: ['SpinnerIcon'],
  },
  { name: 'icon-user', title: 'User Icon', files: ['UserIcon'] },
] as const;

const iconItems = iconGroups.map((group) => ({
  name: group.name,
  type: 'registry:ui',
  title: group.title,
  description: `${group.title} component`,
  files: group.files.map((name: string) => ({
    ...iconFile(name),
    type: 'registry:ui' as const,
  })),
})) satisfies VitalRegistryItem[];

const allIconFiles = Array.from(
  new Set<string>(iconGroups.flatMap((g) => g.files)),
).map((name) => ({
  ...iconFile(name),
  type: 'registry:ui' as const,
}));

export const base = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'Utils',
    description: 'Utility functions including cn() for class merging',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [{ path: 'src-v2/lib/utils.ts', type: 'registry:lib' }],
  },
  {
    name: 'vital-theme',
    type: 'registry:theme',
    title: 'Vital Design Theme',
    description:
      'CSS variables and Tailwind v4 theme tokens for vital-design components',
    dependencies: ['tw-animate-css'],
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
    files: allIconFiles,
  },
] satisfies VitalRegistryItem[];
