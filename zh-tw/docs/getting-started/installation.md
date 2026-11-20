# 安裝

> 在 React 專案裡安裝 Vittal Design。

## 事前準備

- Node.js 18+
- React 19
- Tailwind CSS 4

## 初始化 shadcn

安裝元件之前，專案需要一份 `components.json`。先執行一次初始化：

```bash
npx shadcn@latest init
```

出現提示時，把路徑設成你的專案結構（CSS 檔、元件別名等）。各框架的設定見 [shadcn 文件](https://ui.shadcn.com/docs/installation)。

接著在 `components.json` 宣告 Vittal Design registry，CLI 才能解析 `@vital-design/` 依賴：

```json
{
  "registries": {
    "@vital-design": "https://vittal.design/r/{name}.json"
  }
}
```

> **建議路徑：** 新專案與新元件請走 Vittal Design registry。這是目前 `src-v2/` 元件層的主要交付方式。

## 用 shadcn CLI 安裝（建議）

用 shadcn CLI 把個別元件複製進專案。檔案在你的程式碼裡，之後可以自己改。

```bash
npx shadcn@latest add @vital-design/<component-name>
```

例如安裝 Button：

```bash
npx shadcn@latest add @vital-design/button
```

> 建議使用 `@vital-design/<name>`。它會一併解析 registry 項目宣告的 `@vital-design/*` 依賴。新元件可能只透過 registry 提供。

可用元件的完整清單見 [Registry](/zh-tw/docs/registry)。

## 以 npm 套件安裝（既有專案相容）

如果既有專案已經依賴已發佈的套件，可以繼續把整包函式庫裝成套件：

```bash
# pnpm
pnpm add @fed/vital-design

# npm
npm install @fed/vital-design

# yarn
yarn add @fed/vital-design
```

> **既有專案相容：** npm 套件仍支援現有使用者，但不是新元件的主要交付方式。需要最新元件時，請用上面的 registry。
>
> **邊界：** npm 套件對應的是舊的 `src/`。它不公開只有 registry 才有的 `src-v2/` 檔案，例如 Tailwind 主題樣式表。
>
> **注意：** npm 套件發佈在私人 GitLab registry。`.npmrc` 需要能向 `https://git.gss.com.tw/api/v4/projects/5615/packages/npm/` 驗證。

## Peer dependencies

Vittal Design 需要這些 peer dependencies：

```bash
pnpm add react react-dom
```

如果走舊的 npm 套件流程，還要安裝 `styled-components`，因為發佈出去的 `src/` 仍然依賴它：

```bash
pnpm add styled-components
```

多數框架已經帶有 `react` 與 `react-dom`。使用 Vittal Design 之前，確認它們在應用裡。
