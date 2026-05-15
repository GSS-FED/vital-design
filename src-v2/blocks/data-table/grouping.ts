import type { Row } from '@tanstack/react-table';

export function partitionRows<TData>(
  rows: Row<TData>[],
  getKey: (row: Row<TData>) => string,
): Map<string, Row<TData>[]> {
  const out = new Map<string, Row<TData>[]>();
  for (const row of rows) {
    const key = getKey(row);
    const bucket = out.get(key);
    if (bucket) bucket.push(row);
    else out.set(key, [row]);
  }
  return out;
}
