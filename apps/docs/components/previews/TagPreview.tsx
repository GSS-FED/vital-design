'use client';

import { Tag } from '@/components/tag/Tag';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function TagPreview() {
  return (
    <ComponentPreview name="TagPreview">
      <Tag color="blue" colorVariant="tint">
        Design
      </Tag>
      <Tag color="green" colorVariant="tint">
        Development
      </Tag>
      <Tag color="gold" colorVariant="tint">
        Marketing
      </Tag>
    </ComponentPreview>
  );
}

export function TagColorsPreview() {
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
  return (
    <ComponentPreview name="TagColorsPreview">
      {colors.map((color) => (
        <Tag key={color} color={color} colorVariant="tint">
          {color}
        </Tag>
      ))}
    </ComponentPreview>
  );
}

export function TagSolidPreview() {
  const colors = [
    'default',
    'teal',
    'blue',
    'green',
    'gold',
    'red',
  ] as const;
  return (
    <ComponentPreview name="TagSolidPreview">
      {colors.map((color) => (
        <Tag key={color} color={color} colorVariant="solid">
          {color}
        </Tag>
      ))}
    </ComponentPreview>
  );
}

export function TagRemovablePreview() {
  const [tags, setTags] = useState([
    'React',
    'TypeScript',
    'Tailwind',
  ]);
  return (
    <ComponentPreview name="TagRemovablePreview">
      {tags.map((tag) => (
        <Tag
          key={tag}
          color="blue"
          colorVariant="tint"
          removable
          onRemove={() =>
            setTags((prev) => prev.filter((t) => t !== tag))
          }
        >
          {tag}
        </Tag>
      ))}
    </ComponentPreview>
  );
}
