---
name: check-quality
description: >
  Use when the developer asks to check code quality, run tests, validate the
  registry, or ensure everything is working. Triggered by "/check-quality",
  "有問題嗎", "幫我檢查品質", "run the tests", "check if everything is ok",
  "run quality checks", "validate registry", "確認測試通過".
allowed-tools: Read, Write, Edit, Bash
---

# 程式碼品質檢查

執行完整的程式碼品質檢查流程，確保程式碼符合專案規範。

## 執行步驟

1. **TypeScript 類型檢查**
   ```bash
   pnpm exec tsc --noEmit
   ```

2. **ESLint 檢查**（max-warnings: 0，任何警告都失敗）
   ```bash
   pnpm run lint
   pnpm docs:lint
   ```

3. **執行測試**
   ```bash
   pnpm run test
   ```

4. **Registry 驗證**
   ```bash
   pnpm run registry:validate
   ```

5. **建置測試**
   ```bash
   pnpm run build
   pnpm docs:build
   ```

6. **文件一致性檢查**
   檢查下列文件是否與現行專案結構一致，有過期內容則更新：
   - `AGENTS.md`
   - `.agents/RULES.md`
   - `.agents/commands/`（所有 `.md` 檔案）
   - `.agents/skills/`（各 skill 的 `SKILL.md`）

   重點確認項目：
   - 元件庫路徑是否仍為 `src-v2/`
   - Registry 操作是否指向 `registry/*.ts` 而非直接編輯 `registry.json`
   - 依賴名稱是否包含 `@vital-design/` 前綴
   - `AGENTS.md` Commands 是否列出所有 root `package.json` 中的主要 scripts（含 `docs:*`、`registry:*`、`tokens:*`）
   - `pnpm docs:lint` 是否能獨立檢查 `apps/docs`，且 Fumadocs app 套用了 Next.js ESLint 規則
   - `pnpm docs:build` 是否能成功建置文件站，確認路由、MDX 與 docs shell 整合仍正常
   - `AGENTS.md` Project Structure 是否反映 monorepo 結構（含 `apps/docs/`）
   - `AGENTS.md` Tech Stack 是否包含文件站的 Fumadocs / Next.js / rehype-pretty-code
   - `AGENTS.md` AI Commands / AI Skills 是否與 `.agents/commands/`、`.agents/skills/` 一致
   - slash command surface 是否固定為 `/new-component`、`/add-registry`、`/add-docs`、`/create-block`、`/check-quality`

## 輸出報告格式

完成後回報：
- TypeScript 類型檢查：通過 / 失敗（附錯誤）
- ESLint：通過 / 失敗（附警告/錯誤數）
- 測試：通過 N 個 / 失敗 N 個（附失敗測試名稱）
- Registry 驗證：通過 / 失敗（含依賴前綴、路徑、類型）
- 建置：成功 / 失敗（附錯誤）
- 文件一致性：通過 / 發現 N 個過期項目（附檔案與問題描述）

## 快速修復指令

```bash
# 自動修復 lint 問題
pnpm run lint -- --fix

# 自動格式化
pnpm run format
```

## 常見問題

- **import 順序錯誤** → 執行 `pnpm run format`
- **registryDependencies 缺少前綴** → 加上 `@vital-design/` 前綴
- **未使用變數** → 移除或加 `_` 前綴
- **類型導入錯誤** → 使用 `import type` 語法
