'use client';

import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs/Tabs';
import { FlagIcon } from '@/icons/FlagIcon';
import { PlusIcon } from '@/icons/PlusIcon';
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
