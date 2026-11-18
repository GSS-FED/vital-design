'use client';

import { Avatar } from '@/components/avatar/Avatar';

const colors = [
  'default',
  'tiffany',
  'green',
  'orange',
  'pink',
  'blue',
  'sky',
  'purple',
  'light-gold',
  'salmon',
  'ice',
  'lavender',
] as const;

export function AvatarColorsExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Avatar key={color} color={color} alt={color} />
      ))}
    </div>
  );
}
