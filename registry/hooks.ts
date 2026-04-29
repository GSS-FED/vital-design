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
    name: 'use-scroll-mask',
    type: 'registry:hook',
    title: 'useScrollMask',
    description:
      'Hook for applying edge fades to scrollable viewports',
    files: [
      {
        path: 'src-v2/hooks/useScrollMask.ts',
        type: 'registry:hook',
      },
    ],
  },
] satisfies VitalRegistryItem[];
