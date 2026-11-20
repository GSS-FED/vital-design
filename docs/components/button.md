# Button

> Trigger actions with default, text, and ghost variants, multiple themes, and icon support.

## Preview

```tsx
import { Button } from '@/components/ui/Button';

export function ButtonExample() {
  return (
    <Button theme="primary" size="lg">
      Button
    </Button>
  );
}
```

## Usage

Pick a `variant` for the emphasis and a `theme` for the color. Put icons and
spinners in as children; the label sizes are `md` and `lg`.

## Variants

### Default

The `default` variant renders a solid background button. It is the
default rendering style. Each column shows one theme at `lg` and `md`,
enabled and disabled.

```tsx
import {
  Button,
  type DefaultButtonProps,
} from '@/components/ui/Button';

const themes: {
  theme: DefaultButtonProps['theme'];
  label: string;
}[] = [
  { theme: 'primary', label: 'Primary' },
  { theme: 'default', label: 'Default' },
  { theme: 'success', label: 'Success' },
  { theme: 'info', label: 'Info' },
  { theme: 'warning', label: 'Warning' },
  { theme: 'alarm', label: 'Alarm' },
  { theme: 'dangerous', label: 'Dangerous' },
];

export function ButtonDefaultButtonExample() {
  return (
    <div className="flex flex-wrap gap-5">
      {themes.map(({ theme, label }) => (
        <div
          key={theme}
          className="grid grid-rows-4 justify-items-center gap-5"
        >
          <Button variant="default" theme={theme} size="lg">
            {label}
          </Button>
          <Button variant="default" theme={theme} size="md">
            {label}
          </Button>
          <Button variant="default" theme={theme} size="lg" disabled>
            {label}
          </Button>
          <Button variant="default" theme={theme} size="md" disabled>
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### Text

The `text` variant renders a transparent background button. Available for all themes except `dangerous`.

```tsx
import {
  Button,
  type TextButtonProps,
} from '@/components/ui/Button';

const themes: { theme: TextButtonProps['theme']; label: string }[] = [
  { theme: 'primary', label: 'Primary' },
  { theme: 'default', label: 'Default' },
  { theme: 'success', label: 'Success' },
  { theme: 'info', label: 'Info' },
  { theme: 'warning', label: 'Warning' },
  { theme: 'alarm', label: 'Alarm' },
];

export function ButtonTextButtonExample() {
  return (
    <div className="flex flex-wrap gap-5">
      {themes.map(({ theme, label }) => (
        <div
          key={theme}
          className="grid grid-rows-4 justify-items-center gap-5"
        >
          <Button variant="text" theme={theme} size="lg">
            {label}
          </Button>
          <Button variant="text" theme={theme} size="md">
            {label}
          </Button>
          <Button variant="text" theme={theme} size="lg" disabled>
            {label}
          </Button>
          <Button variant="text" theme={theme} size="md" disabled>
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### Ghost

The `ghost` variant renders a transparent button that surfaces a
background on hover. Use it inside popovers, toolbars, and split-button
menus where the surrounding chrome provides the affordance.

```tsx
import {
  Button,
  type GhostButtonProps,
} from '@/components/ui/Button';

const themes: { theme: GhostButtonProps['theme']; label: string }[] =
  [
    { theme: 'primary', label: 'Primary' },
    { theme: 'default', label: 'Default' },
    { theme: 'success', label: 'Success' },
    { theme: 'info', label: 'Info' },
    { theme: 'warning', label: 'Warning' },
    { theme: 'alarm', label: 'Alarm' },
  ];

export function ButtonGhostButtonExample() {
  return (
    <div className="flex flex-wrap gap-5">
      {themes.map(({ theme, label }) => (
        <div
          key={theme}
          className="grid grid-rows-4 justify-items-center gap-5"
        >
          <Button variant="ghost" theme={theme} size="lg">
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="md">
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="lg" disabled>
            {label}
          </Button>
          <Button variant="ghost" theme={theme} size="md" disabled>
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### Sizes

```tsx
import { Button } from '@/components/ui/Button';

export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button size="md" theme="primary">
        Medium
      </Button>
      <Button size="lg" theme="primary">
        Large
      </Button>
    </div>
  );
}
```

### Icons

Use `data-icon="inline-start"` or `data-icon="inline-end"` on child icons.
Install or import the icon or spinner separately from the button.

```tsx
import { Button } from '@/components/ui/Button';
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';

export function ButtonWithIconsExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button theme="primary">
        <FlagIcon data-icon="inline-start" />
        New Branch
      </Button>
      <Button theme="default">
        Download
        <AngleDownIcon data-icon="inline-end" />
      </Button>
      <Button variant="text" theme="primary">
        Search
        <MagnifyingGlassIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
```

### Icon Only

For icon-only buttons, use `size="icon-md"` or `size="icon-lg"` and give the
button an `aria-label`.

```tsx
import { Button } from '@/components/ui/Button';
import { AngleUpIcon } from '@/components/icons/AngleUpIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { XmarkIcon } from '@/components/icons/XmarkIcon';

export function ButtonIconOnlyExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button size="icon-md" theme="default" aria-label="Close">
        <XmarkIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-md" theme="primary" aria-label="Search">
        <MagnifyingGlassIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-lg" theme="primary" aria-label="Expand">
        <AngleUpIcon data-icon="inline-start" />
      </Button>
    </div>
  );
}
```

### Loading State

Render a spinner as a child icon and disable the button while work is in flight.

```tsx
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export function ButtonLoadingWithSpinnerExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button theme="primary" disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button theme="default" disabled>
        Loading
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  );
}
```

### States

Disable a button with `disabled`. Add `focusableWhenDisabled` to keep it in the
tab order, for example when a tooltip explains why it is disabled.

```tsx
import { Button } from '@/components/ui/Button';

