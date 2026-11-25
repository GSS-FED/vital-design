# Resizable

> 以 react-resizable-panels 實作的無障礙可調整面板。

## 預覽

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

## 用法

`Resizable` 包裝 [`react-resizable-panels`](https://github.com/bvaughn/react-resizable-panels)。用 `ResizableHandle` 隔開 `ResizablePanel`，組成 `ResizablePanelGroup`。群組可以巢狀，做出水平與垂直混用的版面。

## 垂直

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

## 帶拖曳把手

把 `withHandle` 傳給 `ResizableHandle`，渲染看得見的拖曳指示。在面板上設 `minSize`，避免它被收合。

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

## 部分

| 部分                    | 說明                                   |
| --------------------- | ------------------------------------ |
| `ResizablePanelGroup` | 版面容器；設定 `horizontal` 或 `vertical` 方向 |
| `ResizablePanel`      | 群組裡可調整大小的區域                          |
| `ResizableHandle`     | 兩個面板之間的拖曳分隔                          |

## ResizablePanelGroup 屬性

接受 `react-resizable-panels` 的 [`PanelGroup`](https://github.com/bvaughn/react-resizable-panels#panelgroup) 每一個 prop。

| Prop          | Type                         | Default        | 說明                   |
| ------------- | ---------------------------- | -------------- | -------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 版面方向                 |
| `autoSaveId`  | `string`                     | —              | 把尺寸存在 `localStorage` |
| `className`   | `string`                     | —              | 額外的 CSS class        |

## ResizablePanel 屬性

接受 `react-resizable-panels` 的 [`Panel`](https://github.com/bvaughn/react-resizable-panels#panel) 每一個 prop。

| Prop          | Type               | Default | 說明                    |
| ------------- | ------------------ | ------- | --------------------- |
| `defaultSize` | `number \| string` | —       | 初始尺寸，以百分比表示           |
| `minSize`     | `number \| string` | —       | 收合前的最小尺寸              |
| `maxSize`     | `number \| string` | —       | 最大尺寸                  |
| `collapsible` | `boolean`          | `false` | 允許縮過 `collapsedSize`  |
| `id`          | `string`           | —       | 群組設了 `autoSaveId` 時必填 |

## ResizableHandle 屬性

| Prop         | Type      | Default | 說明            |
| ------------ | --------- | ------- | ------------- |
| `withHandle` | `boolean` | `false` | 渲染看得見的握把指示    |
| `disabled`   | `boolean` | `false` | 停用拖曳          |
| `className`  | `string`  | —       | 額外的 CSS class |
