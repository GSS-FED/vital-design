import type { Avatar } from '@/components/avatar/Avatar';
import type { Tag } from '@/components/tag/Tag';
import type { ComponentProps } from 'react';

export type AvatarColor = ComponentProps<typeof Avatar>['color'];
export type TagColor = ComponentProps<typeof Tag>['color'];

export type TaskStatus = 'todo' | 'doing' | 'review' | 'done';

export interface Person {
  id: string;
  name: string;
  color: AvatarColor;
}

export interface ReviewTask {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  collaboratorIds: string[];
  due: string;
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

/**
 * Optional display for one grouping key. The key itself is a field on
 * the row. Without this, the raw value is the title, in first-seen order.
 */
export type GroupingKeyConfig = {
  title?: (value: string) => string;
  /** Preferred order. Values outside this list follow, in first-seen order. */
  order?: readonly string[];
  /**
   * Groups to show with zero rows. Only used when the key is outermost,
   * so an empty group is not repeated under every parent.
   */
  empty?: readonly string[];
};

/** A field the grouping menus can use. `id` is the row key. */
export type GroupingFieldOption = {
  id: string;
  label: string;
};

/**
 * Fields the 顯示欄位 card lists. `locked` fields stay visible and
 * their checkbox cannot be changed. Select and actions are chrome,
 * not fields.
 */
export const COLUMN_FIELDS = [
  { id: 'title', label: '任務', locked: true },
  { id: 'status', label: '狀態', locked: false },
  { id: 'collaborators', label: '協作者', locked: false },
  { id: 'due', label: '期限', locked: false },
  { id: 'note', label: '備註', locked: false },
] as const;

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

/** Display hints for this sample. The table does not assume these keys. */
export const reviewGroupingConfig: Record<string, GroupingKeyConfig> =
  {
    project: {
      order: PROJECT_ORDER,
      empty: EMPTY_PROJECTS,
    },
    status: {
      order: STATUS_ORDER,
      title: (value) =>
        STATUS_META[value as TaskStatus]?.label ?? value,
    },
  };

/** Labels for known row keys. Any other key uses its own name. */
export const FIELD_LABELS: Record<string, string> = {
  title: '任務',
  project: '專案',
  status: '狀態',
  collaboratorIds: '協作者',
  due: '期限',
  note: '備註',
};

/** Every field present on the rows, in first-seen order. */
export function fieldsFromRows(
  rows: readonly ReviewTask[],
): GroupingFieldOption[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (seen.has(key)) continue;
      seen.add(key);
      ids.push(key);
    }
  }
  return ids.map((id) => ({
    id,
    label: FIELD_LABELS[id] ?? id,
  }));
}

export const reviewTasks: ReviewTask[] = [
  {
    id: 'ghg',
    title: '溫室氣體盤查',
    project: '環境盤查',
    status: 'review',
    collaboratorIds: ['lin', 'zhang', 'chen', 'huang'],
    due: '2026/03/18',
    note: '範疇一尚缺柴油用量，三月補件後再送審',
  },
  {
    id: 'water',
    title: '水資源管理',
    project: '環境盤查',
    status: 'todo',
    collaboratorIds: ['chen'],
    due: '2026/01/09',
    note: '',
  },
  {
    id: 'waste',
    title: '廢棄物清運',
    project: '環境盤查',
    status: 'done',
    collaboratorIds: ['kang', 'cai'],
    due: '2026/06/02',
    note: '清運商合約已更新',
  },
  {
    id: 'supply',
    title: '供應鏈問卷',
    project: '社會參與',
    status: 'doing',
    collaboratorIds: ['lin', 'zhang', 'huang', 'kang', 'cai'],
    due: '2026/02/14',
    note: '回覆率 46%',
  },
  {
    id: 'energy',
    title: '能源管理',
    project: '環境盤查',
    status: 'review',
    collaboratorIds: ['zhang', 'kang'],
    due: '2026/04/30',
    note: '',
  },
  {
    id: 'bio',
    title: '生物多樣性',
    project: '環境盤查',
    status: 'todo',
    collaboratorIds: ['huang', 'chen', 'cai'],
    due: '2026/01/22',
    note: '場址清單待補',
  },
  {
    id: 'safety',
    title: '職業安全',
    project: '社會參與',
    status: 'doing',
    collaboratorIds: ['cai'],
    due: '2026/05/11',
    note: '教育訓練場次未排',
  },
  {
    id: 'community',
    title: '社區參與',
    project: '社會參與',
    status: 'done',
    collaboratorIds: ['lin', 'chen', 'kang', 'cai'],
    due: '2026/02/28',
    note: '上半年活動已結案',
  },
];

