# Toast

> Status-coloured notifications dispatched imperatively from anywhere in the app.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

// In an app, mount one `ToastProvider` at the root and call the exported
// `toastManager`. Each example here has its own manager so its toasts stay
// in its own viewport.
const toast = createToastManager<ToasterToastData>();

const toasts: { type: ToastStatus; title: string }[] = [
  { type: 'success', title: 'Changes saved' },
  { type: 'warning', title: 'Storage almost full' },
  { type: 'error', title: 'Upload failed' },
  { type: 'info', title: 'New version available' },
];

export function ToastSolidBottomRightExample() {
  return (
    <ToastProvider toastManager={toast}>
      <div className="flex flex-wrap gap-2">
        {toasts.map(({ type, title }) => (
          <Button
            key={type}
            theme="primary"
            onClick={() => toast.add({ type, title })}
          >
            {type}
          </Button>
        ))}
      </div>
    </ToastProvider>
  );
}
```

## Usage

`Toast` is built on Base UI's
[Toast](https://base-ui.com/react/components/toast). The package
exports a module-level singleton `toastManager` and a `ToastProvider`
that auto-mounts the viewport — drop `<ToastProvider>` once at the app
root and call `toastManager.add(...)` from anywhere (event handlers,
fetch interceptors, zustand actions, …). No hook required at the call
site.

Each example on this page creates its own manager so its toasts stay in
its own viewport. In an app, use the exported `toastManager` as below.

```tsx
// app root
import {
  toastManager,
  ToastProvider,
} from '@/components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}

// anywhere
import { toastManager } from '@/components/ui/Toast';

function SaveButton() {
  return (
    <Button
      onClick={() =>
        toastManager.add({ type: 'success', title: '已成功儲存' })
      }
    >
      Save
    </Button>
  );
}
```

## Status

`type` accepts `success`, `warning`, `error`, `info`, or `loading`.
The toast applies the matching colour but does not pick an icon —
icons are opt-in via `data.icon`. The `loading` status swaps the
close X for a cancel button when `data.cancelProps` is supplied.

## Position

`ToastProvider` accepts a `position` prop with six anchors:
`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`,
`bottom-right`. One provider serves one position — toasts dispatched
through its manager render at that anchor.

```tsx
import { Button } from '@/components/ui/Button';
import {
  type ToastPosition,
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { useState } from 'react';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

// One provider serves one position, so each position gets its own manager.
function PositionScene({ position }: { position: ToastPosition }) {
  const [toast] = useState(() =>
    createToastManager<ToasterToastData>(),
  );

  return (
    <ToastProvider toastManager={toast} position={position}>
      <div className="flex min-h-35 flex-col gap-3 rounded border border-grayscale-opacity-200 bg-background p-4">
        <p className="font-sans text-xs text-grayscale-opacity-600">
          position: {position}
        </p>
        <Button
          onClick={() =>
            toast.add({ type: 'info', title: `Shown at ${position}` })
          }
        >
          {position}
        </Button>
      </div>
    </ToastProvider>
  );
}

export function ToastPositionsExample() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 p-4 md:grid-cols-3">
      {positions.map((position) => (
        <PositionScene key={position} position={position} />
      ))}
    </div>
  );
}
```

### Multiple positions (two channels)

To send some toasts to one corner and others to a different corner,
create a second manager with `createToastManager` and nest a second
`ToastProvider` for it. Each provider/manager pair is a separate
channel — pick whichever you want at the call site.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { XmarkIcon } from '@/components/icons/XmarkIcon';

// In an app, the outer provider would use the exported `toastManager`.
const toast = createToastManager<ToasterToastData>();
const errorToast = createToastManager<ToasterToastData>();

export function ToastTwoChannelsExample() {
  return (
    <ToastProvider toastManager={toast} position="bottom-right">
      <ToastProvider
        toastManager={errorToast}
        position="top-center"
        variant="subtle"
      >
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast.add({ type: 'success', title: 'Saved to draft' })
            }
          >
            Bottom-right success
          </Button>
          <Button
            onClick={() =>
              errorToast.add({
                type: 'error',
                title: 'Connection lost',
                data: { icon: <XmarkIcon className="size-5" /> },
              })
            }
          >
            Top-center error
          </Button>
        </div>
      </ToastProvider>
    </ToastProvider>
  );
}
```

