# Scroll Area

> 可捲動的視埠，邊緣淡出可選。

## 預覽

```tsx
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/ui/ScrollArea';

const items = Array.from({ length: 24 }, (_, index) => ({
  label: `Activity ${index + 1}`,
  description:
    index % 3 === 0
      ? 'Needs review before publish'
      : 'Synced with the workspace',
}));

export function ScrollAreaVerticalExample() {
  return (
    <ScrollArea className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-background">
      <ScrollAreaViewport className="h-full">
        <div className="flex flex-col py-2">
          {items.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <div className="text-sm leading-5 font-medium text-grayscale-opacity-800">
                {item.label}
              </div>
              <div className="text-xs leading-4 text-grayscale-opacity-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
```

## 邊緣淡出

邊緣淡出要由 CSS 驅動時，在 viewport 上用 `fadeEdges`。在 `ScrollArea` 上設 `overflowEdgeThreshold`，調整 Base UI 何時露出 overflow 的 CSS 變數。

```tsx
import {
  ScrollArea,
  ScrollAreaViewport,
} from '@/components/ui/ScrollArea';

const items = Array.from({ length: 24 }, (_, index) => ({
  label: `Activity ${index + 1}`,
  description:
    index % 3 === 0
      ? 'Needs review before publish'
      : 'Synced with the workspace',
}));

export function ScrollAreaFadeEdgesExample() {
  return (
    <ScrollArea
      className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-background"
      overflowEdgeThreshold={1}
    >
      <ScrollAreaViewport className="h-full" fadeEdges>
        <div className="flex flex-col py-2">
          {items.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <div className="text-sm leading-5 font-medium text-grayscale-opacity-800">
                {item.label}
              </div>
              <div className="text-xs leading-4 text-grayscale-opacity-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaViewport>
    </ScrollArea>
  );
}
```

## Select 組合

`ScrollArea` 沒有做進選擇器 primitive。某個表面需要邊緣淡出或自訂捲軸時，再自己組合。

```tsx
<SelectContent
  className="h-75 py-0"
  listRender={
    <ScrollAreaViewport className="h-full py-2" fadeEdges />
  }
  listWrapper={(list) => (
    <ScrollArea className="h-full min-h-0" overflowEdgeThreshold={1}>
      {list}
    </ScrollArea>
  )}
  showScrollButtons={false}
>
  {items.map((item) => (
    <SelectItem key={item.value} value={item.value}>
      <SelectItemText>{item.label}</SelectItemText>
      <SelectItemCheck />
    </SelectItem>
  ))}
</SelectContent>
```

## 匯出

| 匯出                    | 說明            |
| --------------------- | ------------- |
| `ScrollArea`          | 捲動區域的根容器      |
| `ScrollAreaViewport`  | 可捲動的視埠；支援淡出   |
| `ScrollAreaContent`   | 選用的內容包裝       |
| `ScrollAreaScrollbar` | 自訂捲軸軌道        |
| `ScrollAreaThumb`     | 自訂捲軸滑塊        |
| `ScrollAreaCorner`    | 雙向捲動時的角落 slot |

## 屬性

| Prop        | Type                          | Default | 說明                          |
| ----------- | ----------------------------- | ------- | --------------------------- |
| `fadeEdges` | `boolean`                     | `false` | 套上 CSS 邊緣淡出遮罩               |
| `fadeSize`  | `number \| string`            | `40`    | 每一邊的淡出大小                    |
| `className` | `string`                      | —       | 額外的 CSS class               |
| `style`     | `CSSProperties`               | —       | 行內樣式                        |
| `...props`  | `ComponentProps<typeof Base>` | —       | Base UI scroll area 的 props |
