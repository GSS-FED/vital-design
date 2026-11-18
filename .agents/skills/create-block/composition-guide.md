# Composition Guide：意圖 → 元件組合映射

> 既有正式 block 可參考 `src-v2/blocks/sidebar-cloud-01`..`06` 與 `src-v2/blocks/data-table/data-table-group-01`、`02`、`04`。

## 元件功能矩陣

| 元件          | 導入路徑（`src-v2/`）                             | `registryDependencies`         | UI 角色                          | 常見用途                            |
| ------------- | ------------------------------------------------- | ------------------------------ | -------------------------------- | ----------------------------------- |
| Alert         | `@/components/alert/Alert`                        | `@vital-design/alert`          | 狀態與提示訊息容器               | 錯誤提示、警告、內嵌通知            |
| Autocomplete  | `@/components/autocomplete/Autocomplete`          | `@vital-design/autocomplete`   | 自由文字輸入 + 過濾建議          | 搜尋建議、自動補全                  |
| Avatar        | `@/components/avatar/Avatar`                      | `@vital-design/avatar`         | 用戶身份展示                     | 導覽列、資料卡、表格列              |
| Badge         | `@/components/badge/Badge`                        | `@vital-design/badge`          | 數量或紅點圓標                   | 通知計數（狀態標籤請用 `Tag`）      |
| Button        | `@/components/button/Button`                      | `@vital-design/button`         | 主/次操作、圖示按鈕、`LinkButton`| 任何 CTA；導覽連結用 `LinkButton`   |
| ButtonGroup   | `@/components/button/button-group/ButtonGroup`    | `@vital-design/button-group`   | 按鈕群組容器                     | 工具列、分段操作、分頁              |
| Calendar      | `@/components/calendar/Calendar`                  | `@vital-design/calendar`       | 日期選擇月曆                     | 單日、區間、多日選擇                |
| Card          | `@/components/card/Card`                          | `@vital-design/card`           | 卡片容器（Header/Content/Footer）| 頁面區塊、設定面板、摘要卡          |
| Checkbox      | `@/components/checkbox/Checkbox`                  | `@vital-design/checkbox`       | 多選核取方塊（含 `indeterminate`）| 表單、表格勾選、設定                |
| Chip          | `@/components/chip/Chip`                          | `@vital-design/chip`           | 篩選膠囊、可移除/切換標籤        | 已選篩選條件展示                    |
| Collapsible   | `@/components/collapsible/Collapsible`            | `@vital-design/collapsible`    | 展開/收合區塊                    | 摺疊面板、側邊欄巢狀選單            |
| Combobox      | `@/components/combobox/Combobox`                  | `@vital-design/combobox`       | 可搜尋下拉選擇器（單選/多選）    | 大量選項搜尋、標籤多選              |
| Command       | `@/components/command/Command`                    | `@vital-design/command`        | 命令面板 / 可搜尋清單            | 命令面板、搭配 `Popover` 做階層選擇 |
| Dialog        | `@/components/dialog/Dialog`                      | `@vital-design/dialog`         | 彈出式對話框                     | 確認視窗、互動表單                  |
| DropdownMenu  | `@/components/dropdown-menu/DropdownMenu`         | `@vital-design/dropdown-menu`  | 動作選單（點擊後關閉）           | 語言切換、帳號選單、列操作          |
| Editable      | `@/components/editable/Editable`                  | `@vital-design/editable`       | 行內點擊編輯文字                 | 標題即改、可編輯表格儲存格          |
| Field         | `@/components/field/Field`                        | `@vital-design/field`          | 表單欄位佈局（Label/Desc/Error） | 表單列、水平/垂直欄位排版           |
| Input         | `@/components/input/input/Input`                  | `@vital-design/input`          | 單行文字輸入                     | 表單、設定                          |
| InputGroup    | `@/components/input/input-group/InputGroup`       | `@vital-design/input-group`    | compound 輸入框容器              | 自訂前後綴與內嵌按鈕                |
| Item          | `@/components/item/Item`                          | `@vital-design/item`           | 內容列（`size="list"` 列表密度） | 資料卡、設定列、詳情列表            |
| Label         | `@/components/label/Label`                        | `@vital-design/label`          | 無障礙表單標籤                   | 表單控制項標籤                      |
| NumberInput   | `@/components/input/number-input/NumberInput`     | `@vital-design/number-input`   | 數值輸入（含加減按鈕與拖曳調整） | 數量、權重、上下限數值              |
| PasswordInput | `@/components/input/password-input/PasswordInput` | `@vital-design/password-input` | 密碼輸入（含顯示切換）           | 登入與驗證表單                      |
| Popover       | `@/components/popover/Popover`                    | `@vital-design/popover`        | 錨定浮動面板                     | 日期/時間挑選、階層選擇器、行內編輯 |
| Progress      | `@/components/progress/Progress`                  | `@vital-design/progress`       | 進度條與多段式狀態條             | 上傳進度、配額、分段分佈            |
| RadioGroup    | `@/components/radio-group/RadioGroup`             | `@vital-design/radio-group`    | 單選按鈕群組                     | 設定面板、互斥選項                  |
| Resizable     | `@/components/resizable/Resizable`                | `@vital-design/resizable`      | 可拖曳調整寬高的分割面板         | 左右分割畫面、檢視器                |
| ScrollArea    | `@/components/scroll-area/ScrollArea`             | `@vital-design/scroll-area`    | 自訂捲軸容器（支援 `fadeEdges`） | 長清單、側邊欄、彈窗內容            |
| SearchBar     | `@/components/search-bar/SearchBar`               | `@vital-design/search-bar`     | 搜尋輸入框（`onChange`/`onSearch`）| 導覽列、篩選區、工具列            |
| Select        | `@/components/select/Select`                      | `@vital-design/select`         | 平面單選/多選下拉（傳 `items`）  | 篩選區、表單                        |
| Separator     | `@/components/separator/Separator`                | `@vital-design/separator`      | 水平或垂直分隔線                 | 列表、工具列、區塊分隔              |
| Sheet         | `@/components/sheet/Sheet`                        | `@vital-design/sheet`          | 側邊滑出抽屜（支援 `modal={false}`）| 進階篩選、詳情側欄、行動端選單   |
| Sidebar       | `@/components/sidebar/Sidebar`                    | `@vital-design/sidebar`        | 應用程式側邊導覽框架             | 系統主導覽列、收合側欄              |
| Skeleton      | `@/components/skeleton/Skeleton`                  | `@vital-design/skeleton`       | 載入骨架屏                       | 卡片、表格、頭像載入佔位            |
| Slider        | `@/components/slider/Slider`                      | `@vital-design/slider`         | 數值或區間滑桿                   | 比例調整、區間篩選                  |
| Spinner       | `@/components/spinner/Spinner`                    | `@vital-design/spinner`        | 旋轉載入指示器（`role="status"`）| 按鈕 loading（加 `data-icon`）、區塊載入 |
| SplitButton   | `@/components/button/split-button/SplitButton`    | `@vital-design/split-button`   | 主操作 + 切換箭頭，無內建選單      | 主操作搭配呼叫端管理的 popup     |
| Switch        | `@/components/switch/Switch`                      | `@vital-design/switch`         | 布林設定開關                     | 設定面板、表格行內開關              |
| Table         | `@/components/table/Table`                        | `@vital-design/table`          | 語意化表格基礎元件（支援 `striped`）| 資料表、靜態對照表               |
| TableOfContents | `@/components/table-of-contents/TableOfContents` | `@vital-design/table-of-contents` | 段落短線，hover 或聚焦時展開成標題清單 | 長內容旁的頁內導覽 |
| Tabs          | `@/components/tabs/Tabs`                          | `@vital-design/tabs`           | 分頁切換（`underline` / `pill`） | 詳情頁籤、視圖切換                  |
| Tag           | `@/components/tag/Tag`                            | `@vital-design/tag`            | 狀態與分類標籤（solid/tint）     | 資料卡、表格狀態、角色標籤          |
| Textarea      | `@/components/textarea/Textarea`                  | `@vital-design/textarea`       | 多行文字輸入                     | 評論、描述表單                      |
| TimePicker    | `@/components/time-picker/TimePicker`             | `@vital-design/time-picker`    | 三欄捲動時間選擇器（時/分/秒）   | 時間挑選（常搭配 `Popover`）        |
| Toast         | `@/components/toast/Toast`                        | `@vital-design/toast`          | 通知提示（`Toaster` + `toast.*`）| 儲存、刪除、非同步操作回饋          |
| Toolbar       | `@/components/toolbar/Toolbar`                    | `@vital-design/toolbar`        | 工具列容器（Group/Spacer/Separator）| 表格上方操作列、編輯器工具列     |
| Tooltip       | `@/components/tooltip/Tooltip`                    | `@vital-design/tooltip`        | 懸停提示框                       | 圖示按鈕說明、截斷文字提示          |

