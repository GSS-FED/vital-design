# Progress

> Progress primitives and segmented status indicators.

## Preview

```tsx
import { Progress } from '@/components/ui/Progress';

export function ProgressExample() {
  return <Progress aria-label="Upload progress" value={64} />;
}
```

## With Label

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

## Segments

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

## Connected Segments

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

## Parts

| Part                | Element  | Notes                                                                        |
| ------------------- | -------- | ---------------------------------------------------------------------------- |
| `Progress`          | `<div>`  | Shorthand root with track and indicator.                                     |
| `ProgressRoot`      | `<div>`  | Base UI progress root.                                                       |
| `ProgressTrack`     | `<div>`  | Visual track.                                                                |
| `ProgressIndicator` | `<div>`  | Filled progress indicator.                                                   |
| `ProgressLabel`     | `<span>` | Label linked to the progress root.                                           |
| `ProgressValue`     | `<span>` | Formatted value from the progress context.                                   |
| `ProgressSegments`  | `<div>`  | Compact segmented status display. Caller owns width, gap, count, and colors. |
| `ProgressSegment`   | `<span>` | Individual status segment.                                                   |

## Props

| Prop        | Type                      | Default    | Description                                            |
| ----------- | ------------------------- | ---------- | ------------------------------------------------------ |
| `value`     | `number` or `null`        | —          | Current progress value.                                |
| `min`       | `number`                  | `0`        | Minimum value.                                         |
| `max`       | `number`                  | `100`      | Maximum value.                                         |
| `className` | `string`                  | —          | Additional CSS classes.                                |
| `joint`     | `separate` or `connected` | `separate` | Segment edge behavior. Use `connected` for gap-0 bars. |

## Segment Layout

`ProgressSegments` only provides shared anatomy. Set segment width and gap at the call site.

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
