# Changelog

> Changes to the Vital Design registry that affect how you install or use it.

This page tracks the **registry-backed** design system on vittal.design: components, blocks, icons, and tokens. It does not track the legacy `@fed/vital-design` npm package.

That package is built from `src/` and stays available for existing apps. New work ships through the registry. If you still import from the package, see the [Migration Guide](/docs/getting-started/migration-guide).

Entries are grouped by the month they shipped, newest first. We only record changes that affect how you install or use the registry — new components, breaking usage, tokens, and install steps. Documentation-only updates, such as new examples, are not listed.

## November 2026

### Sidebar props for embedded and multiple sidebars

#### Components

- **Sidebar:** new optional props for sidebars that live inside another app's page or share a page with a second sidebar:

  - `SidebarProvider` `cookieName` writes the open state under another cookie name; `cookieName={null}` writes no cookie.
  - `SidebarProvider` `isMobile` replaces the built-in `768px` check. `isMobile={false}` never switches to the mobile Sheet.
  - `SidebarTrigger` takes `children` to replace its icon and `render` to use another element, such as `render={<Button variant="ghost" size="icon-md" />}`. A rendered element keeps its own look. Calling `event.preventDefault()` in `onClick` stops the toggle.
  - `Sidebar` takes `render` to change its root element, such as `<aside />` or `<nav />`. It is ignored on mobile, where the panel is a Sheet.
  - `SidebarMenuButton` no longer throws outside a `SidebarProvider`; it renders as expanded, without its tooltip.

  Leaving the new props out keeps the current behavior. Reinstall `sidebar` to pick this up.

### Status, file, and arrow icons from the design list

New icon items, all drawn by the design team in the 20×20 frame:

- Status: `icon-circle-check`, `icon-circle-check-solid`, `icon-circle-xmark`, `icon-circle-xmark-solid`, `icon-circle-info`, `icon-circle-info-solid`, `icon-circle-exclamation-solid`, `icon-circle-minus-solid`, `icon-circle-question`, `icon-exclamation-solid`, `icon-circle-dashed`, `icon-circle-dot`.
- Files and arrows: `icon-file-lines`, `icon-file-arrow-up-solid`, `icon-arrow-right-long`, `icon-arrow-up-right-from-square`, `icon-arrow-up-right-from-square-solid`.
- Other: `icon-clock-solid`, `icon-ellipsis-vertical`, `icon-grip-dots-vertical`.

`InfoIcon` is renamed `CircleInfoIcon` (`@vital-design/icon-circle-info`) to match the design list, and now uses the design artwork. The old name and registry item still work but are deprecated; `InfoIcon` re-exports `CircleInfoIcon`. Switch to the new name.

Updated artwork:

- `ClockIcon` uses the redrawn design artwork; the hand is redrawn.
- `ClearIcon` uses the redrawn design artwork; the circle is centred in the frame (it sat 0.25px high) and the × is larger.
- `CalendarDaysIcon` is about 0.25px larger on each side, matching the design file.
- `CircleUserIcon`, `SidebarIcon`, and `ThumbtackSolidIcon` look the same but are now drawn with strokes, so the `strokeWidth` prop changes their line weight like the other icons.

Component changes:

- `data-table`: the drag handle in the column-visibility popover is now a 20px `GripDotsVerticalIcon` instead of six drawn dots.
- `sidebar-cloud-04`: the Support item uses `CircleInfoIcon`, and the external-link mark uses `ArrowUpRightFromSquareIcon`.

**Temporary artwork.** These icons still use placeholder artwork until the design team confirms the final version. Only the SVG will change:

- Font Awesome Pro in the design file, so the previous Vittal artwork is used instead: `MagnifyingGlassIcon`, `PlusIcon`, `SpinnerIcon`, `ShieldCheckIcon`, `SquareArrowOutUpRightIcon`.
- Font Awesome Free shapes not yet redrawn: `FlagIcon`, `UserIcon`.
- Not in the design file yet: `PanelLeftIcon`.
- Drawn by design but not yet confirmed: `XmarkIcon`, `EyeIcon`.

### Tree Select

