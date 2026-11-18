'use client';

import { Tag } from '@/components/tag/Tag';
import { FlagIcon } from '@/icons/FlagIcon';
import { useState } from 'react';

export function TagRemovableExample() {
  const [tags, setTags] = useState(['Design', 'Urgent']);
  const remove = (tag: string) =>
    setTags((current) => current.filter((item) => item !== tag));

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          icon={tag === 'Urgent' ? <FlagIcon /> : undefined}
          onRemove={() => remove(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
