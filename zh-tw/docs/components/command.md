# Command

> 建立在 cmdk 上、可組合的命令面板 primitive，含輸入、清單、項目、群組與快捷鍵。

## 預覽

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/Command';

export function CommandExample() {
  return (
    <Command label="Command palette" className="h-[300px] w-[280px]">
      <CommandInput placeholder="Type a command or search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>New file</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Open file</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Save</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Preferences</CommandItem>
          <CommandItem>Keyboard shortcuts</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## 用法

`Command` 是 [cmdk](https://github.com/pacocoursey/cmdk) 的薄樣式包裝。用來做命令面板、自訂的可搜尋彈出層、分頁的階層選擇器，或任何以鍵盤篩選的清單。

> cmdk 會依 `CommandInput` 輸入的文字，比對每個 `CommandItem` 的文字內容來篩選。要自己處理篩選時，在 `Command` 上傳 `shouldFilter={false}`。

## 何時使用

| 需求                 | 元件                    |
| ------------------ | --------------------- |
| 平面值選擇器             | `Select`              |
| 可搜尋的值選擇器（輸入 + 彈出層） | `Combobox`            |
| 階層路徑選擇器            | `Command` + `Popover` |
| 動作選單               | `DropdownMenu`        |
| 命令面板／自訂的可搜尋清單      | `Command`             |

`Command` 不含 popover 或觸發器。需要浮動面板時，搭配 `Popover`（或自己的表面）。[Tree Select](/zh-tw/docs/blocks/tree-select) 區塊是用 `Command` 與 `Popover` 組出的分頁樹狀選擇器。

## 狀態

項目載入中時，在清單裡放 `CommandLoading`。沒有項目符合搜尋時會顯示 `CommandEmpty`。

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/ui/Command';

export function CommandStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-start gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      <span>Loading</span>
      <Command label="Loading" className="max-h-[300px] w-[260px]">
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandLoading />
        </CommandList>
      </Command>
      <span>Empty</span>
      <Command label="Empty" className="max-h-[300px] w-[260px]">
        <CommandInput placeholder="Search" value="Durian" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
```

## 匯出

| 匯出                  | 說明                                                       |
| ------------------- | -------------------------------------------------------- |
| `Command`           | Root 容器；接受 cmdk props（`shouldFilter`、`filter`、`label` 等） |
| `CommandInput`      | 搜尋輸入列，前方有搜尋圖示                                            |
| `CommandList`       | 可捲動的清單 primitive                                         |
| `CommandEmpty`      | 沒有項目符合時的空狀態                                              |
| `CommandGroup`      | 分組項目，可選 `heading`                                        |
| `CommandSeparator`  | 群組之間的水平分隔線                                               |
| `CommandItem`       | 可選取的列；觸發 `onSelect`                                      |
| `CommandShortcut`   | 項目內靠右的鍵盤提示                                               |
| `CommandLoading`    | 載入列，預設帶 spinner                                          |
| `CommandHeader`     | 輸入框上方的 header slot（用於返回按鈕）                               |
| `CommandBackButton` | 分頁流程用的返回按鈕樣式                                             |
