'use client';

import { Avatar } from '@/components/avatar/Avatar';

export function AvatarBorderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar bordered={false} />
      <Avatar />
    </div>
  );
}
