'use client';

import { Badge } from '@/components/badge/Badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs/Tabs';
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
