import type { VitalRegistryItem } from './types';
import { vitalThemeCssVars } from './vital-theme-vars';

type IconFile = { path: string; target: string };
const iconFile = (name: string): IconFile => ({
  path: `src-v2/icons/${name}.tsx`,
  target: `src/components/icons/${name}.tsx`,
});

const iconGroups = [
  { name: 'icon-bars', title: 'Bars Icon', files: ['BarsIcon'] },
  { name: 'icon-bell', title: 'Bell Icon', files: ['BellIcon'] },
  {
    name: 'icon-bell-slash',
    title: 'Bell Slash Icon',
    files: ['BellSlashIcon'],
  },
  {
    name: 'icon-calendar-days',
    title: 'Calendar Days Icon',
    files: ['CalendarDaysIcon'],
  },
  {
    name: 'icon-caret-down-solid',
    title: 'Caret Down Solid Icon',
    files: ['CaretDownSolidIcon'],
  },
  {
    name: 'icon-caret-up-solid',
    title: 'Caret Up Solid Icon',
    files: ['CaretUpSolidIcon'],
  },
  {
    name: 'icon-caret-left-solid',
    title: 'Caret Left Solid Icon',
    files: ['CaretLeftSolidIcon'],
  },
  {
    name: 'icon-caret-right-solid',
    title: 'Caret Right Solid Icon',
    files: ['CaretRightSolidIcon'],
  },
  // Deprecated alias of icon-caret-down-solid, kept because it shipped before
  // the Solid suffix. Installs both files; CaretDownIcon re-exports the solid one.
  {
    name: 'icon-caret-down',
    title: 'Caret Down Icon (deprecated)',
    files: ['CaretDownIcon', 'CaretDownSolidIcon'],
  },
  // Deprecated alias of icon-caret-up-solid (see icon-caret-down).
  {
    name: 'icon-caret-up',
    title: 'Caret Up Icon (deprecated)',
    files: ['CaretUpIcon', 'CaretUpSolidIcon'],
  },
  { name: 'icon-check', title: 'Check Icon', files: ['CheckIcon'] },
  {
    name: 'icon-check-solid',
    title: 'Check Solid Icon',
    files: ['CheckSolidIcon'],
  },
  {
    name: 'icon-angle-down',
    title: 'Angle Down Icon',
    files: ['AngleDownIcon'],
  },
  {
    name: 'icon-angle-down-solid',
    title: 'Angle Down Solid Icon',
    files: ['AngleDownSolidIcon'],
  },
  {
    name: 'icon-angle-up',
    title: 'Angle Up Icon',
    files: ['AngleUpIcon'],
  },
  {
    name: 'icon-angle-up-solid',
    title: 'Angle Up Solid Icon',
    files: ['AngleUpSolidIcon'],
  },
  {
    name: 'icon-circle-user',
    title: 'Circle User Icon',
    files: ['CircleUserIcon'],
  },
  {
    name: 'icon-angle-left',
    title: 'Angle Left Icon',
    files: ['AngleLeftIcon'],
  },
  {
    name: 'icon-angle-left-solid',
    title: 'Angle Left Solid Icon',
    files: ['AngleLeftSolidIcon'],
  },
  {
    name: 'icon-angle-left-to-line',
    title: 'Angle Left To Line Icon',
    files: ['AngleLeftToLineIcon'],
  },
  {
    name: 'icon-angle-right',
    title: 'Angle Right Icon',
    files: ['AngleRightIcon'],
  },
  {
    name: 'icon-angle-right-solid',
    title: 'Angle Right Solid Icon',
    files: ['AngleRightSolidIcon'],
  },
  {
    name: 'icon-angle-right-to-line',
    title: 'Angle Right To Line Icon',
    files: ['AngleRightToLineIcon'],
  },
  {
    name: 'icon-angles-left',
    title: 'Angles Left Icon',
    files: ['AnglesLeftIcon'],
  },
  {
    name: 'icon-angles-right',
    title: 'Angles Right Icon',
    files: ['AnglesRightIcon'],
  },
  { name: 'icon-clear', title: 'Clear Icon', files: ['ClearIcon'] },
  { name: 'icon-clock', title: 'Clock Icon', files: ['ClockIcon'] },
  { name: 'icon-xmark', title: 'Xmark Icon', files: ['XmarkIcon'] },
  {
    name: 'icon-ban',
    title: 'Ban Icon',
    files: ['BanIcon'],
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
  { name: 'icon-gear', title: 'Gear Icon', files: ['GearIcon'] },
  { name: 'icon-home', title: 'Home Icon', files: ['HomeIcon'] },
  { name: 'icon-inbox', title: 'Inbox Icon', files: ['InboxIcon'] },
  { name: 'icon-info', title: 'Info Icon', files: ['InfoIcon'] },
  {
    name: 'icon-life-ring',
    title: 'Life Ring Icon',
    files: ['LifeRingIcon'],
  },
  { name: 'icon-minus', title: 'Minus Icon', files: ['MinusIcon'] },
  {
    name: 'icon-minus-solid',
    title: 'Minus Solid Icon',
    files: ['MinusSolidIcon'],
  },
  {
    name: 'icon-page-first',
    title: 'Page First Icon',
    files: ['PageFirstIcon'],
  },
  {
    name: 'icon-page-last',
    title: 'Page Last Icon',
    files: ['PageLastIcon'],
  },
  {
    name: 'icon-panel-left',
    title: 'Panel Left Icon',
    files: ['PanelLeftIcon'],
  },
  {
    name: 'icon-planet-ringed',
    title: 'Planet Ringed Icon',
    files: ['PlanetRingedIcon'],
  },
  { name: 'icon-note', title: 'Note Icon', files: ['NoteIcon'] },
  {
    name: 'icon-placeholder',
    title: 'Placeholder Icon',
    files: ['PlaceholderIcon'],
  },
  {
    name: 'icon-placeholder-solid',
    title: 'Placeholder Solid Icon',
    files: ['PlaceholderSolidIcon'],
  },
  { name: 'icon-plus', title: 'Plus Icon', files: ['PlusIcon'] },
  {
    name: 'icon-magnifying-glass',
    title: 'Magnifying Glass Icon',
    files: ['MagnifyingGlassIcon'],
  },
  {
    name: 'icon-shield-check',
    title: 'Shield Check Icon',
    files: ['ShieldCheckIcon'],
  },
  {
    name: 'icon-sidebar',
    title: 'Sidebar Icon',
    files: ['SidebarIcon'],
  },
  {
    name: 'icon-spinner',
    title: 'Spinner Icon',
    files: ['SpinnerIcon'],
  },
  {
    name: 'icon-square-arrow-out-up-right',
    title: 'Square Arrow Out Up Right Icon',
    files: ['SquareArrowOutUpRightIcon'],
  },
  {
    name: 'icon-thumbtack',
    title: 'Thumbtack Icon',
    files: ['ThumbtackIcon'],
  },
  {
    name: 'icon-thumbtack-solid',
    title: 'Thumbtack Solid Icon',
    files: ['ThumbtackSolidIcon'],
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
    dependencies: ['cn'],
    files: [{ path: 'src-v2/lib/utils.ts', type: 'registry:lib' }],
  },
  {
    name: 'vital-theme',
    type: 'registry:theme',
    title: 'Vittal Design Theme',
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
        '*, ::after, ::before, ::backdrop, ::file-selector-button': {
          'border-color': 'var(--border, currentColor)',
        },
      },
    },
  },
  {
    name: 'vital-design-base',
    type: 'registry:base',
    title: 'Vittal Design Base',
    description:
      'One-command setup for Vittal Design: installs theme, utils, and icons',
    registryDependencies: [
      '@vital-design/vital-theme',
      '@vital-design/utils',
      '@vital-design/vital-icons',
    ],
  },
  {
    name: 'vital-design-lint',
    type: 'registry:file',
    title: 'Vital Design Lint',
    description:
      'Design system lint policy for @shadcn/lint (Oxlint): theme tokens only, no unknown Tailwind classes',
    devDependencies: ['@shadcn/lint', 'oxlint'],
    files: [
      {
        path: 'vital-design.lint.json',
        target: '~/vital-design.lint.json',
        type: 'registry:file',
      },
    ],
  },
  ...iconItems,
  {
    name: 'vital-icons',
    type: 'registry:ui',
    title: 'Vittal Icons',
    description: 'Custom SVG icon components',
    files: allIconFiles,
  },
] satisfies VitalRegistryItem[];
