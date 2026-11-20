# Dialog

> A modal surface for focused confirmations, decisions, and short forms.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/ui/Dialog';

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogHeader>
              <div className="space-y-1">
                <DialogTitle>Submit request?</DialogTitle>
                <DialogDescription>
                  Review the details before sending this request for
                  approval.
                </DialogDescription>
              </div>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              This action will notify approvers and lock the current
              draft while it is being reviewed.
            </DialogBody>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="text" theme="default">
                    Cancel
                  </Button>
                }
              />
              <DialogClose
                render={<Button theme="primary">Submit</Button>}
              />
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
```

## Usage

`Dialog` is built on Base UI Dialog. Compose the named root, trigger, portal, backdrop, viewport, popup, and content parts together so the title and description remain accessible to assistive technology.

## Sizes

```tsx
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/ui/Dialog';

const sizes = ['small', 'medium', 'large'] as const;

export function DialogSizesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={<Button className="capitalize">{size}</Button>}
          />
          <DialogPortal>
            <DialogBackdrop />
            <DialogViewport>
              <DialogPopup size={size}>
                <DialogHeader>
                  <DialogTitle className="capitalize">
                    {size} dialog
                  </DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <DialogBody>
                  Dialog popup width is controlled by the size prop.
                </DialogBody>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant="text" theme="default">
                        Close
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogPopup>
            </DialogViewport>
          </DialogPortal>
        </Dialog>
      ))}
    </div>
  );
}
```

Use `small` for brief confirmation copy, `medium` for common decision flows, and `large` when the dialog contains denser content.

## Anatomy

```tsx
<Dialog>
  <DialogTrigger />
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <DialogClose />
        </DialogHeader>
        <DialogBody />
        <DialogFooter />
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

## Props

`Dialog` accepts Base UI `Dialog.Root` props, including `open`, `defaultOpen`, `onOpenChange`, `modal`, and `disablePointerDismissal`.

### DialogPopup

| Prop        | Type                             | Default    | Description                  |
| ----------- | -------------------------------- | ---------- | ---------------------------- |
| `size`      | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls the maximum width   |
| `className` | `string`                         | -          | Additional CSS classes       |
| `children`  | `ReactNode`                      | -          | Dialog content and sub-parts |

### DialogClose

| Prop         | Type        | Default   | Description                                  |
| ------------ | ----------- | --------- | -------------------------------------------- |
| `children`   | `ReactNode` | -         | Optional custom close button content         |
| `render`     | `ReactNode` | -         | Renders a custom element as the close button |
| `aria-label` | `string`    | `'Close'` | Accessible label for the default icon button |

## Accessibility

Always include `DialogTitle` in the popup. Add `DialogDescription` when the dialog needs extra context, and keep destructive or irreversible actions explicit in the footer.
