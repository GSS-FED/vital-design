# Tooltip

> A short, transient hint anchored to a trigger element with arrow and side controls.

## Preview

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

## Usage

`Tooltip` is built on Base UI's
[Tooltip](https://base-ui.com/react/components/tooltip).
Wrap a region of triggers in `TooltipProvider` to share open and close
delays, then compose `Tooltip`, `TooltipTrigger`, and `TooltipContent`.
The default offset matches the design (8 px from the anchor).

## With Icon

The content is a flex row, so add an icon next to the message to mark
warnings or status hints.

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

## Side

`side` selects which edge of the trigger the tooltip anchors to. Base UI
will flip the side automatically to avoid clipping.

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

## Align

`align` shifts the tooltip along the chosen side.

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

## Long Content

The popup wraps at the configured `400px` max width.

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

## Without Arrow

Pass `arrow={false}` to drop the pointer when the tooltip is anchored to
custom layouts that don't need a beak.

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

## Props

### Tooltip

`Tooltip` is the root and accepts every Base UI
[`Tooltip.Root`](https://base-ui.com/react/components/tooltip#api-reference-tooltiproot)
prop.

| Prop                    | Type                             | Default  | Description                             |
| ----------------------- | -------------------------------- | -------- | --------------------------------------- |
| `defaultOpen`           | `boolean`                        | `false`  | Whether the tooltip is initially open   |
| `open`                  | `boolean`                        | —        | Controlled open state                   |
| `onOpenChange`          | `(open, eventDetails) => void`   | —        | Called when the open state changes      |
| `disabled`              | `boolean`                        | `false`  | Disables the tooltip                    |
| `disableHoverablePopup` | `boolean`                        | `false`  | Whether the popup itself can be hovered |
| `trackCursorAxis`       | `'none' \| 'x' \| 'y' \| 'both'` | `'none'` | Track the cursor along the given axis   |

### TooltipProvider

| Prop         | Type     | Default | Description                                          |
| ------------ | -------- | ------- | ---------------------------------------------------- |
| `delay`      | `number` | `200`   | Open delay in ms                                     |
| `closeDelay` | `number` | `100`   | Close delay in ms                                    |
| `timeout`    | `number` | `400`   | Window during which adjacent tooltips open instantly |

### TooltipContent

`TooltipContent` portals its children, positions them with Base UI, and
adds the styled popup with an optional arrow.

| Prop                    | Type                                                                       | Default                       | Description                                           |
| ----------------------- | -------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| 'inline-start' \| 'inline-end'` | `'top'`                       | Side relative to the trigger                          |
| `sideOffset`            | `number`                                                                   | `8`                           | Distance from the trigger in px                       |
| `align`                 | `'start' \| 'center' \| 'end'`                                             | `'center'`                    | Alignment along the side                              |
| `alignOffset`           | `number`                                                                   | `0`                           | Offset along the alignment axis                       |
| `arrow`                 | `boolean`                                                                  | `true`                        | Whether to render the arrow                           |
| `positionerClassName`   | `string`                                                                   | —                             | Classes for the inner positioner element              |
| `anchor`                | `RefObject \| Element \| …`                                                | —                             | Custom positioning anchor (defaults to the trigger)   |
| `arrowPadding`          | `number`                                                                   | `5`                           | Minimum space between the arrow and the popup's edges |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                                     | `{ fallbackAxisSide: 'end' }` | How the popup flips or shifts to avoid collisions     |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect`                     | `'clipping-ancestors'`        | Area the popup is kept inside                         |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`                               | `5`                           | Space kept from the edge of the collision boundary    |
| `disableAnchorTracking` | `boolean`                                                                  | `false`                       | Stop following layout shifts of the anchor            |
| `positionMethod`        | `'absolute' \| 'fixed'`                                                    | `'absolute'`                  | CSS `position` of the positioner                      |
| `sticky`                | `boolean`                                                                  | `false`                       | Keep the popup in view after the anchor scrolls out   |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`                           | —                             | Custom portal container (defaults to `document.body`) |
| `keepMounted`           | `boolean`                                                                  | `false`                       | Keep the popup in the DOM while closed                |

### Tooltip Parts

| Part                | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `TooltipProvider`   | Shares delays for grouped tooltips                                  |
| `Tooltip`           | Root that controls a single tooltip's open state                    |
| `TooltipTrigger`    | Element that opens the tooltip on hover or focus                    |
| `TooltipContent`    | Portal + positioner + popup with the styled body and optional arrow |
| `TooltipPortal`     | Lower-level portal exposed for advanced composition                 |
| `TooltipPositioner` | Lower-level positioner exposed for advanced composition             |
| `TooltipArrow`      | Standalone arrow element when composing the content manually        |
