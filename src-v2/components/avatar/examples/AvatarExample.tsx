'use client';

import { Avatar } from '@/components/avatar/Avatar';

export function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/images/ray.jpg" alt="Ray" name="Ray" size="lg" />
      <Avatar name="Arthur Lu" color="blue" size="lg" />
      <Avatar name="Sean Chen" color="tiffany" size="lg" />
      <Avatar size="lg" />
    </div>
  );
}
