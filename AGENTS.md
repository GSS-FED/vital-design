# AGENTS.md

**pnpm workspace monorepo**，包含兩個 package：

- **`@fed/vital-design`**（根目錄）- 使用 TypeScript 和 Tailwind CSS 建構的 React 元件庫
- **`@fed/vital-docs`**（`apps/docs/`）- 使用 Fumadocs 建構的元件文件站

## Commands

```bash
# 元件庫
pnpm install               # 安裝依賴
pnpm run dev               # v1（src/）的 Storybook (port 6006)；v2 用 docs:dev 或 fixtures:dev
pnpm run build             # 建置元件庫
pnpm run test              # 執行測試
pnpm run test:coverage     # 計算測試覆蓋率
pnpm run test:watch        # 監測檔案變更時重新執行測試
pnpm run test:visual       # 視覺回歸：Vitest browser mode 截每個 src-v2 文件範例與 vrt 測試（baseline 在 visual/__baseline__，不進 git）
pnpm run test:visual:update # 重新產生視覺 baseline
pnpm run fixtures:dev      # Fixture app：一個文件範例一個 URL，隔離開發用
pnpm run lint              # Oxlint 檢查（.oxlintrc.json，含 type-aware 規則）
pnpm run lint:design       # @shadcn/lint 設計系統規則（.oxlintrc.shadcn.json extends vital-design.lint.json；先重建 CSS tokens）；CI 的 lint-design-job：error 失敗、warning 進 MR 的 Code Quality
pnpm run lint:design:audit # 對 blocks 跑 no-restyle，定期找跨 block 重複的覆寫（非 gate）
pnpm run format            # Prettier 格式化
pnpm run storybook:build   # 把 v1 Storybook 打包成靜態網頁（不進 CI）
pnpm run icons:build       # 從 src-v2/icons/_source/*.svg 重新產生 icon .tsx
pnpm run tokens:build      # 重建所有 token 平台（generated.css + vital-theme-vars.ts）
pnpm run tokens:build:css  # 僅重建 CSS tokens
pnpm run registry:generate # 從 registry/*.ts 產生 registry.json
pnpm run registry:build    # 產生 registry.json + 建置 public/r/
pnpm run registry:validate # 驗證 registry 完整性（CI 用）

# 文件站（apps/docs/）
pnpm docs:dev              # Fumadocs dev server (port 3000)
pnpm docs:lint             # 檢查 docs app 的 Oxlint 與 Next.js 規則（apps/docs/.oxlintrc.json）
pnpm docs:build            # 建置文件站靜態頁面（含 registry JSON → /r）
pnpm docs:start            # 啟動生產環境文件站
pnpm changelog:new <slug>  # 新增一則 changelog（en + zh-TW 兩個檔）
pnpm changelog:build       # 重組 changelog 頁（docs dev/build 會自動跑）
```

## AI Commands

| Command          | 對應 Skill      | 說明                         |
| ---------------- | --------------- | ---------------------------- |
| `/new-component` | `new-component` | 建立新原子 UI 元件           |
| `/add-registry`  | `add-registry`  | 將元件或 block 加入 registry |
| `/add-docs`      | `add-docs`      | 為元件或 block 建立文件頁面  |
| `/create-block`  | `create-block`  | 建立複合 UI 區塊             |
| `/check-quality` | `check-quality` | 執行程式碼與文件一致性檢查   |
| `/add-icon`      | `add-icon`      | 從 Figma 新增或更新 icon     |

## AI Skills

| Skill                  | 說明                                                            |
| ---------------------- | --------------------------------------------------------------- |
| `new-component`        | 建立新的原子 UI 元件                                            |
| `add-registry`         | 維護 `registry/*.ts` 並產生 shadcn registry 項目                |
| `add-docs`             | 補齊 Fumadocs 頁面、preview 與導覽                              |
| `create-block`         | 使用既有 VD 元件組合出 block                                    |
| `build-shadcn-ui`      | 以 Base UI + Tailwind v4 + `data-slot` 建立或重構 `src-v2` 元件 |
| `check-quality`        | 檢查型別、lint、測試、registry 與文件同步狀態                   |
| `lint-design-decision` | 判讀 `lint:design` 結果：改 code 還是改 lint policy（contract） |
| `add-icon`             | 從 Figma「SVG」欄匯出 icon、`icons:build`、元件用 frame 尺寸    |

