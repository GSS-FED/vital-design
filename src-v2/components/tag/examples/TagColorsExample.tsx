'use client';

import { Tag } from '@/components/tag/Tag';

const colors = [
  'default',
  'teal',
  'olive',
  'brown',
  'rose',
  'indigo',
  'blue',
  'green',
  'gold',
  'red',
  'purple',
  'navy',
] as const;

export function TagColorsExample() {
  return (
    <div className="grid gap-3">
      {(['tint', 'solid'] as const).map((colorVariant) => (
        <div key={colorVariant} className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Tag
              key={color}
              color={color}
              colorVariant={colorVariant}
            >
              {color}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
