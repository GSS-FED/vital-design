# Collapsible

> 可展開與收合的互動面板，用來顯示額外內容。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';

export function CollapsibleExample() {
  return (
    <Collapsible className="w-80 space-y-2">
      <CollapsibleTrigger
        render={
          <Button
            variant="text"
            theme="default"
            className="w-full [&[data-panel-open]_[data-icon]]:rotate-180"
          >
            <span className="flex-1 text-left">
              Can I use this in my project?
            </span>
            <AngleDownIcon
              data-icon="inline-end"
              className="transition-transform duration-150"
            />
          </Button>
        }
      />
      <CollapsibleContent className="rounded-(--radius-sm) bg-grayscale-opacity-100 p-4 text-grayscale-opacity-700">
        Yes. Free to use for personal and commercial projects. No
        attribution required.
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## 用法

`Collapsible` 建立在 Base UI Collapsible 上。把 trigger 與 content 部分組在一起；面板展開時，trigger 會在自己身上切換 `data-panel-open`，你可以用它轉動圖示，或做其他互動提示。

## 產品細節

用 `Collapsible` 做「顯示更多」：補充細節先收在一旁，等使用者要求再展開。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';

export function CollapsibleProductDetailsExample() {
  return (
    <div className="w-96 space-y-4 rounded-(--radius-sm) border border-grayscale-opacity-200 p-4">
      <div>
        <div className="font-medium text-grayscale-opacity-900">
          Vittal Design Hoodie
        </div>
        <div className="text-sm text-grayscale-opacity-600">$48</div>
      </div>
      <Collapsible className="space-y-2">
        <CollapsibleTrigger
          render={
            <Button
              variant="text"
              theme="default"
              size="md"
              className="w-full justify-between"
            >
              <span>Show details</span>
              <AngleDownIcon data-icon="inline-end" />
            </Button>
          }
        />
        <CollapsibleContent className="space-y-1 text-grayscale-opacity-700">
          <p>100% cotton, double-stitched seams.</p>
          <p>Ships within 2 business days.</p>
          <p>Free returns within 30 days.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## 結構

```tsx
<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>
```

## 屬性

`Collapsible` 接受 Base UI `Collapsible.Root` 的 props：

| Prop           | Type                               | Default | 說明          |
| -------------- | ---------------------------------- | ------- | ----------- |
| `open`         | `boolean`                          | -       | 受控的開啟狀態     |
| `defaultOpen`  | `boolean`                          | `false` | 非受控時的初始開啟狀態 |
| `onOpenChange` | `(open: boolean, details) => void` | -       | 面板開啟或關閉時呼叫  |
| `disabled`     | `boolean`                          | `false` | 停用切換        |

### CollapsibleContent

渲染一個 `<div>` 面板，高度過渡由 Base UI 的 `--collapsible-panel-height` CSS 變數驅動。用 `className` prop 覆寫預設的內文樣式。

| Prop               | Type      | Default | 說明                                                             |
| ------------------ | --------- | ------- | -------------------------------------------------------------- |
| `keepMounted`      | `boolean` | `false` | 收合時仍把面板留在 DOM                                                  |
| `hiddenUntilFound` | `boolean` | `false` | 使用 `hidden="until-found"`，讓瀏覽器內建的頁面內搜尋可以展開面板；會覆寫 `keepMounted` |

## 無障礙

`CollapsibleTrigger` 會自動接上 `aria-expanded` 與 `aria-controls`。trigger 標籤要描述它展開的內容。
