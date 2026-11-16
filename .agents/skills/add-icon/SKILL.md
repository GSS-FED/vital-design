---
name: add-icon
description: >
  從 Vittal Design Figma 匯出 icon 的 SVG，放進 src-v2/icons/_source，用 icons:build 產生 React 元件，
  並在元件裡用 Figma 的 frame 尺寸。用於新增 icon、把舊圖換成設計師重畫的版本、加 Solid 版，
  或 icon 在元件裡大小和 Figma 不符時。Triggered by "/add-icon <name>"、「從 Figma 匯出 icon」、
  「換 icon」、「新增 icon」、"add icon from Figma".
---

# 從 Figma 新增或更新 Icon

流程：確認範圍 → 從 Figma「SVG」欄匯出 → 放進 `_source` → `icons:build` → 登記（只有新 icon 才要）→ 在元件裡用 frame 尺寸 → 驗證。

## 1. 確認設計已定案

- Notion「Icon 更新 → Vittal Design Icon」資料庫是設計師的 handoff：https://app.notion.com/p/41778314842880f7b3c0ee815fdd4628
- 只有 **狀態 = 待開發** 才算已確認。「待設計」就算 Figma 已經有 SVG，也可能再改，先不要開發。
- 需要但 Notion 沒列的 icon，先問設計，不要自己從 Figma 挑。

## 2. 找到 Figma 上可匯出的 SVG

- 檔案：Vittal Design（file key `JYP7VpkGoqPdDqBeNPjK71`），🛑 Design System 頁的 Icons frame（node `11894:15542`）。
- 每個 icon 一列：中間是 component（`Icons/Regular/x`、`Icons/Solid/x`），**左邊標「SVG」的那欄 frame 才是要匯出的來源**（frame 位置 `x=-32`，名稱與 component 相同）。
- **不要匯出 component**：它已經 outline + flatten 成填色形狀，線寬資訊不見了。
- **例外：純填色的 Solid icon**（例如 `caret-*`）本來就沒有線寬，Figma component 就是最終形狀，可以直接匯出 component 的 20×20 frame，不算暫用版。前提是不是 Font Awesome Pro 才有的圖（見下方「暫用版」）。
- 名稱帶 `fa-` 的是還沒重繪的 Font Awesome 原版，沒有 SVG 欄，不能直接用。
- 規格：20×20 viewBox、`stroke-linecap/linejoin="round"`；Regular `stroke-width="1.3"`，Solid `1.75`，少數 Solid 是純填色（例如 caret-\*）。匯出後對一下這些值，不對就回報設計（例如 Solid `*icons` 是 1.6）。
- 不要保留 `fill-opacity`／`opacity`：顏色與深淺一律由元件的 `text-*` 決定（`ellipsis` 原本帶 0.55，已拿掉）。
- 名稱對照：Figma／Notion 的 `*icons`（可替換 icon 的示意）在 repo 叫 `placeholder`（`PlaceholderIcon`、`PlaceholderSolidIcon`）。
- 已知 Figma 錯誤：Solid 欄 `angle-right`、Regular 欄 `angle-right-to-line` 的 SVG frame 名稱誤標成 `angle-left…`。以圖形為準。

### Agent：用 Figma MCP 匯出

1. `get_metadata({ fileKey, nodeId: "11894:15542" })`，找 `name="Icons/Regular/<名稱>"`（或 Solid）且 `x="-32"` 的 **frame** id。
2. `get_design_context({ fileKey, nodeId: <frame id>, forceCode: true })`，取出 `https://www.figma.com/api/mcp/asset/<id>.svg`。
3. 下載到一個新的暫存資料夾（不是 repo）：`curl -sfL -o <名稱>.svg <url>`。網址幾天後失效，不要寫進 repo。
4. 檢查根節點是 `viewBox="0 0 20 20"`。**有些 frame 只匯出內層圖形**（例如 calendar-days 是 `12.3×13.3`）：從 design context 的 `inset-[top_right]` 算出位置，包回 20×20，例如：

   ```svg
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
   <g transform="translate(3.85 3.35)"><!-- 原本的內容 --></g>
   </svg>
   ```

   calendar-days：內層 inset `20% 22.5%`（y=4、x=4.5），圖片再外擴 `-5.42% -5.91%`（各 0.65）→ `translate(3.85 3.35)`。

### Dev：手動匯出

在 Figma 選取 SVG 欄的 frame（不是旁邊的 component）→ 右鍵 Copy as SVG → 存檔。同樣檢查 viewBox 是 20×20。

`style`、`preserveAspectRatio`、`overflow`、`<g id>`、`#232332` 顏色都不用手動清，build 會處理。

## 3. 放進 `_source`

- 位置：`src-v2/icons/_source/custom/<名稱>.svg`，名稱用 Figma 名稱去掉 `fa-`。
- Solid：`<名稱>-solid.svg`，會產生 `<Name>SolidIcon`。Regular 不加後綴。
- **名稱以 Notion 為準**（設計會議 2026-11-16 決議）：檔名用 Notion 的 icon 名稱，Regular／Solid 也照 Notion 的「樣式」欄。Figma 名稱不同時（例如 Figma `chevron-down`、Notion `angle-down`）以 Notion 為準。
- **換既有 icon 的圖時，覆蓋原本的檔案，不要改名**。改名對 registry 使用者是 breaking change，要先跟設計和 maintainer 確認。

