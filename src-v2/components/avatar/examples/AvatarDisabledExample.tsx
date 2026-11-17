'use client';

import { Avatar } from '@/components/avatar/Avatar';

export function AvatarDisabledExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xs" disabled alt="Disabled avatar" />
      <Avatar size="sm" disabled alt="Disabled avatar" />
      <Avatar size="md" disabled alt="Disabled avatar" />
      <Avatar size="lg" disabled alt="Disabled avatar" />
      <Avatar size="xl" disabled alt="Disabled avatar" />
    </div>
  );
}
