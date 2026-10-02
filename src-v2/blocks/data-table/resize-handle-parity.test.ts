import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Registry blocks install as self-contained folders, so `data-table-group-01`
 * and `-02` each carry their own copy of the resize handle (same reason
 * `data-table-group-02` carries its own column header). Nothing else stops the
 * copies from drifting apart, so this does.
 *
 * The only permitted difference is the component name.
 */
const ROOT = join(__dirname, 'DataTableResizeHandle.tsx');
const COPIES = [
  join(__dirname, 'data-table-group-01', 'resize-handle.tsx'),
  join(__dirname, 'data-table-group-02', 'resize-handle.tsx'),
];

const normalize = (source: string) =>
  source
    .replace(/DataTableResizeHandleProps/g, 'ResizeHandleProps')
    .replace(/DataTableResizeHandle/g, 'ResizeHandle');

describe('resize handle copies', () => {
  const expected = normalize(readFileSync(ROOT, 'utf8'));

  it.each(COPIES)('%s matches the root handle', (copy) => {
    expect(normalize(readFileSync(copy, 'utf8'))).toBe(expected);
  });
});
