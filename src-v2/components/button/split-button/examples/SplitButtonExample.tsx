'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { useState } from 'react';

export function SplitButtonExample() {
  const [lastAction, setLastAction] = useState('Nothing saved yet');

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <SplitButton
          theme="primary"
          size="lg"
          onClick={() => setLastAction('Saved')}
          splitRender={<DropdownMenuTrigger />}
        >
          Save
        </SplitButton>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setLastAction('Saved as draft')}
          >
            Save as draft
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLastAction('Saved and published')}
          >
            Save and publish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-sm text-grayscale-opacity-700">
        {lastAction}
      </p>
    </div>
  );
}
