# 建立 Block

建立一個由多個 Vital Design 元件組成的複合 UI 區塊。

## 使用方式

```
/create-block <block-name 或需求描述>
```

## 執行步驟

1. **讀取組合指南**

   - `Read .agents/skills/create-block/composition-guide.md`

2. **讀取相關元件原始碼**

   - 依需求查看會用到的 `src-v2/components/*` 元件
   - 若需要共用型別，從元件 `.tsx` 檔 import type

3. **檢查目前 blocks 目錄**

   - 參考 `src-v2/blocks/` 既有正式 block（如 `sidebar-cloud-01`..`06`、`data-table/data-table-group-01`、`02`、`04`）的結構與命名
   - 依組合指南與 `block-template.tsx` 建立新 block

4. **建立 block 檔案**

   - 路徑：`src-v2/blocks/<block-name>/<BlockName>.tsx`
   - 使用 named export
   - Props 至少包含 `className?: string`
   - 使用 `cn()` 合併基礎樣式與傳入 className

5. **確認依賴**

   - 列出所有外部 dependencies
   - 列出所有 `@vital-design/*` registryDependencies

6. **輸出建議**
   - 提供建議加入 `registry/blocks.ts` 的條目
   - 提示後續可執行 `/add-registry <block-name>`

## 關鍵規則

- 目錄名稱使用 kebab-case，元件名稱使用 PascalCase
- 元件 source import 必須使用完整路徑，禁止 barrel import
- Block 必須採 named export，不使用 default export
- 若需要互動邏輯，盡量以清楚 props 對外暴露，不將場景資料硬編碼在 block 內