## Tech Stack

### 元件庫（根目錄）

- **React 19** + **TypeScript 5** - 核心框架
- **Tailwind CSS 4** - 樣式框架
- **Vite 6** - 建置工具（Node 22，見 `.nvmrc`）
- **Vitest** + **Testing Library** - 測試（`unit` project 用 jsdom；`visual` project 用 browser mode 跑截圖）
- **Storybook 8** - 只給 v1（`src/`）在本機看，不進 CI；v2 的範例在文件站
- **Base UI** - `src-v2/` 預設的無障礙 primitive library

### 文件站（apps/docs/）

- **Next.js 15** - 文件站框架
- **Fumadocs 15**（fumadocs-core + fumadocs-ui）- 文件 UI 與路由
- **rehype-pretty-code** + **Shiki** - 程式碼區塊語法高亮
- **Orama** - 全文搜尋（built-in via fumadocs-core）

## Project Structure

### 元件庫（根目錄）

- `src-v2/components/` - UI 元件
- `src-v2/blocks/<name>/components/` - 複合區塊裡會進 registry 的檔案；範例在 `examples/`，tests 放在該 block 根目錄。文件頁用家族資料夾（`blocks/sidebar/cloud/`）；只有一個 block 的家族直接放 `blocks/<name>.mdx`（如 `blocks/data-table.mdx`）
- `src-v2/hooks/` - React Hooks
- `src-v2/icons/` - SVG 圖示
- `src-v2/lib/` - 工具函數與共用型別（`utils.ts`：`cn()`、`CvaProps`）
- `src-v2/styles/` - 全域 CSS（`globals.css`）
- 路徑別名：`@/` → `src-v2/`
- `skills/` - 對外發佈給 consumer 專案 agent 的 skill（如 `use-vital-design`），與 `.agents/skills/` 的 repo 內部維護 skill 分開
- `tokens/` - Design token 定義（Style Dictionary v5，三層結構）
  - `tokens/primitive/` - raw values（colors, typography, radius）
  - `tokens/semantic/` - intent-based（shadows, gradients, color aliases）
  - `tokens/component/` - component-specific（avatar, tag）
  - `tokens/dark/` - 既有色的暗色覆寫（primitive，以及已存在的 `background` / `card` / `popover`；沒有亮色對應的名稱不要加；Style Dictionary source 不含這個資料夾）
  - 建置輸出：`src-v2/styles/tokens/generated.css`（CSS）、`registry/vital-theme-vars.ts`（TypeScript）

### 文件站（apps/docs/）

- `apps/docs/app/` - Next.js App Router（文件頁在 `docs/[[...slug]]/page.tsx`）
- `apps/docs/app/llms.txt/route.ts` - 靜態 `/llms.txt`（llmstxt.org 目錄，由 `apps/docs/lib/llms.ts` 從 page tree 產生；sidebar 連結在 `content/docs/meta.json`）
- `apps/docs/lib/markdown.ts` - 把文件 MDX 轉成給 agent 讀的 Markdown（`<ComponentPreview>` 換成範例原始碼、token palette 換成表格、`ComponentGallery` 換成連結清單）。`apps/docs/scripts/markdown.ts`（`markdown:build`，docs dev/build 前自動跑）用它寫出每頁的 `public/docs/**.md` 與 `public/zh-tw/docs/**.md`（gitignore）；`app/llms-full.txt/route.ts` 用它把英文頁依 sidebar 順序接成 `/llms-full.txt`；頁面的「Copy Markdown」按鈕抓該頁 `.md`
- `apps/docs/components/previews/__sources__.ts` - Code tab 的原始碼表，由 `previews:sources` 從 `src-v2/**/examples` 產生（gitignore）
- `apps/docs/components/vital-components.ts` - `'use client'` barrel，MDX 頁面可直接 import 元件做靜態 preview（無需 state 時使用）
- `apps/docs/content/docs/` - MDX 文件內容（changelog.mdx 由 `content/changelog/` 產生、components/、blocks/、getting-started/、design-tokens/、registry/）
- `apps/docs/content/changelog/` - 文件站 changelog（只寫給元件庫使用者，規則見「AI 行為指引」）。一則一對檔：`YYYY-MM-DD-HHmm-<slug>.mdx` + `.zh-tw.mdx`，用 `pnpm changelog:new <slug>` 建立；frontmatter 只有 `title`。頁面依檔名的月份分組（`## Month YYYY`），組內每則是 `### title`、依檔名時間新的在上；內文的小標從 `####` 開始。`apps/docs/scripts/changelog.mts` 在 docs dev/build 前把它們組成 `content/docs/changelog.mdx` 與 `changelog.zh-tw.mdx`（gitignore，勿手改），缺任一語言就 build 失敗。這樣每個 MR 只新增檔案，不會在頁首互相衝突。不要接 semantic-release 或 npm 版號
- `apps/docs/source.config.ts` - Fumadocs MDX 設定（rehype-pretty-code）
- `apps/docs/app/api/search/route.ts` - Orama 全文搜尋 API
- 路徑別名：`@/` → `src-v2/`（元件庫），`~/` → `apps/docs/`（文件站）

