'use client';

import { Button } from '@/components/button/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function ToolbarPreview() {
  return (
    <ComponentPreview name="ToolbarPreview" centered={false}>
      <Toolbar variant="outline">
        <ToolbarGroup>
          <Button size="md" theme="default" variant="text">
            File
          </Button>
          <Button size="md" theme="default" variant="text">
            Edit
          </Button>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <Button size="md" theme="default" variant="text">
            Cut
          </Button>
          <Button size="md" theme="default" variant="text">
            Copy
          </Button>
        </ToolbarGroup>
        <ToolbarSpacer />
        <ToolbarGroup>
          <Button size="md" theme="primary" variant="text">
            Save
          </Button>
        </ToolbarGroup>
      </Toolbar>
    </ComponentPreview>
  );
}
