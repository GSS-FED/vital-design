import type { Avatar } from '@/components/avatar/Avatar';
import type { Tag } from '@/components/tag/Tag';
import type { ComponentProps } from 'react';
import type { GroupingConfig } from './group-tree';

export type AvatarColor = ComponentProps<typeof Avatar>['color'];
export type TagColor = ComponentProps<typeof Tag>['color'];

export type TaskStatus = 'todo' | 'doing' | 'review' | 'done';

export interface Person {
  id: string;
  name: string;
  color: AvatarColor;
}

export interface TagOption {
  id: string;
  label: string;
}

export interface ReviewTask {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  collaboratorIds: string[];
  /** YYYY/MM/DD, or empty. */
  due: string;
  tagIds: string[];
  note: string;
}

export const STATUS_ORDER: TaskStatus[] = [
  'todo',
  'doing',
  'review',
  'done',
];

export const STATUS_META: Record<
  TaskStatus,
  { label: string; color: TagColor }
> = {
  todo: { label: '待填寫', color: 'default' },
  doing: { label: '進行中', color: 'blue' },
  review: { label: '待覆核', color: 'gold' },
  done: { label: '已完成', color: 'green' },
};

export const PEOPLE: Person[] = [
  { id: 'lin', name: '林○方', color: 'tiffany' },
  { id: 'zhang', name: '張○安', color: 'orange' },
  { id: 'chen', name: '陳○思', color: 'blue' },
  { id: 'huang', name: '黃○鋪', color: 'purple' },
  { id: 'kang', name: '康○成', color: 'green' },
  { id: 'cai', name: '蔡○寧', color: 'pink' },
];

/** Projects that already have tasks, in display order. */
export const PROJECT_ORDER = ['環境盤查', '社會參與'] as const;

/**
 * A project with no tasks yet. Kept in the tree so grouping can show a
 * group before any row exists. TanStack grouping cannot.
 */
export const EMPTY_PROJECTS = ['治理與揭露'] as const;

export const TAG_OPTIONS: TagOption[] = [
  { id: 'scope1', label: '範疇一' },
  { id: 'audit', label: '需稽核' },
  { id: 'gri', label: 'GRI' },
  { id: 'pilot', label: '試行' },
];

/**
 * Fields the 分群 menu offers, in menu order. The table does not assume
 * these keys; any field on the row can be listed here.
 */
export const reviewGroupingConfig: GroupingConfig = {
  project: {
    label: '專案',
    order: PROJECT_ORDER,
    empty: EMPTY_PROJECTS,
  },
  status: {
    label: '狀態',
    order: STATUS_ORDER,
    title: (value) =>
      STATUS_META[value as TaskStatus]?.label ?? value,
  },
  collaboratorIds: { label: '協作者' },
  due: { label: '期限' },
};

export const reviewTasks: ReviewTask[] = [
  {
    id: 'ghg',
    title: '溫室氣體盤查',
    project: '環境盤查',
    status: 'review',
    collaboratorIds: ['lin', 'zhang', 'chen', 'huang'],
    due: '2026/03/18',
    tagIds: ['scope1', 'audit'],
    note: '範疇一尚缺柴油用量，三月補件後再送審',
  },
  {
    id: 'water',
    title: '水資源管理',
    project: '環境盤查',
    status: 'todo',
    collaboratorIds: ['chen'],
    due: '2026/01/09',
    tagIds: [],
    note: '',
  },
  {
    id: 'waste',
    title: '廢棄物清運',
    project: '環境盤查',
    status: 'done',
    collaboratorIds: ['kang', 'cai'],
    due: '2026/06/02',
    tagIds: [],
    note: '清運商合約已更新',
  },
  {
    id: 'supply',
    title: '供應鏈問卷',
    project: '社會參與',
    status: 'doing',
    collaboratorIds: ['lin', 'zhang', 'huang', 'kang', 'cai'],
    due: '2026/02/14',
    tagIds: ['gri'],
    note: '回覆率 46%',
  },
  {
    id: 'energy',
    title: '能源管理',
    project: '環境盤查',
    status: 'review',
    collaboratorIds: ['zhang', 'kang'],
    due: '2026/04/30',
    tagIds: ['scope1'],
    note: '',
  },
  {
    id: 'bio',
    title: '生物多樣性',
    project: '環境盤查',
    status: 'todo',
    collaboratorIds: ['huang', 'chen', 'cai'],
    due: '2026/01/22',
    tagIds: ['pilot'],
    note: '場址清單待補',
  },
  {
    id: 'safety',
    title: '職業安全',
    project: '社會參與',
    status: 'doing',
    collaboratorIds: ['cai'],
    due: '2026/05/11',
    tagIds: ['audit'],
    note: '教育訓練場次未排',
  },
  {
    id: 'community',
    title: '社區參與',
    project: '社會參與',
    status: 'done',
    collaboratorIds: ['lin', 'chen', 'kang', 'cai'],
    due: '2026/02/28',
    tagIds: ['gri'],
    note: '上半年活動已結案',
  },
];