## Code Style

- 使用 `cn()` 合併 Tailwind 類名
- Import 順序：`@/` 別名與外部套件同組按字母排序（`@` 排在前），相對路徑最後；`pnpm run format` 自動套用
- 類型使用 `import type` 語法

## Git Workflow

- **Commit 規範**：Conventional Commits（Angular convention，commitlint 強制）
- **Pre-commit**：Husky + lint-staged
- **文件站**：合進 `main` 後由 GitHub Actions 部署 GitHub Pages（`vittal.design`）
- **legacy npm**：`@fed/vital-design`（`src/`）不隨合 `main` 自動發布；若仍需發 v1，在 GitLab `main` pipeline 手動跑 `build-job` 再跑 `publish-job`（semantic-release）

### 分支策略

| 分支      | 說明                                      | 合併規則                                |
| --------- | ----------------------------------------- | --------------------------------------- |
| `main`    | 文件站生產，受保護                        | 接受來自支援分支的 MR，合併後不刪除     |
| `develop` | 舊整合分支，受保護；不部署 vittal.design  | 新工作不再使用                          |
| 支援分支  | 功能/修復開發                             | 從 `main` 建立，MR 合併回 `main` 後刪除 |

### 支援分支命名規則

以 issue 類別為前綴、issue 編號為名：

- `feat/655` — 新功能
- `fix/123` — Bug 修復
- `docs/456` — 文件
- `refactor/789` — 重構
- `chore/321` — 維護

## Boundaries

### 檔案限制

- `public/r/` - 自動產生，勿手動編輯
- `registry.json` - 自動產生，勿手動編輯（由 `registry/*.ts` 產生）
- `vital-design.lint.json` - 對外發佈的設計系統 lint policy（registry item `vital-design-lint`）；只放 rules，路徑與 repo 專用設定放 `.oxlintrc.shadcn.json`。修改即改變 consumer 行為
- `registry/` - TypeScript source，新增/修改元件的 registry 定義於此，修改後執行 `registry:build`

### AI 行為指引

- 不要自行新增設計 tokens
- 不要修改 Prettier/Oxlint 設定
- 新元件必須遵循現有結構模式
- 任何結構性變動後（新增/刪除元件、修改 registry 結構、調整路徑或命名規範）須同步檢查並更新 `AGENTS.md`、`.agents/RULES.md`、`.agents/commands/`、`.agents/skills/` 中的相關說明
- **Changelog 只寫給元件庫使用者**（安裝 registry 的人）：只有改到他們裝進專案的東西才寫，也就是元件、block、icon、hook 的新增、行為或 API 變更，token、主題與安裝方式。只改文件頁、文件範例、截圖、測試、CI、agent 文件（`AGENTS.md`、`.agents/`）或開發工具（Storybook、fixture app、腳本）的 MR **不加** changelog，即使文件站看得到差異。拿不準時不寫，在 MR 描述說明
- `.agents/` 是 AI workflow 文件唯一來源；`.claude` 是指向 `.agents` 的 symlink，不要分開維護兩份

