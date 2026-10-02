import type { VitalRegistryItem } from './types';

export const hooks = [
  {
    name: 'use-debounce-value',
    type: 'registry:hook',
    title: 'useDebounceValue',
    description: 'Hook for debouncing values with customizable delay',
    files: [
      {
        path: 'src-v2/hooks/useDebounceValue.ts',
        type: 'registry:hook',
      },
    ],
  },
  {
    name: 'use-is-mobile',
    type: 'registry:hook',
    title: 'useIsMobile',
    description:
      'Hook that tracks whether the viewport is below the mobile breakpoint (768px)',
    files: [
      {
        path: 'src-v2/hooks/useIsMobile.ts',
        type: 'registry:hook',
      },
    ],
  },
] satisfies VitalRegistryItem[];
