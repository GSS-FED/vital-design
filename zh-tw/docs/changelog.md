# 更新紀錄

> Vittal Design registry 裡，會影響安裝或用法的變更。

這一頁記錄 vittal.design 上、以 registry 發佈的設計系統：元件、區塊、icon 與 token。不記錄舊的 `@fed/vital-design` npm 套件。

那個套件從 `src/` 建置，仍供既有應用使用。新的工作透過 registry 發佈。若你仍從套件 import，請看 [從 v0 遷移到 v1](/zh-tw/docs/getting-started/migration-guide)。

紀錄依上線月份分組，新的在上面。只記會影響你怎麼安裝或使用 registry 的變更：新元件、破壞性用法、token，以及安裝步驟。只改文件的更新（例如新增範例）不列在這裡。

## 2026 年 11 月

### 給內嵌與多個側邊欄用的 Sidebar props

#### 元件

- **Sidebar：** 新增幾個選填 props，給放在別的應用頁面裡、或和另一個側邊欄同頁的側邊欄使用：

  - `SidebarProvider` 的 `cookieName` 改用別的 cookie 名稱保存開啟狀態；`cookieName={null}` 不寫 cookie。
  - `SidebarProvider` 的 `isMobile` 取代內建的 `768px` 判斷。`isMobile={false}` 永遠不切換成行動版 Sheet。
  - `SidebarTrigger` 可以傳 `children` 換掉 icon，傳 `render` 換成別的元素，例如 `render={<Button variant="ghost" size="icon-md" />}`。換上去的元素保留自己的外觀。在 `onClick` 裡呼叫 `event.preventDefault()` 就不會切換。
  - `Sidebar` 可以傳 `render` 換掉根元素，例如 `<aside />` 或 `<nav />`。行動版的面板是 Sheet，會忽略這個 prop。
  - `SidebarMenuButton` 在 `SidebarProvider` 外不再 throw，會當成展開狀態渲染，不顯示 tooltip。

  不傳新 props 時行為和現在一樣。重新安裝 `sidebar` 即可套用。

### 設計清單的狀態、檔案與箭頭 icon

新的 icon item，都是設計畫好的 20×20 frame 圖：

- 狀態：`icon-circle-check`、`icon-circle-check-solid`、`icon-circle-xmark`、`icon-circle-xmark-solid`、`icon-circle-info`、`icon-circle-info-solid`、`icon-circle-exclamation-solid`、`icon-circle-minus-solid`、`icon-circle-question`、`icon-exclamation-solid`、`icon-circle-dashed`、`icon-circle-dot`。
- 檔案與箭頭：`icon-file-lines`、`icon-file-arrow-up-solid`、`icon-arrow-right-long`、`icon-arrow-up-right-from-square`、`icon-arrow-up-right-from-square-solid`。
- 其他：`icon-clock-solid`、`icon-ellipsis-vertical`、`icon-grip-dots-vertical`。

`InfoIcon` 改名為 `CircleInfoIcon`（`@vital-design/icon-circle-info`），跟設計清單一致，並換成設計的圖。舊名稱與舊 registry item 仍可使用但已棄用，`InfoIcon` 只是轉出 `CircleInfoIcon`。請改用新名稱。

換圖：

- `ClockIcon` 換成設計重畫的圖，指針重畫。
- `ClearIcon` 換成設計重畫的圖，圓形改在 frame 正中央（原本偏上 0.25px），× 變大。
- `CalendarDaysIcon` 每邊大約大 0.25px，跟設計稿一致。
- `CircleUserIcon`、`SidebarIcon`、`ThumbtackSolidIcon` 外觀不變，但改成線條繪製，`strokeWidth` prop 可以像其他 icon 一樣調整粗細。

元件變更：

- `data-table`：顯示欄位 popover 的拖曳把手改成 20px 的 `GripDotsVerticalIcon`，不再用六個畫出來的點。
- `sidebar-cloud-04`：Support 項目改用 `CircleInfoIcon`，外部連結標示改用 `ArrowUpRightFromSquareIcon`。

**暫用圖。** 下列 icon 在設計確認正式版之前仍是暫用圖，之後只會換 SVG：

