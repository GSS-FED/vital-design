---
name: new-component
description: >
  Use when the developer asks to create a new atomic UI component.
  Triggered by requests like "建一個 Badge 元件", "新增 Alert 元件",
  "create a new component called Tooltip", "我需要一個 Progress 元件",
  "/new-component Badge". Do NOT use for composite blocks containing
  multiple components — use create-block instead.
allowed-tools: Read, Write, Edit, Bash
---

# 建立新元件

建立一個符合專案規範的新 React 元件，包含完整的類型定義、測試和 Storybook stories。

## 執行步驟

1. **確認元件名稱與功能**

   - 元件名稱：PascalCase（例：`Badge`）
   - 目錄名稱：kebab-case（例：`badge`）

2. **閱讀相似元件** 理解現有結構模式

   - 簡單元件：`Read src-v2/components/chip/Chip.tsx`
   - 有 CVA variants：`Read src-v2/components/tag/Tag.tsx`
   - 有 types.ts：`Read src-v2/components/button/types.ts`

3. **建立元件目錄** `src-v2/components/<component-name>/`

4. **建立 ComponentName.tsx** — 元件實作

   - Props 類型直接 inline 定義（`export type ComponentNameProps = {...}`）
   - 僅在類型需跨多個檔案共用時，才另建 `types.ts`

5. **建立 ComponentName.test.tsx** — 測試

6. **建立 ComponentName.stories.tsx** — Storybook stories

7. **驗證**
   ```bash
   pnpm run lint
   pnpm run test
   ```

## 結構規則

- 使用 `forwardRef` 包裝（如適用）
- 使用 CVA 管理 variants（參考 component-template.tsx）
- 使用 `cn()` 合併類名
- 所有 import 使用完整路徑（禁止 barrel import）
- 顏色使用設計系統 token（`text-grayscale-900`, `bg-primary-500` 等）
- 不要加 `theme` prop；主題透過 CSS variables 統一處理
- 類型使用 `import type` 語法

## 參考範本

- `component-template.tsx` — 元件結構起點
- `test-template.tsx` — 測試結構起點
- `stories-template.tsx` — Storybook stories 起點
