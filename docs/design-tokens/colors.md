# Colors

> Vittal Design color system — primitive palettes, semantic aliases, and named component tokens.

## Overview

Vittal Design follows the [shadcn/ui](https://ui.shadcn.com/docs/theming)
naming convention for its semantic layer. Colors are defined under
`tokens/` (Style Dictionary), built into `src-v2/styles/tokens/generated.css`
as CSS custom properties on `:root`, with dark overrides on `.dark`,
and exposed to Tailwind via `@theme inline` (`--color-*`).

```ts
// 3 layers, generated from tokens/*.json by Style Dictionary
primitive  →  semantic  →  component
```

- **Primitive scales** (`--primary-50…900`, `--grayscale-100…900`,
  `--grayscale-opacity-100…900`, `--success-100…900`, etc.) — internal
  foundation. Reach for these when you need a specific shade for
  charts, illustrations, or fine-grained tinting. Tailwind utility:
  `bg-primary-500`, `text-grayscale-700`, etc.
- **Semantic tokens** (`--background`, `--primary`, `--card`,
  `--destructive`, …) — the public API. These describe **intent**
  and pair with `-foreground` siblings for legible content on the
  surface. Tailwind utility: `bg-primary text-primary-foreground`.
- **Component tokens** (`--avatar-*-fg`, `--tag-*-solid`) — closed
  palettes used by specific components.

## Dark mode

Add `class="dark"` to an ancestor, usually `<html>`. With
[next-themes](https://github.com/pacocoursey/next-themes), set
`attribute="class"`. The theme does not follow
`prefers-color-scheme`. Reinstall `@vital-design/vital-theme` so
`cssVars.dark` is written into the app stylesheet.

Every color swatch on this page shows two values: **L** is the light
value and **D** is the dark value. Each chip is drawn on its own
mode's page color, so translucent values look the way they render.

### What changes under `.dark`

- **Primitive scales** take their dark values from
  `tokens/dark/colors.json`. A scale class such as
  `text-grayscale-opacity-800` or `bg-primary-500` switches on its own.
- **Semantic tokens that alias a scale** are rebuilt from the dark
  scale: `primary` → `primary.500`, `foreground` →
  `grayscale-opacity.900`, `border` → `grayscale-opacity.200`.
- **A few semantic tokens set their own dark value** in
  `tokens/dark/colors.json`: `background`, `card`, and `popover`
  (`#232327`), and `input` (`#444447`).
- **These keep their light value:** literal `*-foreground` whites,
  the avatar and tag palettes below, and the shadow and
  gradient tokens on [Effects](/docs/design-tokens/effects).

The `.dark` ancestor paints `background` and `foreground`, so text
that sits on the page uses the dark ink.

### Writing components for both modes

- Paper uses `bg-background`, not `bg-white`.
- When a fill turns light in dark mode, such as `bg-grayscale-700` or
  `bg-grayscale-opacity-700`, put `text-background` on it so the text
  turns dark with it. Tag, Tooltip, and solid Toast do this.
- Child elements that fade the parent's text color use
  `text-current/90`, not `text-white/90`.
- `bg-white` and `text-white` stay white. Use them for marks that must
  stay white, such as switch, slider, and radio thumbs, and for text on
  saturated fills that keep one value in both modes.
- When a step lacks contrast in one mode, pick another step with the
  `dark:` variant. The data table selection bar uses
  `text-info-400 dark:text-info-200`.
- Don't hardcode colors with arbitrary values such as
  `bg-[#f8f8f9]`. Use the nearest scale step.

## Primary

The primary palette is a blue scale used for interactive elements,
buttons, focus states, and key affordances.

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--primary-900` | `bg-primary-900` | `#002040` | `#D6F5FF` |
| `--primary-800` | `bg-primary-800` | `#003A73` | `#BEF0FF` |
| `--primary-700` | `bg-primary-700` | `#0153A5` | `#99E7FF` |
| `--primary-600` | `bg-primary-600` | `#016DD8` | `#66DBFF` |
| `--primary-500` | `bg-primary-500` | `#0E86FE` | `#33CFFF` |
| `--primary-400` | `bg-primary-400` | `#419FFE` | `#33B0D9` |
| `--primary-300` | `bg-primary-300` | `#73B9FE` | `#3491B3` |
| `--primary-200` | `bg-primary-200` | `#A6D2FF` | `#34738E` |
| `--primary-100` | `bg-primary-100` | `#D9ECFF` | `#355468` |
| `--primary-50`  | `bg-primary-50`  | `#EBF5FF` | `#354151` |

## Grayscale

The default grayscale palette is fully solid — use it whenever the
surface must be opaque (popovers, tooltips, toasts, solid chips).

| Name              | Utility            | Light     | Dark      |
| ----------------- | ------------------ | --------- | --------- |
| `--grayscale-900` | `bg-grayscale-900` | `#232327` | `#FFFFFF` |
| `--grayscale-800` | `bg-grayscale-800` | `#43434B` | `#DEDEDF` |
| `--grayscale-700` | `bg-grayscale-700` | `#63636F` | `#BDBDBE` |
| `--grayscale-600` | `bg-grayscale-600` | `#848492` | `#9C9C9E` |
| `--grayscale-500` | `bg-grayscale-500` | `#A8A8B2` | `#7B7B7D` |
| `--grayscale-400` | `bg-grayscale-400` | `#C8C8D0` | `#5A5A5D` |
| `--grayscale-300` | `bg-grayscale-300` | `#DEDEE2` | `#444447` |
| `--grayscale-200` | `bg-grayscale-200` | `#F0F0F2` | `#353538` |
| `--grayscale-100` | `bg-grayscale-100` | `#F9F9FA` | `#2A2A2D` |

## Grayscale (Opacity)

The opacity variant uses `rgba(35, 35, 50, α)` so it tonally adapts
over any background. Use it for hover tints, dividers, disabled fields,
and other states where translucency is desired. `--grayscale-opacity-900`
is the only solid hex.

| Name                      | Utility                      | Light                    | Dark                        |
| ------------------------- | ---------------------------- | ------------------------ | --------------------------- |
| `--grayscale-opacity-900` | `text-grayscale-opacity-900` | `#232332`                | `#FFFFFF`                   |
| `--grayscale-opacity-800` | `text-grayscale-opacity-800` | `rgba(35, 35, 50, 0.85)` | `rgba(255, 255, 255, 0.85)` |
| `--grayscale-opacity-700` | `text-grayscale-opacity-700` | `rgba(35, 35, 50, 0.70)` | `rgba(255, 255, 255, 0.70)` |
| `--grayscale-opacity-600` | `text-grayscale-opacity-600` | `rgba(35, 35, 50, 0.55)` | `rgba(255, 255, 255, 0.55)` |
| `--grayscale-opacity-500` | `text-grayscale-opacity-500` | `rgba(35, 35, 50, 0.40)` | `rgba(255, 255, 255, 0.40)` |
| `--grayscale-opacity-400` | `text-grayscale-opacity-400` | `rgba(35, 35, 50, 0.25)` | `rgba(255, 255, 255, 0.25)` |
| `--grayscale-opacity-300` | `text-grayscale-opacity-300` | `rgba(35, 35, 50, 0.15)` | `rgba(255, 255, 255, 0.15)` |
| `--grayscale-opacity-200` | `text-grayscale-opacity-200` | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--grayscale-opacity-150` | `text-grayscale-opacity-150` | `rgba(35, 35, 50, 0.05)` | `rgba(255, 255, 255, 0.05)` |
| `--grayscale-opacity-100` | `text-grayscale-opacity-100` | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |

## Success

Positive feedback, confirmations, "saved" states.

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--success-900` | `bg-success-900` | `#082518` | `#D5F5E7` |
| `--success-800` | `bg-success-800` | `#104F33` | `#BBEFD8` |
| `--success-700` | `bg-success-700` | `#19794F` | `#95E6C3` |
| `--success-600` | `bg-success-600` | `#22A36A` | `#60D9A4` |
| `--success-500` | `bg-success-500` | `#2BCD86` | `#2BCD86` |
| `--success-400` | `bg-success-400` | `#51DA9E` | `#2DAF78` |
| `--success-300` | `bg-success-300` | `#7BE3B5` | `#2F906B` |
| `--success-200` | `bg-success-200` | `#A5ECCD` | `#31725D` |
| `--success-100` | `bg-success-100` | `#CFF5E4` | `#335350` |

## Info

Informational messaging and neutral status indicators.

| Name         | Utility       | Light     | Dark      |
| ------------ | ------------- | --------- | --------- |
| `--info-900` | `bg-info-900` | `#002733` | `#CCF3FF` |
| `--info-800` | `bg-info-800` | `#004E66` | `#ADECFF` |
| `--info-700` | `bg-info-700` | `#007599` | `#80E1FF` |
| `--info-600` | `bg-info-600` | `#009CCC` | `#40D2FF` |
| `--info-500` | `bg-info-500` | `#00C3FF` | `#00C3FF` |
| `--info-400` | `bg-info-400` | `#33CFFF` | `#0BA7D9` |
| `--info-300` | `bg-info-300` | `#66DBFF` | `#158AB3` |
| `--info-200` | `bg-info-200` | `#99E7FF` | `#206E8E` |
| `--info-100` | `bg-info-100` | `#CCF3FF` | `#2A5168` |

## Warning

Caution states — soft warnings that don't block flow.

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--warning-900` | `bg-warning-900` | `#332200` | `#FFEDCC` |
| `--warning-800` | `bg-warning-800` | `#664300` | `#FFE3AD` |
| `--warning-700` | `bg-warning-700` | `#996400` | `#FFD380` |
| `--warning-600` | `bg-warning-600` | `#CC8600` | `#FFBD40` |
| `--warning-500` | `bg-warning-500` | `#FFA700` | `#FFA700` |
| `--warning-400` | `bg-warning-400` | `#FFB933` | `#D7900D` |
| `--warning-300` | `bg-warning-300` | `#FFCA66` | `#AE791A` |
| `--warning-200` | `bg-warning-200` | `#FFDC99` | `#866328` |
| `--warning-100` | `bg-warning-100` | `#FFEDCC` | `#5D4C35` |

## Destructive

Errors, destructive actions, hard validation failures.

| Name                | Utility              | Light     | Dark      |
| ------------------- | -------------------- | --------- | --------- |
| `--destructive-900` | `bg-destructive-900` | `#1F0B00` | `#FBDCCC` |
| `--destructive-800` | `bg-destructive-800` | `#521C00` | `#F9C7AD` |
| `--destructive-700` | `bg-destructive-700` | `#852D00` | `#F5A780` |
| `--destructive-600` | `bg-destructive-600` | `#B83F00` | `#F07C40` |
| `--destructive-500` | `bg-destructive-500` | `#EB5000` | `#EB5000` |
| `--destructive-400` | `bg-destructive-400` | `#FF6B1F` | `#C74B0D` |
| `--destructive-300` | `bg-destructive-300` | `#FF8D52` | `#A2451A` |
| `--destructive-200` | `bg-destructive-200` | `#FFAE85` | `#7E4028` |
| `--destructive-100` | `bg-destructive-100` | `#FFD0B8` | `#593A35` |

## Semantic Tokens

Intent-based aliases that point to primitive colors. Each surface
ships with a paired `-foreground` token — use them together so text
remains legible regardless of theme overrides.

```tsx
<button className="bg-primary text-primary-foreground">Save</button>
<div className="bg-card text-card-foreground border border-border">…</div>
```

### Surfaces

Page chrome, cards, popovers, and muted/accent regions. `background`
is the page; `card` and `popover` are elevated containers; `muted`
and `accent` are subtle background tints (e.g. table stripes, hover
states).

| Name                   | Utility                   | Light                    | Dark                        |
| ---------------------- | ------------------------- | ------------------------ | --------------------------- |
| `--background`         | `bg-background`           | `#FFFFFF`                | `#232327`                   |
| `--foreground`         | `text-foreground`         | `#232332`                | `#FFFFFF`                   |
| `--card`               | `bg-card`                 | `#FFFFFF`                | `#232327`                   |
| `--card-foreground`    | `text-card-foreground`    | `#232332`                | `#FFFFFF`                   |
| `--popover`            | `bg-popover`              | `#FFFFFF`                | `#232327`                   |
| `--popover-foreground` | `text-popover-foreground` | `#232332`                | `#FFFFFF`                   |
| `--muted`              | `bg-muted`                | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |
| `--muted-foreground`   | `text-muted-foreground`   | `rgba(35, 35, 50, 0.70)` | `rgba(255, 255, 255, 0.70)` |
| `--accent`             | `bg-accent`               | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--accent-foreground`  | `text-accent-foreground`  | `#232332`                | `#FFFFFF`                   |

### Actions

Brand action surfaces. `primary` is the dominant call-to-action;
`secondary` is the alternative button surface.

| Name                     | Utility                     | Light                    | Dark                        |
| ------------------------ | --------------------------- | ------------------------ | --------------------------- |
| `--primary`              | `bg-primary`                | `#0E86FE`                | `#33CFFF`                   |
| `--primary-foreground`   | `text-primary-foreground`   | `#FFFFFF`                | `#FFFFFF`                   |
| `--secondary`            | `bg-secondary`              | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |
| `--secondary-foreground` | `text-secondary-foreground` | `#232332`                | `#FFFFFF`                   |

### Status

Feedback colors paired with foreground for legible content.

| Name                       | Utility                       | Light     | Dark      |
| -------------------------- | ----------------------------- | --------- | --------- |
| `--success`                | `bg-success`                  | `#2BCD86` | `#2BCD86` |
| `--success-foreground`     | `text-success-foreground`     | `#FFFFFF` | `#FFFFFF` |
| `--info`                   | `bg-info`                     | `#00C3FF` | `#00C3FF` |
| `--info-foreground`        | `text-info-foreground`        | `#FFFFFF` | `#FFFFFF` |
| `--warning`                | `bg-warning`                  | `#FFA700` | `#FFA700` |
| `--warning-foreground`     | `text-warning-foreground`     | `#232332` | `#FFFFFF` |
| `--destructive`            | `bg-destructive`              | `#EB5000` | `#EB5000` |
| `--destructive-foreground` | `text-destructive-foreground` | `#FFFFFF` | `#FFFFFF` |

### Form

Borders, input strokes, and focus rings. `border` is the 0.08 hairline
for dividers and single edges, and it is also the default color of a bare
`border` class. `border-overlap` is solid, for edges that stack or cross,
such as avatar outlines in a group or tree rails, where a translucent line
would darken. `input` strokes form fields; `ring` paints focus outlines.

| Name               | Utility                 | Light                    | Dark                        |
| ------------------ | ----------------------- | ------------------------ | --------------------------- |
| `--border`         | `border-border`         | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--border-overlap` | `border-border-overlap` | `#DEDEE2`                | `#444447`                   |
| `--input`          | `border-input`          | `#DEDEE2`                | `#444447`                   |
| `--ring`           | `ring-ring`             | `#0E86FE`                | `#33CFFF`                   |

### Charts

Five-step palette for data visualization. Defaults rotate through
`primary → success → warning → info → destructive` so chart series
inherit brand color regardless of theme overrides.

| Name        | Utility      | Light     | Dark      |
| ----------- | ------------ | --------- | --------- |
| `--chart-1` | `bg-chart-1` | `#0E86FE` | `#33CFFF` |
| `--chart-2` | `bg-chart-2` | `#2BCD86` | `#2BCD86` |
| `--chart-3` | `bg-chart-3` | `#FFA700` | `#FFA700` |
| `--chart-4` | `bg-chart-4` | `#00C3FF` | `#00C3FF` |
| `--chart-5` | `bg-chart-5` | `#EB5000` | `#EB5000` |

### Sidebar

Application sidebar shell slots (shadcn-compatible). Used by the
[Sidebar](/docs/components/sidebar) primitive utilities such as
`bg-sidebar`, `text-sidebar-foreground`, and `border-sidebar-border`.
Product blocks may override individual slots (for example
`[--sidebar:transparent]` on the cloud shell).

| Slot                           | Default alias           |
| ------------------------------ | ----------------------- |
| `--sidebar`                    | `grayscale.100`         |
| `--sidebar-foreground`         | `grayscale.900`         |
| `--sidebar-primary`            | `primary.500`           |
| `--sidebar-primary-foreground` | white                   |
| `--sidebar-accent`             | `primary.50`            |
| `--sidebar-accent-foreground`  | `primary.700`           |
| `--sidebar-border`             | `grayscale-opacity.200` |
| `--sidebar-ring`               | `primary.300`           |

| Name                           | Utility                           | Light                    | Dark                        |
| ------------------------------ | --------------------------------- | ------------------------ | --------------------------- |
| `--sidebar`                    | `bg-sidebar`                      | `#F9F9FA`                | `#2A2A2D`                   |
| `--sidebar-foreground`         | `text-sidebar-foreground`         | `#232327`                | `#FFFFFF`                   |
| `--sidebar-primary`            | `bg-sidebar-primary`              | `#0E86FE`                | `#33CFFF`                   |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | `#FFFFFF`                | `#FFFFFF`                   |
| `--sidebar-accent`             | `bg-sidebar-accent`               | `#EBF5FF`                | `#354151`                   |
| `--sidebar-accent-foreground`  | `text-sidebar-accent-foreground`  | `#0153A5`                | `#99E7FF`                   |
| `--sidebar-border`             | `border-sidebar-border`           | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--sidebar-ring`               | `ring-sidebar-ring`               | `#73B9FE`                | `#3491B3`                   |

### Vittal Extensions

Tokens unique to Vittal Design with no shadcn equivalent. Kept
unprefixed for ecosystem consistency (matching how Origin UI ships
its extensions).

| Name                    | Light                    | Dark                        |
| ----------------------- | ------------------------ | --------------------------- |
| `--text-tertiary`       | `rgba(35, 35, 50, 0.55)` | `rgba(255, 255, 255, 0.55)` |
| `--text-disabled`       | `rgba(35, 35, 50, 0.25)` | `rgba(255, 255, 255, 0.25)` |
| `--interactive-hover`   | `#016DD8`                | `#66DBFF`                   |
| `--interactive-pressed` | `#0153A5`                | `#99E7FF`                   |
| `--interactive-subtle`  | `#EBF5FF`                | `#354151`                   |

## Avatar Palette

Each named avatar color exposes three tokens — `fg` (text /
initials), `border`, and `bg`. Used by `AvatarRoot color="…"`.
These tokens have light values only, so avatars keep the same colors
under `.dark`.

| Name         | Color                    | Border                       | Bg                       |
| ------------ | ------------------------ | ---------------------------- | ------------------------ |
| `tiffany`    | `--avatar-tiffany-fg`    | `--avatar-tiffany-border`    | `--avatar-tiffany-bg`    |
| `green`      | `--avatar-green-fg`      | `--avatar-green-border`      | `--avatar-green-bg`      |
| `orange`     | `--avatar-orange-fg`     | `--avatar-orange-border`     | `--avatar-orange-bg`     |
| `pink`       | `--avatar-pink-fg`       | `--avatar-pink-border`       | `--avatar-pink-bg`       |
| `blue`       | `--avatar-blue-fg`       | `--avatar-blue-border`       | `--avatar-blue-bg`       |
| `sky`        | `--avatar-sky-fg`        | `--avatar-sky-border`        | `--avatar-sky-bg`        |
| `purple`     | `--avatar-purple-fg`     | `--avatar-purple-border`     | `--avatar-purple-bg`     |
| `light-gold` | `--avatar-light-gold-fg` | `--avatar-light-gold-border` | `--avatar-light-gold-bg` |
| `salmon`     | `--avatar-salmon-fg`     | `--avatar-salmon-border`     | `--avatar-salmon-bg`     |
| `ice`        | `--avatar-ice-fg`        | `--avatar-ice-border`        | `--avatar-ice-bg`        |
| `lavender`   | `--avatar-lavender-fg`   | `--avatar-lavender-border`   | `--avatar-lavender-bg`   |

```css
background: var(--avatar-tiffany-bg);
border-color: var(--avatar-tiffany-border);
color: var(--avatar-tiffany-fg);
```

## Tag Palette

Each named tag color exposes `solid` (text / icon) and `tint`
(background). Used by `Tag color="…"`. These tokens have light
values only, so tags keep the same colors under `.dark`.

| Name     | Solid                | Tint                |
| -------- | -------------------- | ------------------- |
| `teal`   | `--tag-teal-solid`   | `--tag-teal-tint`   |
| `olive`  | `--tag-olive-solid`  | `--tag-olive-tint`  |
| `brown`  | `--tag-brown-solid`  | `--tag-brown-tint`  |
| `rose`   | `--tag-rose-solid`   | `--tag-rose-tint`   |
| `indigo` | `--tag-indigo-solid` | `--tag-indigo-tint` |
| `blue`   | `--tag-blue-solid`   | `--tag-blue-tint`   |
| `green`  | `--tag-green-solid`  | `--tag-green-tint`  |
| `gold`   | `--tag-gold-solid`   | `--tag-gold-tint`   |
| `red`    | `--tag-red-solid`    | `--tag-red-tint`    |
| `purple` | `--tag-purple-solid` | `--tag-purple-tint` |
| `navy`   | `--tag-navy-solid`   | `--tag-navy-tint`   |

```css
background: var(--tag-teal-tint);
color: var(--tag-teal-solid);
```
