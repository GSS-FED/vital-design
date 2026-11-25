# Table

> 語意化的 <table> primitive，用 VD token 做靜態表格與自訂組合。

## 預覽

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

## 基本

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

## 何時使用

- **靜態或簡單表格**：唯讀版面、摘要表、列數不多。
- **自訂表格組合**：需要完全控制欄位怎麼渲染時，用這組標記 primitive。

## 部分

| 部分             | 元素          | 說明                                                            |
| -------------- | ----------- | ------------------------------------------------------------- |
| `Table`        | `<table>`   | 包在捲動容器裡。用 `containerClassName` 調外框樣式，用 `containerRef` 拿到這個容器。 |
| `TableHeader`  | `<thead>`   | 每個子 `<tr>` 加上底邊框線。                                            |
| `TableBody`    | `<tbody>`   | 拿掉最後一列的框線。                                                    |
| `TableFooter`  | `<tfoot>`   | 淡背景，上方有框線。                                                    |
| `TableRow`     | `<tr>`      | 有 hover、`aria-expanded` 與 `data-state="selected"` 的樣式。        |
| `TableHead`    | `<th>`      | 緊密的表頭儲存格，右側有框線。`position: relative`，所以邊緣覆層（例如欄寬把手）可以對齊它。      |
| `TableCell`    | `<td>`      | 緊密的表身儲存格，右側有框線。                                               |
| `TableCaption` | `<caption>` | 淡色，上方有間距。                                                     |

## 捲動容器

`Table` 把 `<table>` 放在 `div[data-slot="table-container"]` 裡，由這個容器負責水平捲動。`ref` 指向 `<table>`，所以要觀察或驅動捲動的功能——無限捲動、虛擬化、還原捲動位置——改用 `containerRef`。

```tsx
const containerRef = useRef<HTMLDivElement>(null);

<Table containerRef={containerRef}>…</Table>;
```

因為容器設了 `overflow-x`，瀏覽器也會把 `overflow-y` 算成 `auto`。再把它放進另一個捲動區域，就會變成兩個捲動區；要由外層負責捲動時，傳 `containerClassName="overflow-x-visible"` 關掉這個行為。

## 斑馬紋列

`Table` 的 `striped` prop 會為 `<tbody>` 的隔行加上底色。`true` 等同 `'even'`（第 2、4… 列上色）；用 `'odd'` 讓第 1、3… 列上色。

```tsx
<Table striped>…</Table>
<Table striped="odd">…</Table>
```

底色透過 CSS variables 設定，可在 `Table` 上覆寫：

| 變數                  | 預設                                                                       | 說明                                                |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| `--table-stripe`    | `var(--grayscale-opacity-100)`                                           | 斑馬紋底色                                             |
| `--table-row-hover` | `var(--grayscale-opacity-200)`（striped 時）／`var(--grayscale-opacity-100)` | hover、`aria-expanded`、`data-state="selected"` 的底色 |

```tsx
<Table
  striped
  className="[--table-stripe:var(--primary-50)] [--table-row-hover:var(--primary-100)]"
>
  …
</Table>
```

Hover 與 selected 永遠蓋過斑馬紋底色，因此開啟 `striped` 時 hover 會自動加深一階以維持對比。

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

## 加上表尾

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

## 選取列狀態

在列上加 `data-state="selected"` 來醒目顯示。

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
