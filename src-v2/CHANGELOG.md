# Changelog — `src-v2`

`src-v2/` 的元件、blocks、hooks、icons 與 registry 分發面的變更紀錄。

格式參考 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)。

- **版本標題用日期**：`src-v2` 透過 registry 持續分發，沒有獨立 npm 版號。根目錄的 `CHANGELOG.md` 由 semantic-release 產生，對應的是 legacy `src/` 的 npm 發布，兩者互不相關。
- **紀錄起點為 2026-07-27**，更早的變更請查 git history。
- 分類：`Added`／`Changed`／`Fixed`／`Removed`／`Breaking`。
- 有 registry 影響（新增 item、調整 `registryDependencies`）時請一併註明，因為那會影響既有專案 `shadcn add` 的結果。

---

## [2026-07-27]

### Added

- **`Table` 斑馬紋**：新增 `striped?: boolean | 'odd' | 'even'` prop（`true` 等同 `'even'`），並在 `<table>` 上輸出 `data-striped`。底色可用 CSS variables 覆寫：
  - `--table-stripe`（預設 `var(--grayscale-opacity-100)`）— 斑馬紋底色
  - `--table-row-hover`（striped 時預設 `var(--grayscale-opacity-200)`，否則 `var(--grayscale-opacity-100)`）— hover／`aria-expanded`／`data-state="selected"` 底色
- 新增 icons `CaretUpIcon`／`CaretDownIcon`（source：`_source/custom/caret-up.svg`、`caret-down.svg`），以及對應 registry items `icon-caret-up`、`icon-caret-down`。
- `Table` 新增 `Striped` story 與 docs 章節（含自訂顏色範例）。
- **`DataTable` 欄寬調整**：新增 `resizable?: boolean`。開啟後改用 `table-fixed` + `<colgroup>`，欄寬由 `<table>` 上的 CSS variables 驅動、拖曳中 body 凍結不重繪，尾端另補一欄 filler 吃掉剩餘寬度（否則欄位被拉窄後 row 會停在容器中間）。個別欄位以 `enableResizing: false` 排除、`minSize`／`maxSize` 設限；拖曳模式沿用 table instance 的 `columnResizeMode`。未開啟時行為與樣式不變。
- 新增 `DataTableResizeHandle`：`role="separator"` 拖曳把手，支援滑鼠／觸控拖曳、double click 或 `Home` 還原、`ArrowLeft`／`ArrowRight` 微調 8px（`Shift` 40px）。hover 只換游標不畫線，只有拖曳時出現貫穿整個 body 的 guide line。輸出 `data-slot="data-table-resize-handle"`、`data-column-id`、`data-resizing`。
- 新增 `column-sizing.ts`：欄寬與 pinned offset 的 CSS variables 產生器，輸出 `--col-<id>-size`／`-start`／`-end`、`--header-<id>-size`、`--table-total-size`（column id 會 slugify 以符合 custom property 命名）。
- 新增 grouping 範例 `DataTableGroupingResizableBlock`（story `V3 — One Card per group, shared column widths`）：每個群組各自一個 table instance，但 `columnSizing` 提升到父層共用，拖任一張卡片其他群組同步變動；action bar 另附「重設欄寬」。
- `DataTable` 新增 `Resizable (onChange)`／`Resizable (onEnd)` stories。

### Changed

- **`DataTableColumnHeader` 排序 icon**：改用 `CaretUpIcon`／`CaretDownIcon`，且三種狀態（未排序／asc／desc）維持相同的上下雙箭頭字形，只切換顏色——未選 `text-grayscale-opacity-400`、選中方向 `text-grayscale-opacity-800`。同步套用於 `blocks/data-table/DataTableColumnHeader.tsx` 與 `blocks/data-table/data-table-group-02/data-table-column-header.tsx`。
- **`TableRow` 底色改為 CSS variable 驅動**：`bg-[var(--table-row-bg,transparent)]`，hover／selected 則讀 `--table-row-hover`。這是為了讓斑馬紋不會蓋掉 hover 與 selected——斑馬紋規則只設定變數不設 `background-color`，因此 (0,1,0) 的 base 永遠輸給 (0,2,0) 的 hover／selected。
- `data-table-group-02` 的 `registryDependencies` 加入 `@vital-design/icon-caret-down`、`@vital-design/icon-caret-up`。
- **`TableHead` 加上 `relative`**：作為貼齊儲存格邊緣的 overlay（欄寬拖曳把手）定位基準。若既有程式碼依賴 `th` 內 `absolute` 元素相對於更外層祖先定位，需要改寫。
- **`DataTableColumnHeader` 支援截斷**：標題改用 `truncate`（排序箭頭永遠保留可見），欄寬被拉窄時不再撐開欄位。
- **`data-table-group-01`／`data-table-group-02` 支援欄寬調整**（兩者都有 pinned 欄位）：各自新增 `resize-handle.tsx`（block 需自給自足，已加入 registry `files`）；`pinning.ts` 的 `left`／`width` 與 `<colgroup>`／`<table>` 寬度改讀 CSS variables，pinned offset 才會跟著拖曳更新；群組區塊改為 memo 並在拖曳期間凍結（frame time：group-01 26 → 14ms、group-02 51 → 25ms，idle ≈ 14ms）。
  - **固定欄位除了 `enableResizing: false` 還要鎖 `minSize`／`maxSize`**：`getSize()` 會夾在 min/max 之間，否則 `defaultColumn.minSize` 會把 40px 的 checkbox 欄撐大。
  - 凍結期間 header 也不重繪，把手的 `aria-valuenow` 要放開才更新。
- **`columnResizeMode` 開放為 block prop**：`DataTableGroup01`／`DataTableGroup02`／`DataTableGroupingResizableBlock` 接受 `columnResizeMode?: ColumnResizeMode`（預設 `'onChange'`），Storybook 有 control 可切換。寬表、pinned 欄多的情境建議 `'onEnd'`（不動欄寬就沒有 relayout；group-02 實測 24.7 → 11.6ms）。

### Removed

- `data-table-group-02` 的 `registryDependencies` 移除 `@vital-design/icon-chevron-up`（改用 caret 後已無使用；`icon-chevron-down` 仍保留給 `table-rail.tsx` 與 block root）。

### Breaking

- 直接以 class name 選取 `TableRow` 舊 hover／selected 樣式的程式碼需更新：

  - `hover:bg-grayscale-opacity-100` → `hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`
  - `data-[state=selected]:bg-grayscale-opacity-100` → `data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`

  視覺結果不變（未開啟 `striped` 時 fallback 即為原本的 `--grayscale-opacity-100`），僅 class 字串改變。
