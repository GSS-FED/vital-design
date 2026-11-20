# Sheet

> 從任一側滑入的對話框，用來做導覽、篩選、表單與檢視面板。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button>Open Sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are
            done.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-3 py-2">
            <p>
              Sheet body content — drop forms, lists, or any custom
              layout here.
            </p>
            <p>
              It scrolls independently from the header and footer.
            </p>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose
            render={
              <Button variant="text" theme="default">
                Cancel
              </Button>
            }
          />
          <SheetClose render={<Button>Save</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## 用法

`Sheet` 建立在 Base UI Dialog 上。`SheetContent` 把 portal、overlay、popup 與角落關閉按鈕包在一起，常見情況只要組一次。

## 側邊

`SheetContent` 的 `side` prop 決定 sheet 從哪一邊滑入。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function SheetSidesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button className="capitalize">{side}</Button>}
          />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">
                {side} sheet
              </SheetTitle>
              <SheetDescription>
                Sheet position is controlled by the side prop.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              The sheet slides in from the {side} edge.
            </SheetBody>
            <SheetFooter>
              <SheetClose
                render={
                  <Button variant="text" theme="default">
                    Close
                  </Button>
                }
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
```

## 非模態的停靠面板

在 `Sheet` root 上傳 `modal={false}`，拿掉背景遮罩並讓頁面保持可互動。適合篩選、檢視面板，或任何要和主要內容並存的面板。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

export function SheetNonModalDockedPanelExample() {
  return (
    <Sheet modal={false}>
      <SheetTrigger render={<Button>Open docked panel</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Docked panel</SheetTitle>
          <SheetDescription>
            The page stays interactive and is not dimmed while this
            sheet is open.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          Use a non-modal Sheet for filters, inspectors, or side
          panels that should coexist with the main content.
        </SheetBody>
        <SheetFooter>
          <SheetClose
            render={
              <Button variant="text" theme="default">
                Close
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

overlay 的渲染會自動跟著 `modal`：sheet 非模態時不會渲染背景遮罩。

## 隱藏關閉按鈕

流程需要用 footer 的動作明確結束時，在 `SheetContent` 上傳 `showCloseButton={false}`，拿掉角落的關閉按鈕。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

export function SheetHiddenCloseButtonExample() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button>Open without close button</Button>}
      />
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No corner close</SheetTitle>
          <SheetDescription>
            Use the footer action to dismiss this sheet.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          Useful for flows that require explicit confirmation.
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button>Done</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## 結構

```tsx
<Sheet>
  <SheetTrigger />
  <SheetContent>
    <SheetHeader>
      <SheetTitle />
      <SheetDescription />
    </SheetHeader>
    <SheetBody />
    <SheetFooter>
      <SheetClose />
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Props

`Sheet` 接受 Base UI `Dialog.Root` 的 props，包含 `open`、`defaultOpen`、`onOpenChange` 與 `modal`。

### SheetContent

| Prop               | Type                                     | Default   | 說明                      |
| ------------------ | ---------------------------------------- | --------- | ----------------------- |
| `side`             | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | sheet 滑入的邊緣             |
| `showCloseButton`  | `boolean`                                | `true`    | 渲染角落的關閉按鈕               |
| `closeLabel`       | `string`                                 | `'Close'` | 角落關閉按鈕的 `aria-label`    |
| `overlayClassName` | `string`                                 | -         | overlay 的自訂 class（有渲染時） |
| `portalContainer`  | `HTMLElement \| null`                    | -         | 自訂 portal 容器            |
| `className`        | `string`                                 | -         | popup 上的額外 class        |

## 無障礙

一定要放 `SheetTitle` 給螢幕閱讀器；單看標題看不出用途時，再加上 `SheetDescription`。破壞性或無法復原的動作要在頁尾寫清楚。
