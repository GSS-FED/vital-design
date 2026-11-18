'use client';

import { Button } from '@/components/button/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';

export function ToolbarExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          File
        </Button>
        <Button size="md" theme="default" variant="text">
          Edit
        </Button>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="md" theme="primary" variant="text">
          Save
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
