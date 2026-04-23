# 新增元件到 Registry

將 `src-v2/` 現有元件新增到 shadcn registry，作為新元件的標準分發方式，讓使用者可透過 CLI 安裝。

## 使用方式

```
/add-registry <component-name>
```

## 執行步驟

1. **確認元件存在**

   - 檢查 `src-v2/components/<component-name>/` 目錄
   - 確認主要元件檔案存在
   - 新元件一律以 `src-v2/` 為來源，不從 legacy `src/` 建立 registry 條目

2. **分析依賴**

   - 檢查元件使用的外部套件（dependencies）
   - 檢查元件使用的內部元件（registryDependencies）
   - 確認是否使用 `cn()` 函數

3. **在 `registry/types.ts` 新增名稱**
   在 `RegistryItemName` union type 加入新的 component name（缺少此步 TypeScript 會報錯）：

   ```ts
   export type RegistryItemName =
     | 'existing-item'
     | '<component-name>'   // ← 新增
     | ...
   ```

4. **在對應的 registry 檔案中新增條目**（勿直接編輯 `registry.json`）

   - UI 元件 → `registry/ui.ts`
   - Block → `registry/blocks.ts`
   - Hook → `registry/hooks.ts`

   ```ts
   {
     name: '<component-name>',
     type: 'registry:ui',
     title: '<ComponentName>',
     description: '元件描述',
     dependencies: ['clsx', 'tailwind-merge'],
     registryDependencies: [
       '@vital-design/utils',
       '@vital-design/vital-theme',
     ],
     files: [
       {
         path: 'src-v2/components/<component-name>/<ComponentName>.tsx',
         type: 'registry:ui',
       },
     ],
   }
   ```

5. **執行驗證**

   ```bash
   pnpm run test
   ```

   確保 registry 驗證測試通過

6. **構建 Registry**

   ```bash
   pnpm run registry:build
   ```

7. **確認產出**
   檢查 `public/r/<component-name>.json` 已生成

## Registry 規範

### 依賴前綴

`registryDependencies` 必須使用 `@vital-design/` 前綴：

```ts
// 正確
registryDependencies: ['@vital-design/button'];

// 錯誤
registryDependencies: ['button'];
```

### 常見依賴

| 功能      | dependencies         | registryDependencies           |
| --------- | -------------------- | ------------------------------ |
| 使用 cn() | clsx, tailwind-merge | @vital-design/utils            |
| 使用主題  | -                    | @vital-design/vital-theme      |
| 使用 Icon | -                    | 精確列出 @vital-design/icon-\* |

### 類型分類

| item type            | 用途                                          |
| -------------------- | --------------------------------------------- |
| `registry:ui`        | UI 元件與 icon 元件（item 本身 + files 陣列） |
| `registry:block`     | 複合 block（item 本身）                       |
| `registry:component` | block 的組成檔案（block files 陣列中使用）    |
| `registry:lib`       | 工具函數 / 常數                               |
| `registry:hook`      | React Hook                                    |

## 注意事項

- 新元件預設透過 registry 分發；不要假設會同步進入 legacy npm package（`src/`）
- 確保元件使用 `import type` 語法
- 避免 barrel import（特別是 icons，需指定完整路徑如 `@/icons/SearchIcon`）
- 元件自己的 Props 型別放在元件 `.tsx` 檔，不要額外分發 `types.ts`
- 列出所有必要的依賴