- `_source/fontawesome/` 只放未修改的 Font Awesome Free 圖，並列在 `CREDITS.md`。被設計師重畫版取代時，`git mv` 到 `custom/`，再從 `CREDITS.md` 刪掉那一列。

### 暫用版

設計還沒重繪（Figma 只有 `fa-` 原版 component，或完全沒有）的 icon，repo 先放暫用版，讓所有 icon 都是 20×20、四周留白的 frame，元件尺寸才能統一照 Figma 寫。

- Font Awesome **Free** 有的圖：匯出 Figma component 的 20×20 frame。
- Font Awesome **Pro** 才有的圖（Figma 這頁是 FA 6 Pro）：**不要匯出**，Pro 不能進公開 registry（見 `_source/fontawesome/CREDITS.md`）。沿用 repo 原本的 path，用 `<g transform="translate(…) scale(…)">` 縮放到 Figma component 的 bbox。
- Figma 完全沒有的：同上，沿用 repo 的 path 放進 20×20，大小對齊同類的新圖。
- 每個暫用版都記在「Icon 盤點：Notion × Figma × repo」文件的「暫用版」欄。設計重繪後，**照第 2 節匯出 SVG 欄、覆蓋同一個 `_source` 檔案就好，元件尺寸不用再動**，再把文件那一列改掉。

## 4. 產生元件

```bash
pnpm run icons:build
```

- 不要手改 `src-v2/icons/*.tsx`，改 SVG 再重跑。
- build 把非 `none` 的 fill/stroke 換成 `currentColor`，共用的 `stroke-width` 提到根節點。
- 出現 `<path> has no fill or stroke` 會直接失敗：該形狀沒有顏色，會渲染成空白。在 SVG 補上 `fill` 或 `stroke` 再跑。

## 5. 新 icon 才要做的登記

換圖（同名覆蓋）不用改這些。新 icon 要：

- `registry/base.ts` 的 `iconGroups` 加 `icon-<名稱>`，`registry/types.ts` 的 `RegistryItemName` 也加。
- Gallery 與清單：`src-v2/icons/Icons.stories.tsx`、`apps/docs/components/previews/IconsPreview.tsx`、`apps/docs/content/docs/components/icons.mdx` 與 `icons.zh-tw.mdx`。
- 元件改用新 icon 時，更新 `registry/ui.ts` 該元件的 `registryDependencies`（精確的 `@vital-design/icon-*`）。
- 使用者看得到的變更寫進 `apps/docs/content/docs/changelog.mdx` 與 `changelog.zh-tw.mdx`。

## 6. 在元件裡用 Figma 的 frame 尺寸

Figma 元件把 icon 放在固定大小的 frame 裡（例如 Checkbox 16px、Split button 18/20px、Select 20px）。**元件的 icon class 要等於這個 frame 尺寸**（`size-4`、`size-4.5`、`size-5`），不是圖形大小。

- 查法：對該元件的 symbol 跑 `get_design_context`，找 `data-name="Icons/…"` 那一行的 `size-[Npx]`，同時看它用 Regular 還是 Solid。
- 舊 icon 是貼邊裁切的 viewBox，所以舊 class 寫的是圖形大小（`size-3.5`、`h-2.25 w-3`）。換成 20×20 新圖後不改 class，icon 會變小，Checkbox 減號甚至會看不到。
- Figma 用 Solid 的地方就用 `*SolidIcon`。
- 共用規則已照 Figma frame：`Button` 裡帶 `data-icon` 的 icon 是 18px（md、icon-md）／20px（lg、icon-lg），沒有 margin；Sidebar 選單項目的 icon 是 20px。放進這兩處的 icon 不用再寫尺寸。

## 7. 驗證

```bash
pnpm run registry:build && pnpm run registry:validate
npx vitest run src-v2/components/<受影響元件>
```

- Storybook `V2/Icons/Gallery` 看每個 icon 都有畫出來、沒有變實心塊。
- 受影響的元件 story 截 before／after，並量實際圖形大小，跟 Figma 比（Figma 圖形大小 = SVG 圖形 bbox × frame / 20）。在 story iframe 執行：

  ```js
  [...document.querySelectorAll('#storybook-root svg')].map((s) => {
    const b = s.getBoundingClientRect(),
      k = b.width / s.viewBox.baseVal.width;
    let x0 = 1e9,
      y0 = 1e9,
      x1 = -1e9,
      y1 = -1e9;
    s.querySelectorAll('path').forEach((p) => {
      const q = p.getBoundingClientRect();
      const pad =
        getComputedStyle(p).stroke !== 'none'
          ? (parseFloat(getComputedStyle(p).strokeWidth) * k) / 2
          : 0;
      x0 = Math.min(x0, q.left - pad);
      y0 = Math.min(y0, q.top - pad);
      x1 = Math.max(x1, q.right + pad);
      y1 = Math.max(y1, q.bottom + pad);
    });
    return `${b.width}px box, glyph ${(x1 - x0).toFixed(1)}×${(y1 - y0).toFixed(1)}`;
  });
  ```

  例：Checkbox 勾 9.9×7.1、減號 9.3×1.4；Select chevron 11.3×6.3；Split button chevron M 10.6×6.1、L 11.8×6.8。