```tsx
// toast-managers.ts
import {
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

export const errorToast = createToastManager<ToasterToastData>();
```

```tsx
// app root
import { ToastProvider, toastManager } from '@/components/ui/Toast';
import { errorToast } from './toast-managers';

<ToastProvider position="bottom-right">
  <ToastProvider
    toastManager={errorToast}
    position="top-center"
    variant="subtle"
  >
    {children}
  </ToastProvider>
</ToastProvider>;
```

```tsx
// anywhere
import { toastManager } from '@/components/ui/Toast';
import { errorToast } from './toast-managers';

toastManager.add({ type: 'success', title: 'Saved' });
errorToast.add({ type: 'error', title: 'Connection lost' });
```

## Variants

The `solid` variant (default) fills the toast with the status colour
on a white-on-coloured layout. The `subtle` variant flips to a white
surface with a tinted icon — matches the "notification" pattern in the
design system.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToastStatus,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { XmarkIcon } from '@/components/icons/XmarkIcon';
import type { ReactNode } from 'react';

const toast = createToastManager<ToasterToastData>();

const toasts: {
  type: ToastStatus;
  title: string;
  icon: ReactNode;
}[] = [
  {
    type: 'success',
    title: 'Changes saved',
    icon: <CheckIcon className="size-5" />,
  },
  {
    type: 'warning',
    title: 'Storage almost full',
    icon: <FlagIcon className="size-5" />,
  },
  {
    type: 'error',
    title: 'Upload failed',
    icon: <XmarkIcon className="size-5" />,
  },
  {
    type: 'info',
    title: 'New version available',
    icon: <FlagIcon className="size-5" />,
  },
];

export function ToastSubtleTopRightExample() {
  return (
    <ToastProvider
      toastManager={toast}
      position="top-right"
      variant="subtle"
    >
      <div className="flex flex-wrap gap-2">
        {toasts.map(({ type, title, icon }) => (
          <Button
            key={type}
            theme="primary"
            onClick={() => toast.add({ type, title, data: { icon } })}
          >
            {type}
          </Button>
        ))}
      </div>
    </ToastProvider>
  );
}
```

## Loading

For long-running operations, dispatch a toast with `type: 'loading'`
and `timeout: 0`. Give it a `data.cancelProps` button, which replaces
the close X, so the user can cancel the operation, then `update` the
toast on completion.

```tsx
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { CheckIcon } from '@/components/icons/CheckIcon';

const toast = createToastManager<ToasterToastData>();

export function ToastLoadingExample() {
  return (
    <ToastProvider
      toastManager={toast}
      position="top-right"
      variant="subtle"
    >
      <Button
        onClick={() => {
          // Stands in for a real upload that finishes after 2.5 seconds.
          const upload = setTimeout(() => {
            toast.update('upload', {
              type: 'success',
              title: 'Upload complete',
              timeout: 4000,
              data: { icon: <CheckIcon className="size-5" /> },
            });
          }, 2500);
          toast.add({
            id: 'upload',
            type: 'loading',
            title: 'Uploading…',
            timeout: 0,
            data: {
              icon: <Spinner className="size-5" />,
              cancelProps: {
                children: 'Cancel',
                onClick: () => clearTimeout(upload),
              },
            },
          });
        }}
      >
        Loading toast
      </Button>
    </ToastProvider>
  );
}
```

## With Icon

Pass any icon node through `data.icon`; the renderer drops it into
the icon slot before the title.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { FlagIcon } from '@/components/icons/FlagIcon';

const toast = createToastManager<ToasterToastData>();

export function ToastWithIconExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'warning',
            title: 'Maintenance starts at 22:00',
            data: { icon: <FlagIcon className="size-5" /> },
          })
        }
      >
        Toast with icon
      </Button>
    </ToastProvider>
  );
}
```

