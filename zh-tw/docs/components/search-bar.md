# SearchBar

> 帶圖示的搜尋輸入。支援即時 onChange，以及按 Enter 或點圖示觸發的 onSearch。

## 預覽

```tsx
import { SearchBar } from '@/components/ui/SearchBar';
import { useState } from 'react';

export function SearchBarExample() {
  const [lastSearch, setLastSearch] = useState('');

  return (
    <div className="flex flex-col items-center gap-2">
      <SearchBar
        aria-label="Search"
        isSearchIconClickable
        placeholder="Search..."
        width="280px"
        onSearch={setLastSearch}
      />
      {lastSearch && (
        <p className="text-sm text-grayscale-opacity-500">
          Searched: <strong>{lastSearch}</strong>
        </p>
      )}
    </div>
  );
}
```

## 用法

`onChange` 在每次按鍵時帶目前的值呼叫。`onSearch` 在使用者按下 Enter 時呼叫；設定 `isSearchIconClickable` 後，點搜尋圖示也會呼叫。上方範例顯示最後送出的查詢。

## 狀態

用 `disabled` 停用搜尋列。過長的值會以省略號截斷。

```tsx
import { SearchBar } from '@/components/ui/SearchBar';

const states = [
  { label: 'Placeholder', props: {} },
  { label: 'Filled', props: { defaultValue: 'Vital Design' } },
  {
    label: 'Long value',
    props: {
      defaultValue: 'A long search query that does not fit the field',
    },
  },
  { label: 'Disabled', props: { disabled: true } },
];

export function SearchBarStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_17.5rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <SearchBar
            aria-label={label}
            placeholder="Search..."
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
```

## 屬性

| Prop                    | Type                      | Default | 說明                     |
| ----------------------- | ------------------------- | ------- | ---------------------- |
| `value`                 | `string`                  | —       | 受控值                    |
| `defaultValue`          | `string`                  | —       | 非受控的初始值                |
| `placeholder`           | `string`                  | —       | 佔位文字                   |
| `onChange`              | `(value: string) => void` | —       | 每次按鍵都呼叫                |
| `onSearch`              | `(value: string) => void` | —       | 按下 Enter 或點擊圖示時呼叫      |
| `isSearchIconClickable` | `boolean`                 | `false` | 讓搜尋圖示在點擊時觸發 `onSearch` |
| `disabled`              | `boolean`                 | `false` | 停用輸入                   |
| `width`                 | `string`                  | —       | 自訂寬度（例如 `'300px'`）     |
| `className`             | `string`                  | —       | InputGroup 外框的 class   |
| `style`                 | `CSSProperties`           | —       | InputGroup 外框的行內樣式     |

其餘 `<input>` props（`id`、`name`、`aria-label`、`autoFocus`、`inputMode`、`enterKeyHint`、`onBlur` 等）會轉送到內部 input，`ref` 也指向該 input。

## 受控與非受控

外部要擁有查詢內容時傳 `value`，例如 URL search param、「清除所有篩選」按鈕，或填入欄位的建議 chip。輸入本身是唯一的資料來源、`onChange` 只是拿去發請求時，改傳 `defaultValue`。兩個都設的話，`defaultValue` 不會生效。

```tsx
// Controlled: the query string owns the value, so clearing it clears the input
<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={(value) => router.push(`?q=${value}`)}
/>
```
