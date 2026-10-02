import type { Avatar } from '@/components/avatar/Avatar';
import type { ComponentProps } from 'react';

export type AvatarColor = ComponentProps<typeof Avatar>['color'];

export interface PersonOption {
  id: string;
  name: string;
  color: AvatarColor;
}

export interface TagOption {
  id: string;
  label: string;
}

export interface EmissionRow {
  id: string;
  source: string;
  factor: string;
  ownerId: string | null;
  tagIds: string[];
  updatedAt: string | null;
}

export const PERSON_OPTIONS: PersonOption[] = [
  { id: 'p1', name: '林○方', color: 'tiffany' },
  { id: 'p2', name: '張○安', color: 'orange' },
  { id: 'p3', name: '陳○思', color: 'blue' },
  { id: 'p4', name: '黃○鋪', color: 'purple' },
  { id: 'p5', name: '康○成', color: 'green' },
];

export const TAG_OPTIONS: TagOption[] = [
  { id: 't-green', label: '綠線線' },
  { id: 't-iso', label: 'ISO' },
  { id: 't-pilot', label: '試行' },
  { id: 't-critical', label: '重點' },
  { id: 't-review', label: '需複核' },
];

export const emissionRows: EmissionRow[] = [
  {
    id: 'r1',
    source: '緊急發電機（柴',
    factor: '柴油 (固)',
    ownerId: null,
    tagIds: ['t-green', 't-iso'],
    updatedAt: '2025/09/22',
  },
  {
    id: 'r2',
    source: '公務車（汽油）',
    factor: '車用汽油（移）',
    ownerId: 'p2',
    tagIds: ['t-pilot'],
    updatedAt: '2025/09/18',
  },
  {
    id: 'r3',
    source: '鍋爐燃燒',
    factor: '天然氣（固）',
    ownerId: 'p1',
    tagIds: [],
    updatedAt: null,
  },
  {
    id: 'r4',
    source: '冷凍冷藏設備',
    factor: 'R-410A 冷媒',
    ownerId: 'p3',
    tagIds: ['t-critical', 't-review'],
    updatedAt: '2025/09/10',
  },
  {
    id: 'r5',
    source: '外購電力',
    factor: '台電電力',
    ownerId: null,
    tagIds: [],
    updatedAt: '2025/08/30',
  },
];