## 意圖 → 組合映射

### 導覽列 / Navbar / 頂部導覽 / navigation bar

- **Layout**: `flex items-center justify-between h-14 px-6 border-b border-grayscale-opacity-200 bg-white`
- 左側: logo slot + `LinkButton`（自 `@/components/button/Button` 匯入，`variant="text"` 搭配 `render={<a href="…" />}`，勿對 `Button` 傳 `nativeButton={false}`）
- 右側: `Avatar`（用戶身份）+ `Button` 或 `DropdownMenu`（帳號/設定）
- 可選: `SearchBar`（如搜尋在導覽列中）

### 篩選區 / FilterBar / 搜尋篩選 / filter

- **Layout**: `flex flex-wrap gap-2 items-center`
- 必要: `SearchBar` + `Select` / `Combobox`（一個或多個篩選維度）
- 可選: `Chip`（已選條件展示）

### 頁面標題區 / PageHeader / 頁面頭部 / page header

- **Layout**: `flex items-start justify-between mb-6`
- 左側: `h1` 文字 + 可選 description + breadcrumbs
- 右側: `Button` 或 `SplitButton`（主操作）

### 表格工具列 / DataTableToolbar / 列表操作區 / table toolbar

- **Layout**: 使用 `Toolbar`（`variant="outline"` 或預設）搭配 `ToolbarGroup`、`ToolbarSpacer`、`ToolbarSeparator`
- 左側: `ToolbarGroup` 內放 `SearchBar` + `Select` / `Combobox`（篩選器）
- 右側: `ToolbarSpacer` + `ToolbarGroup` 內放 `Button` 或 `ButtonGroup`（操作按鈕）

