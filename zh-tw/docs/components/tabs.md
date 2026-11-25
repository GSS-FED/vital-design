# Tabs

> 用底線或膠囊頁籤，在相關面板之間切換。

## 預覽

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

## 用法

作用中的底線畫在每個 trigger 上，並從寬度 0 長出來，所以不用額外元素。

## 框線

底線頁籤需要一條軌道框線時，在 `TabsList` 上加 `bordered`。

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

## 滑動指示器

預設時，作用中的底線會在每個頁籤下方從寬度 0 長出。若要改成單一根橫條在頁籤之間滑動，把 `TabsIndicator` 放進 `TabsList`。加上它之後，每個頁籤各自長出的高亮會關掉。

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

## 加上徽章

在文字後面放 `Badge`，顯示數量或狀態圓點。

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

## 膠囊

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

## 垂直

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

## 屬性

| Part            | Prop          | Type                         | Default        | 說明                     |
| --------------- | ------------- | ---------------------------- | -------------- | ---------------------- |
| `Tabs`          | `variant`     | `'underline' \| 'pill'`      | `'underline'`  | 頁籤 trigger 的視覺樣式       |
| `Tabs`          | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向，來自 Base UI Tabs   |
| `TabsList`      | `bordered`    | `boolean`                    | `false`        | 加上底線軌道的框線              |
| `TabsTrigger`   | `value`       | `string`                     | —              | 對應頁籤面板的值               |
| `TabsContent`   | `value`       | `string`                     | —              | 對應頁籤 trigger 的面板值      |
| `TabsIndicator` | —             | —                            | —              | 可選的滑動底線；會關掉每個頁籤各自長出的高亮 |
