# 從 Figma 新增或更新 Icon

從 Vittal Design Figma 的 Icons 頁匯出 SVG，用 `icons:build` 產生 React 元件，並在元件裡用 Figma 的 frame 尺寸。

## 使用方式

```
/add-icon <icon-name> [regular|solid]
```

## 執行步驟

依 `.agents/skills/add-icon/SKILL.md`：

1. 確認 Notion「Vittal Design Icon」該 icon 的狀態是「待開發」
2. 從 Figma Icons 頁左側「SVG」欄的 frame 匯出（不要匯出 component）
3. 存到 `src-v2/icons/_source/custom/<名稱>.svg`（Solid 加 `-solid`；換圖就覆蓋原檔，不改名）
4. `pnpm run icons:build`
5. 新 icon：登記到 `registry/base.ts`、`registry/types.ts`、gallery 與 icons 文件
6. 元件裡的 icon class 用 Figma frame 尺寸
7. `pnpm run registry:build && pnpm run registry:validate`，Storybook 截 before／after
