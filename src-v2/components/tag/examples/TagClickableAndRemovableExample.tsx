'use client';

import { Tag } from '@/components/tag/Tag';
import { FlagIcon } from '@/icons/FlagIcon';
import { useState } from 'react';

export function TagClickableAndRemovableExample() {
  const [tags, setTags] = useState(['Design', 'Urgent']);
  const [lastClicked, setLastClicked] = useState<string>();
  const remove = (tag: string) =>
    setTags((current) => current.filter((item) => item !== tag));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          icon={tag === 'Urgent' ? <FlagIcon /> : undefined}
          onClick={() => setLastClicked(tag)}
          onRemove={() => remove(tag)}
        >
          {tag}
        </Tag>
      ))}
      {lastClicked && (
        <span className="text-sm text-grayscale-opacity-600">
          Clicked: {lastClicked}
        </span>
      )}
    </div>
  );
}
