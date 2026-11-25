# Resizable

> Accessible resizable panels backed by react-resizable-panels.

## Preview

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/Resizable';

function PanelContent({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 font-sans text-sm font-medium text-grayscale-opacity-800">
      {children}
    </div>
  );
}

export function ResizableExample() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="50%">
        <PanelContent>One</PanelContent>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="35%">
            <PanelContent>Two</PanelContent>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="65%">
            <PanelContent>Three</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## Usage

`Resizable` wraps
[`react-resizable-panels`](https://github.com/bvaughn/react-resizable-panels).
Compose `ResizablePanelGroup` with `ResizablePanel` children separated
by `ResizableHandle`. Nest groups to build mixed horizontal/vertical
layouts.

## Vertical

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/Resizable';

function PanelContent({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 font-sans text-sm font-medium text-grayscale-opacity-800">
      {children}
    </div>
  );
}

export function ResizableVerticalExample() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[240px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="30%">
        <PanelContent>Header</PanelContent>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%">
        <PanelContent>Content</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## With Handle

Pass `withHandle` to `ResizableHandle` to render a visible drag
indicator. Use a `minSize` on a panel to prevent it from collapsing.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/Resizable';

function PanelContent({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 font-sans text-sm font-medium text-grayscale-opacity-800">
      {children}
    </div>
  );
}

export function ResizableWithHandleExample() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="30%" minSize="20%">
        <PanelContent>Sidebar</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <PanelContent>Content</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## Parts

| Part                  | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `ResizablePanelGroup` | Layout container; sets `horizontal` or `vertical` direction |
| `ResizablePanel`      | Resizable region inside a group                             |
| `ResizableHandle`     | Drag handle separator between two panels                    |

## ResizablePanelGroup Props

Accepts every prop from `react-resizable-panels`'s
[`PanelGroup`](https://github.com/bvaughn/react-resizable-panels#panelgroup).

| Prop          | Type                         | Default        | Description                     |
| ------------- | ---------------------------- | -------------- | ------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction                |
| `autoSaveId`  | `string`                     | —              | Persist sizes in `localStorage` |
| `className`   | `string`                     | —              | Additional CSS classes          |

## ResizablePanel Props

Accepts every prop from `react-resizable-panels`'s
[`Panel`](https://github.com/bvaughn/react-resizable-panels#panel).

| Prop          | Type               | Default | Description                              |
| ------------- | ------------------ | ------- | ---------------------------------------- |
| `defaultSize` | `number \| string` | —       | Initial size as percentage               |
| `minSize`     | `number \| string` | —       | Minimum size before collapse             |
| `maxSize`     | `number \| string` | —       | Maximum size                             |
| `collapsible` | `boolean`          | `false` | Allow collapsing past `collapsedSize`    |
| `id`          | `string`           | —       | Required if `autoSaveId` is set on group |

## ResizableHandle Props

| Prop         | Type      | Default | Description                      |
| ------------ | --------- | ------- | -------------------------------- |
| `withHandle` | `boolean` | `false` | Renders a visible grip indicator |
| `disabled`   | `boolean` | `false` | Disables dragging                |
| `className`  | `string`  | —       | Additional CSS classes           |
