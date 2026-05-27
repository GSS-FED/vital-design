'use client';

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteList,
  AutocompleteStatus,
  AutocompleteTrigger,
} from '@/components/autocomplete/Autocomplete';
import { Button } from '@/components/button/Button';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

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

type TagGroup = {
  value: string;
  items: string[];
};

const groupedTags: TagGroup[] = [
  {
    value: 'Work',
    items: ['feature', 'fix', 'bug', 'internal'],
  },
  {
    value: 'Components',
    items: ['autocomplete', 'combobox', 'select', 'tooltip'],
  },
];

const commands = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export function AutocompletePreview() {
  return (
    <ComponentPreview centered={false}>
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
          {(tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              <AutocompleteItemText>{tag.value}</AutocompleteItemText>
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
    </ComponentPreview>
  );
}

export function AutocompleteInlinePreview() {
  return (
    <ComponentPreview centered={false}>
      <Autocomplete<Tag>
        items={tags}
        itemToStringValue={(tag) => tag.value}
        mode="both"
        openOnInputClick
      >
        <label className="flex w-80 flex-col gap-1 font-sans text-sm leading-5 text-grayscale-opacity-800">
          Inline completion
          <AutocompleteInputGroup>
            <AutocompleteIcon />
            <AutocompleteInput placeholder="Type com..." />
            <AutocompleteClear />
            <AutocompleteTrigger />
          </AutocompleteInputGroup>
        </label>
        <AutocompleteContent emptyText="No tags found.">
          {(tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
    </ComponentPreview>
  );
}

export function AutocompleteGroupedPreview() {
  return (
    <ComponentPreview centered={false}>
      <Autocomplete<TagGroup> items={groupedTags} openOnInputClick>
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
    </ComponentPreview>
  );
}

export function AutocompleteLimitedPreview() {
  return (
    <ComponentPreview centered={false}>
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
    </ComponentPreview>
  );
}

export function AutocompleteCommandPreview() {
  return (
    <ComponentPreview centered={false}>
      <Autocomplete<string> items={commands} openOnInputClick>
        <AutocompleteInputGroup className="w-80">
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Run command..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompleteContent emptyText="No commands found.">
          {(item) => (
            <AutocompleteItem
              key={item}
              value={item}
              onClick={() => window.alert(item)}
            >
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>
    </ComponentPreview>
  );
}

export function AutocompleteSubmitPreview() {
  return (
    <ComponentPreview centered={false}>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          window.alert(String(data.get('query') ?? ''));
        }}
      >
        <Autocomplete<Tag>
          items={tags}
          name="query"
          submitOnItemClick
        >
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
            {(tag) => (
              <AutocompleteItem key={tag.id} value={tag}>
                {tag.value}
              </AutocompleteItem>
            )}
          </AutocompleteContent>
        </Autocomplete>
        <Button type="submit">Submit</Button>
      </form>
    </ComponentPreview>
  );
}
