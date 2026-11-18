'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/tabs/Tabs';
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