### 設定卡片 / SettingsCard / 設定列 / settings

- **Layout**: `Card` 或 `flex items-center justify-between p-4 border border-grayscale-opacity-200 rounded-lg`
- 左側: `Field`（`orientation="horizontal"`）含 `FieldLabel` + `FieldDescription`，或標題與說明文字
- 右側: `Switch`（切換）或 `Button` `variant="text"`（操作）

### 空白狀態 / EmptyState / 空狀態佔位 / empty state

- **Layout**: `flex flex-col items-center justify-center gap-4 py-16`
- 中央: icon + title + description + `Button`（CTA）

### 登入表單 / LoginForm

- **Layout**: `flex w-80 flex-col gap-4`（搭配 `FieldGroup` / `Field` + `FieldLabel` + `FieldError`）
- `Input`（帳號）+ `PasswordInput`（密碼）+ `Checkbox`（記住我）+ `Button`（登入）

### 用戶資料卡 / UserProfileCard / profile card

- **Layout**: `flex items-center gap-4 rounded-lg p-4 border border-grayscale-opacity-200`
- `Avatar` + 姓名/角色文字 + `Tag`（角色或狀態標籤）+ `Button` `variant="text"`（編輯）

## 共用 Registry 依賴規則

- 使用 `cn()`（`@/lib/utils`）時：`dependencies` 加入 `"cn"`，`registryDependencies` 加入 `"@vital-design/utils"`
- 使用主題 token 時：`registryDependencies` 加入 `"@vital-design/vital-theme"`
- 使用 `@/icons/<Name>Icon` 時：`registryDependencies` 加入精確的 `"@vital-design/icon-<kebab-name>"`（禁止使用 barrel import 或整包 `@vital-design/vital-icons`）
