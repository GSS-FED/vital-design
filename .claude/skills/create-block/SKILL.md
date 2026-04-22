---
name: create-block
description: >
  Use when the developer asks to create a composite UI component, block, or
  page section using multiple Vital Design components. Triggered by requests
  like "我想要一個導覽列", "幫我做一個篩選區", "我需要一個設定卡片",
  "build a navbar", "create a filter bar", "make a page header",
  "我需要空白狀態", "建立工具列", "我想要頁面標題區", "create a block".
allowed-tools: Read, Write, Edit, Bash
---

# 建立 Block（複合元件區塊）

給定自然語言描述的 UI block 或頁面區塊，自動生成符合 Vital Design 規範的複合元件。

> 目前 stable 版本可能沒有任何正式 block 原始碼可參考。未來新增 block 時，直接依本 skill、`composition-guide.md` 與 `block-template.tsx` 建立，不需先恢復舊範例。

## 執行步驟

1. **讀取 composition-guide.md** 確認該 UI 意圖對應哪些元件
   ```
   Read .claude/skills/create-block/composition-guide.md
   ```

2. **讀取相關元件的原始碼** 理解 props 型別
   - 例：`Read src-v2/components/button/types.ts`
   - 例：`Read src-v2/components/avatar/Avatar.tsx`

3. **檢查 blocks 目錄現況**
   - 先查看 `src-v2/blocks/` 是否已有正式 block 可作為風格參考
   - 若目前沒有既有 block，直接依 `block-template.tsx` 與 `composition-guide.md` 建立新 block

4. **依 block-template.tsx 結構** 寫入新的 block 檔案
   - 位置：`src-v2/blocks/<block-name>/<BlockName>.tsx`
   - Named export + Props type
   - 接受 `className?: string` 並透過 `cn()` 套用

5. **確認依賴清單** 列出所有使用的 VD 元件（用於 registry）

6. **輸出結果**：
   - block 檔案已建立
   - 建議的 registry/blocks.ts 條目（供確認後執行 /add-registry 使用）
   - 提示執行 `/add-registry <block-name>` 以加入 registry

## 命名規則

- 目錄：`src-v2/blocks/<block-name>/`（kebab-case）
- 元件：`<BlockName>.tsx`（PascalCase）
- Export：`export function <BlockName>`（named export）

## Import 規則

```typescript
// 完整路徑，禁止 barrel import
import Button from '@/components/button/Button';
import Avatar from '@/components/avatar/Avatar';
import { cn } from '@/utils/cn';
```

## Props 規則

- 每個 block 必須接受 `className?: string`
- 使用 `cn()` 合併基礎 className 與傳入的 className
- 回呼函數使用可選型別（`onAction?: () => void`）
- 使用 named export（非 default export）
