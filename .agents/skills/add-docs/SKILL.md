---
name: add-docs
description: "Creates or updates a Fumadocs documentation page, docs example files (also used as visual-regression screenshots), navigation metadata, and changelog entry for a Vital Design component or block. Use when asked to write or add documentation for a component or block, or to add or change an example on an existing docs page (e.g. '幫 Button 補文件', 'add docs for X', 'write docs page for X', '建立 Switch 的 docs 頁面', '幫 X 加一個範例', '/add-docs <name>'). Do not use for creating the component itself — use new-component or create-block instead."
allowed-tools: Read, Write, Edit, Bash
---

# 新增 Fumadocs 文件頁面

為現有元件或 block 建立完整的 Fumadocs 文件頁面，包含範例檔（同時是視覺回歸截圖）、MDX 文件內容與導覽。

## 執行步驟

1. **讀取目標元件資訊**

   ```
   Read src-v2/components/<component-name>/<ComponentName>.tsx
   ```

   Props 類型通常 inline 定義於 `.tsx` 檔頂部，並從該元件檔 export。
   （若為 block：`src-v2/blocks/<block-name>/components/<entry-name>.tsx`，例如 `data-table.tsx`）

2. **讀取 ComponentPreview** — 了解 `name`、`align` 等 props

   ```
   Read apps/docs/components/preview/ComponentPreview.tsx
   ```

3. **讀取相似的現有範例** — 作為範本參考

   ```
   Read src-v2/components/select/examples/   # 互動 state、States 矩陣
   Read apps/docs/content/docs/components/select.mdx  # MDX 怎麼 import 範例
   Read src-v2/components/select/Select.vrt.test.tsx  # 打開後的狀態截圖
   ```

4. **寫範例檔**（`src-v2/components/<name>/examples/*.tsx`；icon 在 `src-v2/icons/examples/`）

   - 一個檔案一個 `export function <Name><Variant>Example`，`'use client'` 置頂，import 用 repo 路徑（`@/components/<name>/<Name>`、`@/icons/<Icon>`）
   - 文件每個章節一個範例：主範例 `<Name>Example`，變體如 `<Name>MultipleExample`
   - 靜態狀態（disabled、invalid、loading、長文字）集中在一個 `<Name>StatesExample`，放在頁面的「States」章節
   - 範例同時是視覺回歸截圖：ID 是 `v2-components-<name>--<variant>`（`<Name>Example` → `default`），跟被取代的 story 同名就會沿用它的 baseline。不要用亂數、`Date.now()` 或遠端圖片
   - 打開或互動後才看得到的狀態（選單展開、hover 後）不寫成範例，寫在 `<Name>.vrt.test.tsx`：render 範例 → 操作 → `expect(await renderedRegion()).toMatchScreenshot('<name>-<state>')`。文件不需要的邊界狀況（超長清單、窄寬度）也在同一個檔裡 inline render
   - 轉換既有元件時：刪掉被範例取代的 story（manifest 遇到重複 ID 會報錯）與 `apps/docs/components/previews/<Name>Preview.tsx`，並移除 `page.tsx` 的對應註冊
   - 純靜態、只有一兩行的展示仍可直接在 MDX 用 `~/components/vital-components` 包 `<ComponentPreview>`（沒有 Code tab）

5. **建立 MDX 文件頁面**

   - 路徑：`apps/docs/content/docs/components/<component-name>.mdx`
   - Block 頁放在家族資料夾，例如 `blocks/sidebar/cloud/<page>.mdx`；只有一個 block 時直接用 `blocks/<name>.mdx`（如 `blocks/data-table.mdx`）。頁面標題用短名（父層 meta.json 已帶家族名）。slug 不是 registry item 名稱時，在 `apps/docs/app/docs/[[...slug]]/page.tsx` 的 `REGISTRY_ITEM_BY_SLUG` 補上對應。
   - 參考：`mdx-template.mdx`（本目錄）與 `apps/docs/content/docs/components/chip.mdx`
   - **主範例**：`Preview` 與 `Usage` 放預設的最佳實踐組合，讓人整段複製就能用（見下方「主範例」規則）

6. **確認 meta.json**（如需調整排序）
   - `apps/docs/content/docs/components/meta.json`
   - `apps/docs/content/docs/blocks/meta.json`
   - 若該資料夾已有 `meta.zh-tw.json`，`pages` 陣列要與英文檔保持相同順序
   - 新元件也要放進元件總覽：在 `apps/docs/content/docs/components/index.mdx` 與 `index.zh-tw.mdx` 的分組加上 slug，並在 `apps/docs/components/showcase/ComponentGallery.tsx` 的 `previews` 加一張縮圖（沒有縮圖會 build 失敗）

7. **繁體中文（可選，英文寫完再加）**
   - 英文 MDX 是準稿。要翻譯時，在同一路徑加 `名稱.zh-tw.mdx`（資料夾首頁是 `index.zh-tw.mdx`）
   - 中文檔的站內連結用 `/zh-tw/docs/...`
   - prop、程式碼、CLI、元件名、registry 名稱維持英文
   - 這個資料夾已經有中文檔時，改了英文裡使用者看得到的文句，就在同一份變更更新對應的 `.zh-tw.mdx`。還沒有中文檔就不用補
   - 不要只新增中文檔而沒有英文檔

8. **Changelog**（使用者可見的變更才寫）
   - 新元件、breaking 用法、token、安裝方式：`pnpm changelog:new <slug>` 會在 `apps/docs/content/changelog/` 建立 `.mdx` 與 `.zh-tw.mdx` 一對檔，改 frontmatter 的 `title`、把註解換成內容，兩種語言都要寫。月份標題（`##`）與這則的標題（`###`）由 build 產生，內文的小標用 `####`（例如 `#### Components`）
   - changelog 是給元件庫使用者看的：只改文件頁、範例、截圖或開發工具（例如把 story 轉成範例）不寫
   - 不要改 `apps/docs/content/docs/changelog*.mdx`，那是 `pnpm changelog:build` 產生的檔案
   - 同一個 MR 後續要修改這則，就改同一對檔，不要再新增
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

- **`'use client'` 必填**：MDX 頁面是 RSC，不能傳 inline function（如 `onChange={() => {}}`），範例檔一定要加 `'use client'`
- **範例要有互動性**：用 `useState` 展示元件的狀態變化，不要只渲染靜態版本
- **Code tab**：`previews:sources` 讀整個範例檔，去掉 `'use client'`，把 component/icon imports 轉成 registry 安裝路徑。範例要能整段複製，不要手寫重複的 code fence
- **Import 順序**：`'use client'` 置頂，其餘 `@/`、`react` 同一組按字母排序；`pnpm run format` 自動套用
- **en 與 zh-TW 共用範例**：兩份 MDX import 同一個範例檔，範例裡的文字用英文

## 結構範例

```mdx
import { SelectExample } from '@/components/select/examples/SelectExample';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

<ComponentPreview name="SelectExample">
  <SelectExample />
</ComponentPreview>
```

`name` 是範例的 export 名稱，Code tab 依它找原始碼。

`apps/docs/components/previews/*Preview.tsx` 是還沒轉成範例的舊寫法，不要新增。

## 參考範本

- `mdx-template.mdx` — MDX 文件起點
- `apps/docs/content/docs/components/select.mdx` — 範例、States 與互動截圖都齊全的頁面
