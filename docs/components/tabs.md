# Tabs

> Switch between related panels with underline or pill tab styles.

## Preview

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import { useState } from 'react';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Members', value: 'members' },
  { label: 'Settings', value: 'settings' },
];

export function TabsExample() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full max-w-120"
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.label} content
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

## Usage

The active underline renders per trigger and grows from width 0, so no
extra element is needed.

## Bordered

Use `bordered` on `TabsList` when the underline tabs need a rail border.

```tsx
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState } from 'react';

const tabs = Array.from({ length: 6 }, (_, index) => ({
  label: `Tab ${index + 1}`,
  value: `tab-${index + 1}`,
}));

export function TabsBorderedExample() {
  const [value, setValue] = useState('tab-1');

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full max-w-200"
    >
      <TabsList bordered>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
```

## Sliding indicator

By default the active underline grows from width 0 under each tab. Render
`TabsIndicator` inside `TabsList` to opt into a single bar that slides between
tabs instead — adding it disables the per-tab grow highlight.

```tsx
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import { useState } from 'react';

const tabs = Array.from({ length: 6 }, (_, index) => ({
  label: `Tab ${index + 1}`,
  value: `tab-${index + 1}`,
}));

export function TabsSlidingIndicatorExample() {
  const [value, setValue] = useState('tab-1');

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full max-w-200"
    >
      <TabsList bordered>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
        {/* Rendering TabsIndicator swaps the per-tab grow highlight for a
            single bar that slides between tabs. */}
        <TabsIndicator />
      </TabsList>
    </Tabs>
  );
}
```

## With Badges

Put a `Badge` after the label to show a count or a status dot.

```tsx
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState } from 'react';

export function TabsWithBadgesExample() {
  const [value, setValue] = useState('all');

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full max-w-140"
    >
      <TabsList bordered>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="messages">
          Messages
          <Badge size="md">4</Badge>
        </TabsTrigger>
        <TabsTrigger value="errors">
          Errors
          <Badge size="sm" variant="destructive" />
        </TabsTrigger>
        <TabsTrigger value="more">More</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
```

## Pill

```tsx
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { useState } from 'react';

export function TabsPillExample() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs variant="pill" value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="messages">
          Messages
          <Badge size="md">4</Badge>
        </TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="flagged">
          <FlagIcon className="size-4" data-icon="inline-start" />
          Flagged
        </TabsTrigger>
        <Button
          variant="text"
          theme="default"
          size="icon-md"
          aria-label="Add tab"
        >
          <PlusIcon data-icon="inline-start" />
        </Button>
      </TabsList>
    </Tabs>
  );
}
```

## Vertical

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import { useState } from 'react';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Members', value: 'members' },
  { label: 'Settings', value: 'settings' },
];

export function TabsVerticalBorderedExample() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      orientation="vertical"
      className="min-h-90 w-full max-w-140"
    >
      <TabsList bordered>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.label} content
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

## Props

| Part            | Prop          | Type                         | Default        | Description                                                     |
| --------------- | ------------- | ---------------------------- | -------------- | --------------------------------------------------------------- |
| `Tabs`          | `variant`     | `'underline' \| 'pill'`      | `'underline'`  | Visual style for the tab triggers                               |
| `Tabs`          | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction from Base UI Tabs                              |
| `TabsList`      | `bordered`    | `boolean`                    | `false`        | Adds the underline rail border                                  |
| `TabsTrigger`   | `value`       | `string`                     | —              | Value connected to a tab panel                                  |
| `TabsContent`   | `value`       | `string`                     | —              | Panel value connected to a tab trigger                          |
| `TabsIndicator` | —             | —                            | —              | Optional sliding underline; disables the per-tab grow highlight |