- 設計稿用的是 Font Awesome Pro，先沿用 Vittal 原本的圖：`MagnifyingGlassIcon`、`PlusIcon`、`SpinnerIcon`、`ShieldCheckIcon`、`SquareArrowOutUpRightIcon`。
- Font Awesome Free 的形狀，還沒重繪：`FlagIcon`、`UserIcon`。
- 設計稿裡還沒有：`PanelLeftIcon`。
- 設計已畫好但尚未確認：`XmarkIcon`、`EyeIcon`。

### Tree Select

- **[Tree Select](/zh-tw/docs/blocks/tree-select)：** 新增可搜尋的階層路徑選擇器區塊，用 `Command` 與 `Popover` 組成。傳入一份平面清單，選到葉節點時會回傳它的值與從最上層開始的路徑。它取代原本 Command 頁上的階層選擇器範例。

```bash
npx shadcn@latest add @vital-design/tree-select
```

### 彈出內容的 portal 容器與定位 props

#### 元件

- **Tooltip、Select、Combobox、Autocomplete、Dropdown Menu：** `TooltipContent`、`SelectContent`、`ComboboxContent`、`AutocompleteContent`、`DropdownMenuContent` 與 `DropdownMenuSubContent` 現在和 `PopoverContent` 接受同一組 portal 與定位 props：

  - `portalContainer` 把彈出層放進別的節點（例如 CSS scope 根節點），而不是 `document.body`。
  - `anchor` 讓彈出層對齊觸發器以外的元素。
  - `collisionBoundary`、`collisionPadding`、`collisionAvoidance`、`positionMethod`、`sticky`、`arrowPadding`、`disableAnchorTracking` 轉給 positioner。
  - `keepMounted` 轉給 portal。`SelectContent` 沒有這個 prop，因為 Base UI 的 Select portal 不接受。

  全部都是選填，不傳時行為和現在一樣。`DropdownMenuSubContent` 以前會把 `anchor` 傳到 popup 元素上，現在改用來定位子選單。重新安裝 `tooltip`、`select`、`combobox`、`autocomplete` 或 `dropdown-menu` 即可套用。

### Popover 錨點、portal 容器與定位 props

#### 元件

