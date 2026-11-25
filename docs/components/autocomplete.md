# Autocomplete

> Free-form text input with filtered suggestions and optional inline completion.

## Preview

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';

type Tag = {
  id: string;
  value: string;
};

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

export function AutocompleteExample() {
  return (
    <Autocomplete<Tag>
      items={tags}
      itemToStringValue={(tag) => tag.value}
      openOnInputClick
    >
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Search tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="e.g. feature" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent emptyText="No tags found.">
        {(tag: Tag) => (
          <AutocompleteItem key={tag.id} value={tag}>
            <AutocompleteItemText>{tag.value}</AutocompleteItemText>
          </AutocompleteItem>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

## Usage

`Autocomplete` is built on Base UI's
[Autocomplete](https://base-ui.com/react/components/autocomplete). Use it
when the user can type any value, with suggestions as assistance. If the
component must remember a selected option as component state, use
`Combobox` instead.

## Modes

The default `mode="list"` filters the suggestion list without changing
the input value. Use `mode="both"` when the highlighted item should also
temporarily complete the text inline.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';

type Tag = {
  id: string;
  value: string;
};

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

export function AutocompleteInlineAutocompleteExample() {
  return (
    <Autocomplete<Tag>
      items={tags}
      itemToStringValue={(tag) => tag.value}
      mode="both"
      openOnInputClick
    >
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Search tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Type com..." />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent emptyText="No tags found.">
        {(tag: Tag) => (
          <AutocompleteItem key={tag.id} value={tag}>
            {tag.value}
          </AutocompleteItem>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

## Grouped Suggestions

Use grouped `items` with `AutocompleteGroup` and
`AutocompleteGroupLabel` when results need sections.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';

type TagGroup = {
  value: string;
  items: string[];
};

const groups: TagGroup[] = [
  {
    value: 'Work',
    items: ['feature', 'fix', 'bug', 'internal'],
  },
  {
    value: 'Components',
    items: ['autocomplete', 'combobox', 'select', 'tooltip'],
  },
];

export function AutocompleteGroupedExample() {
  return (
    <Autocomplete<TagGroup> items={groups} openOnInputClick>
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Search grouped tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="e.g. autocomplete" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent emptyText="No tags found.">
        {(group: TagGroup) => (
          <AutocompleteGroup key={group.value} items={group.items}>
            <AutocompleteGroupLabel>
              {group.value}
            </AutocompleteGroupLabel>
            {group.items.map((item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

## Limit Results

Set `limit` to cap the visible matches. `AutocompleteStatus` can add
small helper copy above the result list.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';

type Tag = {
  id: string;
  value: string;
};

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

export function AutocompleteLimitedResultsExample() {
  return (
    <Autocomplete<Tag>
      items={tags}
      itemToStringValue={(tag) => tag.value}
      limit={4}
      openOnInputClick
    >
      <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
        Limit results to 4
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Search tags" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent>
        <AutocompleteStatus>
          Keep typing to narrow the result list.
        </AutocompleteStatus>
        <AutocompleteList>
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteList>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

## Command-Like Actions

Autocomplete suggestions can fire `onClick`. This is useful for
free-form command search where the input text remains the main state.
For a full command palette or hierarchical picker, prefer `Command`.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
} from '@/components/ui/Autocomplete';
import { useState } from 'react';

const commands = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export function AutocompleteCommandPickerExample() {
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  return (
    <div className="flex w-80 flex-col gap-2">
      <Autocomplete<string> items={commands} openOnInputClick>
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Run command..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompleteContent emptyText="No commands found.">
          {(item: string) => (
            <AutocompleteItem
              key={item}
              value={item}
              onClick={() => setLastCommand(item)}
            >
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
      {lastCommand ? (
        <p className="text-sm text-grayscale-opacity-600">
          Ran: {lastCommand}
        </p>
      ) : null}
    </div>
  );
}
```

## Inline List

Set `inline` and render `AutocompleteList` in place of
`AutocompleteContent` to keep the suggestions visible below the input
instead of in a popup.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from '@/components/ui/Autocomplete';
import { useState } from 'react';

const commands = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export function AutocompleteInlineListExample() {
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  return (
    <div className="flex w-80 flex-col gap-2">
      <Autocomplete<string> items={commands} inline>
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Filter inline commands..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <div className="rounded bg-background py-2 shadow-emphasis">
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem
                key={item}
                value={item}
                onClick={() => setLastCommand(item)}
              >
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteEmpty>No commands found.</AutocompleteEmpty>
        </div>
      </Autocomplete>
      {lastCommand ? (
        <p className="text-sm text-grayscale-opacity-600">
          Ran: {lastCommand}
        </p>
      ) : null}
    </div>
  );
}
```

## Submit Search

Use `name` and `submitOnItemClick` for a single-field search form.

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

type Tag = {
  id: string;
  value: string;
};

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

export function AutocompleteSubmitSearchExample() {
  const [query, setQuery] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const submitted = data.get('query');
        setQuery(typeof submitted === 'string' ? submitted : '');
      }}
    >
      <Autocomplete<Tag> items={tags} name="query" submitOnItemClick>
        <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
          Search and submit
          <AutocompleteInputGroup>
            <AutocompleteIcon />
            <AutocompleteInput placeholder="Search tags" />
            <AutocompleteClear />
            <AutocompleteTrigger />
          </AutocompleteInputGroup>
        </label>
        <AutocompleteContent emptyText="No tags found.">
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
      <Button type="submit">Submit</Button>
      {query !== null ? (
        <p className="text-sm text-grayscale-opacity-600">
          Submitted: {query}
        </p>
      ) : null}
    </form>
  );
}
```

## States

```tsx
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from '@/components/ui/Autocomplete';

const tags = ['feature', 'fix', 'bug', 'docs'];

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'With value', props: { defaultValue: 'feature' } },
  {
    label: 'Long value',
    props: {
      defaultValue: 'a long search query that does not fit the input',
    },
  },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: {}, invalid: true },
];

export function AutocompleteStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_15rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props, invalid }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Autocomplete<string> items={tags} {...props}>
            <AutocompleteInputGroup aria-invalid={invalid}>
              <AutocompleteIcon />
              <AutocompleteInput
                aria-label={`${label} search`}
                placeholder="Search tags"
              />
              <AutocompleteClear />
              <AutocompleteTrigger />
            </AutocompleteInputGroup>
            <AutocompleteContent emptyText="No tags found.">
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteContent>
          </Autocomplete>
        </div>
      ))}
    </div>
  );
}
```

## Props

### Autocomplete

| Prop                | Type                                     | Default  | Description                                     |
| ------------------- | ---------------------------------------- | -------- | ----------------------------------------------- |
| `items`             | `readonly Item[] \| grouped items`       | —        | Suggestions used by the render function         |
| `value`             | `string`                                 | —        | Controlled input value                          |
| `defaultValue`      | `string`                                 | —        | Initial uncontrolled input value                |
| `onValueChange`     | `(value, details) => void`               | —        | Called when the input value changes             |
| `mode`              | `'list' \| 'both' \| 'inline' \| 'none'` | `'list'` | Filtering and inline-completion behavior        |
| `autoHighlight`     | `boolean \| 'always'`                    | `false`  | Highlight matching suggestions automatically    |
| `openOnInputClick`  | `boolean`                                | `false`  | Open the popup when the input is clicked        |
| `limit`             | `number`                                 | —        | Maximum visible matches                         |
| `submitOnItemClick` | `boolean`                                | `false`  | Submit the owning form when an item is selected |
| `itemToStringValue` | `(item) => string`                       | —        | Converts object items to input/form text        |

### AutocompleteContent

`AutocompleteContent` is a composite of Portal + Positioner + Popup. Positioning props go to the Positioner; `portalContainer` and `keepMounted` goes to the Portal.

| Prop                    | Type                                                   | Default                        | Description                                           |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | ----------------------------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | Alignment relative to the anchor                      |
| `alignOffset`           | `number`                                               | `0`                            | Offset along the alignment axis                       |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                     | Preferred side of the anchor                          |
| `sideOffset`            | `number`                                               | `4`                            | Distance from the anchor                              |
| `emptyText`             | `ReactNode`                                            | —                              | Empty state content                                   |
| `listClassName`         | `string`                                               | —                              | Classes for the list element                          |
| `positionerClassName`   | `string`                                               | —                              | Classes on the Positioner wrapper                     |
| `anchor`                | `RefObject \| Element \| …`                            | —                              | Custom positioning anchor (defaults to the trigger)   |
| `arrowPadding`          | `number`                                               | `5`                            | Minimum space between the arrow and the popup's edges |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'none' }` | How the popup flips or shifts to avoid collisions     |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`         | Area the popup is kept inside                         |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                            | Space kept from the edge of the collision boundary    |
| `disableAnchorTracking` | `boolean`                                              | `false`                        | Stop following layout shifts of the anchor            |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                   | CSS `position` of the positioner                      |
| `sticky`                | `boolean`                                              | `false`                        | Keep the popup in view after the anchor scrolls out   |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | —                              | Custom portal container (defaults to `document.body`) |
| `keepMounted`           | `boolean`                                              | `false`                        | Keep the popup in the DOM while closed                |

### Parts

| Part                     | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `Autocomplete`           | Root; manages input value, filtering, popup, and highlight |
| `AutocompleteInputGroup` | Styled input shell                                         |
| `AutocompleteInput`      | Native input connected to autocomplete behavior            |
| `AutocompleteIcon`       | Search icon slot                                           |
| `AutocompleteClear`      | Clears the input value                                     |
| `AutocompleteTrigger`    | Opens or closes the popup                                  |
| `AutocompleteContent`    | Preset portal + positioner + popup + optional list wrapper |
| `AutocompleteList`       | Scrollable list primitive                                  |
| `AutocompleteItem`       | Highlightable suggestion row                               |
| `AutocompleteItemText`   | Text slot inside an item                                   |
| `AutocompleteEmpty`      | Empty state                                                |
| `AutocompleteStatus`     | Status/helper row                                          |
| `AutocompleteGroup`      | Suggestion group                                           |
| `AutocompleteGroupLabel` | Label for a suggestion group                               |
| `AutocompletePortal`     | Lower-level portal                                         |
| `AutocompletePositioner` | Lower-level floating positioner                            |
| `AutocompletePopup`      | Lower-level popup surface                                  |
