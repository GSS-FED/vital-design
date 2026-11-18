# Vittal Design

基於 React 19 + Tailwind CSS 4 的元件庫，透過 shadcn registry 分發。

## 使用 shadcn CLI 安裝元件

### 前置條件

**1. 初始化 shadcn**（若尚未初始化）

```sh
npx shadcn@latest init
```

**2. 在 `components.json` 加入 `registries` 設定**

```json
{
  "registries": {
    "@vital-design": "https://vittal.design/r/{name}.json"
  }
}
```

### 安裝元件

```sh
npx shadcn@latest add @vital-design/button
```

依賴（utils、icons、theme CSS 變數）會由 shadcn CLI 自動下載，無需手動安裝。

> 如需直接使用 JSON URL 也可以，但建議優先使用 `@vital-design/<name>` alias，讓 CLI 能正確解析 `@vital-design/*` 相依項目。

## 開發說明

### 環境要求

- Node.js >=22.12（開發 / registry build；見 `.nvmrc`）
- pnpm 10+

> `>=22.12` 是本 repo 開發與 registry build 的工具鏈需求；已發布套件的使用端需求仍以套件的 peer dependencies 與實際 runtime 為準。

### 常用指令

| 指令                              | 行為                                                                 |
| :-------------------------------- | :------------------------------------------------------------------- |
| `pnpm install`                    | 安裝相依套件                                                         |
| `pnpm run dev`                    | 開啟 v1（`src/`）的 Storybook（port 6006）；v2 範例在文件站          |
| `pnpm run build`                  | 編譯、打包到 `dist` 資料夾                                           |
| `pnpm run lint`                   | 以 Oxlint 檢查程式碼                                                 |
| `pnpm run format`                 | 以 Prettier 整理程式碼                                               |
| `pnpm run test`                   | 執行單元測試（Vitest `unit` project，jsdom）                         |
| `pnpm run test:visual`            | 視覺回歸：在 Chromium 截每個 src-v2 story 與文件範例並比對 baseline  |
| `pnpm run fixtures:dev`           | 開啟 fixture app：一個 story / 範例一個 URL                          |
| `pnpm run test:coverage`          | 計算測試覆蓋率                                                       |
| `pnpm run test:watch`             | 監測到檔案變更時重新執行相關測試案例                                 |
| `pnpm run storybook:build`        | 把 v1 Storybook 打包成靜態網頁（不進 CI）                            |
| `pnpm run tokens:build`           | 重建所有 token 平台（generated.css + vital-theme-vars.ts）           |
| `pnpm run tokens:build:css`       | 僅重建 CSS tokens                                                    |
| `pnpm run registry:generate`      | 從 `registry/*.ts` 產生 `registry.json`                              |
| `pnpm run registry:build`         | 產生 `registry.json` 並建置 `public/r/`                              |
| `pnpm run registry:validate`      | 驗證 registry 項目完整性                                             |
| `pnpm docs:dev`                   | 啟動文件站開發伺服器（port 3000）                                    |
| `pnpm docs:build`                 | 建置文件站靜態頁面                                                   |
| `pnpm docs:start`                 | 啟動文件站生產模式                                                   |
