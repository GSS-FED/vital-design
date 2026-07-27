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

### Changed

- **`DataTableColumnHeader` 排序 icon**：改用 `CaretUpIcon`／`CaretDownIcon`，且三種狀態（未排序／asc／desc）維持相同的上下雙箭頭字形，只切換顏色——未選 `text-grayscale-opacity-400`、選中方向 `text-grayscale-opacity-800`。同步套用於 `blocks/data-table/DataTableColumnHeader.tsx` 與 `blocks/data-table/data-table-group-02/data-table-column-header.tsx`。
- **`TableRow` 底色改為 CSS variable 驅動**：`bg-[var(--table-row-bg,transparent)]`，hover／selected 則讀 `--table-row-hover`。這是為了讓斑馬紋不會蓋掉 hover 與 selected——斑馬紋規則只設定變數不設 `background-color`，因此 (0,1,0) 的 base 永遠輸給 (0,2,0) 的 hover／selected。
- `data-table-group-02` 的 `registryDependencies` 加入 `@vital-design/icon-caret-down`、`@vital-design/icon-caret-up`。

### Removed

- `data-table-group-02` 的 `registryDependencies` 移除 `@vital-design/icon-chevron-up`（改用 caret 後已無使用；`icon-chevron-down` 仍保留給 `table-rail.tsx` 與 block root）。

### Breaking

- 直接以 class name 選取 `TableRow` 舊 hover／selected 樣式的程式碼需更新：

  - `hover:bg-grayscale-opacity-100` → `hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`
  - `data-[state=selected]:bg-grayscale-opacity-100` → `data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`

  視覺結果不變（未開啟 `striped` 時 fallback 即為原本的 `--grayscale-opacity-100`），僅 class 字串改變。
