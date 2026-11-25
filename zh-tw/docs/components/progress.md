# Progress

> 進度 primitive 與分段狀態指示。

## 預覽

```tsx
import { Progress } from '@/components/ui/Progress';

export function ProgressExample() {
  return <Progress aria-label="Upload progress" value={64} />;
}
```

## 加上標籤

```tsx
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from '@/components/ui/Progress';

export function ProgressWithLabelExample() {
  return (
    <ProgressRoot value={42} className="w-80">
      <div className="flex items-center gap-3">
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}
```

## 區段

```tsx
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/ui/Progress';

export function ProgressSegmentsExample() {
  return (
    <div className="flex flex-col gap-6">
      <ProgressSegments
        aria-label="Monthly status"
        className="w-[118px] gap-0.5"
      >
        <ProgressSegment className="w-2 bg-success-500" />
        <ProgressSegment className="w-2 bg-warning-500" />
        <ProgressSegment className="w-2 bg-grayscale-opacity-600" />
        <ProgressSegment className="w-2 bg-destructive-500" />
        {Array.from({ length: 8 }, (_, index) => (
          <ProgressSegment
            key={index}
            className="w-2"
            data-state="inactive"
          />
        ))}
      </ProgressSegments>
      <ProgressSegments
        aria-label="Quarterly status"
        className="w-[118px] gap-[3px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
        <ProgressSegment className="flex-1 bg-warning-500" />
        <ProgressSegment className="flex-1 bg-grayscale-opacity-600" />
        <ProgressSegment className="flex-1" data-state="inactive" />
      </ProgressSegments>
      <ProgressSegments
        aria-label="Yearly status"
        className="w-[118px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
      </ProgressSegments>
    </div>
  );
}
```

## 相連區段

```tsx
import {
  ProgressSegment,
  ProgressSegments,
} from '@/components/ui/Progress';

export function ProgressCustomSegmentsExample() {
  return (
    <ProgressSegments
      aria-label="Review status"
      className="w-[118px] gap-0"
      joint="connected"
    >
      <ProgressSegment
        aria-label="Complete"
        className="flex-1 bg-success-500"
      />
      <ProgressSegment
        aria-label="Pending review"
        className="flex-1 bg-warning-500"
      />
      <ProgressSegment
        aria-label="Waiting"
        className="flex-1 bg-grayscale-opacity-600"
      />
      <ProgressSegment
        aria-label="Not started"
        className="flex-1"
        data-state="inactive"
      />
    </ProgressSegments>
  );
}
```

## 部分

| 部分                  | 元素       | 說明                           |
| ------------------- | -------- | ---------------------------- |
| `Progress`          | `<div>`  | 含軌道與指示器的簡寫根。                 |
| `ProgressRoot`      | `<div>`  | Base UI 的 progress 根。        |
| `ProgressTrack`     | `<div>`  | 視覺軌道。                        |
| `ProgressIndicator` | `<div>`  | 填滿的進度指示器。                    |
| `ProgressLabel`     | `<span>` | 連到 progress 根的標籤。            |
| `ProgressValue`     | `<span>` | 從 progress context 取出的格式化數值。 |
| `ProgressSegments`  | `<div>`  | 精簡的分段狀態顯示。寬度、間距、數量與顏色由呼叫端決定。 |
| `ProgressSegment`   | `<span>` | 單一狀態區段。                      |

## 屬性

| Prop        | Type                      | Default    | 說明                                |
| ----------- | ------------------------- | ---------- | --------------------------------- |
| `value`     | `number` or `null`        | —          | 目前的進度值。                           |
| `min`       | `number`                  | `0`        | 最小值。                              |
| `max`       | `number`                  | `100`      | 最大值。                              |
| `className` | `string`                  | —          | 額外的 CSS class。                    |
| `joint`     | `separate` or `connected` | `separate` | 區段邊緣的行為。`gap-0` 的長條用 `connected`。 |

## 區段版面

`ProgressSegments` 只提供共用結構。區段的寬度與間距在呼叫端設定。

```tsx
// Fixed ticks
<ProgressSegments className="gap-0.5">
  <ProgressSegment className="w-2 bg-success-500" />
</ProgressSegments>

// Fill available width
<ProgressSegments className="w-[118px] gap-[3px]">
  <ProgressSegment className="flex-1 bg-success-500" />
</ProgressSegments>

// Connected stacked bar
<ProgressSegments className="w-[118px] gap-0" joint="connected">
  <ProgressSegment className="flex-1 bg-grayscale-opacity-600" />
  <ProgressSegment className="flex-1 bg-warning-500" />
</ProgressSegments>
```