const variants = [
  { variant: 'default', label: 'Default' },
  { variant: 'text', label: 'Text' },
  { variant: 'ghost', label: 'Ghost' },
] as const;

const states = [
  { label: 'Enabled', props: {} },
  { label: 'Disabled', props: { disabled: true } },
];

export function ButtonStatesExample() {
  return (
    <div className="inline-grid grid-cols-[auto_repeat(3,auto)] items-center justify-items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      <span />
      {variants.map(({ variant, label }) => (
        <span key={variant}>{label}</span>
      ))}
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          {variants.map(({ variant }) => (
            <Button
              key={variant}
              variant={variant}
              theme="primary"
              {...props}
            >
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Link

Use `LinkButton` for navigation that should look like a button. It renders an
`<a>` with the same variants, themes, and sizes, and keeps link semantics, so
screen readers announce it as a link and `getByRole('link')` finds it.

Do not use `<Button nativeButton={false} render={<a />}>` for links: Base UI
adds `role="button"` to every non-`<button>` element.

```tsx
import { LinkButton } from '@/components/ui/Button';
import { AngleRightIcon } from '@/components/icons/AngleRightIcon';

export function ButtonLinkExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <LinkButton href="#login" size="lg">
        Log in
      </LinkButton>
      <LinkButton href="#docs" theme="default">
        Docs
      </LinkButton>
      <LinkButton href="#more" variant="text" theme="primary">
        Learn more
        <AngleRightIcon data-icon="inline-end" />
      </LinkButton>
    </div>
  );
}
```

For router links, pass the link element through `render`:

```tsx
import { LinkButton } from '@/components/ui/Button';
import Link from 'next/link';

<LinkButton render={<Link href="/login" />}>Log in</LinkButton>;
```

## Props

### Button

| Prop                    | Type                                                                                   | Default                                       | Description                                                      |
| ----------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| `variant`               | `'default' \| 'text' \| 'ghost'`                                                       | `'default'`                                   | Visual variant                                                   |
| `theme`                 | `'primary' \| 'default' \| 'success' \| 'info' \| 'warning' \| 'alarm' \| 'dangerous'` | `'primary'` for default, `'default'` for text | Color theme (`'dangerous'` only available on `default`)          |
| `size`                  | `'md' \| 'lg' \| 'icon-md' \| 'icon-lg'`                                               | `'md'`                                        | Button size                                                      |
| `focusableWhenDisabled` | `boolean`                                                                              | `false`                                       | Keeps the button focusable even when disabled styling is applied |
| `disabled`              | `boolean`                                                                              | `false`                                       | Native disabled attribute                                        |
| `className`             | `string`                                                                               | —                                             | Classes for the `<button>` itself                                |
| `contentClassName`      | `string`                                                                               | —                                             | Classes for the inner content wrapper (see below)                |
| `style`                 | `CSSProperties`                                                                        | —                                             | Inline styles                                                    |

### LinkButton

Accepts `variant`, `theme`, `size`, `className`, and `contentClassName` like
`Button`, plus every `<a>` attribute and `render`. It has no `disabled` prop,
because links cannot be disabled. Render plain text or a `Button` instead. The
root uses `data-slot="link-button"` and the content wrapper uses
`data-slot="link-button-content"`.

### Laying out the content

`Button` wraps its children in a `span[data-slot="button-content"]` that centres
the icon and label and keeps them on one line. Since that span is the button's
only child, flex utilities written on the button itself have nothing to
distribute — use `contentClassName` to reach the wrapper instead of selecting
into it with `[&>span]:*`.

```tsx
// Icon on the left, count pushed to the right, label allowed to wrap
<Button contentClassName="w-full justify-between whitespace-normal">
  <FlagIcon data-icon="inline-start" />
  Reported issues
  <span>12</span>
</Button>
```

Colour, size, radius, and hover states stay owned by the theme — passing those
through `className` will not override the variant. The button also sets
`overflow-hidden` for its hover overlay, so a child positioned outside the
button box (a notification badge at `-top-1 -right-1`) needs
`className="overflow-visible"` on the button.
