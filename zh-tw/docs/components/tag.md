# Tag

> 用來分類、表示狀態與篩選的標籤。支援 12 種顏色、兩種變體，以及可選的移除動作。

## 預覽

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

## 色彩

12 種顏色的 `tint` 變體（第一列）與預設的 `solid` 變體（第二列）：

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

## 可點擊

傳入 `onClick` 時，標籤文字會渲染成按鈕，滑過時有覆蓋效果。

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

## 可移除

Tag 可以用 `removable` 與 `onRemove` 加上移除按鈕：

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

## 可點擊又可移除

`onClick` 與 `onRemove` 可以同時使用。點移除按鈕不會觸發 `onClick`。

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

## 已選取

`selected` 會畫出主色外框。搭配 `onClick` 時也會設定 `aria-pressed`，讓 tag 當成切換按鈕使用。

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

## 屬性

| Prop           | Type                                                                                                                            | Default     | 說明                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------- |
| `children`     | `ReactNode`                                                                                                                     | —           | **必填。** Tag 內容                           |
| `color`        | `'default' \| 'teal' \| 'olive' \| 'brown' \| 'rose' \| 'indigo' \| 'blue' \| 'green' \| 'gold' \| 'red' \| 'purple' \| 'navy'` | `'default'` | Tag 顏色                                   |
| `colorVariant` | `'solid' \| 'tint'`                                                                                                             | `'solid'`   | 色彩樣式變體                                   |
| `icon`         | `ReactNode`                                                                                                                     | —           | 渲染在標籤前的圖示                                |
| `removable`    | `boolean`                                                                                                                       | `false`     | 顯示移除（×）按鈕                                |
| `selected`     | `boolean`                                                                                                                       | `false`     | 套用選取樣式。搭配 `onClick` 時也會設定 `aria-pressed` |
| `onClick`      | `() => void`                                                                                                                    | —           | 點擊處理函式                                   |
| `onRemove`     | `() => void`                                                                                                                    | —           | 點擊移除按鈕時呼叫                                |
| `className`    | `string`                                                                                                                        | —           | 額外的 CSS class                            |
| `style`        | `CSSProperties`                                                                                                                 | —           | 行內樣式                                     |
