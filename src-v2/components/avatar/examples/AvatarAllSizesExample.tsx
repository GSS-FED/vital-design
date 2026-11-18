'use client';

import { Avatar } from '@/components/avatar/Avatar';

export function AvatarAllSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xs" alt="Extra small" />
      <Avatar size="sm" alt="Small" />
      <Avatar size="md" alt="Medium" />
      <Avatar size="lg" alt="Large" />
      <Avatar size="xl" alt="Extra large" />
    </div>
  );
}
