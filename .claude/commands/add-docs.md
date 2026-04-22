# 新增文件頁面

為現有元件或 block 建立完整的 Fumadocs 文件頁面，包含 preview 元件、MDX 內容與 docs 路由註冊。

## 使用方式

```
/add-docs <component-name>
```

## 執行步驟

1. **讀取目標元件資訊**
   - UI 元件：`src-v2/components/<component-name>/<ComponentName>.tsx`
   - Block：`src-v2/blocks/<block-name>/<BlockName>.tsx`
   - 若有獨立 `types.ts`，也一併讀取

2. **讀取現有 docs 結構**
   - `apps/docs/app/docs/[[...slug]]/page.tsx`
   - `apps/docs/components/preview/ComponentPreview.tsx`
   - 參考一個相似 preview，例如 `apps/docs/components/previews/ChipPreview.tsx`

3. **選擇 preview 方式**
   - 有互動 state：建立 `apps/docs/components/previews/<ComponentName>Preview.tsx`
   - 純靜態展示：直接從 `~/components/vital-components` 匯入元件，不另建 preview

4. **若建立 preview 元件**
   - 加上 `'use client'`
   - 在 `page.tsx` 同步新增 import 與 `components` 物件註冊
   - 若有多種主要狀態，可提供多個 named export preview

5. **建立或更新 MDX 文件**
   - 元件頁：`apps/docs/content/docs/components/<component-name>.mdx`
   - Block 頁：`apps/docs/content/docs/blocks/<block-name>.mdx`
   - 參考 `apps/docs/content/docs/components/chip.mdx` 或同類型頁面

6. **更新排序與導覽**
   - `apps/docs/content/docs/components/meta.json`
   - `apps/docs/content/docs/blocks/meta.json`

7. **驗證文件站**
   ```bash
   pnpm docs:build
   ```

## 關鍵規則

- Preview 元件必須加 `'use client'`
- 只要使用自訂 preview，就要同步更新 `page.tsx` 的 import 與 `components` 註冊
- 純靜態示例優先使用 `~/components/vital-components`
- MDX 中的 docs 內部 import 優先使用 `~/`
- 互動 preview 要能展示真實狀態變化，不只是一個靜態 render
