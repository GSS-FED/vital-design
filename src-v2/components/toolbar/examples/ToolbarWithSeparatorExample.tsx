'use client';

import { Button } from '@/components/button/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/toolbar/Toolbar';

export function ToolbarWithSeparatorExample() {
  return (
    <Toolbar variant="outline">
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Cut
        </Button>
        <Button size="md" theme="default" variant="text">
          Copy
        </Button>
        <Button size="md" theme="default" variant="text">
          Paste
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Undo
        </Button>
        <Button size="md" theme="default" variant="text">
          Redo
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
