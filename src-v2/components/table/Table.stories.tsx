import { type Meta, type StoryObj } from '@storybook/react';
import { Avatar } from '../avatar/Avatar';
import { Checkbox } from '../checkbox/Checkbox';
import {
  ProgressSegment,
  ProgressSegments,
} from '../progress/Progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;

interface Invoice {
  invoice: string;
  paymentStatus: 'Paid' | 'Pending' | 'Unpaid';
  totalAmount: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer';
}

const invoices: Invoice[] = [
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

export const Basic: Story = {
  render: () => (
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
  ),
};

export const WithFooter: Story = {
  render: () => (
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
  ),
};

export const SelectedRow: Story = {
  render: () => (
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
  ),
};

const tasks = [
  {
    id: 1,
    topic: '溫室氣體排放',
    cycle: '每年',
    owner: '張',
    reviewer: '張',
    progress: 'complete',
    due: '2025/03/01',
    updated: '1年前',
  },
  {
    id: 2,
    topic: '氣候相關議題管理',
    cycle: '每季',
    owner: '張',
    reviewer: '張',
    progress: 'review',
    due: '2025/03/01',
    updated: '3個月前',
  },
  {
    id: 3,
    topic: '能源管理',
    cycle: '每月',
    owner: '張',
    reviewer: '蔡',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1個月前',
  },
  {
    id: 4,
    topic: '水資源管理',
    cycle: '每月',
    owner: 'AL',
    reviewer: '張',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1天前',
  },
  {
    id: 5,
    topic: '廢棄物管理',
    cycle: '每月',
    owner: '蔡',
    reviewer: '張',
    progress: 'draft',
    due: '2025/03/01',
    updated: '1個月前',
  },
];

function Assignee({ children }: { children: string }) {
  return (
    <Avatar
      fallback={children}
      name={children}
      size="sm"
      color={children === '蔡' ? 'orange' : 'tiffany'}
    />
  );
}

function TaskProgress({ state }: { state: string }) {
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
      {Array.from({ length: 8 }).map((_, index) => (
        <ProgressSegment
          key={index}
          className="w-2"
          data-state="inactive"
        />
      ))}
    </ProgressSegments>
  );
}

export const Default: Story = {
  render: () => (
    <Table containerClassName="max-w-5xl rounded-(--radius-sm) border border-grayscale-opacity-300 bg-white shadow-(--shadow-base)">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead className="w-[72px] text-center">
            議題編號
          </TableHead>
          <TableHead>指標議題</TableHead>
          <TableHead className="w-[72px]">週期</TableHead>
          <TableHead className="w-[102px]">負責人</TableHead>
          <TableHead className="w-[102px]">覆核人</TableHead>
          <TableHead className="w-[132px]">進度</TableHead>
          <TableHead className="w-[104px]">期限</TableHead>
          <TableHead className="w-[104px]">最後更新</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            data-state={task.id === 5 ? 'selected' : undefined}
          >
            <TableCell>
              <Checkbox aria-label={`Select ${task.topic}`} />
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
        ))}
      </TableBody>
    </Table>
  ),
};
