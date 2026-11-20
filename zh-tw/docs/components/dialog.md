# Dialog

> 用來確認、做決定，以及填簡短表單的模態表面。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/ui/Dialog';

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogHeader>
              <div className="space-y-1">
                <DialogTitle>Submit request?</DialogTitle>
                <DialogDescription>
                  Review the details before sending this request for
                  approval.
                </DialogDescription>
              </div>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              This action will notify approvers and lock the current
              draft while it is being reviewed.
            </DialogBody>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="text" theme="default">
                    Cancel
                  </Button>
                }
              />
              <DialogClose
                render={<Button theme="primary">Submit</Button>}
              />
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
```

## 用法

`Dialog` 建立在 Base UI Dialog 上。把具名的 root、觸發器、portal、backdrop、viewport、popup 與內容部分組在一起，標題和說明才會對輔助科技保持可及。

## 尺寸

```tsx
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/ui/Dialog';

const sizes = ['small', 'medium', 'large'] as const;

export function DialogSizesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={<Button className="capitalize">{size}</Button>}
          />
          <DialogPortal>
            <DialogBackdrop />
            <DialogViewport>
              <DialogPopup size={size}>
                <DialogHeader>
                  <DialogTitle className="capitalize">
                    {size} dialog
                  </DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <DialogBody>
                  Dialog popup width is controlled by the size prop.
                </DialogBody>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant="text" theme="default">
                        Close
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogPopup>
            </DialogViewport>
          </DialogPortal>
        </Dialog>
      ))}
    </div>
  );
}
```

簡短確認文案用 `small`，常見決策流程用 `medium`，內容較密時用 `large`。

## 結構

```tsx
<Dialog>
  <DialogTrigger />
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <DialogClose />
        </DialogHeader>
        <DialogBody />
        <DialogFooter />
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

## Props

`Dialog` 接受 Base UI `Dialog.Root` 的 props，包含 `open`、`defaultOpen`、`onOpenChange`、`modal` 與 `disablePointerDismissal`。

### DialogPopup

| Prop        | Type                             | Default    | 說明            |
| ----------- | -------------------------------- | ---------- | ------------- |
| `size`      | `'small' \| 'medium' \| 'large'` | `'medium'` | 控制最大寬度        |
| `className` | `string`                         | -          | 額外的 CSS class |
| `children`  | `ReactNode`                      | -          | 對話框內容與子部分     |

### DialogClose

| Prop         | Type        | Default   | 說明           |
| ------------ | ----------- | --------- | ------------ |
| `children`   | `ReactNode` | -         | 可選的自訂關閉按鈕內容  |
| `render`     | `ReactNode` | -         | 把自訂元素渲染成關閉按鈕 |
| `aria-label` | `string`    | `'Close'` | 預設圖示按鈕的無障礙標籤 |

## 無障礙

popup 裡一定要放 `DialogTitle`。對話框需要額外脈絡時加上 `DialogDescription`，破壞性或無法復原的動作要在頁尾寫清楚。
