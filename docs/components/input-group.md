# InputGroup

> A composable input shell for prefixes, suffixes, inline text, and actions around an input or textarea.

## Preview

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/InputGroup';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { XmarkIcon } from '@/components/icons/XmarkIcon';
import { useState } from 'react';

export function InputGroupExample() {
  const [query, setQuery] = useState('');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <MagnifyingGlassIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        placeholder="Search..."
        value={query}
        onValueChange={setQuery}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Clear"
          size="icon-xs"
          onClick={() => setQuery('')}
        >
          <XmarkIcon className="size-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

## Installation

After [configuring the registry](/docs/getting-started/installation), install InputGroup:

```bash
npx shadcn@latest add @vital-design/input-group
```

## Usage

`InputGroup` draws the border, focus, disabled, and invalid states around one control (`InputGroupInput` or `InputGroupTextarea`). Put icons, text, and buttons in `InputGroupAddon`; clicking an addon outside a button focuses the control.

Use it when you build your own input layout. [SearchBar](/docs/components/search-bar) and [PasswordInput](/docs/components/input#password-input) are preset wrappers built on `InputGroup`; use them when they fit.

## With Text

Use `InputGroupText` for static prefixes and suffixes such as a protocol, unit, or currency.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupWithTextExample() {
  const [domain, setDomain] = useState('vital.example.com');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Website"
        value={domain}
        onValueChange={setDomain}
      />
    </InputGroup>
  );
}
```

## Textarea

```tsx
import {
  InputGroup,
  InputGroupTextarea,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupTextareaExample() {
  const [message, setMessage] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupTextarea
        aria-label="Message"
        className="h-30"
        placeholder="Enter your message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
```

## Block Addon

Set `align="block-start"` or `align="block-end"` to place an addon above or below the control.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/InputGroup';
import { useState } from 'react';

export function InputGroupBlockAddonExample() {
  const [comment, setComment] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText>Comment</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        aria-label="Comment"
        placeholder="Enter your message"
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
```

## States

Disable the control with `disabled` on `InputGroupInput`; the group and its addons follow. Mark an invalid value with `aria-invalid` on the control.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/InputGroup';
import { PlusIcon } from '@/components/icons/PlusIcon';

const states = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function InputGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              aria-label={`${label} amount`}
              defaultValue="2000"
              {...props}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Increase"
                size="icon-xs"
                disabled={props.disabled}
              >
                <PlusIcon className="size-3.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  );
}
```

## Parts

| Part                 | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `InputGroup`         | Visual shell with focus, disabled, and invalid states |
| `InputGroupInput`    | Single-line input control                             |
| `InputGroupTextarea` | Multiline textarea control                            |
| `InputGroupAddon`    | Prefix or suffix slot                                 |
| `InputGroupButton`   | Small action button inside an addon                   |
| `InputGroupText`     | Static text inside an addon                           |

## Props

### InputGroupAddon

| Prop    | Type                                                             | Default          | Description                             |
| ------- | ---------------------------------------------------------------- | ---------------- | --------------------------------------- |
| `align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | Where the addon sits around the control |

### InputGroupButton

| Prop   | Type                                     | Default    | Description                         |
| ------ | ---------------------------------------- | ---------- | ----------------------------------- |
| `size` | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'` | `'xs'`     | Button size; `icon-*` for icon-only |
| `type` | `'button' \| 'submit' \| 'reset'`        | `'button'` | Native button type                  |

`InputGroupButton` also accepts `Button` props except `variant` and `size`; `theme` cannot be `dangerous`. `InputGroupInput` accepts `Input` props, and `InputGroupTextarea` accepts `Textarea` props.
