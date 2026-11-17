'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/alert/Alert';
import { Avatar, AvatarGroup } from '@/components/avatar/Avatar';
import { Badge } from '@/components/badge/Badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb/Breadcrumb';
import { Button } from '@/components/button/Button';
import { ButtonGroup } from '@/components/button/button-group/ButtonGroup';
import { SplitButton } from '@/components/button/split-button/SplitButton';
import { Calendar } from '@/components/calendar/Calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Chip } from '@/components/chip/Chip';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/command/Command';
import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/field/Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/input/input-group/InputGroup';
import { Input } from '@/components/input/input/Input';
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/item/Item';
import { Label } from '@/components/label/Label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination/Pagination';
import { Progress } from '@/components/progress/Progress';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/radio-group/RadioGroup';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/resizable/Resizable';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { Separator } from '@/components/separator/Separator';
import { Skeleton } from '@/components/skeleton/Skeleton';
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';
import { Spinner } from '@/components/spinner/Spinner';
import { Switch } from '@/components/switch/Switch';
import { TableOfContents } from '@/components/table-of-contents/TableOfContents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/tabs/Tabs';
import { Tag } from '@/components/tag/Tag';
import { Textarea } from '@/components/textarea/Textarea';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/toolbar/Toolbar';
import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { BellIcon } from '@/icons/BellIcon';
import { CalendarDaysIcon } from '@/icons/CalendarDaysIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { GearIcon } from '@/icons/GearIcon';
import { HomeIcon } from '@/icons/HomeIcon';
import { InboxIcon } from '@/icons/InboxIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { UserIcon } from '@/icons/UserIcon';
import { XmarkIcon } from '@/icons/XmarkIcon';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// Static stand-in for an open overlay (dialog, popover, menu…). The real
// popups portal to <body>, so a thumbnail can only sketch their surface.
function Surface({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-(--radius-md) border border-grayscale-opacity-200 bg-background p-3 text-sm text-grayscale-opacity-800 shadow-(--shadow-emphasis)',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Zoom({
  scale,
  children,
}: {
  scale: number;
  children: ReactNode;
}) {
  return <div style={{ zoom: scale }}>{children}</div>;
}

