# Autocomplete

> 可自由輸入的文字欄，附篩選建議，也可選擇行內補完。

## 預覽

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

## 用法

`Autocomplete` 建立在 Base UI 的
[Autocomplete](https://base-ui.com/react/components/autocomplete) 上。使用者可以輸入任意值、建議只是輔助時，用它。如果元件必須把選到的選項記成元件狀態，改用 `Combobox`。

## 模式

預設 `mode="list"` 只篩選建議清單，不改輸入值。標示中的項目也要暫時把文字補進行內時，用 `mode="both"`。

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

## 分組建議

結果需要分區時，用分組的 `items`，搭配 `AutocompleteGroup` 與 `AutocompleteGroupLabel`。

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

## 限制結果

用 `limit` 限制可見的符合項目。`AutocompleteStatus` 可以在結果清單上方加一行簡短說明。

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

## 類似指令的動作

Autocomplete 的建議可以觸發 `onClick`。適合自由輸入的指令搜尋，輸入文字仍是主要狀態。完整的命令面板或階層選擇器，請用 `Command`。

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

## 行內清單

設定 `inline`，並用 `AutocompleteList` 取代 `AutocompleteContent`，建議會直接顯示在輸入框下方，不放進彈出層。

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

## 送出搜尋

單欄搜尋表單用 `name` 與 `submitOnItemClick`。

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

## 狀態

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

| Prop                | Type                                     | Default  | 說明                    |
| ------------------- | ---------------------------------------- | -------- | --------------------- |
| `items`             | `readonly Item[] \| grouped items`       | —        | render function 使用的建議 |
| `value`             | `string`                                 | —        | 受控的輸入值                |
| `defaultValue`      | `string`                                 | —        | 非受控的初始輸入值             |
| `onValueChange`     | `(value, details) => void`               | —        | 輸入值變更時呼叫              |
| `mode`              | `'list' \| 'both' \| 'inline' \| 'none'` | `'list'` | 篩選與行內補完的行為            |
| `autoHighlight`     | `boolean \| 'always'`                    | `false`  | 自動標示符合的建議             |
| `openOnInputClick`  | `boolean`                                | `false`  | 點擊輸入框時開啟彈出層           |
| `limit`             | `number`                                 | —        | 最多顯示幾筆符合項目            |
| `submitOnItemClick` | `boolean`                                | `false`  | 選取項目時送出所屬表單           |
| `itemToStringValue` | `(item) => string`                       | —        | 把物件項目轉成輸入或表單文字        |

### AutocompleteContent

`AutocompleteContent` 是 Portal + Positioner + Popup 的組合。定位 props 會轉給 Positioner；`portalContainer` 與 `keepMounted` 會轉給 Portal。

| Prop                    | Type                                                   | Default                        | 說明                               |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------------------------------- |
| `align`                 | `'start' \| 'center' \| 'end'`                         | `'start'`                      | 相對錨點的對齊                          |
| `alignOffset`           | `number`                                               | `0`                            | 沿對齊軸的偏移                          |
| `side`                  | `'top' \| 'right' \| 'bottom' \| 'left' \| …`          | `'bottom'`                     | 偏好出現在錨點的哪一側                      |
| `sideOffset`            | `number`                                               | `4`                            | 與錨點的距離                           |
| `emptyText`             | `ReactNode`                                            | —                              | 空狀態內容                            |
| `listClassName`         | `string`                                               | —                              | list 元素上的 class                  |
| `positionerClassName`   | `string`                                               | —                              | Positioner wrapper 上的 class      |
| `anchor`                | `RefObject \| Element \| …`                            | —                              | 自訂定位錨點（預設是觸發器）                   |
| `arrowPadding`          | `number`                                               | `5`                            | 箭頭與彈出層邊緣的最小距離                    |
| `collisionAvoidance`    | `{ side?, align?, fallbackAxisSide? }`                 | `{ fallbackAxisSide: 'none' }` | 遇到碰撞時彈出層怎麼翻轉或位移                  |
| `collisionBoundary`     | `'clipping-ancestors' \| Element \| Element[] \| Rect` | `'clipping-ancestors'`         | 彈出層要留在裡面的範圍                      |
| `collisionPadding`      | `number \| { top?, right?, bottom?, left? }`           | `5`                            | 與碰撞邊界保留的距離                       |
| `disableAnchorTracking` | `boolean`                                              | `false`                        | 不再跟著錨點的版面位移更新位置                  |
| `positionMethod`        | `'absolute' \| 'fixed'`                                | `'absolute'`                   | positioner 的 CSS `position`      |
| `sticky`                | `boolean`                                              | `false`                        | 錨點捲出畫面後，彈出層仍留在畫面內                |
| `portalContainer`       | `HTMLElement \| ShadowRoot \| RefObject \| null`       | —                              | 自訂 portal 容器（預設 `document.body`） |
| `keepMounted`           | `boolean`                                              | `false`                        | 關閉時仍把彈出層留在 DOM                   |

### 部分

| 部分                       | 說明                                               |
| ------------------------ | ------------------------------------------------ |
| `Autocomplete`           | Root；管理輸入值、篩選、彈出層與標示                             |
| `AutocompleteInputGroup` | 有樣式的輸入外框                                         |
| `AutocompleteInput`      | 接到 autocomplete 行為的原生 input                      |
| `AutocompleteIcon`       | 搜尋圖示 slot                                        |
| `AutocompleteClear`      | 清除輸入值                                            |
| `AutocompleteTrigger`    | 開啟或關閉彈出層                                         |
| `AutocompleteContent`    | 預設的 portal + positioner + popup，可再加 list wrapper |
| `AutocompleteList`       | 可捲動的清單 primitive                                 |
| `AutocompleteItem`       | 可標示的建議列                                          |
| `AutocompleteItemText`   | 項目內的文字 slot                                      |
| `AutocompleteEmpty`      | 空狀態                                              |
| `AutocompleteStatus`     | 狀態或輔助說明列                                         |
| `AutocompleteGroup`      | 建議群組                                             |
| `AutocompleteGroupLabel` | 建議群組的標籤                                          |
| `AutocompletePortal`     | 較底層的 portal                                      |
| `AutocompletePositioner` | 較底層的浮動定位                                         |
| `AutocompletePopup`      | 較底層的彈出表面                                         |