export type ReviewGroupNode = {
  kind: 'group';
  id: string;
  /** Zero is the outermost group. The next field is one deeper. */
  depth: number;
  /** True when this field is the last one in the grouping data. */
  leaf: boolean;
  /**
   * Field values from the root down to this group.
   * Arrays stay arrays so a new row can copy them.
   */
  values: Record<string, unknown>;
  title: string;
  count: number;
  subRows: ReviewNode[];
};

export type ReviewTaskNode = {
  kind: 'task';
  task: ReviewTask;
};

export type ReviewNode = ReviewGroupNode | ReviewTaskNode;

function groupValue(task: ReviewTask, key: string): string {
  const value = (task as unknown as Record<string, unknown>)[key];
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return `${value}`;
  }
  if (Array.isArray(value)) {
    const parts: string[] = [];
    for (const item of value) {
      if (typeof item === 'string') parts.push(item);
    }
    return parts.join('、');
  }
  return '';
}

function titlesFor(
  config: GroupingKeyConfig | undefined,
  buckets: ReadonlyMap<string, ReviewTask[]>,
  depth: number,
): string[] {
  const present = [...buckets.keys()];
  const empty = depth === 0 ? [...(config?.empty ?? [])] : [];
  if (!config?.order) {
    const seen = new Set(present);
    return [...present, ...empty.filter((value) => !seen.has(value))];
  }

  const reserved = new Set<string>([...config.order, ...empty]);
  const known = config.order.filter((value) => buckets.has(value));
  const extra = present.filter((value) => !reserved.has(value));
  return [...known, ...extra, ...empty];
}

function groupLevel(
  tasks: readonly ReviewTask[],
  keys: readonly string[],
  config: Readonly<Record<string, GroupingKeyConfig>>,
  depth: number,
  parentId: string,
  parentValues: Record<string, unknown>,
): ReviewNode[] {
  const key = keys[depth];
  if (!key) {
    return tasks.map((task) => ({ kind: 'task', task }));
  }

  const meta = config[key];
  const buckets = new Map<string, ReviewTask[]>();
  for (const task of tasks) {
    const value = groupValue(task, key);
    const bucket = buckets.get(value) ?? [];
    bucket.push(task);
    buckets.set(value, bucket);
  }

  const leaf = depth === keys.length - 1;

  return titlesFor(meta, buckets, depth).map((value) => {
    const bucket = buckets.get(value) ?? [];
    const stored =
      bucket[0] == null
        ? value
        : (bucket[0] as unknown as Record<string, unknown>)[key];
    const values = { ...parentValues, [key]: stored ?? value };
    const id = parentId
      ? `${parentId}/${key}:${value}`
      : `${key}:${value}`;
    const subRows = leaf
      ? bucket.map((task): ReviewTaskNode => ({ kind: 'task', task }))
      : groupLevel(bucket, keys, config, depth + 1, id, values);

    return {
      kind: 'group' as const,
      id,
      depth,
      leaf,
      values,
      title: meta?.title?.(value) ?? value,
      count: bucket.length,
      subRows,
    };
  });
}

/**
 * Groups already-filtered, already-sorted tasks.
 * `keys` is the level list, outer first. `[]` stays a flat list.
 */
export function buildReviewTree(
  tasks: readonly ReviewTask[],
  keys: readonly string[],
  config: Readonly<Record<string, GroupingKeyConfig>> = {},
): ReviewNode[] {
  return groupLevel(tasks, keys, config, 0, '', {});
}