## With Description

Add a second line of context with `description`.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastWithDescriptionExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'success',
            title: 'Changes saved',
            description: 'All changes were applied to the project.',
          })
        }
      >
        Toast with description
      </Button>
    </ToastProvider>
  );
}
```

## With Action

`actionProps` is forwarded to the action button. Use it for an "Undo"
or other recovery affordance.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastWithActionExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() =>
          toast.add({
            type: 'info',
            title: 'Item archived',
            actionProps: {
              children: 'Undo',
              onClick: () =>
                toast.add({
                  type: 'success',
                  title: 'Item restored',
                }),
            },
          })
        }
      >
        Toast with action
      </Button>
    </ToastProvider>
  );
}
```

## Promise

`promise` swaps a single toast through loading, success, and error
states based on a promise.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const toast = createToastManager<ToasterToastData>();

// Stands in for a request that resolves after 1.5 seconds.
function saveDraft() {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve('Draft saved'), 1500),
  );
}

export function ToastPromiseFlowExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() => {
          void toast.promise(saveDraft(), {
            loading: { type: 'info', title: 'Saving…' },
            success: (result) => ({ type: 'success', title: result }),
            error: {
              type: 'error',
              title: 'Failed, try again later',
            },
          });
        }}
      >
        Promise toast
      </Button>
    </ToastProvider>
  );
}
```

## Stacking

Toasts in one viewport stack. Hover or focus the stack to expand it.
When more than `limit` toasts (default `3`) are open, the oldest one is
removed.

```tsx
import { Button } from '@/components/ui/Button';
import {
  ToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const toast = createToastManager<ToasterToastData>();

export function ToastStackedExample() {
  return (
    <ToastProvider toastManager={toast}>
      <Button
        onClick={() => {
          toast.add({ type: 'success', title: 'File uploaded' });
          toast.add({
            type: 'warning',
            title: 'Storage almost full',
          });
          toast.add({ type: 'error', title: 'Sync failed' });
        }}
      >
        Stack three toasts
      </Button>
    </ToastProvider>
  );
}
```

## Anchored toasts

For tooltip-style feedback anchored to a specific element (e.g.,
"Copied!" near a button), use `anchoredToastManager` and wrap with
`AnchoredToastProvider`. Pass `positionerProps.anchor` per call.

```tsx
import { Button } from '@/components/ui/Button';
import {
  AnchoredToastProvider,
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';
import { useRef, useState } from 'react';

// In an app, use the exported `anchoredToastManager`.
const toast = createToastManager<ToasterToastData>();

export function ToastAnchoredExample() {
  const ref = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  return (
    <AnchoredToastProvider toastManager={toast} variant="subtle">
      <Button
        ref={ref}
        theme="primary"
        onClick={() => {
          const next = count + 1;
          setCount(next);
          toast.add({
            type: 'success',
            title: `Copied! (${next})`,
            positionerProps: {
              anchor: ref.current,
              side: 'top',
              sideOffset: 8,
            },
          });
        }}
      >
        Copy
      </Button>
    </AnchoredToastProvider>
  );
}
```

```tsx
// app root
import {
  AnchoredToastProvider,
  ToastProvider,
} from '@/components/ui/Toast';

<ToastProvider>
  <AnchoredToastProvider variant="subtle">
    {children}
  </AnchoredToastProvider>
</ToastProvider>;
```

```tsx
// anywhere
import { anchoredToastManager } from '@/components/ui/Toast';

function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Button
      ref={ref}
      onClick={() => {
        navigator.clipboard.writeText(value);
        anchoredToastManager.add({
          type: 'success',
          title: 'Copied!',
          positionerProps: {
            anchor: ref.current,
            side: 'top',
            sideOffset: 8,
          },
        });
      }}
    >
      Copy
    </Button>
  );
}
```

## Props

### ToastProvider

| Prop           | Type                                                                                              | Default          | Description                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| `position`     | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Anchor for the toast viewport                                                                         |
| `variant`      | `'solid' \| 'subtle'`                                                                             | `'solid'`        | Solid status-coloured surface or subtle white bg                                                      |
| `closable`     | `boolean`                                                                                         | `true`           | Render the close X button                                                                             |
| `className`    | `string`                                                                                          | —                | Additional classes for the viewport                                                                   |
| `toastManager` | `ToastManager`                                                                                    | `toastManager`   | Override the default singleton — pass a custom manager from `createToastManager` for a second channel |
| `timeout`      | `number`                                                                                          | `5000`           | Default auto-dismiss in ms (`0` keeps it open)                                                        |
| `limit`        | `number`                                                                                          | `3`              | Max toasts shown at once                                                                              |

### AnchoredToastProvider

Same as `ToastProvider` but without `position` — anchored toasts
position themselves against `positionerProps.anchor` on each call.
Defaults to the `anchoredToastManager` singleton.

### Manager methods

`toastManager`, `anchoredToastManager`, and any manager from
`createToastManager()` expose the same imperative API.

| Method    | Signature                                                  | Description                                                 |
| --------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `add`     | `(options) => string`                                      | Adds a toast and returns its id                             |
| `update`  | `(id, options) => void`                                    | Updates an existing toast (or upserts by id via `add`)      |
| `close`   | `(id?) => void`                                            | Closes a toast (or all toasts when no id)                   |
| `promise` | `(promise, { loading, success, error }) => Promise<Value>` | Threads loading/success/error states through a single toast |

### Add options

| Option             | Type                                                       | Description                                                                    |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`               | `string`                                                   | Stable id — calling `add` again with the same id updates in place              |
| `type`             | `'success' \| 'warning' \| 'error' \| 'info' \| 'loading'` | Status colour                                                                  |
| `title`            | `ReactNode`                                                | Main message                                                                   |
| `description`      | `ReactNode`                                                | Secondary text shown after the title                                           |
| `timeout`          | `number`                                                   | Override provider timeout (`0` keeps it open)                                  |
| `priority`         | `'low' \| 'high'`                                          | ARIA live region politeness                                                    |
| `actionProps`      | `ButtonHTMLAttributes`                                     | Props for the action button                                                    |
| `positionerProps`  | `{ anchor, side, ... }`                                    | For anchored toasts — element to anchor against (passed to `Toast.Positioner`) |
| `data.icon`        | `ReactNode`                                                | Icon rendered before the title                                                 |
| `data.cancelProps` | `ButtonHTMLAttributes`                                     | Cancel button — replaces the close X when set or on loading toasts             |
| `onClose`          | `() => void`                                               | Called when the toast closes                                                   |

### createToastManager

```tsx
import {
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const errorToast = createToastManager<ToasterToastData>();
```

Pass the returned manager to a `ToastProvider`'s `toastManager` prop
to create a separate channel with its own state, position, and variant.

### Exports

| Export                                                                                                                                                                | Description                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `toastManager`                                                                                                                                                        | Default module-level singleton manager — wired to `ToastProvider`                       |
| `anchoredToastManager`                                                                                                                                                | Singleton for anchored/tooltip-style toasts — wired to `AnchoredToastProvider`          |
| `createToastManager`                                                                                                                                                  | Factory for additional manager channels                                                 |
| `ToastProvider`                                                                                                                                                       | Mounts a viewport at a position and pre-wires `toastManager` (override via prop)        |
| `AnchoredToastProvider`                                                                                                                                               | Same idea for anchored toasts                                                           |
| `useToast`                                                                                                                                                            | Hook reading the manager from context — for advanced custom rendering inside primitives |
| `Toast`, `ToastViewport`, `ToastPortal`, `ToastPositioner`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastIcon`, `ToastAction`, `ToastClose`, `ToastCancel` | Lower-level parts for custom rendering                                                  |
