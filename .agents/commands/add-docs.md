# 新增文件頁面

為現有元件或 block 建立完整的 Fumadocs 文件頁面，包含 preview 元件、MDX 內容與 docs 路由註冊。

## 使用方式

```
/add-docs <component-name>
```

## 執行步驟

1. **讀取目標元件資訊**

   - UI 元件：`src-v2/components/<component-name>/<ComponentName>.tsx`
   - Block：`src-v2/blocks/<block-name>/components/<BlockName>.tsx`
   - Props 類型通常由元件 `.tsx` 檔 export

2. **讀取現有 docs 結構**

   - `apps/docs/components/preview/ComponentPreview.tsx`
   - 參考 Select：`src-v2/components/select/examples/`、`apps/docs/content/docs/components/select.mdx`、`src-v2/components/select/Select.vrt.test.tsx`

3. **寫範例檔**

   - `src-v2/components/<name>/examples/<Name><Variant>Example.tsx`，一個檔案一個 `export function`，加上 `'use client'`，import 用 repo 路徑
   - 靜態狀態集中在一個 `<Name>StatesExample`（文件的「States」章節）；打開或互動後的狀態寫在 `<Name>.vrt.test.tsx` 截圖
   - MDX 直接 import 範例並包 `<ComponentPreview name="<export 名稱>">`；Code tab 由 `previews:sources` 讀整個檔並改成 registry 安裝路徑，不要另寫 code fence
   - 範例也是視覺回歸截圖，跟被取代的 story 同名就沿用 baseline；轉換時刪掉該 story 與 `apps/docs/components/previews/<Name>Preview.tsx`（及 `page.tsx` 註冊）
   - 純靜態、一兩行的展示可直接從 `~/components/vital-components` 匯入，不另建範例

4. **建立或更新 MDX 文件**

   - 元件頁：`apps/docs/content/docs/components/<component-name>.mdx`
   - Block 頁：`apps/docs/content/docs/blocks/<family>/<page>.mdx`（Sidebar、Data Table 都是家族資料夾；slug 與 registry 名稱不同時，補 `page.tsx` 的 `REGISTRY_ITEM_BY_SLUG`）
   - 參考 `apps/docs/content/docs/components/chip.mdx` 或同類型頁面

5. **更新排序與導覽**

   - `apps/docs/content/docs/components/meta.json`
   - `apps/docs/content/docs/blocks/meta.json`

6. **Changelog**（使用者可見的變更才寫）

   - changelog 是給元件庫使用者看的：只改文件頁、範例、截圖或開發工具（例如把 story 轉成範例）不寫
   - 新元件、breaking 用法、token、安裝方式：用 `pnpm changelog:new <slug>` 在 `apps/docs/content/changelog/` 建立 en 與 zh-TW 一對檔並寫好兩種語言（不要改產生出來的 `content/docs/changelog*.mdx`）
   - 不要寫內部 refactor / CI；不要用 npm 版號

7. **驗證文件站**
   ```bash
   pnpm run lint:design
   pnpm docs:lint
   pnpm docs:build
   ```

## 關鍵規則

- 範例檔必須加 `'use client'`
- 不要新增 `apps/docs/components/previews/*Preview.tsx`（舊寫法，逐步轉成範例）
- en 與 zh-TW 的 MDX import 同一個範例檔
- 互動範例要能展示真實狀態變化，不只是一個靜態 render
