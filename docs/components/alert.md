# Alert

> A composable message surface for confirmations, warnings, and contextual notices.

## Preview

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

export function AlertExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Request submitted</AlertTitle>
      <AlertDescription>
        The approval flow has started. You can keep editing the draft
        until the reviewer opens it.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="primary">
          View request
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## Usage

Compose `AlertTitle`, `AlertDescription`, and an optional `AlertAction` inside `Alert`. The alert fills its container's width; set the width on the parent or with `className`.

## With Icon

Use an icon as the first child when the message needs stronger visual context.

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { ClearIcon } from '@/components/icons/ClearIcon';

export function AlertWithIconExample() {
  return (
    <Alert role="status" className="w-105 max-w-full">
      <ClearIcon className="text-destructive-500" />
      <AlertTitle>Payment method expired</AlertTitle>
      <AlertDescription>
        Update the billing card before the next renewal date to avoid
        service interruption.
      </AlertDescription>
    </Alert>
  );
}
```

## With Actions

`AlertAction` aligns its buttons to the end. Put the dismissive action first and the primary action last.

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

export function AlertWithActionExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Delete this draft?</AlertTitle>
      <AlertDescription>
        The draft and its attachments will be removed.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Delete
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## Custom Content

`AlertDescription` can contain additional controls when the notice needs a small follow-up decision.

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

export function AlertWithCustomExample() {
  const [hiddenToday, setHiddenToday] = useState(false);

  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>
        Leaving this page will discard the edits in the current form.
        <Field orientation="horizontal" className="mt-4 w-auto">
          <Checkbox
            id="alert-hide-today"
            checked={hiddenToday}
            onCheckedChange={setHiddenToday}
          />
          <FieldLabel htmlFor="alert-hide-today">
            Do not remind me again today
          </FieldLabel>
        </Field>
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Leave page
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## Anatomy

```tsx
<Alert>
  <AlertTitle />
  <AlertDescription />
  <AlertAction />
</Alert>
```

## Props

### Alert

`Alert` accepts native `div` props and renders `role="alert"` by default.

| Prop        | Type            | Default   | Description                                |
| ----------- | --------------- | --------- | ------------------------------------------ |
| `role`      | `string`        | `'alert'` | ARIA live-region role for the message      |
| `children`  | `ReactNode`     | -         | Alert content and composed sub-parts       |
| `className` | `string`        | -         | Additional CSS classes on the root element |
| `style`     | `CSSProperties` | -         | Inline styles on the root element          |

### AlertTitle

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Title content          |
| `className` | `string`    | -       | Additional CSS classes |

### AlertDescription

| Prop        | Type        | Default | Description                     |
| ----------- | ----------- | ------- | ------------------------------- |
| `children`  | `ReactNode` | -       | Body copy or supporting content |
| `className` | `string`    | -       | Additional CSS classes          |

### AlertAction

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `children`  | `ReactNode` | -       | Action buttons, links, or controls |
| `className` | `string`    | -       | Additional CSS classes             |

## Accessibility

Keep the default `role="alert"` for urgent messages that should be announced immediately. Use `role="status"` for lower-priority confirmations that should not interrupt the current task.
