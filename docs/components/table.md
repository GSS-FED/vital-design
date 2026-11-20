# Table

> Semantic <table> primitives with VD tokens for static tables and custom compositions.

## Preview

```tsx
import { Avatar } from '@/components/ui/Avatar';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/ui/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useState } from 'react';

type TaskProgressState = 'complete' | 'review' | 'draft';

const tasks: {
  id: number;
  topic: string;
  cycle: string;
  owner: string;
  reviewer: string;
  progress: TaskProgressState;
  due: string;
  updated: string;
}[] = [
  {
    id: 1,
    topic: 'Greenhouse gas emissions',
    cycle: 'Yearly',
    owner: 'JC',
    reviewer: 'JC',
    progress: 'complete',
    due: '2025/03/01',
    updated: '1 year ago',
  },
  {
    id: 2,
    topic: 'Climate-related risks',
    cycle: 'Quarterly',
    owner: 'JC',
    reviewer: 'JC',
    progress: 'review',
    due: '2025/03/01',
    updated: '3 months ago',
  },
  {
    id: 3,
    topic: 'Energy management',
    cycle: 'Monthly',
    owner: 'JC',
    reviewer: 'TS',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 month ago',
  },
  {
    id: 4,
    topic: 'Water management',
    cycle: 'Monthly',
    owner: 'AL',
    reviewer: 'JC',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 day ago',
  },
  {
    id: 5,
    topic: 'Waste management',
    cycle: 'Monthly',
    owner: 'TS',
    reviewer: 'JC',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1 month ago',
  },
];

function Assignee({ children }: { children: string }) {
  return (
    <Avatar
      fallback={children}
      name={children}
      size="sm"
      color={children === 'TS' ? 'orange' : 'tiffany'}
    />
  );
}

function TaskProgress({ state }: { state: TaskProgressState }) {
  if (state === 'complete') {
    return (
      <ProgressSegments
        aria-label="Yearly progress"
        className="w-[118px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
      </ProgressSegments>
    );
  }

  if (state === 'review') {
    return (
      <ProgressSegments
        aria-label="Quarterly progress"
        className="w-[118px] gap-[3px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
        <ProgressSegment className="flex-1 bg-warning-500" />
        <ProgressSegment className="flex-1 bg-grayscale-opacity-600" />
        <ProgressSegment className="flex-1" data-state="inactive" />
      </ProgressSegments>
    );
  }

  return (
    <ProgressSegments
      aria-label="Monthly progress"
      className="w-[118px] gap-0.5"
    >
      <ProgressSegment className="w-2 bg-success-500" />
      <ProgressSegment className="w-2 bg-warning-500" />
      <ProgressSegment className="w-2 bg-info-500" />
      <ProgressSegment className="w-2 bg-destructive-500" />
      {Array.from({ length: 8 }, (_, index) => (
        <ProgressSegment
          key={index}
          className="w-2"
          data-state="inactive"
        />
      ))}
    </ProgressSegments>
  );
}

export function TableExample() {
  const [selected, setSelected] = useState<number[]>([5]);
  const allSelected = selected.length === tasks.length;

  return (
    <Table
      striped
      containerClassName="max-w-5xl rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background shadow-(--shadow-base)"
    >
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all"
              checked={allSelected}
              indeterminate={selected.length > 0 && !allSelected}
              onCheckedChange={(checked) =>
                setSelected(
                  checked ? tasks.map((task) => task.id) : [],
                )
              }
            />
          </TableHead>
          <TableHead className="w-[72px] text-center">ID</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead className="w-[96px]">Cycle</TableHead>
          <TableHead className="w-[102px]">Owner</TableHead>
          <TableHead className="w-[102px]">Reviewer</TableHead>
          <TableHead className="w-[132px]">Progress</TableHead>
          <TableHead className="w-[104px]">Due</TableHead>
          <TableHead className="w-[112px]">Last updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          const isSelected = selected.includes(task.id);

          return (
            <TableRow
              key={task.id}
              data-state={isSelected ? 'selected' : undefined}
            >
              <TableCell>
                <Checkbox
                  aria-label={`Select ${task.topic}`}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    setSelected((current) =>
                      checked
                        ? [...current, task.id]
                        : current.filter((id) => id !== task.id),
                    )
                  }
                />
              </TableCell>
              <TableCell className="text-center">{task.id}</TableCell>
              <TableCell>{task.topic}</TableCell>
              <TableCell>{task.cycle}</TableCell>
              <TableCell>
                <Assignee>{task.owner}</Assignee>
              </TableCell>
              <TableCell>
                <Assignee>{task.reviewer}</Assignee>
              </TableCell>
              <TableCell>
                <TaskProgress state={task.progress} />
              </TableCell>
              <TableCell>{task.due}</TableCell>
              <TableCell>{task.updated}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
```

