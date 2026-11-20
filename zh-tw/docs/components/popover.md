# Popover

> 錨在觸發元素上的浮動面板，用來放內容較豐富的提示、個人資料卡與情境覆蓋層。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/Popover';

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>Open</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Popover title</PopoverTitle>
        <PopoverDescription className="mt-1">
          Popovers are floating panels that appear when triggered. Use
          them for short bits of information, action menus, or rich
          content overlays.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
```

## 用法

`Popover` 是 Base UI Popover 的薄樣式包裝。觸發器是 render prop：透過 `render` 傳入任何元素，popover 會自動接上開啟狀態、焦點與 ARIA 屬性。

## 位置

`PopoverContent` 接受 `side`（`top` | `right` | `bottom` | `left`）、`align`（`start` | `center` | `end`）與 `sideOffset` 來定位。預設是 `align='start'`、`sideOffset=4`。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function PopoverSidePlacementExample() {
  return (
    <div className="flex gap-4">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button size="md">{side}</Button>}
          />
          <PopoverContent side={side} className="w-48">
            Anchored on the {side} side.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
```

```tsx
<PopoverContent side="top" align="center" sideOffset={8}>
  …
</PopoverContent>
```

## 豐富內容

彈出層可以放任何內容。把 `PopoverTitle`、`PopoverDescription` 和自己的標記組在一起，做成個人資料卡之類的摘要。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/Popover';

export function PopoverRichContentExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>View profile</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Yuki Tanaka</PopoverTitle>
        <PopoverDescription className="mt-1">
          Senior Engineer · Tokyo
        </PopoverDescription>
        <p className="mt-3 text-sm text-grayscale-opacity-600">
          Joined the platform team in 2021. Owns the registry pipeline
          and the docs site deployment.
        </p>
      </PopoverContent>
    </Popover>
  );
}
```

## 多個觸發器

一個 `Popover` root 可以服務多個觸發器。每個 `PopoverTrigger` 傳一個 `payload`，再用 root 傳給函式 children 的 `payload` 渲染內容。彈出層會移到開啟它的那個觸發器旁。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/Popover';

type Field = {
  label: string;
  description: string;
};

const fields = {
  assignee: {
    label: 'Alex Lin',
    description: 'Assigned owner for this editable cell.',
  },
  status: {
    label: 'In review',
    description: 'Shared content updates from the active trigger.',
  },
  date: {
    label: '2026/05/29',
    description: 'One popover root can serve many triggers.',
  },
} satisfies Record<string, Field>;

export function PopoverMultipleTriggersExample() {
  return (
    <Popover<Field>>
      {({ payload }) => (
        <div className="flex flex-wrap gap-2">
          <PopoverTrigger
            payload={fields.assignee}
            render={<Button variant="ghost">Assignee</Button>}
          />
          <PopoverTrigger
            payload={fields.status}
            render={<Button variant="ghost">Status</Button>}
          />
          <PopoverTrigger
            payload={fields.date}
            render={<Button variant="ghost">Date</Button>}
          />
          <PopoverContent className="w-72">
            {payload && (
              <div className="space-y-1">
                <PopoverTitle>{payload.label}</PopoverTitle>
                <PopoverDescription>
                  {payload.description}
                </PopoverDescription>
              </div>
            )}
          </PopoverContent>
        </div>
      )}
    </Popover>
  );
}
```

## 自訂錨點

傳 `anchor` 可以讓彈出層對齊觸發器以外的元素。沒有觸發器的 popover（例如從選單項目或列表列的操作開出來）需要它：自己控制 `open`，再把 `anchor` 指到要對齊的元素。`anchor` 接受元素、ref、virtual element，或回傳其中之一的函式。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/Item';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
} from '@/components/ui/Popover';
import { Fragment, useState } from 'react';

type Person = {
  name: string;
  email: string;
};

const people: Person[] = [
  { name: 'Alex Lin', email: 'alex.lin@vikosmos.com' },
  { name: 'Jamie Chen', email: 'jamie.chen@vikosmos.com' },
  { name: 'Morgan Wu', email: 'morgan.wu@vikosmos.com' },
];

