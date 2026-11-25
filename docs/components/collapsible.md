# Collapsible

> An interactive panel that expands and collapses to reveal additional content.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';

export function CollapsibleExample() {
  return (
    <Collapsible className="w-80 space-y-2">
      <CollapsibleTrigger
        render={
          <Button
            variant="text"
            theme="default"
            className="w-full [&[data-panel-open]_[data-icon]]:rotate-180"
          >
            <span className="flex-1 text-left">
              Can I use this in my project?
            </span>
            <AngleDownIcon
              data-icon="inline-end"
              className="transition-transform duration-150"
            />
          </Button>
        }
      />
      <CollapsibleContent className="rounded-(--radius-sm) bg-grayscale-opacity-100 p-4 text-grayscale-opacity-700">
        Yes. Free to use for personal and commercial projects. No
        attribution required.
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## Usage

`Collapsible` is built on Base UI Collapsible. Compose the trigger and content parts together; the trigger toggles `data-panel-open` on itself when the panel is expanded, which you can use to drive icon rotations or other affordances.

## Product details

Use `Collapsible` for "show more" patterns where supplementary detail belongs out of the way until the user asks for it.

```tsx
import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';

export function CollapsibleProductDetailsExample() {
  return (
    <div className="w-96 space-y-4 rounded-(--radius-sm) border border-grayscale-opacity-200 p-4">
      <div>
        <div className="font-medium text-grayscale-opacity-900">
          Vittal Design Hoodie
        </div>
        <div className="text-sm text-grayscale-opacity-600">$48</div>
      </div>
      <Collapsible className="space-y-2">
        <CollapsibleTrigger
          render={
            <Button
              variant="text"
              theme="default"
              size="md"
              className="w-full justify-between"
            >
              <span>Show details</span>
              <AngleDownIcon data-icon="inline-end" />
            </Button>
          }
        />
        <CollapsibleContent className="space-y-1 text-grayscale-opacity-700">
          <p>100% cotton, double-stitched seams.</p>
          <p>Ships within 2 business days.</p>
          <p>Free returns within 30 days.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## Anatomy

```tsx
<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>
```

## Props

`Collapsible` accepts Base UI `Collapsible.Root` props:

| Prop           | Type                               | Default | Description                          |
| -------------- | ---------------------------------- | ------- | ------------------------------------ |
| `open`         | `boolean`                          | -       | Controlled open state                |
| `defaultOpen`  | `boolean`                          | `false` | Initial uncontrolled open state      |
| `onOpenChange` | `(open: boolean, details) => void` | -       | Fires when the panel opens or closes |
| `disabled`     | `boolean`                          | `false` | Disables toggling                    |

### CollapsibleContent

Renders a `<div>` panel with a height transition driven by Base UI's `--collapsible-panel-height` CSS variable. Use the `className` prop to override the default body styles.

| Prop               | Type      | Default | Description                                                                                                 |
| ------------------ | --------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `keepMounted`      | `boolean` | `false` | Keep the panel mounted in the DOM while collapsed                                                           |
| `hiddenUntilFound` | `boolean` | `false` | Use `hidden="until-found"` so browsers' built-in find-in-page can expand the panel; overrides `keepMounted` |

## Accessibility

`CollapsibleTrigger` automatically wires up `aria-expanded` and `aria-controls`. Keep the trigger label descriptive of the content it reveals.
