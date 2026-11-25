# Alert Dialog

> 打斷使用者、需要回應後才能繼續的模態確認視窗。

## 預覽

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

## 用法

`AlertDialog` 建立在 Base UI Alert Dialog 上。使用者必須回應才能繼續時（例如確認刪除）用它，而不是 [Dialog](/zh-tw/docs/components/dialog)。它的 role 是 `alertdialog`，點擊外部不會關閉；只會由 `AlertDialogClose` 動作或 Escape 鍵關閉。

root、觸發器、portal、backdrop、viewport 與 popup 的組法和 `Dialog` 相同。popup 裡由 `AlertDialogBody` 把選用的 `AlertDialogMedia` 圖示排在 `AlertDialogHeader` 旁邊，標題與說明放在 `AlertDialogHeader`。動作以文字按鈕放在 `AlertDialogFooter`，取消放第一個：對話框打開時焦點會落在第一個動作上。

預覽用到 `Button` 與 `CircleExclamationSolidIcon`，也要從 registry 加入 `button` 與 `icon-circle-exclamation-solid`。

## 訊息

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

使用者只需要知悉時，放一個 `OK` 動作（中文介面用「我知道了」）。圖示顏色依狀態用 `text-warning-500`、`text-success-500` 或 `text-destructive-500`。

## 搭配勾選框

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

額外的控制項（例如「今日不再詢問」勾選框）放在 `AlertDialogHeader` 裡、說明下方。

## 結構

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

`AlertDialog` 接受 Base UI `AlertDialog.Root` 的 props，包含 `open`、`defaultOpen`、`onOpenChange` 與 `actionsRef`。其他部分接受對應 Base UI 部分或 `div` 的 props，以及 `className`。

### AlertDialogPortal

| Prop          | Type                                                  | Default         | 說明                             |
| ------------- | ----------------------------------------------------- | --------------- | ------------------------------ |
| `container`   | `HTMLElement \| ShadowRoot \| RefObject<...> \| null` | `document.body` | backdrop 與 popup 要 portal 進的元素 |
| `keepMounted` | `boolean`                                             | `false`         | 關閉時仍把 popup 留在 DOM 裡           |

### AlertDialogClose

| Prop     | Type        | Default | 說明                  |
| -------- | ----------- | ------- | ------------------- |
| `render` | `ReactNode` | -       | 渲染成自訂元素，例如 `Button` |

## 無障礙

一定要放 `AlertDialogTitle`，它是對話框的名稱，`AlertDialogDescription` 是描述。`AlertDialogMedia` 對輔助科技隱藏，所以標題不靠圖示也要看得懂。破壞性動作的按鈕文字要寫出結果，例如「刪除」而不是「確定」。