- **[Tree Select](/docs/blocks/tree-select):** a new block for searchable hierarchical path pickers, built from `Command` and `Popover`. Pass a flat item list; selecting a leaf returns its value and the path from the top level. It replaces the Hierarchical Picker example that was on the Command page.

```bash
npx shadcn@latest add @vital-design/tree-select
```

### Portal container and positioning props on popup content

#### Components

- **Tooltip, Select, Combobox, Autocomplete, Dropdown Menu:** `TooltipContent`, `SelectContent`, `ComboboxContent`, `AutocompleteContent`, `DropdownMenuContent`, and `DropdownMenuSubContent` now take the same portal and positioning props as `PopoverContent`:

  - `portalContainer` renders the popup inside another node, such as a CSS-scoped root, instead of `document.body`.
  - `anchor` positions the popup against an element other than the trigger.
  - `collisionBoundary`, `collisionPadding`, `collisionAvoidance`, `positionMethod`, `sticky`, `arrowPadding`, and `disableAnchorTracking` go to the positioner.
  - `keepMounted` goes to the portal. `SelectContent` doesn't have it, because Base UI's Select portal doesn't accept it.

  All are optional; leaving them out keeps the current behavior. `DropdownMenuSubContent` used to pass `anchor` to the popup element; it now positions the submenu. Reinstall `tooltip`, `select`, `combobox`, `autocomplete`, or `dropdown-menu` to pick this up.

### Popover anchor, portal container, and positioning props

#### Components

