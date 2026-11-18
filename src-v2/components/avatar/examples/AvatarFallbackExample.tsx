'use client';

import { Avatar } from '@/components/avatar/Avatar';

export function AvatarFallbackExample() {
  return (
    <div className="flex flex-wrap items-start gap-8 text-xs text-grayscale-opacity-600">
      <figure className="flex flex-col items-center gap-2">
        <Avatar />
        <figcaption>Default icon</figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <Avatar name="Vittal Design" fallback="BZ" />
        <figcaption>fallback</figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <Avatar name="Vittal Design" />
        <figcaption>name only</figcaption>
      </figure>
    </div>
  );
}
