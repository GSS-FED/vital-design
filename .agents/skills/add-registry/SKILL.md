---
name: add-registry
description: "Adds a Vital Design v2 component, block, or hook to registry/*.ts and builds the shadcn registry output (registry.json and public/r/*.json). Use ONLY when explicitly asked to add an item to the registry (e.g. '/add-registry <name>', '把 <name> 加入 registry', 'add <name> to registry'). Do not trigger automatically without explicit user instruction."
allowed-tools: Read, Write, Edit, Bash
---

# 新增元件到 Registry

將 `src-v2/` 現有元件或 block 新增到 shadcn registry，作為新元件的標準分發方式，讓使用者可透過 CLI 安裝。

## 執行步驟

1. **確認目標存在**

   - UI 元件：檢查 `src-v2/components/<name>/` 目錄
   - Block：檢查 `src-v2/blocks/<name>/` 目錄
   - 新元件與新 block 一律以 `src-v2/` 為來源，不從 legacy `src/` 建立 registry 條目

2. **分析依賴**

   - 外部套件 → `dependencies`（例：`cn`, `@base-ui/react`）
   - 內部 VD 元件 → `registryDependencies`（必須加 `@vital-design/` 前綴）
   - 內部 icon → 精確的 `@vital-design/icon-*`（不要用整包 `@vital-design/vital-icons`，除非使用者明確要安裝全 icon set）
   - 使用 `cn()` → `cn` + `@vital-design/utils`
   - `src-v2/` 需要 headless primitive 時，預設使用 `@base-ui/react`；除非元件來源本身仍明確依賴 legacy 實作

3. **新增 `RegistryItemName` union 成員**（`registry/types.ts`）

   - 在 `RegistryItemName` 的 union type 中加入新元件名稱

4. **編輯對應的 TypeScript 檔**（勿直接編輯 `registry.json`，它是自動產生的）

   - UI 元件 → `registry/ui.ts`
   - 新增被元件使用的 icon 時，同步加入 `registry/base.ts` 的 `iconGroups` 與 `RegistryItemName`；文件 Icons gallery 也要同步
   - Block → `registry/blocks.ts`
   - Hook → `registry/hooks.ts`
   - 參考同檔案中現有項目的結構

5. **執行驗證**

   ```bash
   pnpm run test
   ```

6. **構建 Registry**

   ```bash
   pnpm run registry:build
   ```

7. **確認產出** — 檢查 `public/r/<name>.json` 已生成

## 重要規則

- `registryDependencies` 必須使用 `@vital-design/` 前綴（例：`@vital-design/button`）
- UI 元件：registry item `type: "registry:ui"`，files 陣列中每個 file 也用 `type: "registry:ui"`
- Icon registry item 也使用 `registry:ui`，target 為 `src/components/icons/<IconName>.tsx`
- Block：registry item `type: "registry:block"`，files 陣列中每個 file 用 `type: "registry:component"`（block 本身的 type 是 registry:block，但組成的檔案 type 是 registry:component）
- Block 可安裝的檔案放在 `src-v2/blocks/<name>/components/`。`path` 指到那裡，`target` 展平到 `src/blocks/<name>/`。stories 與 tests 留在 block 根目錄，不要列進 `files`
- **勿直接編輯 `registry.json`**，修改 `registry/` TypeScript 檔後執行 `pnpm run registry:build`
- `dependencies` 必須包含 `cn`（如果用了 cn()），其餘要和檔案實際 import 的 npm 套件一致；預設不寫版本範圍，例外見 `.agents/RULES.md` 的「依賴宣告」
- 新元件預設透過 registry 分發；不要假設會同步進入 legacy npm package（`src/`）
