# Toast

> 依狀態上色的通知，可從應用任何地方以命令式送出。

## 預覽

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

## 用法

`Toast` 建立在 Base UI 的
[Toast](https://base-ui.com/react/components/toast) 上。這個套件匯出模組層級的 singleton `toastManager`，以及會自動掛上 viewport 的 `ToastProvider`。在應用根層放一次 `<ToastProvider>`，就可以從任何地方呼叫 `toastManager.add(...)`（事件處理、fetch interceptor、zustand action 等）。呼叫處不需要 hook。

這頁的每個範例都建立自己的 manager，讓 toast 留在自己的 viewport。在應用裡，照下面用匯出的 `toastManager`。

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

## 狀態

`type` 接受 `success`、`warning`、`error`、`info` 或 `loading`。toast 會套上對應顏色，但不會自己選圖示。圖示要透過 `data.icon` 選擇加入。`loading` 狀態在有提供 `data.cancelProps` 時，會把關閉的 X 換成取消按鈕。

## 位置

`ToastProvider` 接受 `position` prop，有六個錨點：`top-left`、`top-center`、`top-right`、`bottom-left`、`bottom-center`、`bottom-right`。一個 provider 對應一個位置。透過它的 manager 送出的 toast 會出現在該錨點。

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

### 多個位置（兩條通道）

要把一部分 toast 送到一個角落、另一部分送到不同角落，用 `createToastManager` 建立第二個 manager，並為它巢狀第二個 `ToastProvider`。每一組 provider／manager 是獨立通道。呼叫處選要用哪一條。

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

## 變體

`solid` 變體（預設）用狀態色填滿 toast，彩色底、白字。`subtle` 變體改成白底，圖示帶色調，對應設計系統裡的 notification 模式。

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

## 載入中

耗時操作時，送出 `type: 'loading'` 且 `timeout: 0` 的 toast。加上 `data.cancelProps` 按鈕（取代關閉的 X），讓使用者可以取消操作，完成後再 `update` 這則 toast。

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

## 附圖示

透過 `data.icon` 傳入任何圖示節點；渲染時會把它放進標題前方的圖示 slot。

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

## 附說明

用 `description` 加第二行脈絡。

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

## 附動作

`actionProps` 會轉給動作按鈕。用來做「復原」或其他補救操作。

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

`promise` 會依一個 promise，把同一則 toast 依序換成載入、成功與錯誤。

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

## 堆疊

同一個 viewport 的 toast 會疊在一起。滑鼠移上去或 focus 時展開。開著的 toast 超過 `limit`（預設 `3`）時，最舊的那則會被移除。

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

## 錨定 toast

要在特定元素旁做類似 tooltip 的回饋（例如按鈕附近的 "Copied!"），用 `anchoredToastManager`，並用 `AnchoredToastProvider` 包起來。每次呼叫傳入 `positionerProps.anchor`。

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

| Prop           | Type                                                                                              | Default          | 說明                                                        |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------- |
| `position`     | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | toast viewport 的錨點                                        |
| `variant`      | `'solid' \| 'subtle'`                                                                             | `'solid'`        | 實心的狀態色表面，或 subtle 白底                                      |
| `closable`     | `boolean`                                                                                         | `true`           | 渲染關閉的 X 按鈕                                                |
| `className`    | `string`                                                                                          | —                | viewport 的額外 class                                        |
| `toastManager` | `ToastManager`                                                                                    | `toastManager`   | 覆寫預設 singleton。傳入 `createToastManager` 的自訂 manager，開第二條通道 |
| `timeout`      | `number`                                                                                          | `5000`           | 預設自動關閉的毫秒數（`0` 保持開啟）                                      |
| `limit`        | `number`                                                                                          | `3`              | 同時顯示的 toast 上限                                            |

### AnchoredToastProvider

與 `ToastProvider` 相同，但沒有 `position`。錨定 toast 每次呼叫時，依 `positionerProps.anchor` 自己定位。預設使用 `anchoredToastManager` singleton。

### Manager 方法

`toastManager`、`anchoredToastManager`，以及 `createToastManager()` 產生的任何 manager，都提供同一套命令式 API。

| 方法        | 簽章                                                         | 說明                               |
| --------- | ---------------------------------------------------------- | -------------------------------- |
| `add`     | `(options) => string`                                      | 新增一則 toast 並回傳 id                |
| `update`  | `(id, options) => void`                                    | 更新既有 toast（或透過 `add` 依 id 新增或更新） |
| `close`   | `(id?) => void`                                            | 關閉一則 toast（沒有 id 時關閉全部）          |
| `promise` | `(promise, { loading, success, error }) => Promise<Value>` | 讓同一則 toast 依序呈現載入、成功與錯誤          |

### 新增選項

| 選項                 | Type                                                       | 說明                                       |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------- |
| `id`               | `string`                                                   | 穩定 id。再用相同 id 呼叫 `add` 會就地更新             |
| `type`             | `'success' \| 'warning' \| 'error' \| 'info' \| 'loading'` | 狀態顏色                                     |
| `title`            | `ReactNode`                                                | 主要訊息                                     |
| `description`      | `ReactNode`                                                | 標題後面的次要文字                                |
| `timeout`          | `number`                                                   | 覆寫 provider 的 timeout（`0` 保持開啟）          |
| `priority`         | `'low' \| 'high'`                                          | ARIA live region 的 politeness            |
| `actionProps`      | `ButtonHTMLAttributes`                                     | 動作按鈕的 props                              |
| `positionerProps`  | `{ anchor, side, ... }`                                    | 錨定 toast 用：要錨定的元素（傳給 `Toast.Positioner`） |
| `data.icon`        | `ReactNode`                                                | 標題前方的圖示                                  |
| `data.cancelProps` | `ButtonHTMLAttributes`                                     | 取消按鈕。有設定時，或在 loading toast 上，會取代關閉的 X    |
| `onClose`          | `() => void`                                               | toast 關閉時呼叫                              |

### createToastManager

```tsx
import {
  type ToasterToastData,
  createToastManager,
} from '@/components/ui/Toast';

const errorToast = createToastManager<ToasterToastData>();
```

把回傳的 manager 傳給 `ToastProvider` 的 `toastManager` prop，就能開一條獨立通道，有自己的狀態、位置與變體。

### 匯出

| 匯出                                                                                                                                                                    | 說明                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `toastManager`                                                                                                                                                        | 預設的模組層級 singleton manager，接到 `ToastProvider`                 |
| `anchoredToastManager`                                                                                                                                                | 錨定／類似 tooltip 的 toast 用 singleton，接到 `AnchoredToastProvider` |
| `createToastManager`                                                                                                                                                  | 額外 manager 通道的工廠函式                                           |
| `ToastProvider`                                                                                                                                                       | 在某個位置掛上 viewport，並預先接上 `toastManager`（可用 prop 覆寫）            |
| `AnchoredToastProvider`                                                                                                                                               | 錨定 toast 的同樣做法                                               |
| `useToast`                                                                                                                                                            | 從 context 讀取 manager 的 hook，給 primitive 內部的進階自訂渲染            |
| `Toast`, `ToastViewport`, `ToastPortal`, `ToastPositioner`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastIcon`, `ToastAction`, `ToastClose`, `ToastCancel` | 自訂渲染用的較底層部分                                                  |