## Basic

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

export function TableBasicExample() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## When to use

- **Static or simple tables**: read-only layouts, summary tables, low row counts.
- **Custom table compositions**: use the markup primitive when you need full control over column rendering.
- **Interactive tables**: sorting, column resize, pinning, and cell editing live on the [Data Table](/docs/blocks/data-table) block.

## Parts

| Part           | Element     | Notes                                                                                                                       |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Table`        | `<table>`   | Wrapped in a scroll container. Use `containerClassName` to style the frame and `containerRef` to reach it.                  |
| `TableHeader`  | `<thead>`   | Adds a bottom border on each child `<tr>`.                                                                                  |
| `TableBody`    | `<tbody>`   | Drops the border from the last row.                                                                                         |
| `TableFooter`  | `<tfoot>`   | Muted background with top border.                                                                                           |
| `TableRow`     | `<tr>`      | Hover + `aria-expanded` + `data-state="selected"` styling.                                                                  |
| `TableHead`    | `<th>`      | Dense header cell with right border. `position: relative`, so edge overlays (e.g. a column resize handle) can anchor to it. |
| `TableCell`    | `<td>`      | Dense body cell with right border.                                                                                          |
| `TableCaption` | `<caption>` | Muted, top margin.                                                                                                          |

## Scroll container

`Table` renders its `<table>` inside a `div[data-slot="table-container"]` that
owns the horizontal scroll. `ref` points at the `<table>`, so anything that has
to observe or drive scrolling — infinite scroll, virtualisation, scroll-position
restore — needs `containerRef` instead.

```tsx
const containerRef = useRef<HTMLDivElement>(null);

<Table containerRef={containerRef}>…</Table>;
```

Because the container sets `overflow-x`, the browser computes `overflow-y` as
`auto` too. Nesting it inside another scrolling region therefore produces two
scroll areas; pass `containerClassName="overflow-x-visible"` to opt out when the
outer region should own the scroll.

## Striped rows

The `striped` prop on `Table` shades every other row in `<tbody>`. `true` is the same as `'even'` (rows 2, 4, … are shaded); use `'odd'` to shade rows 1, 3, ….

```tsx
<Table striped>…</Table>
<Table striped="odd">…</Table>
```

The colors are CSS variables you can override on `Table`:

| Variable            | Default                                                                               | Description                                                       |
| ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `--table-stripe`    | `var(--grayscale-opacity-100)`                                                        | Stripe background                                                 |
| `--table-row-hover` | `var(--grayscale-opacity-200)` when striped, otherwise `var(--grayscale-opacity-100)` | Background for hover, `aria-expanded` and `data-state="selected"` |

Hover and selected always win over the stripe color, so with `striped` on, hover goes one step darker to keep the contrast.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

const variants = [
  { label: 'striped (even)', striped: true },
  { label: 'striped="odd"', striped: 'odd' },
] as const;

export function TableStripedExample() {
  return (
    <div className="flex flex-col gap-8">
      {variants.map(({ label, striped }) => (
        <div key={label} className="flex flex-col gap-2">
          <p className="text-sm text-grayscale-opacity-600">
            {label}
          </p>
          <Table striped={striped}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <p className="text-sm text-grayscale-opacity-600">
          Custom colors: [--table-stripe] / [--table-row-hover]
        </p>
        <Table
          striped
          className="[--table-row-hover:var(--primary-100)] [--table-stripe:var(--primary-50)]"
        >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">
                  {invoice.invoice}
                </TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

## With Footer

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

export function TableWithFooterExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

## Selected row state

Apply `data-state="selected"` to a row to highlight it.

```tsx
<TableRow data-state="selected">…</TableRow>
```

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export function TableSelectedRowExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```
