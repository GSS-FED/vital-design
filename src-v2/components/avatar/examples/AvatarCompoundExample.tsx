'use client';

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from '@/components/avatar/Avatar';

export function AvatarCompoundExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AvatarRoot color="blue" size="lg">
        <AvatarImage src="/images/ray.jpg" alt="Ray" />
        <AvatarFallback color="blue">RA</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot color="tiffany" size="lg">
        <AvatarFallback color="tiffany">SC</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
