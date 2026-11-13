---
name: add-docs
description: "Creates or updates a Fumadocs documentation page, interactive preview component, navigation metadata, and changelog entry for a Vital Design component or block. Use when asked to write or add documentation for a component or block, or to add or change an example on an existing docs page (e.g. '幫 Button 補文件', 'add docs for X', 'write docs page for X', '建立 Switch 的 docs 頁面', '幫 X 加一個範例', '/add-docs <name>'). Do not use for creating the component itself — use new-component or create-block instead."
allowed-tools: Read, Write, Edit, Bash
---

# 新增 Fumadocs 文件頁面

為現有元件或 block 建立完整的 Fumadocs 文件頁面，包含互動 preview 元件、MDX 文件內容與 page.tsx 註冊。

## 執行步驟

1. **讀取目標元件資訊**

   ```
   Read src-v2/components/<component-name>/<ComponentName>.tsx
   ```

   Props 類型通常 inline 定義於 `.tsx` 檔頂部，並從該元件檔 export。
   （若為 block：`src-v2/blocks/<block-name>/components/<entry-name>.tsx`，例如 `data-table.tsx`）

2. **讀取現有 page.tsx** — 確認 import 格式與 components 物件結構

   ```
   Read apps/docs/app/docs/[[...slug]]/page.tsx
   ```

3. **讀取相似的現有 preview** — 作為範本參考

   ```
   Read apps/docs/components/previews/ChipPreview.tsx       # 有多 export 的範例
   Read apps/docs/components/previews/SearchBarPreview.tsx  # 有搜尋/輸入互動的範例
   ```

4. **選擇 Preview 方式**（二選一）

   **方式 A — Preview 元件**（有互動 state 時使用）

   - 建立 `apps/docs/components/previews/<ComponentName>Preview.tsx`（參考 `preview-template.tsx`）
   - 在 `page.tsx` 新增 import + components 物件（兩處都要改，缺一不可）
   - 若元件有多個明顯狀態，建立多個 named export

   **方式 B — 直接 import**（純靜態展示，無需 state 時使用）

   - 從 `~/components/vital-components` 直接 import 元件（已有 `'use client'`）
   - 在 MDX 中包進 `<ComponentPreview>` wrapper 即可
   - 不需建立新 Preview 元件，也不需修改 `page.tsx`
   - 範例：`apps/docs/content/docs/components/input.mdx`

5. **建立 MDX 文件頁面**

   - 路徑：`apps/docs/content/docs/components/<component-name>.mdx`
   - Block 頁放在家族資料夾，例如 `blocks/sidebar/cloud/<page>.mdx`；只有一個 block 時直接用 `blocks/<name>.mdx`（如 `blocks/data-table.mdx`）。頁面標題用短名（父層 meta.json 已帶家族名）。slug 不是 registry item 名稱時，在 `apps/docs/app/docs/[[...slug]]/page.tsx` 的 `REGISTRY_ITEM_BY_SLUG` 補上對應。
   - 參考：`mdx-template.mdx`（本目錄）與 `apps/docs/content/docs/components/chip.mdx`
   - **主範例**：`Preview` 與 `Usage` 放預設的最佳實踐組合，讓人整段複製就能用（見下方「主範例」規則）

6. **確認 meta.json**（如需調整排序）
   - `apps/docs/content/docs/components/meta.json`
   - `apps/docs/content/docs/blocks/meta.json`
   - 若該資料夾已有 `meta.zh-tw.json`，`pages` 陣列要與英文檔保持相同順序

7. **繁體中文（可選，英文寫完再加）**
   - 英文 MDX 是準稿。要翻譯時，在同一路徑加 `名稱.zh-tw.mdx`（資料夾首頁是 `index.zh-tw.mdx`）
   - 中文檔的站內連結用 `/zh-tw/docs/...`
   - prop、程式碼、CLI、元件名、registry 名稱維持英文
   - 這個資料夾已經有中文檔時，改了英文裡使用者看得到的文句，就在同一份變更更新對應的 `.zh-tw.mdx`。還沒有中文檔就不用補
   - 不要只新增中文檔而沒有英文檔

8. **Changelog**（使用者可見的變更才寫）
   - 新元件、breaking 用法、token、安裝方式：在 `apps/docs/content/docs/changelog.mdx` 最上方補一則（當月 `## Month YYYY` 標題下），並同步更新 `changelog.zh-tw.mdx`
   - 不要寫內部 refactor / CI；不要用 npm 版號或 semantic-release 輸出

9. **驗證**
   ```bash
   pnpm run lint:design
   pnpm docs:lint
   pnpm docs:build
   ```

## 關鍵規則

- **主範例 = 預設最佳實踐**：`Preview` 與 `Usage` 展示建議的完整組合，包含常搭配的其他元件與完整 import，複製貼上就能用。例：Breadcrumb 的主範例直接包含省略符號 + `DropdownMenu`，而不是只有連結。`Preview` 與 `Usage` 結構相同（preview 的連結用 `#` href）
- **加範例時一併檢查主範例**：在既有頁面新增或修改 section 範例時，判斷這個模式是不是預設建議用法；是的話，同時更新 `Preview` 與 `Usage`。原本的 section 保留，負責說明細節與單獨片段
- **主範例用到其他 registry 元件**：在 `Usage` 下方說明也要從 registry 加入（例：`dropdown-menu`）
- **範例沿用元件樣式**：範例不要把元件的 class 複製到原生元素上（例：不要在 `<button>` 上重寫連結樣式）；用元件的 `render` prop 換元素，只補必要的 class

- **`'use client'` 必填**：Preview 元件所在的 MDX 頁面是 RSC，不能傳 inline function（如 `onChange={() => {}}`），Preview 元件一定要加 `'use client'`
- **page.tsx 兩處都要改**：import 區 + components 物件。只改一個會導致 MDX build error（`ComponentNamePreview is not defined`）
- **Preview 要有互動性**：用 `useState` 展示元件的狀態變化，不要只渲染靜態版本
- **Import 順序**：`'use client'` 置頂，其餘 `@/`、`react`、`~/` 同一組按字母排序（`@` → `r` → `~`）；`pnpm run format` 自動套用
- **MDX import 用 `~/`**：`import { XPreview } from '~/components/previews/XPreview'`

## 結構範例

### page.tsx import 區

```tsx
import {
  ComponentNamePreview,
  ComponentNameVariantPreview,
} from '~/components/previews/ComponentNamePreview';
```

### page.tsx components 物件

```tsx
ComponentNamePreview,
ComponentNameVariantPreview,
```

## 參考範本

- `preview-template.tsx` — Preview 元件起點
- `mdx-template.mdx` — MDX 文件起點
- `apps/docs/content/docs/components/chip.mdx` — 最精簡完整的現有範例
