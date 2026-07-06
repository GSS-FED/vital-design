import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
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
} from './Autocomplete';

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

type ProduceGroup = {
  value: string;
  items: string[];
};

const groupedTags: ProduceGroup[] = [
  {
    value: 'Work',
    items: ['feature', 'fix', 'bug', 'internal'],
  },
  {
    value: 'Components',
    items: ['autocomplete', 'combobox', 'select', 'tooltip'],
  },
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

function AutocompleteField() {
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

export const Default: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
      <AutocompleteField />
    </div>
  ),
};

export const InlineAutocomplete: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
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
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
      <Autocomplete<ProduceGroup>
        items={groupedTags}
        openOnInputClick
      >
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
          {(group: ProduceGroup) => (
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
    </div>
  ),
};

export const LimitedResults: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
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
    </div>
  ),
};

const commandItems = [
  'Create issue',
  'Invite teammate',
  'Archive project',
  'Open settings',
];

export const CommandPicker: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
      <Autocomplete<string> items={commandItems} openOnInputClick>
        <AutocompleteInputGroup className="w-80">
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Run command..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompleteContent emptyText="No commands found.">
          {(item: string) => (
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
    </div>
  ),
};

export const InlineList: Story = {
  render: () => (
    <div className="min-h-[280px] p-8">
      <Autocomplete<string> items={commandItems} inline>
        <AutocompleteInputGroup className="w-80">
          <AutocompleteIcon />
          <AutocompleteInput placeholder="Filter inline commands..." />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <div className="mt-2 w-80 rounded bg-white py-2 shadow-emphasis">
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem
                key={item}
                value={item}
                onClick={() => window.alert(item)}
              >
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteEmpty>No commands found.</AutocompleteEmpty>
        </div>
      </Autocomplete>
    </div>
  ),
};

export const SubmitSearch: Story = {
  render: () => (
    <form
      className="flex min-h-[280px] flex-col gap-3 p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        window.alert(String(data.get('query') ?? ''));
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
    </form>
  ),
};
