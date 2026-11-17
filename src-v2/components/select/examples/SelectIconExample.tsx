'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { BellIcon } from '@/icons/BellIcon';
import { InboxIcon } from '@/icons/InboxIcon';
import { UserIcon } from '@/icons/UserIcon';
import { useState } from 'react';

const channels = [
  { label: 'Notifications', value: 'notifications', Icon: BellIcon },
  { label: 'Inbox', value: 'inbox', Icon: InboxIcon },
  { label: 'Profile', value: 'profile', Icon: UserIcon },
];

export function SelectIconExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-50">
      <Select items={channels} value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select a page" />
        <SelectContent>
          {channels.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <item.Icon className="size-4 shrink-0 text-grayscale-opacity-700" />
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemCheck />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
