'use client';

import {
  Button,
  type GhostButtonProps,
} from '@/components/button/Button';

const themes: { theme: GhostButtonProps['theme']; label: string }[] =
  [
    { theme: 'primary', label: 'Primary' },
    { theme: 'default', label: 'Default' },
    { theme: 'success', label: 'Success' },
    { theme: 'info', label: 'Info' },
    { theme: 'warning', label: 'Warning' },
    { theme: 'alarm', label: 'Alarm' },
  ];

export function ButtonGhostButtonExample() {
  return (
    <div className="flex flex-wrap gap-5">
      {themes.map(({ theme, label }) => (
        <div
          key={theme}
          className="grid grid-rows-4 justify-items-center gap-5"
        >
          <Button variant="ghost" theme={theme} size="lg">
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="md">
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="lg" disabled>
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="md" disabled>
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}
