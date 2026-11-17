'use client';

import { Tag } from '@/components/tag/Tag';
import { FlagIcon } from '@/icons/FlagIcon';
import { useState } from 'react';

const tags = [
  { label: 'Design', icon: undefined },
  { label: 'Urgent', icon: <FlagIcon /> },
];

export function TagSelectedExample() {
  const [selected, setSelected] = useState<string | undefined>(
    'Design',
  );

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ label, icon }) => (
        <Tag
          key={label}
          icon={icon}
          selected={selected === label}
          onClick={() =>
            setSelected((current) =>
              current === label ? undefined : label,
            )
          }
        >
          {label}
        </Tag>
      ))}
    </div>
  );
}
