---
name: new-component
description: "Creates a new atomic UI component in src-v2/components/ with TypeScript types, Vitest tests, and docs examples. Use when asked to create a new atomic UI component (e.g. '建一個 Badge 元件', '新增 Alert 元件', 'create a new component called Tooltip', '/new-component Badge'). Do not use for composite blocks combining multiple components — use create-block instead."
allowed-tools: Read, Write, Edit, Bash
---

# 建立新元件

建立一個符合專案規範的新 React 元件，包含完整的類型定義、測試和文件範例。

## 執行步驟

1. **確認元件名稱與功能**

   - 元件名稱：PascalCase（例：`Badge`）
   - 目錄名稱：kebab-case（例：`badge`）

2. **閱讀相似元件** 理解現有結構模式

   - 簡單元件：`Read src-v2/components/chip/Chip.tsx`
   - 有 CVA variants：`Read src-v2/components/tag/Tag.tsx`
   - 有 exported prop types：`Read src-v2/components/button/Button.tsx`

3. **建立元件目錄** `src-v2/components/<component-name>/`

4. **建立 ComponentName.tsx** — 元件實作

   - Props 類型直接 inline 定義（`export type ComponentNameProps = {...}`）
   - 不新增 component-level `types.ts`；跨檔案共用型別時從元件 `.tsx` import type
   - 每個 exported styled DOM part 加 `data-slot`（root：`badge`；subpart：`badge-icon`）。參考 `Button.tsx`、`Select.tsx`；Base UI passthrough 需 wrapper
   - 有 CVA 時：先 `cva()`，再 `export type XVariants = VariantProps<typeof xVariants>`，公開 props 用 `CvaProps<XVariants>`（`@/lib/utils`）。必填軸再 `& { selected: NonNullable<XVariants['selected']> }`；內部軸 `Omit`。不要手寫重複 union，不要直接 intersect 原始 `VariantProps`。參考 `Tag.tsx`、`Chip.tsx`、`Button.tsx`

5. **建立 ComponentName.test.tsx** — 測試

6. **建立文件範例與文件頁** — 照 `add-docs` skill：`examples/ComponentNameExample.tsx`（參考 `example-template.tsx`）、靜態狀態的 `ComponentNameStatesExample.tsx`，打開或互動後才看得到的狀態寫在 `ComponentName.vrt.test.tsx`。範例也是視覺回歸截圖，不另寫 story

7. **驗證**
   ```bash
   pnpm run lint
   pnpm run lint:design
   pnpm run test
   ```

## 結構規則

- 會轉發 DOM `ref` 的元件從 props 接收 `ref`（搭配 `Ref<ComponentRef<...>>` 或 `Ref<HTML...Element>`），不要用 `forwardRef` 或已棄用的 `ElementRef`
- 使用 named export，不要 default export
- 使用 CVA 管理 variants（參考 component-template.tsx）；公開 props 用 `CvaProps`，不要 export `xVariants` helper
- 使用 `cn()` 合併類名（`@/lib/utils`）
- 所有 import 使用完整路徑（禁止 barrel import）
- 顏色使用設計系統 token（`text-grayscale-opacity-900`, `bg-primary-500` 等）
- 不要加 `theme` prop；主題透過 CSS variables 統一處理
- 類型使用 `import type` 語法
- 會 render DOM 的 exported part 需有 `data-slot`；Trigger 禁止 passthrough（見 `.agents/RULES.md` 三層合約）

## 參考範本

- `component-template.tsx` — 元件結構起點
- `test-template.tsx` — 測試結構起點
- `example-template.tsx` — 文件範例起點
