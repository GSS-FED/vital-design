'use client';

import {
  TreeSelect,
  type TreeSelectItem,
  type TreeSelectValue,
} from '@/blocks/tree-select/components/tree-select';
import { useState } from 'react';

const locationItems: TreeSelectItem[] = [
  {
    label: 'Taiwan',
    parentValue: null,
    value: 'tw',
    hasChildren: true,
  },
  {
    label: 'Japan',
    parentValue: null,
    value: 'jp',
    hasChildren: true,
  },
  { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
  { label: 'Kaohsiung', parentValue: 'tw', value: 'khh' },
  { label: 'Tokyo', parentValue: 'jp', value: 'tky' },
  { label: 'Osaka', parentValue: 'jp', value: 'osa' },
];

export function TreeSelectExample() {
  const [value, setValue] = useState<TreeSelectValue | null>(null);

  return (
    <TreeSelect
      items={locationItems}
      label="Locations"
      value={value}
      onValueChange={setValue}
      placeholder="Select location"
      searchPlaceholder="Search locations"
      emptyMessage="No locations found."
    />
  );
}
