# Scroll Area

> Scrollable viewport with optional edge fade.

## Preview

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

## Edge Fade

Use `fadeEdges` on the viewport when the edge fade should be CSS-driven.
Set `overflowEdgeThreshold` on `ScrollArea` to tune when Base UI exposes
the overflow CSS variables.

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

## Select Composition

`ScrollArea` is not built into picker primitives. Compose it when a
specific surface needs fade edges or custom scrollbars.

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

## Exports

| Export                | Description                         |
| --------------------- | ----------------------------------- |
| `ScrollArea`          | Root scroll area container          |
| `ScrollAreaViewport`  | Scrollable viewport; supports fade  |
| `ScrollAreaContent`   | Optional content wrapper            |
| `ScrollAreaScrollbar` | Custom scrollbar track              |
| `ScrollAreaThumb`     | Custom scrollbar thumb              |
| `ScrollAreaCorner`    | Corner slot for two-axis scrollbars |

## Props

| Prop        | Type                          | Default | Description                |
| ----------- | ----------------------------- | ------- | -------------------------- |
| `fadeEdges` | `boolean`                     | `false` | Applies CSS edge fade mask |
| `fadeSize`  | `number \| string`            | `40`    | Fade size for each edge    |
| `className` | `string`                      | —       | Additional CSS classes     |
| `style`     | `CSSProperties`               | —       | Inline styles              |
| `...props`  | `ComponentProps<typeof Base>` | —       | Base UI scroll area props  |
