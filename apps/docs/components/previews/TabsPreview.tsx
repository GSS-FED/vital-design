'use client';

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@/components/tabs/Tabs';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' },
];

export function TabsPreview() {
  const [value, setValue] = useState('overview');

  return (
    <ComponentPreview centered={false}>
      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.label} content
          </TabsContent>
        ))}
      </Tabs>
    </ComponentPreview>
  );
}

export function TabsBorderedPreview() {
  const [value, setValue] = useState('overview');

  return (
    <ComponentPreview centered={false}>
      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList bordered>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
    </ComponentPreview>
  );
}

export function TabsPillPreview() {
  const [value, setValue] = useState('overview');

  return (
    <ComponentPreview centered={false}>
      <Tabs
        value={value}
        onValueChange={setValue}
        variant="pill"
        className="w-full"
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </ComponentPreview>
  );
}

export function TabsVerticalPreview() {
  const [value, setValue] = useState('overview');

  return (
    <ComponentPreview centered={false}>
      <Tabs
        value={value}
        onValueChange={setValue}
        orientation="vertical"
        className="min-h-[180px] w-full"
      >
        <TabsList bordered>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.label} content
          </TabsContent>
        ))}
      </Tabs>
    </ComponentPreview>
  );
}
