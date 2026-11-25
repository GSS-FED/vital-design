# Sheet

> A side-anchored dialog that slides in from any edge — for navigation, filters, forms, and inspectors.

## Preview

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

## Usage

`Sheet` is built on Base UI Dialog. The `SheetContent` part bundles the portal, overlay, popup, and a corner close button so the common case is a single composition.

## Sides

The `side` prop on `SheetContent` controls which edge the sheet slides in from.

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

## Non-modal docked panel

Pass `modal={false}` on the `Sheet` root to drop the backdrop and keep the page interactive. Use this for filters, inspectors, or any panel that should coexist with the main content.

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

The overlay rendering is tied to `modal` automatically — when the sheet is non-modal, no backdrop is rendered.

## Hidden Close Button

Pass `showCloseButton={false}` on `SheetContent` to drop the corner close button when the flow needs an explicit footer action to finish.

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

## Anatomy

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

`Sheet` accepts Base UI `Dialog.Root` props, including `open`, `defaultOpen`, `onOpenChange`, and `modal`.

### SheetContent

| Prop               | Type                                     | Default   | Description                                    |
| ------------------ | ---------------------------------------- | --------- | ---------------------------------------------- |
| `side`             | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Edge the sheet slides in from                  |
| `showCloseButton`  | `boolean`                                | `true`    | Render a corner close button                   |
| `closeLabel`       | `string`                                 | `'Close'` | `aria-label` for the corner close button       |
| `overlayClassName` | `string`                                 | -         | Custom classes for the overlay (when rendered) |
| `portalContainer`  | `HTMLElement \| null`                    | -         | Custom portal container                        |
| `className`        | `string`                                 | -         | Additional classes on the popup                |

## Accessibility

Always include `SheetTitle` for screen readers; add `SheetDescription` when the sheet's purpose is not obvious from the title alone. Keep destructive or irreversible actions explicit in the footer.