export function PopoverAnchorExample() {
  const [active, setActive] = useState<Person | null>(null);
  const [anchor, setAnchor] = useState<Element | null>(null);

  return (
    <>
      <ItemGroup className="w-80 max-w-full rounded border border-grayscale-opacity-300">
        {people.map((person, index) => (
          <Fragment key={person.name}>
            <Item size="list">
              <ItemContent>
                <ItemTitle>{person.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={(event) => {
                    setAnchor(
                      event.currentTarget.closest(
                        '[data-slot="item"]',
                      ),
                    );
                    setActive(person);
                  }}
                >
                  Details
                </Button>
              </ItemActions>
            </Item>
            {index < people.length - 1 && <ItemSeparator />}
          </Fragment>
        ))}
      </ItemGroup>
      <Popover
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <PopoverContent anchor={anchor} side="right" className="w-64">
          {active && (
            <div className="space-y-1">
              <PopoverTitle>{active.name}</PopoverTitle>
              <PopoverDescription>{active.email}</PopoverDescription>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
```

## Portal 容器

`PopoverContent` 預設 portal 到 `document.body`。傳 `portalContainer`（元素或 ref）可以改把彈出層放進別的節點。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useRef } from 'react';

export function PopoverPortalContainerExample() {
  const scope = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scope}
      className="rounded border border-dashed border-grayscale-opacity-300 p-4"
    >
      <Popover>
        <PopoverTrigger
          render={<Button size="md">Open in scope</Button>}
        />
        <PopoverContent portalContainer={scope} className="w-64">
          <div className="space-y-1">
            <PopoverTitle>Scoped popup</PopoverTitle>
            <PopoverDescription>
              Rendered inside the dashed region, so styles scoped to
              it still apply.
            </PopoverDescription>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

popover 必須留在 CSS scope 根節點內時，用 `portalContainer`。樣式寫在 scope 選擇器底下時，彈出層被 portal 到 `document.body` 就套不到。body portal 弄壞堆疊或裁切時也有用（Dialog、transform、全螢幕、Shadow DOM）。

## 何時使用

| 需求                   | 元件                    |
| -------------------- | --------------------- |
| 內容較豐富的短覆蓋層           | `Popover`             |
| 動作選單（每一項觸發 callback） | `DropdownMenu`        |
| 值選擇器（選取綁定到值）         | `Select` / `Combobox` |
| 階層路徑選擇器              | `Command` + `Popover` |
| 可搜尋的命令面板             | `Command`             |

`Popover` 是單純的浮動面板，內容自己放。動作選單優先用 `DropdownMenu`；值選擇器優先用對應的元件。

## Props

### PopoverContent

`PopoverContent` 是 Portal + Positioner + Popup 的組合。定位 props 會轉給 Positioner；popup 接受一般的 Base UI Popover Popup props。

| Prop                    | Type                                                   | Default                       | 說明                               |
| ----------------------- | ------------------------------------------------------ | ----------------------------- | -------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                     | 相對錨點的對齊                          |
| `alignOffset`           | `number`                                               | -                             | 沿對齊軸的偏移                          |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                    | 偏好出現在錨點的哪一側                      |
| `sideOffset`            | `number`                                               | `4`                           | 與錨點的距離                           |
| `positionerClassName`   | `string`                                               | -                             | Positioner wrapper 上的 class      |
| `className`             | `string`                                               | -                             | popup 上的額外 class                 |
| `anchor`                | `RefObject \| Element \| …`                            | -                             | 自訂定位錨點（預設是觸發器）                   |
| `arrowPadding`          | `number`                                               | `5`                           | 箭頭與彈出層邊緣的最小距離                    |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'end' }` | 遇到碰撞時彈出層怎麼翻轉或位移                  |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`        | 彈出層要留在裡面的範圍                      |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                           | 與碰撞邊界保留的距離                       |
| `disableAnchorTracking` | `boolean`                                              | `false`                       | 不再跟著錨點的版面位移更新位置                  |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                  | positioner 的 CSS `position`      |
| `sticky`                | `boolean`                                              | `false`                       | 錨點捲出畫面後，彈出層仍留在畫面內                |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | -                             | 自訂 portal 容器（預設 `document.body`） |
| `keepMounted`           | `boolean`                                              | `false`                       | 關閉時仍把彈出層留在 DOM                   |

## 匯出

| 匯出                   | 說明                                                              |
| -------------------- | --------------------------------------------------------------- |
| `Popover`            | Root；管理開啟狀態                                                     |
| `PopoverTrigger`     | render prop 觸發器                                                 |
| `PopoverContent`     | Portal + Positioner + Popup 的組合；支援 `anchor` 與 `portalContainer` |
| `PopoverPortal`      | Portal 目標（很少直接使用）                                               |
| `PopoverArrow`       | 可選的指向箭頭                                                         |
| `PopoverClose`       | 關閉按鈕 slot                                                       |
| `PopoverTitle`       | 給彈出層用的無障礙標題                                                     |
| `PopoverDescription` | 給彈出層用的無障礙說明                                                     |
