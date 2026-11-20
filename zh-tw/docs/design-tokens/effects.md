# 效果

> 高度陰影、焦點環、按鈕陰影與漸層 token。

這些 token 只有亮色值，在 `.dark` 底下不會改變，所以陰影在暗色表面上不太明顯。請看[顏色 → 暗色模式](/zh-tw/docs/design-tokens/colors#dark-mode)。

## 高度

四階高度陰影，用來分層。`accent` 最淡；`top-level` 留給 modal 等級的表面。

| Name                 | Utility            |
| -------------------- | ------------------ |
| `--shadow-accent`    | `shadow-accent`    |
| `--shadow-base`      | `shadow-base`      |
| `--shadow-emphasis`  | `shadow-emphasis`  |
| `--shadow-top-level` | `shadow-top-level` |

```css
.card {
  box-shadow: var(--shadow-base);
}
```

```html
<div class="shadow-base">…</div>
```

## 焦點環

外環用 `box-shadow` 畫，才不會推動版面。顏色跟控制項的用途對齊：

- `--shadow-focus-*` — 實心 2px 環，帶對應 `200` 階的色調
- `--shadow-focus-ring-*` — 較淡的半透明環，用在行內編輯的控制項（input、search bar）

| Name                              |
| --------------------------------- |
| `--shadow-focus-primary`          |
| `--shadow-focus-success`          |
| `--shadow-focus-info`             |
| `--shadow-focus-warning`          |
| `--shadow-focus-destructive`      |
| `--shadow-focus-ring-primary`     |
| `--shadow-focus-ring-destructive` |

```css
input:focus-visible {
  box-shadow: var(--shadow-focus-ring-primary);
}
```

## 按鈕陰影

預先做好的投影，對應五種按鈕主題。`-active` 是按下時的對應陰影。

| Name                                 |
| ------------------------------------ |
| `--shadow-button-primary`            |
| `--shadow-button-primary-active`     |
| `--shadow-button-success`            |
| `--shadow-button-success-active`     |
| `--shadow-button-info`               |
| `--shadow-button-info-active`        |
| `--shadow-button-warning`            |
| `--shadow-button-warning-active`     |
| `--shadow-button-destructive`        |
| `--shadow-button-destructive-active` |

```css
.button-primary {
  box-shadow: var(--shadow-button-primary);
}
.button-primary:active {
  box-shadow: var(--shadow-button-primary-active);
}
```

## 漸層

一組漸層，用在 primary 按鈕與強調表面。

| Name                        |
| --------------------------- |
| `--gradient-primary`        |
| `--gradient-primary-button` |

```css
.cta {
  background-image: var(--gradient-primary);
}
```

`--gradient-primary-button` 是 `--gradient-primary` 的別名，為了往後相容。兩者目前都是同一個 `linear-gradient(45deg, #33CFFF 0%, #0E86FE 100%)`。
