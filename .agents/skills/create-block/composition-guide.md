# Composition Guide：意圖 → 元件組合映射

> 目前 stable 版本不一定有已發布的 block 檔案可直接參考。以下內容是未來建立 block 的組合指南，應視為可直接使用的規則，而不是需要恢復的舊範例。

## 元件功能矩陣

| 元件               | 導入路徑                                                    | UI 角色             | 常見用途                  |
| ------------------ | ----------------------------------------------------------- | ------------------- | ------------------------- |
| Button             | `@/components/button/Button`                                | 主/次操作、圖示按鈕 | 任何 CTA                  |
| ButtonGroup        | `@/components/button/button-group/ButtonGroup`              | 按鈕群組容器        | 工具列、分段操作          |
| SplitButton        | `@/components/button/split-button/SplitButton`              | 主操作 + 下拉選單   | 頁面標題、工具列          |
| Avatar             | `@/components/avatar/Avatar`                                | 用戶身份展示        | 導覽列、資料卡            |
| SearchBar          | `@/components/search-bar/SearchBar`                         | 文字搜尋輸入        | 導覽列、篩選區、工具列    |
| Select             | `@/components/select/Select`                                | 單選 / 多選下拉     | 篩選區、表單              |
| Combobox           | `@/components/combobox/Combobox`                            | 可搜尋輸入選擇      | 大量選項搜尋              |
| Cascader           | `@/components/cascader/Cascader`                            | 階層路徑選擇        | 分類篩選、組織架構選擇    |
| Chip               | `@/components/chip/Chip`                                    | 篩選標籤、切換選項  | 已選篩選條件展示          |
| Tag                | `@/components/tag/Tag`                                      | 狀態標籤、角色標籤  | 資料卡、清單項目          |
| Switch             | `@/components/switch/Switch`                                | 布林設定切換        | 設定面板                  |
| InputGroup         | `@/components/input/input-group/InputGroup`                 | compound 輸入框基礎 | 自訂 prefix/suffix/action |
| TextInput          | `@/components/input/textInput/TextInput`                    | 文字輸入            | 表單、設定                |
| TextareaInput      | `@/components/input/textareaInput/TextareaInput`            | 多行文字輸入        | 評論、描述表單            |
| PasswordInput      | `@/components/input/passwordInput/PasswordInput`            | 密碼輸入            | 登入表單                  |
| Checkbox           | `@/components/checkbox/Checkbox`                            | 多選項目            | 表單、設定                |
| RadioGroup         | `@/components/radio-group/RadioGroup`                       | 單選選項組          | 設定面板、篩選表單        |
| ActionList         | `@/components/list/action-list/ActionList`                  | 可操作列表          | 選單、列表頁主體          |
| ActionInfiniteList | `@/components/list/action-infinite-list/ActionInfiniteList` | 無限捲動列表        | 大量資料列表頁            |
| Mask               | `@/components/mask/Mask`                                    | 遮罩 / 載入佔位     | 載入中狀態、骨架屏        |

## 意圖 → 組合映射

### 導覽列 / Navbar / 頂部導覽 / navigation bar

- **Layout**: `flex items-center justify-between h-14 px-6 border-b border-grayscale-200 bg-white`
- 左側: logo slot + Button variant="text"（導航連結）
- 右側: Avatar（用戶身份）+ Button（登出/設定）
- 可選: SearchBar（如搜尋在導覽列中）

### 篩選區 / FilterBar / 搜尋篩選 / filter

- **Layout**: `flex flex-wrap gap-2 items-center`
- 必要: SearchBar + Select / Combobox（一個或多個篩選維度）
- 可選: Chip（已選條件展示）

### 頁面標題區 / PageHeader / 頁面頭部 / page header

- **Layout**: `flex items-start justify-between mb-6`
- 左側: h1 文字 + 可選 description + breadcrumbs
- 右側: Button（主操作）

### 表格工具列 / DataTableToolbar / 列表操作區 / table toolbar

- **Layout**: `flex flex-wrap items-center justify-between gap-2 mb-4`
- 左側: SearchBar + Select / Combobox（篩選器）
- 右側: Button（操作按鈕）

### 設定卡片 / SettingsCard / 設定列 / settings

- **Layout**: `flex items-center justify-between p-4 border border-grayscale-200 rounded-lg`
- 左側: label（text-grayscale-900 font-medium）+ description（text-xs text-grayscale-600）
- 右側: Switch（切換）或 Button variant="text"（操作）

### 空白狀態 / EmptyState / 空狀態佔位 / empty state

- **Layout**: `flex flex-col items-center justify-center gap-4 py-16`
- 中央: icon + title + description + Button（CTA）

### 登入表單 / LoginForm

- **Layout**: `flex w-80 flex-col gap-4`
- TextInput（帳號）+ PasswordInput（密碼）+ Checkbox（記住我）+ Button（登入）

### 用戶資料卡 / UserProfileCard / profile card

- **Layout**: `flex items-center gap-4 rounded-lg p-4 border border-grayscale-200`
- Avatar + 姓名/角色文字 + Tag（角色標籤）+ Button variant="text"（編輯）

## Registry 依賴前綴規則

使用元件時，在 `registryDependencies` 中加入：

| 元件               | registryDependencies 值              |
| ------------------ | ------------------------------------ |
| Button             | `@vital-design/button`               |
| ButtonGroup        | `@vital-design/button-group`         |
| SplitButton        | `@vital-design/split-button`         |
| Avatar             | `@vital-design/avatar`               |
| SearchBar          | `@vital-design/search-bar`           |
| Select             | `@vital-design/select`               |
| Combobox           | `@vital-design/combobox`             |
| Cascader           | `@vital-design/cascader`             |
| Chip               | `@vital-design/chip`                 |
| Tag                | `@vital-design/tag`                  |
| Switch             | `@vital-design/switch`               |
| InputGroup         | `@vital-design/input-group`          |
| TextInput          | `@vital-design/text-input`           |
| TextareaInput      | `@vital-design/textarea-input`       |
| PasswordInput      | `@vital-design/password-input`       |
| Checkbox           | `@vital-design/checkbox`             |
| RadioGroup         | `@vital-design/radio-group`          |
| ActionList         | `@vital-design/action-list`          |
| ActionInfiniteList | `@vital-design/action-infinite-list` |
| Mask               | `@vital-design/mask`                 |
| cn()               | `@vital-design/utils`                |

所有 block 都需要 `dependencies: ["clsx", "tailwind-merge"]`。
