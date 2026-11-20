# Tag

> A label component for categorization, status, and filtering. Supports 12 colors, two variants, and optional remove action.

## Preview

```tsx
import { Tag } from '@/components/ui/Tag';

export function TagExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag color="blue" colorVariant="tint">
        Design
      </Tag>
      <Tag color="green" colorVariant="tint">
        Development
      </Tag>
      <Tag color="gold" colorVariant="tint">
        Marketing
      </Tag>
    </div>
  );
}
```

## Colors

All 12 colors in the `tint` variant (first row) and the default `solid` variant (second row):

```tsx
import { Tag } from '@/components/ui/Tag';

const colors = [
  'default',
  'teal',
  'olive',
  'brown',
  'rose',
  'indigo',
  'blue',
  'green',
  'gold',
  'red',
  'purple',
  'navy',
] as const;

export function TagColorsExample() {
  return (
    <div className="grid gap-3">
      {(['tint', 'solid'] as const).map((colorVariant) => (
        <div key={colorVariant} className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Tag
              key={color}
              color={color}
              colorVariant={colorVariant}
            >
              {color}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Clickable

With `onClick`, the tag label renders as a button with a hover overlay.

```tsx
import { Tag } from '@/components/ui/Tag';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { useState } from 'react';

export function TagClickableExample() {
  const [lastClicked, setLastClicked] = useState<string>();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag onClick={() => setLastClicked('Design')}>Design</Tag>
      <Tag
        icon={<FlagIcon />}
        onClick={() => setLastClicked('Urgent')}
      >
        Urgent
      </Tag>
      {lastClicked && (
        <span className="text-sm text-grayscale-opacity-600">
          Clicked: {lastClicked}
        </span>
      )}
    </div>
  );
}
```

## Removable

Tags can include a remove button via `removable` + `onRemove`:

```tsx
import { Tag } from '@/components/ui/Tag';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { useState } from 'react';

export function TagRemovableExample() {
  const [tags, setTags] = useState(['Design', 'Urgent']);
  const remove = (tag: string) =>
    setTags((current) => current.filter((item) => item !== tag));

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          icon={tag === 'Urgent' ? <FlagIcon /> : undefined}
          onRemove={() => remove(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
```

## Clickable and Removable

`onClick` and `onRemove` can be combined. Clicking the remove button does not trigger `onClick`.

```tsx
import { Tag } from '@/components/ui/Tag';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { useState } from 'react';

export function TagClickableAndRemovableExample() {
  const [tags, setTags] = useState(['Design', 'Urgent']);
  const [lastClicked, setLastClicked] = useState<string>();
  const remove = (tag: string) =>
    setTags((current) => current.filter((item) => item !== tag));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          icon={tag === 'Urgent' ? <FlagIcon /> : undefined}
          onClick={() => setLastClicked(tag)}
          onRemove={() => remove(tag)}
        >
          {tag}
        </Tag>
      ))}
      {lastClicked && (
        <span className="text-sm text-grayscale-opacity-600">
          Clicked: {lastClicked}
        </span>
      )}
    </div>
  );
}
```

## Selected

`selected` draws a focus-colored outline. With `onClick`, it also sets `aria-pressed`, so the tag works as a toggle.

```tsx
import { Tag } from '@/components/ui/Tag';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { useState } from 'react';

const tags = [
  { label: 'Design', icon: undefined },
  { label: 'Urgent', icon: <FlagIcon /> },
];

export function TagSelectedExample() {
  const [selected, setSelected] = useState<string | undefined>(
    'Design',
  );

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ label, icon }) => (
        <Tag
          key={label}
          icon={icon}
          selected={selected === label}
          onClick={() =>
            setSelected((current) =>
              current === label ? undefined : label,
            )
          }
        >
          {label}
        </Tag>
      ))}
    </div>
  );
}
```

## Props

| Prop           | Type                                                                                                                            | Default     | Description                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `children`     | `ReactNode`                                                                                                                     | —           | **Required.** Tag content                                          |
| `color`        | `'default' \| 'teal' \| 'olive' \| 'brown' \| 'rose' \| 'indigo' \| 'blue' \| 'green' \| 'gold' \| 'red' \| 'purple' \| 'navy'` | `'default'` | Tag color                                                          |
| `colorVariant` | `'solid' \| 'tint'`                                                                                                             | `'solid'`   | Color style variant                                                |
| `icon`         | `ReactNode`                                                                                                                     | —           | Icon rendered before the label                                     |
| `removable`    | `boolean`                                                                                                                       | `false`     | Shows a remove (×) button                                          |
| `selected`     | `boolean`                                                                                                                       | `false`     | Applies selected styling. With `onClick`, also sets `aria-pressed` |
| `onClick`      | `() => void`                                                                                                                    | —           | Click handler                                                      |
| `onRemove`     | `() => void`                                                                                                                    | —           | Called when the remove button is clicked                           |
| `className`    | `string`                                                                                                                        | —           | Additional CSS classes                                             |
| `style`        | `CSSProperties`                                                                                                                 | —           | Inline styles                                                      |
