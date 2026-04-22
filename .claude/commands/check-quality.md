# 程式碼品質檢查

執行完整的程式碼品質檢查流程，確保程式碼與文件符合專案規範。

## 使用方式

```
/check-quality
```

## 執行步驟

1. **TypeScript 類型檢查**
   ```bash
   pnpm exec tsc --noEmit
   ```
   確保無類型錯誤

2. **ESLint 檢查**
   ```bash
   pnpm run lint
   pnpm docs:lint
   ```
   專案設定 max-warnings 為 0，任何警告都會失敗

3. **執行測試**
   ```bash
   pnpm run test
   ```

4. **Registry 驗證**
   ```bash
   pnpm run registry:validate
   ```
   確保 registry item 的依賴前綴、檔案路徑與類型正確

5. **建置測試**
   ```bash
   pnpm run build
   pnpm docs:build
   ```

6. **文件一致性檢查**
   確認下列文件與現行專案結構一致：
   - `CLAUDE.md`
   - `.claude/RULES.md`
   - `.claude/commands/`（所有 `.md` 檔案）
   - `.claude/skills/`（各 skill 的 `SKILL.md`）

   重點確認項目：
   - `CLAUDE.md` 的 commands 區塊是否覆蓋 root `package.json` 中的主要 scripts（含 `docs:*`、`registry:*`、`tokens:*`）
   - `pnpm docs:lint` 是否能獨立檢查 `apps/docs`，且 Fumadocs app 套用了 Next.js ESLint 規則
   - `pnpm docs:build` 是否能成功建置文件站，確認路由、MDX 與 docs shell 整合仍正常
   - `CLAUDE.md` 的 AI Commands / AI Skills 是否與 `.claude/commands/`、`.claude/skills/` 一致
   - slash command surface 是否固定為 `/new-component`、`/add-registry`、`/add-docs`、`/create-block`、`/check-quality`
   - 文件站與 registry 說明是否反映目前 `src-v2/`、`apps/docs/`、`registry/*.ts` 結構

## 輸出報告

執行完成後，報告以下結果：

- ✅ / ❌ TypeScript 類型檢查
- ✅ / ❌ ESLint 檢查
- ✅ / ❌ 測試結果（通過/失敗數量）
- ✅ / ❌ Registry 驗證
- ✅ / ❌ 建置結果
- ✅ / ❌ 文件一致性

## 快速修復

如發現問題，可嘗試自動修復：

```bash
# 自動修復 lint 問題
pnpm run lint -- --fix

# 自動格式化
pnpm run format
```

## 常見問題

### ESLint 錯誤

- **import 順序錯誤**: 執行 `pnpm run format` 自動修復
- **未使用變數**: 移除或加上 `_` 前綴
- **類型導入**: 使用 `import type` 語法

- **registryDependencies 缺少前綴**: 加上 `@vital-design/` 前綴
