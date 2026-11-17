'use client';

import { Button } from '@/components/button/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';

const variants = ['default', 'bar', 'outline'] as const;

export function ToolbarVariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="font-sans text-xs text-grayscale-opacity-600">
            variant=&quot;{variant}&quot;
          </span>
          <Toolbar variant={variant}>
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
        </div>
      ))}
    </div>
  );
}
