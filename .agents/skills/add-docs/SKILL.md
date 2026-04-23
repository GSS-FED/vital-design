---
name: add-docs
description: >
  Use when the developer asks to write or add documentation for a component or block.
  Triggered by requests like "幫 Button 補文件", "add docs for X", "write docs page for X",
  "建立 Switch 的 docs 頁面", "幫 X 元件補上 Fumadocs", "/add-docs <name>".
  Do NOT use for creating the component itself — use new-component or create-block instead.
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
   （若為 block：`src-v2/blocks/<block-name>/<BlockName>.tsx`）

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

   - 路徑：`apps/docs/content/docs/components/<component-name>.mdx`（blocks 用 `blocks/`）
   - 參考：`mdx-template.mdx`（本目錄）與 `apps/docs/content/docs/components/chip.mdx`

6. **確認 meta.json**（如需調整排序）
   - `apps/docs/content/docs/components/meta.json`
   - `apps/docs/content/docs/blocks/meta.json`

## 關鍵規則

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
