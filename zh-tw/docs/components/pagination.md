# Pagination

> Composable page navigation with page links, first and last controls, and ellipsis.

> **尚未翻譯**：此頁尚無繁體中文，以下為英文原文。

## Preview

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { useState } from 'react';

const totalPages = 5;

export function PaginationExample() {
  const [page, setPage] = useState(2);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => setPage(1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
        </PaginationItem>
        {[1, 2, 3, 4, 5].map((value) => (
          <PaginationItem key={value}>
            <PaginationLink
              render={<button type="button" />}
              aria-label={`Page ${value}`}
              isActive={page === value}
              onClick={() => setPage(value)}
            >
              {value}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            render={<button type="button" />}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            render={<button type="button" />}
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Installation

After [configuring the registry](/docs/getting-started/installation), install Pagination:

```bash
npx shadcn@latest add @vital-design/pagination
```

The registry also installs the theme, utilities, and the five icons used by Pagination. You do not need to install the full icon set.

## Usage

Compose a navigation landmark, a list, and a list item for each control. `PaginationLink` renders an anchor by default. Set `isActive` on the current page to add `aria-current="page"`.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

export function PaginationLinksExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1">
            Previous
          </PaginationPrevious>
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === 2}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="?page=3">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Client-side Pagination

For in-place updates, use `render` to compose a native button and keep the current page in your own state. Buttons retain their native Enter and Space behaviour. The preview at the top uses this pattern; its Code tab shows the full example.

Pagination does not calculate page ranges, load data, or own a current-page state. Keep the page count, visible page numbers, and data updates together in the consuming screen.

## More Pages

Use `PaginationEllipsis` for gaps in the visible range. Pass the hidden page numbers and `onPageSelect`. It renders the same button as the other page controls and opens a menu of those pages. This example keeps the current group of five pages visible. Choosing a page inside that group does not move the group. When ellipses appear on both sides, the first and last page numbers stay in those menus; the icon buttons still jump to those pages. Three-digit page numbers expand to fit.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { useState } from 'react';

const totalPages = 200;

export function PaginationMorePagesExample() {
  const [page, setPage] = useState(121);
  const current = Math.min(Math.max(page, 1), totalPages);
  const groupStart = Math.floor((current - 1) / 5) * 5 + 1;
  const groupEnd = Math.min(totalPages, groupStart + 4);
  const hasLeftGap = groupStart > 1;
  const hasRightGap = groupEnd < totalPages;
  const bothGaps = hasLeftGap && hasRightGap;
  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, index) => groupStart + index,
  );
  const leadingPage = hasLeftGap && !bothGaps ? 1 : undefined;
  const trailingPage =
    hasRightGap && !bothGaps ? totalPages : undefined;
  const leftHidden = hasLeftGap
    ? Array.from(
        { length: groupStart - (bothGaps ? 1 : 2) },
        (_, index) => (bothGaps ? 1 : 2) + index,
      )
    : [];
  const rightHidden = hasRightGap
    ? Array.from(
        {
          length: (bothGaps ? totalPages : totalPages - 1) - groupEnd,
        },
        (_, index) => groupEnd + 1 + index,
      )
    : [];

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => setPage(1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
        </PaginationItem>
        {leadingPage !== undefined && (
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              aria-label={`Page ${leadingPage}`}
              isActive={page === leadingPage}
              onClick={() => setPage(leadingPage)}
            >
              {leadingPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {leftHidden.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis
              pages={leftHidden}
              onPageSelect={setPage}
            />
          </PaginationItem>
        )}
        {pages.map((value) => (
          <PaginationItem key={value}>
            <PaginationLink
              render={<button type="button" />}
              aria-label={`Page ${value}`}
              isActive={page === value}
              onClick={() => setPage(value)}
            >
              {value}
            </PaginationLink>
          </PaginationItem>
        ))}
        {rightHidden.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis
              pages={rightHidden}
              onPageSelect={setPage}
            />
          </PaginationItem>
        )}
        {trailingPage !== undefined && (
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              aria-label={`Page ${trailingPage}`}
              isActive={page === trailingPage}
              onClick={() => setPage(trailingPage)}
            >
              {trailingPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            render={<button type="button" />}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            render={<button type="button" />}
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

The preview's Code tab includes its page-range calculation. The calculation stays outside the Pagination primitive.

## First, Last, and Disabled Controls

`PaginationFirst` and `PaginationLast` follow the same API as `PaginationPrevious` and `PaginationNext`. Place each in a `PaginationItem`.

```tsx
<PaginationItem>
  <PaginationFirst
    render={<button type="button" />}
    disabled={page === 1}
    onClick={() => setPage(1)}
  />
</PaginationItem>
<PaginationItem>
  <PaginationLast
    render={<button type="button" />}
    disabled={page === totalPages}
    onClick={() => setPage(totalPages)}
  />
</PaginationItem>
```

Use `disabled` to block click and middle-click activation and remove a control from the tab order. A disabled default anchor also loses its `href` and retains its link semantics with `aria-disabled`. Setting only `aria-disabled` forwards that attribute without blocking activation.

## States

With a single page, every directional control is disabled. In a right-to-left layout, the directional icons mirror.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

const states = [
  { label: 'Single page', page: 1, totalPages: 1 },
  { label: 'Right to left', page: 2, totalPages: 5, dir: 'rtl' },
] as const;

export function PaginationStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map((state) => (
        <div key={state.label} className="contents">
          <span>{state.label}</span>
          <div dir={'dir' in state ? state.dir : undefined}>
            <Pagination aria-label={state.label}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst
                    render={<button type="button" />}
                    disabled={state.page === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    render={<button type="button" />}
                    disabled={state.page === 1}
                  />
                </PaginationItem>
                {Array.from(
                  { length: state.totalPages },
                  (_, index) => index + 1,
                ).map((value) => (
                  <PaginationItem key={value}>
                    <PaginationLink
                      render={<button type="button" />}
                      aria-label={`Page ${value}`}
                      isActive={state.page === value}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    render={<button type="button" />}
                    disabled={state.page === state.totalPages}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    render={<button type="button" />}
                    disabled={state.page === state.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Labels and Router Links

Directional controls show icons by default. Supply children for a visible label and `aria-label` to localise the accessible name.

```tsx
<PaginationPrevious href="?page=1" aria-label="上一頁">
  上一頁
</PaginationPrevious>
<PaginationNext href="?page=3" aria-label="下一頁">
  下一頁
</PaginationNext>
```

Compose a router link through `render`; Pagination keeps link semantics. For example, with Next.js:

```tsx
import { PaginationLink } from '@/components/ui/Pagination';
import Link from 'next/link';

<PaginationLink render={<Link href="/products?page=2" />} isActive>
  2
</PaginationLink>;
```

The single-row table footer is the [Table Pagination](/docs/blocks/table-pagination) block. It places these page controls beside a page jump and a rows-per-page select. When the row is too narrow, the jump field and the page-size select hide.

To build a different footer, combine these parts with [Input](/docs/components/input) and [Select](/docs/components/select). Validate page bounds, and update the page when the page size or result count changes in your screen's state.

## Props

### Pagination, PaginationContent, and PaginationItem

These render `nav`, `ul`, and `li` respectively, forward native props and refs, and accept `className`. `Pagination` defaults to `aria-label="pagination"`; give each navigation landmark a distinct label when a page contains multiple paginators.

### PaginationLink

| Prop        | Type                              | Default | Description                                                                              |
| ----------- | --------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `href`      | `string`                          | —       | Destination for the default anchor                                                       |
| `isActive`  | `boolean`                         | `false` | Highlights the page and sets `aria-current="page"`                                       |
| `disabled`  | `boolean`                         | `false` | Blocks clicks, removes the control from tab order, and omits the default anchor's `href` |
| `render`    | `ReactElement \| render function` | —       | Composes a router link or native button                                                  |
| `children`  | `ReactNode`                       | —       | Page number or custom content                                                            |
| `className` | `string`                          | —       | Additional CSS classes                                                                   |
| `...props`  | Anchor props                      | —       | Native attributes, events, and ref                                                       |

### Directional Controls

`PaginationFirst`, `PaginationPrevious`, `PaginationNext`, and `PaginationLast` accept `PaginationLink` props. Each provides an icon and a default accessible name such as “Go to next page”. Use `children` for an optional visible label and `aria-label` to override the accessible name. Directional icons mirror in RTL layouts.

### PaginationEllipsis

Renders a button that opens a menu of the omitted pages. `pages` is the list of page numbers in that gap. `onPageSelect` runs when a menu item is chosen. A string `children` replaces the accessible name, which defaults to “More pages”. The visible control stays the ellipsis icon.

### Data Slots

Each public part has a stable slot: `pagination`, `pagination-content`, `pagination-item`, `pagination-link`, `pagination-first`, `pagination-previous`, `pagination-next`, `pagination-last`, and `pagination-ellipsis`.
