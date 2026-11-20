# Toolbar

> Flex layout primitive with role="toolbar". Lays out actions, separators, and spacers above tables, editors, or panels.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/ui/Toolbar';

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
```

## Usage

Put related actions in a `ToolbarGroup`. `ToolbarSpacer` pushes the groups after
it to the trailing edge.

## With Separator

Use `ToolbarSeparator` between groups of related actions.

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/ui/Toolbar';

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
```

## Variants

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/ui/Toolbar';

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
```

| Variant   | Use                                                         |
| --------- | ----------------------------------------------------------- |
| `default` | Transparent background. Drop into existing surfaces.        |
| `bar`     | Subtle gray-50 background. Standalone toolbar above panels. |
| `outline` | White background with bottom border. Sits above tables.     |

## Sizes

| Size      | Padding     | Use                                    |
| --------- | ----------- | -------------------------------------- |
| `default` | `px-4 py-3` | Top-of-page toolbars.                  |
| `sm`      | `px-3 py-2` | Compact toolbars above data tables.    |
| `none`    | `p-0`       | When wrapping content with own layout. |

## Parts

| Part               | Notes                                                         |
| ------------------ | ------------------------------------------------------------- |
| `Toolbar`          | `role="toolbar"`, `aria-orientation="horizontal"` by default. |
| `ToolbarGroup`     | `role="group"`, flex with gap for clustered actions.          |
| `ToolbarSeparator` | Vertical separator (uses `Separator` primitive).              |
| `ToolbarSpacer`    | `flex-1` to push subsequent items to the trailing edge.       |
