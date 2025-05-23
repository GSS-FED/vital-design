# Vital Design

## 使用說明

### 環境要求

- React 18
- styled-components >= 5

如未安裝上述套件，請執行以下指令安裝：

```sh
# npm
npm install react react-dom styled-components

# Yarn
yarn add react react-dom styled-components

# pnpm
pnpm add react react-dom styled-components
```

### 安裝

#### npm & pnpm

```sh
# 在 .npmrc 新增內容，目的是讓 package manager 認得 `@fed`
echo @fed:registry=https://git.gss.com.tw/api/v4/projects/5615/packages/npm/ >> .npmrc

# npm
npm install @fed/vital-design

# pnpm
pnpm add @fed/vital-design
```

#### yarn

```yml
# .yarnrc.yml
npmScopes:
  fed:
    npmRegistryServer: "https://git.gss.com.tw/api/v4/projects/5615/packages/npm/"
```

```sh
yarn add @fed/vital-design
```

## 開發說明

### 環境要求

- Node.js 18
- pnpm 8

### 常用指令

| 指令                        | 行為                                 |
| :------------------------- | :----------------------------------- |
| `pnpm install`             | 安裝相依套件                           |
| `pnpm run dev`             | 同 `pnpm run storybook:dev`          |
| `pnpm run build`           | 編譯、打包到 `dist` 資料夾              |
| `pnpm run lint`            | 以 ESLint 檢查程式碼                   |
| `pnpm run format`          | 以 Prettier 整理程式碼                 |
| `pnpm run test`            | 執行所有測試案例                       |
| `pnpm run test:coverage`   | 計算測試覆蓋率                         |
| `pnpm run test:watch`      | 監測到檔案變更時重新執行相關測試案例       |
| `pnpm run storybook:dev`   | 在 Storybook 開發元件                 |
| `pnpm run storybook:build` | 把 Storybook 打包成靜態網頁            |
