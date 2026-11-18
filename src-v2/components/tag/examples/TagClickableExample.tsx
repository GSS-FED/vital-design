'use client';

import { Tag } from '@/components/tag/Tag';
import { FlagIcon } from '@/icons/FlagIcon';
import { useState } from 'react';

export function TagClickableExample() {
  const [lastClicked, setLastClicked] = useState<string>();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag onClick={() => setLastClicked('Design')}>Design</Tag>
      <Tag
        icon={<FlagIcon />}
        onClick={() => setLastClicked('Urgent')}
      >
        Urgent
      </Tag>
      {lastClicked && (
        <span className="text-sm text-grayscale-opacity-600">
          Clicked: {lastClicked}
        </span>
      )}
    </div>
  );
}
