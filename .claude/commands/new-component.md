# 建立新元件

建立一個符合專案規範的新 React 元件。

## 使用方式

```
/new-component <ComponentName>
```

## 執行步驟

1. **建立元件目錄**
   ```
   src-v2/components/<component-name>/
   ```

2. **建立 ComponentName.tsx**
   - Props 類型直接 inline 定義（`export type ComponentNameProps = {...}`）
   - 使用 `forwardRef` 包裝（如適用）
   - 使用 `cn()` 合併類名
   - 遵循 import 順序規範
   - Icon 使用完整路徑（例：`@/icons/SearchIcon`），禁止 barrel import
   - 僅在類型需跨多個檔案共用時，才另建 `types.ts`

3. **建立 ComponentName.test.tsx**
   - 基本渲染測試
   - Props 測試
   - 事件處理測試

4. **建立 ComponentName.stories.tsx**
   - Default story
   - 各 variant stories

5. **執行驗證**
   ```bash
   pnpm run lint
   pnpm run test
   ```

## 範例

建立 `Badge` 元件：

```
/new-component Badge
```

將建立：
- `src-v2/components/badge/Badge.tsx`（Props 類型 inline 定義於此）
- `src-v2/components/badge/Badge.test.tsx`
- `src-v2/components/badge/Badge.stories.tsx`

## 注意事項

- 元件名稱使用 PascalCase
- 目錄名稱使用 kebab-case
- 確保包含無障礙支援（aria attributes）
- 樣式使用 CSS variables（`var(--primary-500)`）或 Tailwind utility class，禁止引入 JS 常數
