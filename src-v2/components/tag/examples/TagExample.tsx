'use client';

import { Tag } from '@/components/tag/Tag';

export function TagExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag color="blue" colorVariant="tint">
        Design
      </Tag>
      <Tag color="green" colorVariant="tint">
        Development
      </Tag>
      <Tag color="gold" colorVariant="tint">
        Marketing
      </Tag>
    </div>
  );
}