詳細開發規範見 `.agents/RULES.md`

本機額外規則（若存在）：`.agents/local/RULES.local.md`（gitignore，不進 repo）

## Known Gotchas

- **Icon 系統**：icon 真實 source 是 `src-v2/icons/_source/*.svg`，分 `custom/` 與 `fontawesome/` 兩個 folder（FA 限 Free CC BY 4.0，附 `CREDITS.md`）。`.tsx` 由 `pnpm run icons:build`（SVGR）產生，**不要手改**——改 SVG 然後重跑。所有 icon API 統一為 `SVGProps<SVGSVGElement>`，預設 `width="1em" height="1em"` 與 `aria-hidden="true"`。`icons:build` 把所有非 `none` 的 `fill` / `stroke` 顏色改成 `currentColor`，`none` 保持 `none`；根節點沒寫 `fill` 時補 `currentColor`（SVG 預設黑色填色）。每個有 stroke 的形狀都帶同一個 `stroke-width` 時，提到根節點（呼叫端可用 `strokeWidth` 一次覆寫）；`stroke-linecap` / `stroke-linejoin` 留在原位。形狀自己和祖先都沒有 fill / stroke 會讓 build 失敗（避免 icon 渲染成空白）。**Figma → VD**：照 `add-icon` skill（`.agents/skills/add-icon/SKILL.md`）。重點：只匯出 Figma Icons 頁左側「SVG」欄（20×20，Regular 線寬 1.3、Solid 1.75），不要匯出 outline 過的 component；換圖時覆蓋原檔、不改名；元件裡的 icon class 用 Figma frame 尺寸。尺寸用 Tailwind `size-N`（或父層 `text-N` 經 `1em` 繼承），顏色用 `text-*` utility，**禁止 `color` / `opacity` / `fillOpacity` props**。需要動畫的 spinner 用 `<Spinner />` wrapper（含 `animate-spin` 與 `role="status"`），不要直接用 `SpinnerIcon`。每個 icon 各自一個檔案、各自一個 registry item（名稱跟設計的 Notion icon 清單一致，例如 angle-down、xmark、ban、calendar-days、magnifying-glass），import 走精確路徑（例：`@/icons/AngleDownIcon`），不使用 barrel。
- **Icon 導入**：元件源碼禁止 barrel import，需指定完整路徑（例：`@/icons/MagnifyingGlassIcon`）；registry 安裝時 icons 會落在 `src/components/icons/*`，元件 registryDependencies 應列精確的 `@vital-design/icon-*`，不要用整包 `@vital-design/vital-icons`；stories/test 不走 registry 分發，不受此限
- **Colors**：元件一律使用 CSS variables（`var(--primary-500)`）或 Tailwind utility class
- **Shadows**：同上，使用 `var(--shadow-emphasis)` 等 CSS variables
- **Registry 依賴**：`registryDependencies` 必須加 `@vital-design/` 前綴
- **Compound 基礎元件**：單行文字輸入使用 `Input` primitive；自訂輸入組合優先使用 `InputGroup` parts；按鈕群組優先使用 `ButtonGroup`。`PasswordInput`、`SearchBar`、`SplitButton` 保持 preset/compat wrapper。
- **src-v2 exports**：`src-v2` components use named exports only; do not add component default exports.
- **Button icons**：`Button` / `SplitButton` 不使用 `icon` / `iconPlacement` props；icon 或 spinner 作為 children 傳入，並在 icon 上標 `data-icon="inline-start"` 或 `data-icon="inline-end"`。Button label size 使用 `md` / `lg`；icon-only Button 使用 `icon-md` / `icon-lg`。看起來像按鈕的連結使用 `LinkButton`（同檔 export，共用 Button 樣式，保留 link 語意）；不要用 `<Button nativeButton={false} render={<a />}>`，Base UI 會加上 `role="button"`。
- **CVA helpers**：`src-v2` components may use `cva()` internally, but must not export raw variant helpers such as `buttonVariants`; component defaults live on the component API. Derive public variant props with `CvaProps<VariantProps<typeof xVariants>>` from `@/lib/utils` (strips CVA `| null`); do not hand-write duplicate unions. `CvaProps` keys stay optional — require an axis with an intersection override, omit internal axes, and keep extra constraints (e.g. Button `text`/`ghost` cannot use `dangerous`) as a discriminated union on top.
- **Select family**：v2 public selection components are split by interaction: `Select` = flat dropdown for single or multiple values, `Combobox` = searchable input picker, `tree-select` block (`Command` + `Popover`) = hierarchical path picker, `DropdownMenu` = action menu (no value binding). `Command` is also public — a primitive for command palettes, custom searchable popups, and paged hierarchical pickers.
- **Item**：display row primitive for media/title/description/actions. Use `size="list"` for select/list row density. Do not add search, loading, paging, or selection state to `Item`; use picker/menu/command primitives for those.
- **Separator**：shared divider primitive. Prefer it over hand-rolled `div role="separator"` in new `src-v2` components.
- **Pagination**：`Pagination` + `PaginationContent` / `PaginationItem` / `PaginationLink` 與方向 parts 組合；預設保留 anchor 語意，client-side 換頁用 `render={<button type="button" />}`。頁碼、總頁數、跳頁與每頁筆數由使用端管理，表格組合見 table-pagination block。Registry 安裝 `@vital-design/pagination`；文件 `/docs/components/pagination` 含互動 preview。
- **cn() 依賴**：registry 需列出 `cn`（取代舊的 clsx + tailwind-merge）
- **文件範例（單一來源）**：v2 沒有 Storybook story，每個元件只維護文件範例與測試。範例在 `src-v2/components/<name>/examples/*.tsx`（icon 在 `src-v2/icons/examples/`），每檔一個 `export function <Name><Variant>Example`，import 走 repo 路徑。en 與 zh-TW 的 MDX 直接 import 並包 `<ComponentPreview name="<export 名稱>">`；Code tab 由 `previews:sources` 讀整個檔並改寫成 registry 安裝路徑，不手寫 code fence。靜態狀態放一個 `<Name>StatesExample`；打開或互動後的狀態與文件不需要的邊界狀況寫在 `<Name>.vrt.test.tsx`。範例截圖 ID 沿用原本 story 的 ID 格式（`SelectMultipleExample` → `v2-components-select--multiple`；標題不是 `Components/<資料夾>` 的記在 `manifest.ts` 的 `titles`），兩個範例 ID 重複時 manifest 會報錯。流程見 `add-docs` skill
- **視覺回歸（Vitest browser mode）**：`vite.config.ts` 分兩個 project：`unit`（jsdom，`pnpm run test`）與 `visual`（Chromium，`pnpm run test:visual`）。`visual/fixtures.test.tsx` 依 `visual/fixtures/manifest.ts` 產生的清單（沿用 Storybook 格式的 ID）截每個 `src-v2/**/examples/*.tsx`，亮色與暗色各一張；`visual/capture.ts` 只截有畫出東西的範圍（含 portal 出去的 popup），所以圖檔就是元件大小。需要互動後狀態（打開選單等）時，在元件旁加 `<Name>.vrt.test.tsx`：render → 操作 → `expect(await renderedRegion()).toMatchScreenshot()`。`visual/setup.ts` 固定 Date、擋外部網路。Baseline 寫到 `visual/__baseline__/`，CI 的 `visual-baseline` 在 develop/main 產生、`visual-diff` 比對並附 Vitest HTML 報告與 JUnit；目標分支沒有 baseline（stacked MR）時，`visual-diff` 先截 MR 的 diff base 當 baseline，報告只含這個 MR 的變更。Fixture app（`pnpm run fixtures:dev`）用同一份清單；`visual/fixtures/playground/*.tsx`（gitignore，default export 一個元件）會列在首頁，給臨時試東西用。
- **文件站 .next 快取**：修改 `apps/docs/source.config.ts` 後，須執行 `rm -rf apps/docs/.next` 再重建，否則 source config hash 不符導致新頁面 404
- **文件站 `/llms.txt`**：`output: 'export'` 下必須用 `dynamic = 'force-static'` 的 Route Handler（`apps/docs/app/llms.txt/route.ts`），build 後輸出 `apps/docs/out/llms.txt`。Sidebar 用 `content/docs/meta.json` 的 `[llms.txt](/llms.txt)`（Fumadocs 15.7 無 `external:` 前綴，same-origin 連結要在 layout 把該 node 標 `external: true` 才會整頁開檔）。產生器須跳過 `/llms.txt`，避免 index 自連。不要加 `.md` rewrite／middleware（靜態 export 不支援）；每頁的 Markdown 是 `markdown:build` 寫到 `public/` 的靜態檔（網址是頁面網址加 `.md`），文件裡新增會畫東西的 MDX 元件時，在 `lib/markdown.ts` 決定它的 Markdown 輸出
- **文件站繁體中文**：英文留在 `/docs/...`，繁中在 `/zh-tw/docs/...`。不要加 middleware，也不要做 `/en` 前綴（靜態輸出沒有 rewrite）。內容用 dot parser：`page.mdx` 是英文，`page.zh-tw.mdx` 是繁中；`meta.zh-tw.json` 只翻譯顯示名，`pages` 陣列與英文相同。缺中文檔時同一個中文網址顯示英文，並標「尚未翻譯」。站內連結在中文檔寫 `/zh-tw/docs/...`。prop、程式碼、CLI、registry 名稱維持英文。新頁面先寫英文；改了已有中文檔的使用者可見文句時，同一份變更更新 `.zh-tw.mdx`。`/llms.txt` 維持英文索引
- **文件站路徑別名**：`@/` 指向 `src-v2/`（元件庫），`~/` 指向 `apps/docs/`（文件站），兩個 alias 並存於 `apps/docs/next.config.ts`
- **src/ vs src-v2/**：根目錄同時存在 `src/`（legacy npm 分發面，供既有專案相容維護）和 `src-v2/`（新元件與 registry 分發主路徑）；所有新元件開發均在 `src-v2/`，不得新增到 `src/`
- **Primitive 選型**：`src-v2/` 新增或重構元件若需要 headless primitive，預設使用 `@base-ui/react`；目前 package build 入口仍是 `src/index.tsx`，docs 與 registry 內容則以 `src-v2/` 為主
- **src-v2-only 套件位置**：僅供 `src-v2/`、docs、registry 或 stories 使用的套件，根目錄 `package.json` 請維持在 `devDependencies`，避免 legacy npm package 對外安裝額外 runtime dependency；registry 安裝所需套件則由 `registry/*.ts` 的 `dependencies` 個別宣告
- **src-v2/styles 邊界**：`src-v2/styles/` 是 registry / docs 內部使用的 theme 資產，不是 npm package 的公開匯出；不要在 `package.json` exports 中暴露它
- **data-slot**：三層合約 — (1) 會 render 可樣式化 DOM 的 exported part 必須有 slot；(2) Trigger 禁止 passthrough，須 wrapper（`DialogTrigger` 為範本）；(3) 僅 Provider / 純 state Root / bare Portal 可豁免。命名：root `button`、subpart `select-trigger`。詳見 `.agents/RULES.md` 與 docs Tailwind setup。
- **MR preview**：所有 MR（含疊在其他分支上的 stacked MR），在 GitLab 有 `CLOUDFLARE_API_TOKEN` 與 `CLOUDFLARE_ACCOUNT_ID` 時，視覺比對有報告時會把 Vitest HTML 報告上傳到 Cloudflare Pages（`mr-<編號>-diff`）。MR 有改到 `apps/docs/`、`src-v2/`、`registry/` 或 `tokens/` 時，上傳文件站（`mr-<編號>-docs`，`pnpm docs:build`，不要設 `GITHUB_PAGES`）。網址掛在各自的 MR environment。這兩個變數不要設成 Protected，否則未受保護的支援分支拿不到。預覽網址是公開的。

## Registry

- URL：`https://vittal.design/r`
- 構建：`pnpm run registry:build`
- 詳見：`/add-registry` skill