const previews: Record<string, ReactNode> = {
  alert: (
    <Alert className="w-64">
      <AlertTitle>Request submitted</AlertTitle>
      <AlertDescription>
        Reviewers have been notified.
      </AlertDescription>
    </Alert>
  ),
  autocomplete: (
    <div className="flex w-52 flex-col gap-1">
      <Input placeholder="feat" defaultValue="feat" />
      <Surface className="p-1">
        <div className="rounded-(--radius-sm) bg-grayscale-opacity-100 px-2 py-1.5">
          feature
        </div>
        <div className="px-2 py-1.5">feature-flag</div>
      </Surface>
    </div>
  ),
  avatar: (
    <AvatarGroup>
      <Avatar name="Arthur Lu" color="blue" size="lg" />
      <Avatar name="Sean Chen" color="tiffany" size="lg" />
      <Avatar name="Jane Doe" color="pink" size="lg" />
      <Avatar color="purple" size="lg" />
    </AvatarGroup>
  ),
  badge: (
    <div className="flex gap-2">
      <Badge>3</Badge>
      <Badge variant="success">5</Badge>
      <Badge variant="warning">12</Badge>
      <Badge variant="destructive">99+</Badge>
    </div>
  ),
  breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Reports</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  button: (
    <div className="flex flex-wrap justify-center gap-2">
      <Button theme="primary">Primary</Button>
      <Button theme="default">Default</Button>
      <Button theme="alarm">Alarm</Button>
    </div>
  ),
  'button-group': (
    <ButtonGroup>
      <Button theme="default">Day</Button>
      <Button theme="default">Week</Button>
      <Button theme="default">Month</Button>
    </ButtonGroup>
  ),
  calendar: (
    <Zoom scale={0.5}>
      <Calendar
        mode="single"
        selected={new Date(2026, 10, 17)}
        month={new Date(2026, 10, 1)}
      />
    </Zoom>
  ),
  card: (
    <Card className="w-60">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Updated 2 days ago</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress aria-label="Progress" value={64} />
      </CardContent>
    </Card>
  ),
  checkbox: (
    <div className="flex flex-col gap-2">
      {['Email', 'SMS', 'Push'].map((label, index) => (
        <div key={label} className="flex items-center gap-2">
          <Checkbox
            id={`gallery-cb-${label}`}
            defaultChecked={index !== 1}
          />
          <Label
            htmlFor={`gallery-cb-${label}`}
            className="font-normal"
          >
            {label}
          </Label>
        </div>
      ))}
    </div>
  ),
  chip: (
    <div className="flex gap-2">
      <Chip selected onChange={() => {}}>
        All
      </Chip>
      <Chip selected={false} onChange={() => {}}>
        Open
      </Chip>
      <Chip selected={false} onChange={() => {}}>
        Closed
      </Chip>
    </div>
  ),
  collapsible: (
    <div className="flex w-60 flex-col gap-2">
      <div className="flex items-center justify-between rounded-(--radius-sm) px-3 py-2 text-sm font-medium text-grayscale-opacity-800">
        Can I use this?
        <AngleDownIcon className="size-4 rotate-180" />
      </div>
      <div className="rounded-(--radius-sm) bg-grayscale-opacity-100 p-3 text-sm text-grayscale-opacity-700">
        Yes. Free for personal and commercial use.
      </div>
    </div>
  ),
  combobox: (
    <div className="flex w-52 flex-col gap-1">
      <div className="flex h-8 items-center justify-between rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background px-2.5 text-sm text-grayscale-opacity-800">
        Taiwan
        <AngleDownIcon className="size-4 text-grayscale-opacity-500" />
      </div>
      <Surface className="p-1">
        <div className="flex items-center gap-2 border-b border-grayscale-opacity-200 px-2 pb-1.5 text-grayscale-opacity-500">
          <MagnifyingGlassIcon className="size-3.5" />
          Search
        </div>
        <div className="flex items-center justify-between px-2 py-1.5">
          Taiwan <CheckIcon className="size-4 text-primary-500" />
        </div>
        <div className="px-2 py-1.5">Japan</div>
      </Surface>
    </div>
  ),
  command: (
    <Zoom scale={0.8}>
      <Command
        label="Command palette"
        className="h-[176px] w-[260px]"
      >
        <CommandInput placeholder="Type a command" />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>New file</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Open file</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Zoom>
  ),
  dialog: (
    <Surface className="w-64 p-4">
      <div className="flex items-start justify-between">
        <div className="font-semibold text-grayscale-opacity-900">
          Submit request?
        </div>
        <XmarkIcon className="size-4 text-grayscale-opacity-500" />
      </div>
      <p className="mt-1 text-grayscale-opacity-600">
        Approvers will be notified.
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="text" theme="default">
          Cancel
        </Button>
        <Button theme="primary">Submit</Button>
      </div>
    </Surface>
  ),
  'dropdown-menu': (
    <div className="flex flex-col items-start gap-1">
      <Button theme="default">
        Account
        <AngleDownIcon data-icon="inline-end" />
      </Button>
      <Surface className="w-40 p-1">
        <div className="px-2 py-1 text-xs text-grayscale-opacity-500">
          My account
        </div>
        <div className="rounded-(--radius-sm) bg-grayscale-opacity-100 px-2 py-1.5">
          Profile
        </div>
        <div className="px-2 py-1.5">Billing</div>
      </Surface>
    </div>
  ),
  editable: (
    <Editable
      defaultValue="點擊以編輯"
      placeholder="未填寫"
      className="w-56"
    >
      <EditableDisplay />
      <EditableInput />
    </Editable>
  ),
  field: (
    <Field className="w-60">
      <FieldLabel htmlFor="gallery-field-email">Email</FieldLabel>
      <Input
        id="gallery-field-email"
        placeholder="name@example.com"
      />
      <FieldDescription>Used for notifications.</FieldDescription>
    </Field>
  ),
  icons: (
    <div className="grid grid-cols-5 gap-4 text-grayscale-opacity-700">
      {[
        HomeIcon,
        InboxIcon,
        BellIcon,
        UserIcon,
        GearIcon,
        CalendarDaysIcon,
        ClockIcon,
        FlagIcon,
        MagnifyingGlassIcon,
        PlusIcon,
      ].map((Icon, index) => (
        <Icon key={index} className="size-5" />
      ))}
    </div>
  ),
  input: <Input className="w-56" placeholder="Enter text..." />,
  'input-group': (
    <InputGroup className="w-56">
      <InputGroupAddon>
        <MagnifyingGlassIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search" placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>⌘K</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
  item: (
    <Item variant="outline" className="w-64">
      <ItemMedia variant="icon">
        <CheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Profile verified</ItemTitle>
        <ItemDescription>Just now</ItemDescription>
      </ItemContent>
    </Item>
  ),
  label: (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="gallery-label">Display name</Label>
      <Input
        id="gallery-label"
        className="w-48"
        defaultValue="Arthur"
      />
    </div>
  ),
  'number-input': (
    <NumberInput defaultValue={12} className="w-40">
      <NumberInputGroup>
        <NumberInputControl />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
  pagination: (
    <Pagination aria-label="Pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  popover: (
    <div className="flex flex-col items-center gap-1">
      <Button theme="default">View details</Button>
      <Surface className="w-52">
        <div className="font-semibold text-grayscale-opacity-900">
          Popover title
        </div>
        <div className="mt-1 text-grayscale-opacity-600">
          Rich content anchored to a trigger.
        </div>
      </Surface>
    </div>
  ),
  progress: (
    <div className="w-60">
      <Progress aria-label="Upload progress" value={64} />
    </div>
  ),
  'radio-group': (
    <RadioGroup defaultValue="weekly" className="flex flex-col gap-2">
      {['daily', 'weekly', 'monthly'].map((value) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem
            id={`gallery-radio-${value}`}
            value={value}
          />
          <Label
            htmlFor={`gallery-radio-${value}`}
            className="font-normal capitalize"
          >
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
  resizable: (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-28 w-60 rounded-(--radius-sm) border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="40%">
        <div className="flex h-full items-center justify-center text-sm text-grayscale-opacity-700">
          One
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="60%">
        <div className="flex h-full items-center justify-center text-sm text-grayscale-opacity-700">
          Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  'scroll-area': (
    <div className="h-28 w-48 overflow-hidden rounded-(--radius-sm) border border-grayscale-opacity-300">
      {['v1.4.0', 'v1.3.2', 'v1.3.1', 'v1.3.0', 'v1.2.0'].map(
        (tag) => (
          <div
            key={tag}
            className="border-b border-grayscale-opacity-200 px-3 py-1.5 text-sm text-grayscale-opacity-700"
          >
            {tag}
          </div>
        ),
      )}
    </div>
  ),
  'search-bar': (
    <SearchBar placeholder="Search..." onSearch={() => {}} />
  ),
  select: (
    <div className="flex w-48 flex-col gap-1">
      <div className="flex h-8 items-center justify-between rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background px-2.5 text-sm text-grayscale-opacity-800">
        Weekly
        <AngleDownIcon className="size-4 text-grayscale-opacity-500" />
      </div>
      <Surface className="p-1">
        <div className="px-2 py-1.5">Daily</div>
        <div className="flex items-center justify-between rounded-(--radius-sm) bg-grayscale-opacity-100 px-2 py-1.5">
          Weekly <CheckIcon className="size-4 text-primary-500" />
        </div>
      </Surface>
    </div>
  ),
  separator: (
    <div className="flex w-56 flex-col gap-3 text-sm text-grayscale-opacity-700">
      <span>Account</span>
      <Separator />
      <span>Billing</span>
    </div>
  ),
  sheet: (
    <div className="relative h-32 w-64 overflow-hidden rounded-(--radius-sm) border border-grayscale-opacity-200 bg-grayscale-opacity-100">
      <div className="absolute inset-y-0 right-0 w-36 border-l border-grayscale-opacity-200 bg-background p-3 shadow-(--shadow-emphasis)">
        <div className="text-sm font-semibold text-grayscale-opacity-900">
          Edit profile
        </div>
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-2/3" />
      </div>
    </div>
  ),
  sidebar: (
    <div className="flex h-32 w-64 overflow-hidden rounded-(--radius-sm) border border-grayscale-opacity-200 bg-background">
      <div className="flex w-24 flex-col gap-1 border-r border-grayscale-opacity-200 bg-grayscale-opacity-100 p-2 text-xs text-grayscale-opacity-700">
        <div className="flex items-center gap-1.5 rounded-(--radius-sm) bg-background px-1.5 py-1 font-medium shadow-(--shadow-base)">
          <HomeIcon className="size-3.5" /> Home
        </div>
        <div className="flex items-center gap-1.5 px-1.5 py-1">
          <InboxIcon className="size-3.5" /> Inbox
        </div>
        <div className="flex items-center gap-1.5 px-1.5 py-1">
          <GearIcon className="size-3.5" /> Settings
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  ),
  skeleton: (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
  slider: (
    <Slider defaultValue={60} className="w-56" aria-label="Volume">
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>
  ),
  spinner: <Spinner className="size-6" />,
  'split-button': (
    <SplitButton
      theme="primary"
      open={false}
      onClick={() => {}}
      splitOnClick={() => {}}
    >
      Submit
    </SplitButton>
  ),
  switch: (
    <div className="flex items-center gap-3">
      <Switch defaultChecked aria-label="Notifications" />
      <Switch aria-label="Dark mode" />
    </div>
  ),
  table: (
    <Zoom scale={0.75}>
      <Table containerClassName="w-80 rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ['Q3 review', 'Arthur', 'Done'],
            ['Audit log', 'Sean', 'Open'],
          ].map(([task, owner, status]) => (
            <TableRow key={task}>
              <TableCell>{task}</TableCell>
              <TableCell>{owner}</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Zoom>
  ),
  'table-of-contents': (
    <TableOfContents
      defaultValue="install"
      items={[
        { id: 'introduction', label: 'Introduction', level: 1 },
        { id: 'getting-started', label: 'Getting started', level: 2 },
        { id: 'install', label: 'Install', level: 3 },
        { id: 'configure', label: 'Configure', level: 3 },
        { id: 'theme', label: 'Theme', level: 3 },
        { id: 'components', label: 'Components', level: 1 },
        { id: 'inputs', label: 'Inputs', level: 2 },
        { id: 'button', label: 'Button', level: 3 },
      ]}
    />
  ),
  tabs: (
    <Tabs defaultValue="overview" className="w-60">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Skeleton className="mt-2 h-3 w-full" />
      </TabsContent>
    </Tabs>
  ),
  tag: (
    <div className="flex flex-wrap justify-center gap-2">
      <Tag color="blue" colorVariant="tint">
        Design
      </Tag>
      <Tag color="green" colorVariant="tint">
        Development
      </Tag>
      <Tag color="gold" colorVariant="tint">
        Marketing
      </Tag>
    </div>
  ),
  textarea: (
    <Textarea
      className="w-60"
      placeholder="Tell us what you think..."
      rows={3}
    />
  ),
  'time-picker': (
    <div className="flex h-8 w-40 items-center justify-between rounded-(--radius-sm) border border-grayscale-opacity-300 bg-background px-2.5 text-sm text-grayscale-opacity-800">
      09:30
      <ClockIcon className="size-4 text-grayscale-opacity-500" />
    </div>
  ),
  toast: (
    <Surface className="flex w-60 items-center gap-2">
      <CheckIcon className="size-5 text-success-500" />
      <span className="flex-1">Changes saved</span>
      <XmarkIcon className="size-4 text-grayscale-opacity-500" />
    </Surface>
  ),
  toolbar: (
    <Toolbar variant="outline">
      <ToolbarGroup>
        <Button variant="text" theme="default">
          File
        </Button>
        <Button variant="text" theme="default">
          Edit
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button variant="text" theme="primary">
          Save
        </Button>
      </ToolbarGroup>
    </Toolbar>
  ),
  tooltip: (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-(--radius-sm) bg-grayscale-700 px-2 py-1 text-xs text-background">
        提示文字
      </div>
      <Button theme="default">Hover me</Button>
    </div>
  ),
};

// Matches each page's frontmatter title, which is what the sidebar shows.
const titles: Record<string, string> = {
  'scroll-area': 'Scroll Area',
  'table-of-contents': 'Table of Contents',
  'time-picker': 'Time Picker',
};

const titleFor = (slug: string) =>
  titles[slug] ??
  slug.replace(/(^|-)(\w)/g, (_, __, char: string) =>
    char.toUpperCase(),
  );

export function ComponentGallery({
  items,
  base = '/docs/components',
}: {
  /** Component page slugs, in display order. */
  items: string[];
  /** Docs URL prefix for the current locale. */
  base?: string;
}) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((slug) => {
        if (!(slug in previews)) {
          throw new Error(
            `ComponentGallery: no preview for "${slug}"`,
          );
        }
        return (
          <div
            key={slug}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-grayscale-opacity-200 bg-background transition-shadow hover:border-grayscale-opacity-300 hover:shadow-(--shadow-base) has-[a:focus-visible]:border-primary-500 has-[a:focus-visible]:shadow-(--shadow-focus-ring-primary)"
          >
            <div
              inert
              className="flex h-44 items-center justify-center overflow-hidden bg-grayscale-opacity-100 p-4"
            >
              {previews[slug]}
            </div>
            <a
              href={`${base}/${slug}`}
              className="border-t border-grayscale-opacity-200 px-4 py-3 text-sm font-medium text-grayscale-opacity-900 outline-none after:absolute after:inset-0 group-hover:text-primary-500"
            >
              {titleFor(slug)}
            </a>
          </div>
        );
      })}
    </div>
  );
}