- **Popover：** `PopoverContent` 新增 `anchor`，popover 可以對齊觸發器以外的元素，也可以完全不用觸發器開啟。另外比照 `DropdownMenuContent` 新增 `portalContainer`，可以把彈出層放進 scope 根節點，而不是 `document.body`。如果你在自己的副本補過這兩個 prop，可以拿掉。見[自訂錨點](/zh-tw/docs/components/popover#custom-anchor)與 [Portal 容器](/zh-tw/docs/components/popover#portal-container)。
- `PopoverContent` 也會把 `collisionBoundary`、`collisionPadding`、`collisionAvoidance`、`positionMethod`、`sticky`、`arrowPadding`、`disableAnchorTracking` 轉給 positioner，`keepMounted` 轉給 portal。全部都是選填，不傳時行為和現在一樣。重新安裝 `popover` 即可套用。

### Table of Contents

#### 元件

- **Table of Contents：** 現在可以從 registry 安裝：`npx shadcn@latest add @vital-design/table-of-contents`。它是一排代表各段落的短線，滑鼠移上去或用鍵盤聚焦時會展開完整的標題清單。見 [Table of Contents](/zh-tw/docs/components/table-of-contents)。

### 暗色顏色 token

重新安裝 theme，取得暗色值：

```bash
npx shadcn@latest add @vital-design/vital-theme
```

亮色值留在 `:root`。祖先元素有 `class="dark"` 時，同一組 custom properties 會換成暗色值；`prefers-color-scheme` 不會切換它們。請看[顏色 → 暗色模式](/zh-tw/docs/design-tokens/colors#dark-mode)。

Primitive 色階，以及引用這些色階的語意 token，都有暗色值。`background`、`card`、`popover` 是 `#232327`，`input` 是 `#444447`。`.dark` 的祖先元素會套用這個紙面色和暗色文字色。`border` 和 `border-overlap` 引用色階，會跟著切換：暗色下分別是白色 0.08 和 `#444447`。

**色階 class 也會切換。** 在 `.dark` 底下，`bg-grayscale-50`、`text-primary-500` 這類色階 class 會變成該色階的暗色值。這是 theme 合約的一部分，所以你自己程式碼裡的色階 class 也會跟著模式改變。Tailwind 固定色和任意值不會：`bg-white` 仍是白色，只留給開關圓點這類標記；`text-white` 也仍是白色。

元件原本用 `bg-white` 畫紙面，暗色下仍是白的。現在改用 `bg-background`，有些元件也一併修正了在暗色紙面上看不清楚的文字。請重新安裝 theme 和你用到的項目：

```bash
npx shadcn@latest add @vital-design/vital-theme
npx shadcn@latest add @vital-design/alert @vital-design/autocomplete @vital-design/button @vital-design/calendar
npx shadcn@latest add @vital-design/card @vital-design/checkbox @vital-design/combobox @vital-design/command
npx shadcn@latest add @vital-design/dialog @vital-design/dropdown-menu @vital-design/field @vital-design/input
npx shadcn@latest add @vital-design/input-group @vital-design/item @vital-design/number-input @vital-design/pagination
npx shadcn@latest add @vital-design/popover @vital-design/radio-group @vital-design/resizable @vital-design/select
npx shadcn@latest add @vital-design/sheet @vital-design/split-button @vital-design/table @vital-design/tag
npx shadcn@latest add @vital-design/textarea @vital-design/time-picker @vital-design/toast @vital-design/toolbar
npx shadcn@latest add @vital-design/tooltip
npx shadcn@latest add @vital-design/data-table @vital-design/sidebar-cloud-01 @vital-design/sidebar-cloud-02 @vital-design/sidebar-cloud-03
npx shadcn@latest add @vital-design/sidebar-cloud-04 @vital-design/sidebar-cloud-05 @vital-design/sidebar-cloud-06
```

Theme 也新增了 `dark:` variant，在 `.dark` 祖先元素底下生效。

已知限制，還在等設計確認：

- `warning-foreground` 跟著灰階文字色切換，暗色下會變白，警告色底上的文字對比不足。其他白色的 foreground（例如 `primary-foreground`）維持白色。
- Avatar 和 Tag 色盤、陰影、漸層沒有暗色值。
- 實心按鈕的文字維持白色。
- sidebar-cloud 區塊的霧面背景維持淺色，暗色下選單文字不易閱讀。
- 資訊色的 Tooltip 和 Toast 維持目前的暗色底色。

### SplitButton 選單

#### 元件

- **SplitButton：** `splitRender` 讓箭頭成為選單的觸發器。在 `DropdownMenu` 裡寫 `<SplitButton splitRender={<DropdownMenuTrigger />}>`，選單的開關與定位都不必自己處理 state 或錨點。`open` 改為選填，`splitLabel` 可設定箭頭的無障礙名稱。既有的 `open` + `splitOnClick` 寫法照常可用。見 [SplitButton](/zh-tw/docs/components/split-button)。重新安裝 `split-button` 才會套用。

### Tag 語意

#### 元件

- **Tag：** 不再渲染 `role="option"` 與 `aria-selected`。可點擊且設定 `selected` 的 Tag，現在會在按鈕上設定 `aria-pressed`。如果測試用 `getByRole('option')` 找 Tag，請改用文字或 `data-slot="tag"` 查詢。重新安裝 `tag` 才會套用。
- **Data Table：** 標籤編輯器的選項改用 `Tag` 顯示，跟儲存格裡的標籤一樣，不再是純文字。重新安裝 `data-table` 才會套用。

### Pagination

- **[Pagination](/zh-tw/docs/components/pagination)：** 新增可組合的頁碼連結、首末頁與前後頁按鈕、停用狀態，以及可開啟隱藏頁碼選單的省略號。導覽用 anchor；原地換頁用 `render` 組合原生按鈕。安裝 `@vital-design/pagination` 時會一併安裝它用到的 angle 圖示。
- **[Table Pagination](/zh-tw/docs/blocks/table-pagination)：** 單列的表格頁尾，含頁碼、跳頁、每頁筆數與目前範圍。列太窄時會隱藏跳頁和每頁筆數。

```bash
npx shadcn@latest add @vital-design/pagination @vital-design/table-pagination
```

### Breadcrumb

#### 元件

- **Breadcrumb：** 現在可以從 registry 以 `breadcrumb` 安裝。見 [Breadcrumb](/zh-tw/docs/components/breadcrumb)。

### Icon 改用設計的命名與 20×20 frame

**破壞性變更：** icon 名稱改成跟設計的 icon 清單一致，舊的 registry item 已移除。

| 舊 item                                    | 新 item                                |
| ----------------------------------------- | ------------------------------------- |
| `@vital-design/icon-chevron-left`         | `@vital-design/icon-angle-left`       |
| `@vital-design/icon-chevron-right`        | `@vital-design/icon-angle-right`      |
| `@vital-design/icon-chevron-double-left`  | `@vital-design/icon-angles-left`      |
| `@vital-design/icon-chevron-double-right` | `@vital-design/icon-angles-right`     |
| `@vital-design/icon-chevron-down`         | `@vital-design/icon-angle-down`       |
| `@vital-design/icon-chevron-up`           | `@vital-design/icon-angle-up`         |
| `@vital-design/icon-close`                | `@vital-design/icon-xmark`            |
| `@vital-design/icon-disabled`             | `@vital-design/icon-ban`              |
| `@vital-design/icon-calendar`             | `@vital-design/icon-calendar-days`    |
| `@vital-design/icon-search`               | `@vital-design/icon-magnifying-glass` |

把 import 改成新的元件名稱：`AngleLeftIcon`、`AngleRightIcon`、`AnglesLeftIcon`、`AnglesRightIcon`、`AngleDownIcon`、`AngleUpIcon`、`XmarkIcon`、`BanIcon`、`CalendarDaysIcon`、`MagnifyingGlassIcon`。重新安裝用到的元件；原本依賴舊 item 的元件，現在都改依賴新 item。

caret 加上 `Solid` 後綴，因為沒有後綴的名稱代表 Regular：`CaretDownIcon`、`CaretUpIcon` 改成 `CaretDownSolidIcon`、`CaretUpSolidIcon`（`@vital-design/icon-caret-down-solid`、`@vital-design/icon-caret-up-solid`）。舊名稱與舊 registry item 仍可使用但已棄用，`CaretDownIcon` 只是轉出 `CaretDownSolidIcon`。請改用新名稱。

新的 icon item：`icon-angle-down-solid`、`icon-angle-up-solid`、`icon-angle-left-solid`、`icon-angle-right-solid`、`icon-angle-left-to-line`、`icon-angle-right-to-line`、`icon-check-solid`、`icon-minus-solid`、`icon-bars`、`icon-circle-user`、`icon-home`、`icon-inbox`、`icon-life-ring`、`icon-planet-ringed`、`icon-sidebar`、`icon-thumbtack`、`icon-thumbtack-solid`、`icon-bell-slash`、`icon-caret-left-solid`、`icon-caret-right-solid`、`icon-note`、`icon-placeholder`、`icon-placeholder-solid`。`PlaceholderIcon` 是設計稿的 `*icons`，表示這個位置可以放任何 icon。見 [Icons → Regular 與 Solid](/zh-tw/docs/components/icons#regular-and-solid)。

所有 icon 現在都是四周留白的 20×20 frame，`size-*` 設定的是 frame 大小，不是圖形大小。元件裡的 icon 改照 Figma frame：`Button` 裡的 icon（`data-icon`）是 18px（`md`、`icon-md`）與 20px（`lg`、`icon-lg`），沒有 margin；`Sidebar` 選單 icon 是 20px。有自訂 icon 尺寸的話，請照新的 frame 檢查。

依設計清單調整的元件：

- `checkbox` 改用 `CheckSolidIcon` 與 `MinusSolidIcon`。
- `number-input` 的加減鈕改用 `CaretUpSolidIcon` 與 `CaretDownSolidIcon`。
- `split-button` 在白底主題用 regular angle，在色底主題用 solid angle。
- angle、angles 與 angle-to-line 改用設計重畫的圖，圖形在 20px frame 裡從 8.3px 高變成 10px，`calendar` 與 `split-button` 看得出來。
- `EllipsisIcon` 拿掉內建的 0.55 填色透明度，跟其他 icon 一樣吃文字顏色。`breadcrumb` 收合的 ellipsis 現在是 `grayscale-500`，跟其他非目前的項目一樣。如果你加了 `[fill-opacity:1]` 蓋回來，可以拿掉。
- `data-table` 的群組列改用 20px 的 `CaretDownSolidIcon`（收合時旋轉），popover 選項的勾改用 `CheckSolidIcon`，跟 `checkbox` 一致。浮動工具列的關閉 icon 是 20px，新增列的加號是 18px。

**暫用圖。** 下列 icon 的名稱與尺寸不會再變，但圖形是暫用版，等設計畫好正式版後只會換 SVG：

- 設計稿用的是 Font Awesome Pro，先沿用 Vittal 原本的圖：`MagnifyingGlassIcon`、`PlusIcon`、`SpinnerIcon`、`ShieldCheckIcon`、`SquareArrowOutUpRightIcon`。
- Font Awesome Free 的形狀，還沒重繪：`ClockIcon`、`FlagIcon`、`UserIcon`、`EllipsisIcon`。
- 設計稿裡還沒有：`InfoIcon`、`ClearIcon`、`PanelLeftIcon`。
- 設計已畫好但尚未確認：`XmarkIcon`、`AngleLeftIcon`、`AngleRightIcon`（含 Solid）、`AnglesLeftIcon`、`AnglesRightIcon`、`CircleUserIcon`、`ThumbtackSolidIcon`。

### 邊框 token

`--border` 改為 0.08 的細線（`grayscale-opacity-200`），也就是 Figma 分隔線用的顏色。原本是實色 `#DEDEE2`。新增的 `--border-overlap` 保留實色 `#DEDEE2`，給會相疊或交叉的邊線使用；半透明的線疊在一起會變深。用法是 `border-border-overlap`。

Theme 也設定了預設邊框色，沒有指定顏色的 `border`、`border-t`、`border-b` 會畫出 `--border` 細線。以前 Tailwind v4 會用文字顏色畫。

Avatar、`AvatarGroupCount` 與 Data Table 區塊的群組軌道改用 `--border-overlap`，外觀和以前一樣。Dialog 頁尾的分隔線，以及你拿來當分隔線的 `border-border`，會變淡。包住 `Field` 的 `FieldLabel`（選項卡片版型）用沒有顏色的 `border` 畫外框，也會從文字顏色變成細線。請重新安裝 theme 與這些項目：

```bash
npx shadcn@latest add @vital-design/vital-theme
npx shadcn@latest add @vital-design/avatar
```

### Data Table 區塊

**破壞性變更。** 三個資料表格區塊改由一個通用區塊 `@vital-design/data-table` 取代。你傳入自己的 `data` 與 `columns`；它可以依任何欄位分群，最多兩層，每個群組都有新增列。另外有搜尋、排序、可調整寬度與順序的欄位、含浮動工具列的列選取，以及行內與 popover 儲存格編輯。勾選欄與操作欄固定在兩側，其他欄位捲到下方時會出現陰影。附上的覆核任務範例示範怎麼接起來。區塊用到新的 `@vital-design/icon-gear`。

以下 id 已停用並從 registry 移除：`@vital-design/data-table-group-01`（candidate tree）、`@vital-design/data-table-group-02`（ESG emission tree）與 `@vital-design/data-table-group-04`（editable cells）。已經安裝的副本仍可使用，因為 block 是你自己的程式碼。要換過來，請安裝新區塊並把你的欄位與資料搬進去；用欄位分群取代固定的樹狀列。尚未搬過來的功能：群組標題的筆數、多於一個的左側釘選欄，以及 `columnResizeMode="onEnd"`。

```bash
npx shadcn@latest add @vital-design/data-table
```

見 [Data Table](/zh-tw/docs/blocks/data-table)。

### 行動裝置上的 Dialog 與 Sheet 高度

#### 元件

- **Dialog：** popup 的最大高度改為跟隨所在的 viewport（`max-h-full`），不再用 `calc(100vh-2rem)`。在行動瀏覽器上，網址列顯示時 `100vh` 比可視區域高，較高的 dialog 會被工具列蓋住，底部間距也會消失。現在會保留 viewport 的 1rem padding，內容在內部捲動。若你曾自行加上 `max-h-[calc(100dvh-…)]` 來繞過這個問題，可以拿掉。重新安裝 `dialog` 才會拿到這次變更。
- **Sheet：** `top` 與 `bottom` sheet 的上限改為 `80dvh`（原本是 `80vh`），與 `left`、`right` sheet 已在使用的 `h-dvh` 一致。重新安裝 `sheet` 才會拿到這次變更。

## 2026 年 10 月

### React 19

Registry 與文件站在 React 19 上開發與測試。新專案請使用 React 19。見 [安裝](/zh-tw/docs/getting-started/installation)。

### Link button

#### 元件

- **Button：** 新增 `LinkButton`，外觀與按鈕相同的連結。它共用 Button 的變體、主題與尺寸，渲染 `<a>`（或透過 `render` 使用路由連結），並保留連結語意。不要用 `<Button nativeButton={false} render={<a />}>`，那個寫法會把連結報成按鈕。見 [Button → Link](/zh-tw/docs/components/button#link)。

### Table 斑馬紋與欄寬調整

#### Table

[Table](/zh-tw/docs/components/table) 可以替表身列上斑馬紋。`striped` 畫偶數列。`striped="odd"` 畫另一組列。在 table 上設定 `--table-stripe` 與 `--table-row-hover` 可改顏色。

重新安裝 table 才會拿到這次變更：

```bash
npx shadcn@latest add @vital-design/table
```

**破壞性變更：** hover、展開與選取列的背景不再使用 `bg-grayscale-opacity-100`。它們改讀 `--table-row-hover`。沒有開啟 `striped` 時，這個變數仍退回 `--grayscale-opacity-100`，所以預設外觀不變。

- `hover:bg-grayscale-opacity-100` → `hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`
- `data-[state=selected]:bg-grayscale-opacity-100` → `data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`

`TableHead` 現在是 `position: relative`。絕對定位的子元素會對齊標題儲存格。如果你的元素原本對齊儲存格外面的祖先，請改對齊這個儲存格。

#### Icons

Caret up 與 caret down 是新的 registry icon。見 [Icons](/zh-tw/docs/components/icons)。

```bash
npx shadcn@latest add @vital-design/icon-caret-up
npx shadcn@latest add @vital-design/icon-caret-down
```

#### 資料表格

[Data Table group 01](/zh-tw/docs/blocks/data-table-group-01) 與 [group 02](/zh-tw/docs/blocks/data-table-group-02) 可以調整欄寬。拖曳標題邊緣。`columnResizeMode` 預設是 `onChange`。欄位很多、又有釘選欄的寬表，用 `onEnd`，放開才更新欄寬。

兩個 block 都要重新安裝。Group 02 的排序圖示從 chevron up 換成這一對 caret，並移除 `@vital-design/icon-chevron-up`。`@vital-design/icon-chevron-down` 仍用於列的軌道。排序標籤會截斷，欄變窄時 caret 仍然看得到。

```bash
npx shadcn@latest add @vital-design/data-table-group-01
npx shadcn@latest add @vital-design/data-table-group-02
```

## 2026 年 9 月

### Registry 上線 vittal.design

文件站與相容 shadcn 的 registry 現在一起發佈在 [vittal.design](https://vittal.design)。這一則是當時可用內容的快照。之後的紀錄只列有變更的部分。

#### 安裝

加入 registry，再用 shadcn CLI 安裝項目。見 [安裝](/zh-tw/docs/getting-started/installation)。

```bash
npx shadcn@latest add @vital-design/button
```

Registry URL：`https://vittal.design/r/{name}.json`

#### 元件

**基礎：** [Alert](/zh-tw/docs/components/alert)、[Avatar](/zh-tw/docs/components/avatar)、[Badge](/zh-tw/docs/components/badge)、[Button](/zh-tw/docs/components/button)、[Button Group](/zh-tw/docs/components/button-group)、[Chip](/zh-tw/docs/components/chip)、[Icons](/zh-tw/docs/components/icons)、[Item](/zh-tw/docs/components/item)、[Label](/zh-tw/docs/components/label)、[Separator](/zh-tw/docs/components/separator)、[Skeleton](/zh-tw/docs/components/skeleton)、[Spinner](/zh-tw/docs/components/spinner)、[Split Button](/zh-tw/docs/components/split-button)、[Tag](/zh-tw/docs/components/tag)

**輸入：** [Checkbox](/zh-tw/docs/components/checkbox)、[Editable](/zh-tw/docs/components/editable)、[Field](/zh-tw/docs/components/field)、[Input](/zh-tw/docs/components/input)、[Number Input](/zh-tw/docs/components/number-input)、[Radio Group](/zh-tw/docs/components/radio-group)、[Search Bar](/zh-tw/docs/components/search-bar)、[Slider](/zh-tw/docs/components/slider)、[Switch](/zh-tw/docs/components/switch)、[Textarea](/zh-tw/docs/components/textarea)

**選擇器與選單：** [Autocomplete](/zh-tw/docs/components/autocomplete)、[Calendar](/zh-tw/docs/components/calendar)、[Combobox](/zh-tw/docs/components/combobox)、[Command](/zh-tw/docs/components/command)、[Dropdown Menu](/zh-tw/docs/components/dropdown-menu)、[Popover](/zh-tw/docs/components/popover)、[Select](/zh-tw/docs/components/select)、[Time Picker](/zh-tw/docs/components/time-picker)

**覆蓋層與回饋：** [Dialog](/zh-tw/docs/components/dialog)、[Sheet](/zh-tw/docs/components/sheet)、[Toast](/zh-tw/docs/components/toast)、[Tooltip](/zh-tw/docs/components/tooltip)

**版面與資料：** [Card](/zh-tw/docs/components/card)、[Collapsible](/zh-tw/docs/components/collapsible)、[Progress](/zh-tw/docs/components/progress)、[Resizable](/zh-tw/docs/components/resizable)、[Scroll Area](/zh-tw/docs/components/scroll-area)、[Sidebar](/zh-tw/docs/components/sidebar)、[Table](/zh-tw/docs/components/table)、[Tabs](/zh-tw/docs/components/tabs)、[Toolbar](/zh-tw/docs/components/toolbar)

#### 區塊

- Cloud Sidebar：[flat](/zh-tw/docs/blocks/sidebar/cloud/flat)、[inline submenus](/zh-tw/docs/blocks/sidebar/cloud/inline-submenus)、[collapsible submenus](/zh-tw/docs/blocks/sidebar/cloud/collapsible-submenus)、[dropdown submenus](/zh-tw/docs/blocks/sidebar/cloud/dropdown-submenus)、[secondary nav](/zh-tw/docs/blocks/sidebar/cloud/secondary-nav)、[header actions](/zh-tw/docs/blocks/sidebar/cloud/header-actions)
- Data Table：[group 01](/zh-tw/docs/blocks/data-table-group-01)、[group 02](/zh-tw/docs/blocks/data-table-group-02)、[group 04](/zh-tw/docs/blocks/data-table-group-04)

#### 設計變數

[色彩](/zh-tw/docs/design-tokens/colors)、[字體](/zh-tw/docs/design-tokens/typography)、[圓角](/zh-tw/docs/design-tokens/radius) 與 [效果](/zh-tw/docs/design-tokens/effects) 隨 registry 主題以 CSS 變數提供。

#### 平台

- 元件使用 **Base UI** primitive 與 **Tailwind CSS 4**
- 樣式隔離遵循 [Tailwind CSS 設定](/zh-tw/docs/getting-started/tailwind-setup) 裡的 `data-slot` 約定
- Agent 索引：[llms.txt](/llms.txt)
