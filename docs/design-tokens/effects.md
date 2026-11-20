# Effects

> Elevation shadows, focus rings, button shadows, and gradient tokens.

These tokens have light values only. They don't change under `.dark`,
so shadows are hard to see on dark surfaces. See
[Colors → Dark mode](/docs/design-tokens/colors#dark-mode).

## Elevation

Four elevation shadows for layering content. `accent` is the
softest; `top-level` is reserved for modal-class surfaces.

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

## Focus Rings

Outer rings rendered as `box-shadow` so they don't shift layout.
Match the colour to the control's intent:

- `--shadow-focus-*` — solid 2px ring tinted with the matching `200`
  step
- `--shadow-focus-ring-*` — softer translucent ring used for
  inline-edited controls (inputs, search bars)

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

## Button Shadows

Pre-baked drop shadows that match the five button themes. The
`-active` variants are the pressed-state counterparts.

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

## Gradients

A single gradient family used for primary buttons and accent
surfaces.

| Name                        |
| --------------------------- |
| `--gradient-primary`        |
| `--gradient-primary-button` |

```css
.cta {
  background-image: var(--gradient-primary);
}
```

`--gradient-primary-button` is an alias of `--gradient-primary`
provided for forward compatibility — both currently resolve to the
same `linear-gradient(45deg, #33CFFF 0%, #0E86FE 100%)`.