- **Popover:** `PopoverContent` accepts `anchor`, so a popover can be positioned against an element other than its trigger, or opened with no trigger at all. It also accepts `portalContainer`, like `DropdownMenuContent`, to render the popup inside a scoped root instead of `document.body`. If you patched these props into your copy, you can drop the patch. See [Custom Anchor](/docs/components/popover#custom-anchor) and [Portal Container](/docs/components/popover#portal-container).
- `PopoverContent` also passes `collisionBoundary`, `collisionPadding`, `collisionAvoidance`, `positionMethod`, `sticky`, `arrowPadding`, and `disableAnchorTracking` to the positioner, and `keepMounted` to the portal. All are optional; leaving them out keeps the current behavior. Reinstall `popover` to pick this up.

### Table of Contents

#### Components

- **Table of Contents:** now a registry item. Install it with `npx shadcn@latest add @vital-design/table-of-contents`. It's a compact rail of section ticks that expands into the full list of headings on hover or keyboard focus. See [Table of Contents](/docs/components/table-of-contents).

### Dark color tokens

Reinstall the theme to pick up dark colors:

```bash
npx shadcn@latest add @vital-design/vital-theme
```

Light values stay on `:root`. The same custom properties change when an ancestor has `class="dark"`. `prefers-color-scheme` does not switch them. See [Colors → Dark mode](/docs/design-tokens/colors#dark-mode).

Primitive scales, and semantic aliases that point at those scales, have dark values. `background`, `card`, and `popover` are `#232327`, and `input` is `#444447`. The `.dark` ancestor uses that paper and the dark foreground. `border` and `border-overlap` alias scales, so they follow them: white at 0.08 and `#444447`.

**Scale classes switch too.** Under `.dark`, a scale class such as `bg-grayscale-50` or `text-primary-500` resolves to that scale's dark value. This is part of the theme's contract, so a scale class in your own code changes with the mode. Fixed Tailwind colors and arbitrary values do not: `bg-white` stays white and is reserved for marks such as switch thumbs, and `text-white` stays white.

Components used to paint their paper with `bg-white`, which stays white in dark mode. They now use `bg-background`, and some also fix text that was hard to read on dark paper. Reinstall the theme and the items you use:

```bash
npx shadcn@latest add @vital-design/vital-theme
npx shadcn@latest add @vital-design/alert @vital-design/autocomplete @vital-design/button @vital-design/calendar
npx shadcn@latest add @vital-design/card @vital-design/checkbox @vital-design/combobox @vital-design/command
npx shadcn@latest add @vital-design/dialog @vital-design/dropdown-menu @vital-design/field @vital-design/input
npx shadcn@latest add @vital-design/input-group @vital-design/item @vital-design/number-input @vital-design/pagination
npx shadcn@latest add @vital-design/popover @vital-design/radio-group @vital-design/resizable @vital-design/select
npx shadcn@latest add @vital-design/sheet @vital-design/split-button @vital-design/table @vital-design/tag
npx shadcn@latest add @vital-design/textarea @vital-design/time-picker @vital-design/toast @vital-design/toolbar
npx shadcn@latest add @vital-design/tooltip
npx shadcn@latest add @vital-design/data-table @vital-design/sidebar-cloud-01 @vital-design/sidebar-cloud-02 @vital-design/sidebar-cloud-03
npx shadcn@latest add @vital-design/sidebar-cloud-04 @vital-design/sidebar-cloud-05 @vital-design/sidebar-cloud-06
```

The theme also adds a `dark:` variant that matches inside a `.dark` ancestor.

Known limitations, still waiting on design:

- `warning-foreground` follows the grayscale ink, so it turns white under `.dark`, and text on warning fills loses contrast. The other white foregrounds, such as `primary-foreground`, stay white.
- Avatar and Tag palettes, shadows, and gradients have no dark values.
- Solid buttons keep white text.
- The frosted backdrop in the sidebar-cloud blocks stays light, so their menu text is hard to read in dark mode.
- The info Tooltip and info Toast keep their current dark backgrounds.

### SplitButton menus

#### Components

- **SplitButton:** `splitRender` turns the chevron into a menu trigger, so `<SplitButton splitRender={<DropdownMenuTrigger />}>` inside a `DropdownMenu` opens, positions, and closes the menu without your own state or anchor. `open` is now optional, and `splitLabel` sets the chevron's accessible name. Existing `open` + `splitOnClick` code keeps working. See [SplitButton](/docs/components/split-button). Reinstall `split-button` to pick this up.

### Tag semantics

#### Components

- **Tag:** no longer renders `role="option"` or `aria-selected`. A clickable Tag with `selected` now sets `aria-pressed` on its button. If your tests find Tags with `getByRole('option')`, query by text or `data-slot="tag"` instead. Reinstall `tag` to pick this up.
- **Data Table:** the tags editor shows each choice as a `Tag`, the same pill as the cell, instead of plain text. Reinstall `data-table` to pick this up.

### Pagination

- **[Pagination](/docs/components/pagination):** added composable page links, first/last and previous/next controls, disabled states, and an ellipsis that opens a menu of the hidden pages. Use anchors for navigation or compose native buttons with `render` for in-place updates. Installing `@vital-design/pagination` also installs the angle icons it uses.
- **[Table Pagination](/docs/blocks/table-pagination):** a single-row table footer with page controls, a page jump, rows per page, and the current range. Narrow rows hide the jump field and the page-size select.

```bash
npx shadcn@latest add @vital-design/pagination @vital-design/table-pagination
```

### Breadcrumb

#### Components

- **Breadcrumb:** now available from the registry as `breadcrumb`. See [Breadcrumb](/docs/components/breadcrumb).

### Icons use the design names and 20×20 frames

**Breaking:** icon names now match the design team's icon list. The old registry items are removed.

| Old item                                  | New item                              |
| ----------------------------------------- | ------------------------------------- |
| `@vital-design/icon-chevron-left`         | `@vital-design/icon-angle-left`       |
| `@vital-design/icon-chevron-right`        | `@vital-design/icon-angle-right`      |
| `@vital-design/icon-chevron-double-left`  | `@vital-design/icon-angles-left`      |
| `@vital-design/icon-chevron-double-right` | `@vital-design/icon-angles-right`     |
| `@vital-design/icon-chevron-down`         | `@vital-design/icon-angle-down`       |
| `@vital-design/icon-chevron-up`           | `@vital-design/icon-angle-up`         |
| `@vital-design/icon-close`                | `@vital-design/icon-xmark`            |
| `@vital-design/icon-disabled`             | `@vital-design/icon-ban`              |
| `@vital-design/icon-calendar`             | `@vital-design/icon-calendar-days`    |
| `@vital-design/icon-search`               | `@vital-design/icon-magnifying-glass` |

Update imports to the new component names: `AngleLeftIcon`, `AngleRightIcon`, `AnglesLeftIcon`, `AnglesRightIcon`, `AngleDownIcon`, `AngleUpIcon`, `XmarkIcon`, `BanIcon`, `CalendarDaysIcon`, `MagnifyingGlassIcon`. Reinstall the components you use; every component that depended on a renamed item now depends on the new one.

The carets take the `Solid` suffix, because a plain name means the Regular style: `CaretDownIcon` and `CaretUpIcon` are now `CaretDownSolidIcon` and `CaretUpSolidIcon` (`@vital-design/icon-caret-down-solid`, `@vital-design/icon-caret-up-solid`). The old names and registry items still work but are deprecated; `CaretDownIcon` re-exports `CaretDownSolidIcon`. Switch to the new names.

New icon items: `icon-angle-down-solid`, `icon-angle-up-solid`, `icon-angle-left-solid`, `icon-angle-right-solid`, `icon-angle-left-to-line`, `icon-angle-right-to-line`, `icon-check-solid`, `icon-minus-solid`, `icon-bars`, `icon-circle-user`, `icon-home`, `icon-inbox`, `icon-life-ring`, `icon-planet-ringed`, `icon-sidebar`, `icon-thumbtack`, `icon-thumbtack-solid`, `icon-bell-slash`, `icon-caret-left-solid`, `icon-caret-right-solid`, `icon-note`, `icon-placeholder`, `icon-placeholder-solid`. `PlaceholderIcon` is the design's `*icons`: a stand-in for a slot that takes any icon. See [Icons → Regular and Solid](/docs/components/icons#regular-and-solid).

Every icon now uses a 20×20 frame with padding, so a `size-*` class sets the frame, not the glyph. Components size icons to the Figma frame: icons inside `Button` (`data-icon`) are 18px (`md`, `icon-md`) and 20px (`lg`, `icon-lg`) with no margin, and `Sidebar` menu icons are 20px. If you set your own icon sizes, check them against the new frames.

Component changes that follow the design list:

- `checkbox` uses `CheckSolidIcon` and `MinusSolidIcon`.
- `number-input` steppers use `CaretUpSolidIcon` and `CaretDownSolidIcon`.
- `split-button` uses the regular angle on white themes and the solid angle on coloured themes.
- The angle, angles, and angle-to-line icons use the redrawn design artwork, so the glyph is 10px tall in the 20px frame instead of 8.3px. This shows in `calendar` and `split-button`.
- `EllipsisIcon` no longer has a built-in 0.55 fill opacity; it takes the text color like every other icon. In `breadcrumb` the collapsed ellipsis is now `grayscale-500`, the same as the other inactive items. If you added `[fill-opacity:1]` to undo it, remove it.
- `data-table` group rows use a 20px `CaretDownSolidIcon` (rotated when collapsed), and the popover option check uses `CheckSolidIcon` like `checkbox`. The selection bar's close icon is 20px and the add-row plus is 18px.

**Temporary artwork.** These icons keep their names and sizes, but the artwork is a placeholder until the design team draws the final version. Only the SVG will change:

- Font Awesome Pro in the design file, so the previous Vittal artwork is used instead: `MagnifyingGlassIcon`, `PlusIcon`, `SpinnerIcon`, `ShieldCheckIcon`, `SquareArrowOutUpRightIcon`.
- Font Awesome Free shapes not yet redrawn: `ClockIcon`, `FlagIcon`, `UserIcon`, `EllipsisIcon`.
- Not in the design file yet: `InfoIcon`, `ClearIcon`, `PanelLeftIcon`.
- Drawn by design but not yet confirmed: `XmarkIcon`, `AngleLeftIcon`, `AngleRightIcon` (and their Solid versions), `AnglesLeftIcon`, `AnglesRightIcon`, `CircleUserIcon`, `ThumbtackSolidIcon`.

### Border tokens

`--border` is now the 0.08 hairline (`grayscale-opacity-200`), the line Figma uses for dividers. It was a solid `#DEDEE2`. A new `--border-overlap` token keeps the solid `#DEDEE2` for edges that stack or cross, where a translucent line would darken. Use it with `border-border-overlap`.

The theme also sets a default border color, so a bare `border`, `border-t`, or `border-b` draws the `--border` hairline. Before, Tailwind v4 drew it in the text color.

Avatar, `AvatarGroupCount`, and the group rails in the Data Table block move to `--border-overlap`, so they look the same as before. The Dialog footer divider and any `border-border` you use for dividers get lighter. A `FieldLabel` that wraps a `Field` (the choice-card layout) draws its outline with a bare `border`, so it also goes from the text color to the hairline. Reinstall the theme and these items:

```bash
npx shadcn@latest add @vital-design/vital-theme
npx shadcn@latest add @vital-design/avatar
```

### Data Table block

**Breaking.** The three data table blocks are replaced by one generic block, `@vital-design/data-table`. You pass it your own `data` and `columns`; it groups rows by any field, up to two levels, with a 新增 row per group. It also has search, sorting, resizable and reorderable columns, row selection with a floating action bar, and inline and popover cell editing. The checkbox and actions columns stay pinned and cast a shadow while other columns scroll under them. A review-task example shows how to wire it up. The block uses the new `@vital-design/icon-gear`.

These ids are retired and leave the registry: `@vital-design/data-table-group-01` (candidate tree), `@vital-design/data-table-group-02` (ESG emission tree), and `@vital-design/data-table-group-04` (editable cells). Copies you already installed keep working, since a block is your own code. To move over, install the new block and port your columns and rows; grouping by a field replaces the fixed tree rows. Not carried over yet: a row count in group headers, more than one left-pinned column, and `columnResizeMode="onEnd"`.

```bash
npx shadcn@latest add @vital-design/data-table
```

See [Data Table](/docs/blocks/data-table).

### Dialog and Sheet heights on mobile

#### Components

- **Dialog:** the popup's max height now follows the viewport it sits in (`max-h-full`) instead of `calc(100vh-2rem)`. On mobile browsers, `100vh` is taller than the visible area while the address bar shows, so a tall dialog ran under the toolbar and lost its bottom spacing. It now keeps the viewport's 1rem padding and scrolls inside. If you added your own `max-h-[calc(100dvh-…)]` to work around this, you can drop it. Reinstall `dialog` to pick this up.
- **Sheet:** `top` and `bottom` sheets cap at `80dvh` instead of `80vh`, to match the `h-dvh` that `left` and `right` sheets already use. Reinstall `sheet` to pick this up.

## October 2026

### React 19

The registry and the docs site are developed and tested on React 19. New projects should use React 19. See [Installation](/docs/getting-started/installation).

### Link button

#### Components

- **Button:** added `LinkButton`, a link styled as a button. It shares Button's variants, themes, and sizes, renders `<a>` (or a router link via `render`), and keeps link semantics. Use it instead of `<Button nativeButton={false} render={<a />}>`, which reports links as buttons. See [Button → Link](/docs/components/button#link).

### Table stripes and column resize

#### Table

[Table](/docs/components/table) can stripe body rows. `striped` paints even rows. `striped="odd"` paints the other rows. Set `--table-stripe` and `--table-row-hover` on the table to change the colors.

Reinstall the table to pick this up:

```bash
npx shadcn@latest add @vital-design/table
```

**Breaking:** hover, expanded, and selected row backgrounds no longer use `bg-grayscale-opacity-100`. They read `--table-row-hover`. With `striped` left off, that variable still falls back to `--grayscale-opacity-100`, so the default look stays the same.

- `hover:bg-grayscale-opacity-100` → `hover:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`
- `data-[state=selected]:bg-grayscale-opacity-100` → `data-[state=selected]:bg-[var(--table-row-hover,var(--grayscale-opacity-100))]`

`TableHead` is now `position: relative`. An absolutely positioned child lines up with the header cell. If one of yours was lined up with an ancestor outside the cell, point it at the cell instead.

#### Icons

Caret up and caret down are new registry icons. See [Icons](/docs/components/icons).

```bash
npx shadcn@latest add @vital-design/icon-caret-up
npx shadcn@latest add @vital-design/icon-caret-down
```

#### Data tables

[Data Table group 01](/docs/blocks/data-table-group-01) and [group 02](/docs/blocks/data-table-group-02) can resize columns. Drag the header edge. `columnResizeMode` defaults to `onChange`. Use `onEnd` on a wide table with many pinned columns so the columns stay put until you release.

Reinstall both blocks. Group 02 also swaps its sort icon from chevron up to the caret pair, and drops `@vital-design/icon-chevron-up`. `@vital-design/icon-chevron-down` stays for the row rail. The sort label truncates so the caret stays visible when a column gets narrow.

```bash
npx shadcn@latest add @vital-design/data-table-group-01
npx shadcn@latest add @vital-design/data-table-group-02
```

## September 2026

### Registry on vittal.design

The documentation site and the shadcn-compatible registry now publish together at [vittal.design](https://vittal.design). This entry is a snapshot of what is available today. Later entries will list only what changed.

#### Install

Add the registry, then install items with the shadcn CLI. See [Installation](/docs/getting-started/installation).

```bash
npx shadcn@latest add @vital-design/button
```

Registry URL: `https://vittal.design/r/{name}.json`

#### Components

**Foundation:** [Alert](/docs/components/alert), [Avatar](/docs/components/avatar), [Badge](/docs/components/badge), [Button](/docs/components/button), [Button Group](/docs/components/button-group), [Chip](/docs/components/chip), [Icons](/docs/components/icons), [Item](/docs/components/item), [Label](/docs/components/label), [Separator](/docs/components/separator), [Skeleton](/docs/components/skeleton), [Spinner](/docs/components/spinner), [Split Button](/docs/components/split-button), [Tag](/docs/components/tag)

**Inputs:** [Checkbox](/docs/components/checkbox), [Editable](/docs/components/editable), [Field](/docs/components/field), [Input](/docs/components/input), [Number Input](/docs/components/number-input), [Radio Group](/docs/components/radio-group), [Search Bar](/docs/components/search-bar), [Slider](/docs/components/slider), [Switch](/docs/components/switch), [Textarea](/docs/components/textarea)

**Pickers and menus:** [Autocomplete](/docs/components/autocomplete), [Calendar](/docs/components/calendar), [Combobox](/docs/components/combobox), [Command](/docs/components/command), [Dropdown Menu](/docs/components/dropdown-menu), [Popover](/docs/components/popover), [Select](/docs/components/select), [Time Picker](/docs/components/time-picker)

**Overlays and feedback:** [Dialog](/docs/components/dialog), [Sheet](/docs/components/sheet), [Toast](/docs/components/toast), [Tooltip](/docs/components/tooltip)

**Layout and data:** [Card](/docs/components/card), [Collapsible](/docs/components/collapsible), [Progress](/docs/components/progress), [Resizable](/docs/components/resizable), [Scroll Area](/docs/components/scroll-area), [Sidebar](/docs/components/sidebar), [Table](/docs/components/table), [Tabs](/docs/components/tabs), [Toolbar](/docs/components/toolbar)

#### Blocks

- Cloud Sidebar: [flat](/docs/blocks/sidebar/cloud/flat), [inline submenus](/docs/blocks/sidebar/cloud/inline-submenus), [collapsible submenus](/docs/blocks/sidebar/cloud/collapsible-submenus), [dropdown submenus](/docs/blocks/sidebar/cloud/dropdown-submenus), [secondary nav](/docs/blocks/sidebar/cloud/secondary-nav), [header actions](/docs/blocks/sidebar/cloud/header-actions)
- Data Table: [group 01](/docs/blocks/data-table-group-01), [group 02](/docs/blocks/data-table-group-02), [group 04](/docs/blocks/data-table-group-04)

#### Tokens

[Colors](/docs/design-tokens/colors), [typography](/docs/design-tokens/typography), [radius](/docs/design-tokens/radius), and [effects](/docs/design-tokens/effects) ship as CSS variables with the registry theme.

#### Platform

- Components use **Base UI** primitives and **Tailwind CSS 4**
- Style isolation follows the `data-slot` convention in [Tailwind CSS Setup](/docs/getting-started/tailwind-setup)
- Agent index: [llms.txt](/llms.txt)
