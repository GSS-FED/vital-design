# Alert Dialog

> A modal confirmation that interrupts the user and needs a response before they continue.

## Preview

```tsx
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { CircleExclamationSolidIcon } from '@/components/icons/CircleExclamationSolidIcon';

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button theme="dangerous">Delete project</Button>}
      />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogBody>
              <AlertDialogMedia className="text-warning-500">
                <CircleExclamationSolidIcon />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this project?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  The project and its files will be removed for
                  everyone. This can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogClose
                render={
                  <Button
                    variant="text"
                    size="lg"
                    className="text-grayscale-opacity-600"
                  >
                    Cancel
                  </Button>
                }
              />
              <AlertDialogClose
                render={
                  <Button variant="text" size="lg" theme="alarm">
                    Delete
                  </Button>
                }
              />
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
```

## Usage

`AlertDialog` is built on Base UI Alert Dialog. Use it instead of [Dialog](/docs/components/dialog) when the user must answer before continuing, such as confirming a deletion. It renders with `role="alertdialog"` and does not close when the user clicks outside it; it closes from an `AlertDialogClose` action or the Escape key.

Compose the root, trigger, portal, backdrop, viewport, and popup the same way as `Dialog`. Inside the popup, `AlertDialogBody` lays out an optional `AlertDialogMedia` icon next to `AlertDialogHeader`, which holds the title and description. Put the actions in `AlertDialogFooter` as text buttons, with the cancel action first: the first action gets focus when the dialog opens.

The preview uses `Button` and a `CircleExclamationSolidIcon`; add `button` and `icon-circle-exclamation-solid` from the registry as well.

## Message

```tsx
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { CircleCheckSolidIcon } from '@/components/icons/CircleCheckSolidIcon';
import { CircleExclamationSolidIcon } from '@/components/icons/CircleExclamationSolidIcon';
import { CircleXmarkSolidIcon } from '@/components/icons/CircleXmarkSolidIcon';
import type { ReactNode } from 'react';

const messages: {
  status: string;
  icon: ReactNode;
  title: string;
  description: string;
}[] = [
  {
    status: 'Warning',
    icon: <CircleExclamationSolidIcon className="text-warning-500" />,
    title: 'Storage almost full',
    description: 'You have used 90% of your workspace storage.',
  },
  {
    status: 'Success',
    icon: <CircleCheckSolidIcon className="text-success-500" />,
    title: 'Import complete',
    description: 'All 128 records were imported.',
  },
  {
    status: 'Error',
    icon: <CircleXmarkSolidIcon className="text-destructive-500" />,
    title: 'Something went wrong',
    description:
      'The report could not be generated. Try again later.',
  },
];

export function AlertDialogMessageExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {messages.map((message) => (
        <AlertDialog key={message.status}>
          <AlertDialogTrigger
            render={<Button theme="default">{message.status}</Button>}
          />
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogViewport>
              <AlertDialogPopup>
                <AlertDialogBody>
                  <AlertDialogMedia>{message.icon}</AlertDialogMedia>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {message.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {message.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <AlertDialogClose
                    render={
                      <Button
                        variant="text"
                        size="lg"
                        theme="primary"
                      >
                        OK
                      </Button>
                    }
                  />
                </AlertDialogFooter>
              </AlertDialogPopup>
            </AlertDialogViewport>
          </AlertDialogPortal>
        </AlertDialog>
      ))}
    </div>
  );
}
```

When the user only needs to acknowledge something, use a single `OK` action. Color the icon with the status: `text-warning-500`, `text-success-500`, or `text-destructive-500`.

## With checkbox

```tsx
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { CircleExclamationSolidIcon } from '@/components/icons/CircleExclamationSolidIcon';
import { useState } from 'react';

export function AlertDialogCheckboxExample() {
  const [skipToday, setSkipToday] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button theme="default">Merge items</Button>}
      />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogBody>
              <AlertDialogMedia className="text-warning-500">
                <CircleExclamationSolidIcon />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Merge the selected items?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Their comments and attachments will be combined into
                  one item.
                </AlertDialogDescription>
                <Field orientation="horizontal" className="mt-2">
                  <Checkbox
                    id="alert-dialog-skip-today"
                    checked={skipToday}
                    onCheckedChange={setSkipToday}
                  />
                  <FieldLabel htmlFor="alert-dialog-skip-today">
                    Don&apos;t ask again today
                  </FieldLabel>
                </Field>
              </AlertDialogHeader>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogClose
                render={
                  <Button
                    variant="text"
                    size="lg"
                    className="text-grayscale-opacity-600"
                  >
                    Cancel
                  </Button>
                }
              />
              <AlertDialogClose
                render={
                  <Button variant="text" size="lg" theme="primary">
                    Merge
                  </Button>
                }
              />
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
```

Extra controls, such as a "Don't ask again today" checkbox, go in `AlertDialogHeader` below the description.

## Anatomy

```tsx
<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <AlertDialogViewport>
      <AlertDialogPopup>
        <AlertDialogBody>
          <AlertDialogMedia />
          <AlertDialogHeader>
            <AlertDialogTitle />
            <AlertDialogDescription />
          </AlertDialogHeader>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogClose />
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialogViewport>
  </AlertDialogPortal>
</AlertDialog>
```

## Props

`AlertDialog` accepts Base UI `AlertDialog.Root` props, including `open`, `defaultOpen`, `onOpenChange`, and `actionsRef`. Every other part accepts the props of its Base UI part or of a `div`, plus `className`.

### AlertDialogPortal

| Prop          | Type                                                  | Default         | Description                                      |
| ------------- | ----------------------------------------------------- | --------------- | ------------------------------------------------ |
| `container`   | `HTMLElement \| ShadowRoot \| RefObject<...> \| null` | `document.body` | Element the backdrop and popup are portaled into |
| `keepMounted` | `boolean`                                             | `false`         | Keeps the popup in the DOM while it is closed    |

### AlertDialogClose

| Prop     | Type        | Default | Description                                  |
| -------- | ----------- | ------- | -------------------------------------------- |
| `render` | `ReactNode` | -       | Renders a custom element, such as a `Button` |

## Accessibility

Always include `AlertDialogTitle`; it names the dialog, and `AlertDialogDescription` describes it. `AlertDialogMedia` is hidden from assistive technology, so the title must make sense without the icon. Write action labels that say what happens, such as "Delete" rather than "OK", when the action is destructive.
