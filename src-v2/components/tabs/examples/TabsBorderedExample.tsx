'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/tabs/Tabs';
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
