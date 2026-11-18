'use client';

import { Button } from '@/components/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/popover/Popover';

type Field = {
  label: string;
  description: string;
};

const fields = {
  assignee: {
    label: 'Alex Lin',
    description: 'Assigned owner for this editable cell.',
  },
  status: {
    label: 'In review',
    description: 'Shared content updates from the active trigger.',
  },
  date: {
    label: '2026/05/29',
    description: 'One popover root can serve many triggers.',
  },
} satisfies Record<string, Field>;

export function PopoverMultipleTriggersExample() {
  return (
    <Popover<Field>>
      {({ payload }) => (
        <div className="flex flex-wrap gap-2">
          <PopoverTrigger
            payload={fields.assignee}
            render={<Button variant="ghost">Assignee</Button>}
          />
          <PopoverTrigger
            payload={fields.status}
            render={<Button variant="ghost">Status</Button>}
          />
          <PopoverTrigger
            payload={fields.date}
            render={<Button variant="ghost">Date</Button>}
          />
          <PopoverContent className="w-72">
            {payload && (
              <div className="space-y-1">
                <PopoverTitle>{payload.label}</PopoverTitle>
                <PopoverDescription>
                  {payload.description}
                </PopoverDescription>
              </div>
            )}
          </PopoverContent>
        </div>
      )}
    </Popover>
  );
}
