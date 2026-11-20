# Popover

> A floating panel anchored to a trigger element, used for tooltips with rich content, profile cards, and contextual overlays.

## Preview

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

## Usage

`Popover` is a thin styled wrapper around Base UI Popover. The trigger is render-prop based — pass any element via `render` and the popover wires up open state, focus, and ARIA attributes automatically.

## Placement

`PopoverContent` accepts `side` (`top` | `right` | `bottom` | `left`), `align` (`start` | `center` | `end`), and `sideOffset` props for positioning. Defaults are `align='start'`, `sideOffset=4`.

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

## Rich Content

The popup takes any content. Combine `PopoverTitle` and `PopoverDescription` with your own markup for profile cards and similar summaries.

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

## Multiple Triggers

One `Popover` root can serve several triggers. Give each `PopoverTrigger` a `payload`, and render the content from the `payload` the root passes to its function child. The popup moves to whichever trigger opened it.

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

## Custom Anchor

Pass `anchor` to position the popup against an element other than the trigger. A popover without a trigger, such as one opened from a menu item or a row action, needs it: control `open` yourself and point `anchor` at the element to align to. `anchor` accepts an element, a ref, a virtual element, or a function returning one.

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

## Portal Container

`PopoverContent` portals to `document.body` by default. Pass `portalContainer` (an element or a ref) to render the popup inside another node instead.

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

Use it when the popover must stay inside a CSS-scoped root — styles under a scope selector do not apply if the popup is portaled to `document.body`. It is also useful when body portaling breaks stacking or clipping (Dialog, transform, fullscreen, Shadow DOM).

## When to Use

| Need                                      | Component             |
| ----------------------------------------- | --------------------- |
| Short overlay with rich content           | `Popover`             |
| Action menu (each item fires a callback)  | `DropdownMenu`        |
| Value picker (selection bound to a value) | `Select` / `Combobox` |
| Hierarchical path picker                  | `Command` + `Popover` |
| Searchable command palette                | `Command`             |

`Popover` is the bare floating panel — pair it with your own content. For action menus, prefer `DropdownMenu`; for value pickers, prefer the matched component.

## Props

### PopoverContent

`PopoverContent` is a composite of Portal + Positioner + Popup. Positioning props are forwarded to the Positioner; the popup accepts the usual Base UI Popover Popup props.

| Prop                    | Type                                                   | Default                       | Description                                           |
| ----------------------- | ------------------------------------------------------ | ----------------------------- | ----------------------------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                     | Alignment relative to the anchor                      |
| `alignOffset`           | `number`                                               | -                             | Offset along the alignment axis                       |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                    | Preferred side of the anchor                          |
| `sideOffset`            | `number`                                               | `4`                           | Distance from the anchor                              |
| `positionerClassName`   | `string`                                               | -                             | Classes on the Positioner wrapper                     |
| `className`             | `string`                                               | -                             | Additional classes on the popup                       |
| `anchor`                | `RefObject \| Element \| …`                            | -                             | Custom positioning anchor (defaults to the trigger)   |
| `arrowPadding`          | `number`                                               | `5`                           | Minimum space between the arrow and the popup's edges |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'end' }` | How the popup flips or shifts to avoid collisions     |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`        | Area the popup is kept inside                         |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                           | Space kept from the edge of the collision boundary    |
| `disableAnchorTracking` | `boolean`                                              | `false`                       | Stop following layout shifts of the anchor            |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                  | CSS `position` of the positioner                      |
| `sticky`                | `boolean`                                              | `false`                       | Keep the popup in view after the anchor scrolls out   |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | -                             | Custom portal container (defaults to `document.body`) |
| `keepMounted`           | `boolean`                                              | `false`                       | Keep the popup in the DOM while closed                |

## Exports

| Export               | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `Popover`            | Root; manages open state                                                          |
| `PopoverTrigger`     | Render-prop trigger                                                               |
| `PopoverContent`     | Composite of Portal + Positioner + Popup; supports `anchor` and `portalContainer` |
| `PopoverPortal`      | Portal target (rarely used directly)                                              |
| `PopoverArrow`       | Optional pointer arrow                                                            |
| `PopoverClose`       | Close button slot                                                                 |
| `PopoverTitle`       | Accessible title styled for popups                                                |
| `PopoverDescription` | Accessible description styled for popups                                          |
