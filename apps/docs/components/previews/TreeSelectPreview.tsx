'use client';

import TreeSelect from '@/components/tree-select/TreeSelect';
import type {
  TreeSelectData,
  TreeSelectRoot,
} from '@/components/tree-select/TreeSelect';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

type Item = { code: string };

const treeData: TreeSelectRoot<Item>[] = [
  {
    label: 'Asia',
    data: [
      {
        id: 'tw',
        displayName: 'Taiwan',
        data: { code: 'TW' },
        children: [
          { id: 'tpe', displayName: 'Taipei', data: { code: 'TPE' } },
          {
            id: 'khh',
            displayName: 'Kaohsiung',
            data: { code: 'KHH' },
          },
        ],
      },
      {
        id: 'jp',
        displayName: 'Japan',
        data: { code: 'JP' },
        children: [
          { id: 'tky', displayName: 'Tokyo', data: { code: 'TKY' } },
          { id: 'osa', displayName: 'Osaka', data: { code: 'OSA' } },
        ],
      },
    ],
  },
];

export function TreeSelectPreview() {
  const [value, setValue] = useState<TreeSelectData<Item>[]>([]);
  return (
    <ComponentPreview>
      <TreeSelect
        data={treeData}
        value={value}
        onChange={setValue}
        placeholder="Select location"
        isEnableSearch
        style={{ width: 240 }}
      />
    </ComponentPreview>
  );
}
