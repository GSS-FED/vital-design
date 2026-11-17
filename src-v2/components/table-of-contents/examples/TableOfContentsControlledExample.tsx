'use client';

import {
  TableOfContents,
  type TableOfContentsItem,
} from '@/components/table-of-contents/TableOfContents';
import { useState } from 'react';

const items: TableOfContentsItem[] = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting started', level: 2 },
  { id: 'install', label: 'Install', level: 3 },
  { id: 'configure', label: 'Configure', level: 3 },
  { id: 'theme', label: 'Theme', level: 3 },
  { id: 'tokens', label: 'Tokens', level: 3 },
  { id: 'icons', label: 'Icons', level: 3 },
  { id: 'fonts', label: 'Fonts', level: 3 },
  { id: 'dark-mode', label: 'Dark mode', level: 3 },
  { id: 'components', label: 'Components', level: 1 },
  { id: 'inputs', label: 'Inputs', level: 2 },
  { id: 'button', label: 'Button', level: 3 },
  { id: 'checkbox', label: 'Checkbox', level: 3 },
  { id: 'select', label: 'Select', level: 3 },
  { id: 'switch', label: 'Switch', level: 3 },
];

export function TableOfContentsControlledExample() {
  const [active, setActive] = useState('introduction');

  return (
    <div className="flex min-h-100 items-start gap-8">
      <ul className="space-y-2 text-sm text-grayscale-opacity-700">
        {items
          .filter((item) => item.level !== 3)
          .map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={
                  item.id === active ? 'text-primary-500' : undefined
                }
              >
                Go to {item.label}
              </button>
            </li>
          ))}
      </ul>
      <TableOfContents
        items={items}
        value={active}
        onValueChange={setActive}
      />
    </div>
  );
}
