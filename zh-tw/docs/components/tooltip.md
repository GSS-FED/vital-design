# Tooltip

> 錨在觸發元素上的簡短提示，可控制箭頭與側邊。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

export function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Hover me</Button>} />
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## 用法

`Tooltip` 建立在 Base UI 的
[Tooltip](https://base-ui.com/react/components/tooltip) 上。
用 `TooltipProvider` 包住一區 trigger，共用開啟與關閉的延遲，再組成 `Tooltip`、`TooltipTrigger` 與 `TooltipContent`。
預設偏移與設計一致（距離錨點 8 px）。

## 加上圖示

內容是 flex 橫列，可以在訊息旁加圖示，標出警告或狀態。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { FlagIcon } from '@/components/icons/FlagIcon';

export function TooltipWithIconExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Help</Button>} />
        <TooltipContent>
          <FlagIcon className="size-5 shrink-0 text-warning-500" />
          <span>Save your changes before leaving this page</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## 側邊

`side` 決定提示錨在 trigger 的哪一側。Base UI 會自動翻面，避免被裁切。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function TooltipSidePlacementExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={<Button size="md">{side}</Button>}
            />
            <TooltipContent side={side}>
              Shown on the {side}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
```

## 對齊

`align` 讓提示沿所選的側邊對齊。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

const aligns = ['start', 'center', 'end'] as const;

export function TooltipAlignmentsExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {aligns.map((align) => (
          <Tooltip key={align}>
            <TooltipTrigger
              render={<Button size="md">{align}</Button>}
            />
            <TooltipContent align={align}>
              align: {align}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
```

## 長內容

彈出層會在設定的最大寬度 `400px` 換行。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

export function TooltipLongContentExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Long content</Button>} />
        <TooltipContent>
          Tooltip text is capped at 400px wide. Longer content wraps
          onto new lines instead of stretching across the screen.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## 不顯示箭頭

錨在不需要尖角的自訂版面時，傳 `arrow={false}` 拿掉箭頭。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

export function TooltipWithoutArrowExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>No arrow</Button>} />
        <TooltipContent arrow={false}>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## 屬性

### Tooltip

`Tooltip` 是根元件，接受 Base UI
[`Tooltip.Root`](https://base-ui.com/react/components/tooltip#api-reference-tooltiproot)
的所有 prop。

| Prop                    | Type                             | Default  | 說明             |
| ----------------------- | -------------------------------- | -------- | -------------- |
| `defaultOpen`           | `boolean`                        | `false`  | 提示一開始是否開啟      |
| `open`                  | `boolean`                        | —        | 受控的開啟狀態        |
| `onOpenChange`          | `(open, eventDetails) => void`   | —        | 開啟狀態改變時呼叫      |
| `disabled`              | `boolean`                        | `false`  | 停用提示           |
| `disableHoverablePopup` | `boolean`                        | `false`  | 彈出層本身能否被 hover |
| `trackCursorAxis`       | `'none' \| 'x' \| 'y' \| 'both'` | `'none'` | 沿指定軸追蹤游標       |

### TooltipProvider

| Prop         | Type     | Default | 說明               |
| ------------ | -------- | ------- | ---------------- |
| `delay`      | `number` | `200`   | 開啟延遲（毫秒）         |
| `closeDelay` | `number` | `100`   | 關閉延遲（毫秒）         |
| `timeout`    | `number` | `400`   | 這段時間內，相鄰的提示會立刻開啟 |

### TooltipContent

`TooltipContent` 會把 children 用 portal 送出，以 Base UI 定位，並加上有樣式的彈出層與可選箭頭。

| Prop                    | Type                                                                       | Default                       | 說明                               |
| ----------------------- | -------------------------------------------------------------------------- | ----------------------------- | -------------------------------- |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| 'inline-start' \| 'inline-end'` | `'top'`                       | 相對於 trigger 的側邊                  |
| `sideOffset`            | `number`                                                                   | `8`                           | 與 trigger 的距離（px）                |
| `align`                 | `'start' \| 'center' \| 'end'`                                             | `'center'`                    | 沿側邊的對齊                           |
| `alignOffset`           | `number`                                                                   | `0`                           | 沿對齊軸的偏移                          |
| `arrow`                 | `boolean`                                                                  | `true`                        | 是否渲染箭頭                           |
| `positionerClassName`   | `string`                                                                   | —                             | 內層 positioner 元素的 class          |
| `anchor`                | `RefObject \| Element \| …`                                                | —                             | 自訂定位錨點（預設是觸發器）                   |
| `arrowPadding`          | `number`                                                                   | `5`                           | 箭頭與彈出層邊緣的最小距離                    |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                                     | `{ fallbackAxisSide: 'end' }` | 遇到碰撞時彈出層怎麼翻轉或位移                  |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect`                     | `'clipping-ancestors'`        | 彈出層要留在裡面的範圍                      |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`                               | `5`                           | 與碰撞邊界保留的距離                       |
| `disableAnchorTracking` | `boolean`                                                                  | `false`                       | 不再跟著錨點的版面位移更新位置                  |
| `positionMethod`        | `'absolute' \| 'fixed'`                                                    | `'absolute'`                  | positioner 的 CSS `position`      |
| `sticky`                | `boolean`                                                                  | `false`                       | 錨點捲出畫面後，彈出層仍留在畫面內                |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`                           | —                             | 自訂 portal 容器（預設 `document.body`） |
| `keepMounted`           | `boolean`                                                                  | `false`                       | 關閉時仍把彈出層留在 DOM                   |

### Tooltip 部分

| Part                | 說明                                  |
| ------------------- | ----------------------------------- |
| `TooltipProvider`   | 讓一組提示共用延遲                           |
| `Tooltip`           | 控制單一提示開啟狀態的根元件                      |
| `TooltipTrigger`    | hover 或 focus 時開啟提示的元素              |
| `TooltipContent`    | Portal、positioner 與彈出層，含有樣式的內容與可選箭頭 |
| `TooltipPortal`     | 進階組合時使用的底層 portal                   |
| `TooltipPositioner` | 進階組合時使用的底層 positioner               |
| `TooltipArrow`      | 手動組合內容時使用的獨立箭頭                      |
