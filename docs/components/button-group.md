# ButtonGroup

> A composable layout primitive for grouped button controls.

## Preview

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Save</Button>
      <Button theme="default">More</Button>
    </ButtonGroup>
  );
}
```

## Usage

Wrap `Button`s in `ButtonGroup` to join them into one control. The group only
handles layout; each button keeps its own `variant`, `theme`, and `size`.

## With Separator

```tsx
import { Button } from '@/components/ui/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/ButtonGroup';

export function ButtonGroupWithSeparatorExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Archive</Button>
      <ButtonGroupSeparator />
      <Button theme="default">Snooze</Button>
    </ButtonGroup>
  );
}
```

## With Text

```tsx
import { Button } from '@/components/ui/Button';
import {
  ButtonGroup,
  ButtonGroupText,
} from '@/components/ui/ButtonGroup';

export function ButtonGroupWithTextExample() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Status</ButtonGroupText>
      <Button theme="default">Publish</Button>
    </ButtonGroup>
  );
}
```

## Vertical

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupVerticalExample() {
  return (
    <ButtonGroup orientation="vertical" className="w-40">
      <Button theme="default">Action A</Button>
      <Button theme="default">Action B</Button>
    </ButtonGroup>
  );
}
```

## Nested

A nested group stays joined inside, and is spaced apart from its siblings.

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ButtonGroupNestedExample() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button theme="default">Back</Button>
        <Button theme="default">Next</Button>
      </ButtonGroup>
      <Button>Submit</Button>
    </ButtonGroup>
  );
}
```

## Props

### ButtonGroup

| Prop          | Type                         | Default        | Description            |
| ------------- | ---------------------------- | -------------- | ---------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction       |
| `className`   | `string`                     | —              | Additional CSS classes |
| `style`       | `CSSProperties`              | —              | Inline styles          |

### ButtonGroupSeparator

| Prop          | Type                         | Default | Description            |
| ------------- | ---------------------------- | ------- | ---------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | auto    | Separator direction    |
| `...props`    | `SeparatorProps`             | —       | Shared separator props |
