/**
 * One field the table can group by. The key in `GroupingConfig` is the
 * field name on the row; listing it here also offers it in the 分群 menu.
 */
export type GroupingKeyConfig = {
  /** Name in the 分群 menu. */
  label: string;
  /** Group title for a raw field value. Defaults to the value itself. */
  title?: (value: string) => string;
  /** Preferred order. Values outside this list follow, in first-seen order. */
  order?: readonly string[];
  /**
   * Groups to show with zero rows. Only used when the key is outermost,
   * so an empty group is not repeated under every parent.
   */
  empty?: readonly string[];
};

export type GroupingConfig = Readonly<
  Record<string, GroupingKeyConfig>
>;

export type GroupNode<TData> = {
  kind: 'group';
  id: string;
  /** Zero is the outermost group. The next field is one deeper. */
  depth: number;
  /** True when this field is the last one in the grouping keys. */
  leaf: boolean;
  /**
   * Field values from the root down to this group, taken from the first
   * row in it. A row added to this group starts with these values.
   */
  values: Partial<TData>;
  title: string;
  /** Titles from the outermost group down to this one. */
  path: readonly string[];
  count: number;
  subRows: TreeNode<TData>[];
};

export type RowNode<TData> = {
  kind: 'row';
  row: TData;
};

export type TreeNode<TData> = GroupNode<TData> | RowNode<TData>;

function fieldOf(row: unknown, key: string): unknown {
  return typeof row === 'object' && row !== null
    ? (row as Record<string, unknown>)[key]
    : undefined;
}

/** Arrays group by their joined items, so 協作者 groups by the whole set. */
function groupValue(row: unknown, key: string): string {
  const value = fieldOf(row, key);
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return `${value}`;
  }
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === 'string')
      .join('、');
  }
  return '';
}

function groupId(parentId: string, key: string, value: string) {
  return parentId ? `${parentId}/${key}:${value}` : `${key}:${value}`;
}

/** Ids of the groups that hold this row, outer first. */
export function groupIdsOf(
  row: unknown,
  keys: readonly string[],
): string[] {
  const ids: string[] = [];
  for (const key of keys) {
    ids.push(groupId(ids.at(-1) ?? '', key, groupValue(row, key)));
  }
  return ids;
}

function titlesFor<TData>(
  config: GroupingKeyConfig | undefined,
  buckets: ReadonlyMap<string, TData[]>,
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

function groupLevel<TData>(
  rows: readonly TData[],
  keys: readonly string[],
  config: GroupingConfig,
  depth: number,
  parent: Pick<GroupNode<TData>, 'id' | 'values' | 'path'>,
): TreeNode<TData>[] {
  const key = keys[depth];
  if (!key) {
    return rows.map((row) => ({ kind: 'row', row }));
  }

  const meta = config[key];
  const buckets = new Map<string, TData[]>();
  for (const row of rows) {
    const value = groupValue(row, key);
    const bucket = buckets.get(value) ?? [];
    bucket.push(row);
    buckets.set(value, bucket);
  }

  const leaf = depth === keys.length - 1;

  return titlesFor(meta, buckets, depth).map((value) => {
    const bucket = buckets.get(value) ?? [];
    // Keep the stored value (an array stays an array) so a new row can
    // copy it. An empty group only has the raw string.
    const stored =
      bucket.length > 0 ? fieldOf(bucket[0], key) : value;
    const values = {
      ...parent.values,
      [key]: stored,
    } as Partial<TData>;
    const id = groupId(parent.id, key, value);
    const title = meta?.title?.(value) ?? value;
    const path = [...parent.path, title];

    return {
      kind: 'group' as const,
      id,
      depth,
      leaf,
      values,
      title,
      path,
      count: bucket.length,
      subRows: leaf
        ? bucket.map((row): RowNode<TData> => ({ kind: 'row', row }))
        : groupLevel(bucket, keys, config, depth + 1, {
            id,
            values,
            path,
          }),
    };
  });
}

/**
 * Groups already-filtered, already-sorted rows.
 * `keys` is the level list, outer first. `[]` stays a flat list.
 */
export function buildGroupTree<TData>(
  rows: readonly TData[],
  keys: readonly string[],
  config: GroupingConfig = {},
): TreeNode<TData>[] {
  return groupLevel(rows, keys, config, 0, {
    id: '',
    values: {},
    path: [],
  });
}
