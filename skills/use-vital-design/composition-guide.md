# Composition Guide: Intent to Component Mapping

Recipes and registry ids for consumer assembly.

## Component Matrix

| Primitive       | Registry id      | Role                                                 | Typical Use                                              |
| :-------------- | :--------------- | :--------------------------------------------------- | :------------------------------------------------------- |
| `Alert`         | `alert`          | Inline status message (`AlertTitle`, `AlertDescription`, `AlertAction`) | Load errors, warnings, contextual tips                   |
| `Autocomplete`  | `autocomplete`   | Free-form text input with filtered suggestions       | Search inputs with suggestions, inline completion        |
| `Avatar`        | `avatar`         | User identity display (image, initials, icon)        | Navbars, user cards, table rows                          |
| `Badge`         | `badge`          | Notification count or dot indicator                  | Unread counts, icon badges (use `Tag` for status labels) |
| `Breadcrumb`    | `breadcrumb`     | Navigation trail of parent pages (`BreadcrumbEllipsis` in a `DropdownMenu` for hidden levels) | Detail pages, nested settings |
| `Button`        | `button`         | Action button. `LinkButton` is the styled link       | CTAs, toolbar actions. Nav links use `LinkButton`        |
| `ButtonGroup`   | `button-group`   | Grouped button container                             | Toolbars, segmented actions, pagination                  |
| `Calendar`      | `calendar`       | Date picker calendar (`react-day-picker`)            | Single, range, or multi-date selection                   |
| `Card`          | `card`           | Surface (`CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`) | Page sections, settings panels, summary cards |
| `Checkbox`      | `checkbox`       | Multi-select toggle with `indeterminate` prop        | Forms, table row selection, settings                     |
| `Chip`          | `chip`           | Selectable or removable filter pill                  | Active filter criteria, multi-select toggles             |
| `Collapsible`   | `collapsible`    | Expand/collapse disclosure panel                     | Accordion sections, nested sidebar menus                 |
| `Combobox`      | `combobox`       | Searchable bound value picker (single or multi-chip) | Dense option pickers, tag multi-select                   |
| `Command`       | `command`        | Command palette / searchable list (`cmdk`)           | Search palettes, hierarchical path picker (in `Popover`) |
| `Dialog`        | `dialog`         | Modal overlay (`DialogTrigger`, `DialogPopup`, `DialogHeader`, `DialogBody`, `DialogFooter`) | Confirmations, focused forms |
| `DropdownMenu`  | `dropdown-menu`  | Action menu (`DropdownMenuItem` closes on pick)      | Language, account, row overflow actions                  |
| `Editable`      | `editable`       | Inline click-to-edit text or textarea field          | Editable titles, inline table cells                      |
| `Field`         | `field`          | Form field layout (`FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`) | Form rows, horizontal/vertical field layouts |
| `Input`         | `input`          | Single-line text input                               | Forms, settings                                          |
| `InputGroup`    | `input-group`    | Compound input container with addons/buttons         | Custom prefix/suffix/action inputs                       |
| `Item`          | `item`           | Content row (`size="list"` for list density)         | Detail lists, settings rows                              |
| `Label`         | `label`          | Accessible form label                                | Form controls                                            |
| `NumberInput`   | `number-input`   | Numeric input with steppers and scrub area           | Quantities, thresholds, bounded numbers                  |
| `PasswordInput` | `password-input` | Masked password input with visibility toggle         | Login and auth forms                                     |
| `Popover`       | `popover`        | Anchored floating panel                              | Rich contextual overlays, date/time pickers, `Command`   |
| `Progress`      | `progress`       | Linear progress bar and segmented bar (`ProgressSegments`) | Uploads, quotas, multi-segment status              |
| `RadioGroup`    | `radio-group`    | Single-select radio button group                     | Settings, mutually exclusive choices                     |
| `Resizable`     | `resizable`      | Resizable split panels (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`) | Split views, inspector layouts |
| `ScrollArea`    | `scroll-area`    | Custom scrollbar viewport (`fadeEdges` optional)     | Scrollable lists, sidebars, popovers                     |
| `SearchBar`     | `search-bar`     | Search input with icon (`onChange` + `onSearch`)     | Navbars, filter bars, toolbars                           |
| `Select`        | `select`         | Flat dropdown value picker (pass `items` for labels) | Filter bars, forms                                       |
| `Separator`     | `separator`      | Horizontal or vertical semantic divider              | Section divisions, toolbars, menus                       |
| `Sheet`         | `sheet`          | Side-anchored slide-over dialog (`modal={false}` for docked) | Filters, detail drawers, mobile nav              |
| `Sidebar`       | `sidebar`        | App sidebar shell (`SidebarProvider`, `Sidebar`, `SidebarInset`, menu parts) | Application navigation layouts  |
| `Skeleton`      | `skeleton`       | Pulse loading placeholder                            | Pending cards, table rows, avatars                       |
| `Slider`        | `slider`         | Numeric value or range slider                        | Volume, thresholds, range filters                        |
| `Spinner`       | `spinner`        | Accessible spinning loader (`role="status"`)         | Pending buttons (`data-icon`), async panels              |
| `SplitButton`   | `split-button`   | Action + chevron segment                             | Primary action with a menu (`splitRender`)               |
| `Switch`        | `switch`         | Boolean on/off toggle                                | Settings rows, inline table toggles                      |
| `Table`         | `table`          | Semantic table primitives (`striped` optional)       | Data tables, static comparison tables                    |
| `TableOfContents` | `table-of-contents` | Section rail that expands into the heading list on hover/focus | In-page navigation beside long content |
| `Tabs`          | `tabs`           | Tabbed panel switcher (`underline` or `pill`)        | Detail views, segmented page sections                    |
| `Tag`           | `tag`            | Status or category label (solid/tint, removable)     | Row status, role badges, categories                      |
| `Textarea`      | `textarea`       | Multi-line text input                                | Comments, descriptions                                   |
| `TimePicker`    | `time-picker`    | Three-column scroll-snap time picker (`HH:mm:ss`)    | Time selection (often inside `Popover`)                  |
| `Toast`         | `toast`          | Imperative notification (`Toaster` + `toast.*`)      | Save, delete, and async feedback                         |
| `Toolbar`       | `toolbar`        | Flex toolbar (`ToolbarGroup`, `ToolbarSpacer`, `ToolbarSeparator`, `variant="outline"`) | Table and editor action bars |
| `Tooltip`       | `tooltip`        | Hover/focus hint (`TooltipProvider`, `TooltipTrigger`, `TooltipContent`) | Icon button labels, truncated text hints |

The registry has no pagination item: build pagination from `ButtonGroup` + `Button` (`aria-current="page"` on the active page).

## Blocks, Hooks, and Setup Items

| Registry id           | Type             | Target / Purpose                                                                                  |
| :-------------------- | :--------------- | :------------------------------------------------------------------------------------------------ |
| `sidebar-cloud-01`    | `registry:block` | Cloud sidebar: frosted glass, flat nav, no account footer (`src/blocks/sidebar-cloud-01/`)        |
| `sidebar-cloud-02`    | `registry:block` | Cloud sidebar: inline submenus + account footer (`src/blocks/sidebar-cloud-02/`)                  |
| `sidebar-cloud-03`    | `registry:block` | Cloud sidebar: dropdown submenus + header Add action (`src/blocks/sidebar-cloud-03/`)             |
| `sidebar-cloud-04`    | `registry:block` | Cloud sidebar: flat main nav + secondary nav + account footer (`src/blocks/sidebar-cloud-04/`)    |
| `sidebar-cloud-05`    | `registry:block` | Cloud sidebar: mark logo + header search/notifications + footer (`src/blocks/sidebar-cloud-05/`)  |
| `sidebar-cloud-06`    | `registry:block` | Cloud sidebar: collapsible inline submenus + account footer (`src/blocks/sidebar-cloud-06/`)      |
| `data-table-group-01` | `registry:block` | Tree data table with row selection, column pinning/resize, action bar, and filter dropdown        |
| `data-table-group-02` | `registry:block` | Expandable tree data table with sticky rail, sortable headers, column resize, and inline `Switch` |
| `data-table-group-04` | `registry:block` | Editable data table with `Editable` text cells, `Popover` pickers, `Tag` multi-select, `Calendar` |
| `use-debounce-value`  | `registry:hook`  | `useDebounceValue` hook (`@/hooks/useDebounceValue`)                                              |
| `use-is-mobile`       | `registry:hook`  | `useIsMobile` 768px viewport hook (`@/hooks/useIsMobile`)                                         |
| `vital-design-base`   | `registry:base`  | One-command install of `vital-theme`, `utils`, and `vital-icons`                                  |
| `vital-design-lint`   | `registry:file`  | `vital-design.lint.json` for Oxlint + `@shadcn/lint` token checks                                 |

---

## Intent Recipes

### Navigation Bar (`Navbar`)

- **Structure**: `flex items-center justify-between h-14 px-6 border-b border-grayscale-opacity-200 bg-background`
- **Left**: Logo slot + navigation links. A button-styled link is `LinkButton` from `@/components/ui/Button` (`variant="text"`, `render={<Link href="…" />}`). A text link is the router `<Link>` with token utilities. Do not pass `nativeButton={false}` to `Button`.
- **Right**: `Avatar` for current user + action `Button`
- **Optional**: Inline `SearchBar`. Language/account overflow is `DropdownMenu` + `DropdownMenuItem` (commands).

### Application Shell with Sidebar

- **Structure**: `SidebarProvider` wrapping `Sidebar` (or an installed `sidebar-cloud-01`..`06` block) + `SidebarInset`
- **Header inside inset**: `SidebarTrigger` + `Separator orientation="vertical"` + page title or breadcrumbs

### Filter Bar (`FilterBar`)

- **Structure**: `flex flex-wrap gap-2 items-center`
- **Primary**: `SearchBar` + `Select` or `Combobox` for filtering dimensions
- **Pills**: `Chip` list displaying currently active filter selections

### Page Header (`PageHeader`)

- **Structure**: `flex items-start justify-between mb-6`
- **Left**: `h1` title text + optional subtitle description and breadcrumbs
- **Right**: Primary action `Button` or `SplitButton`

### Table Toolbar (`DataTableToolbar`)

- **Structure**: `Toolbar` (`variant="outline"` when bordered) or `flex flex-wrap items-center justify-between gap-2 mb-4`
- **Left**: `ToolbarGroup` with `SearchBar` + `Select` / `Combobox` filter dropdowns
- **Right**: `ToolbarSpacer` + `ToolbarGroup` with action buttons using `Button` or `ButtonGroup`

### Settings Card (`SettingsCard`)

- **Structure**: `Card` (or `flex items-center justify-between p-4 border border-grayscale-opacity-200 rounded-lg`)
- **Left**: Title (`text-grayscale-opacity-900 font-medium`) + description (`text-xs text-grayscale-opacity-600`), or `Field` (`orientation="horizontal"`) with `FieldLabel` and `FieldDescription`
- **Right**: `Switch` toggle or action `Button` (`variant="text"`)

### Empty State (`EmptyState`)

- **Structure**: `flex flex-col items-center justify-center gap-4 py-16`
- **Center**: Feature icon + title + descriptive copy + primary CTA `Button`

### Login Form (`LoginForm`)

- **Structure**: `flex w-80 flex-col gap-4` (with `FieldGroup` / `Field` + `FieldLabel` + `FieldError` when labels or validation messages are shown)
- **Fields**: `Input` (account/email) + `PasswordInput` (password) + `Checkbox` (remember me) + `Button` (submit CTA)

### User Profile Card (`UserProfileCard`)

- **Structure**: `flex items-center gap-4 rounded-lg p-4 border border-grayscale-opacity-200`
- **Content**: `Avatar` + name/role text + `Tag` (status or role label) + edit action `Button` (`variant="text"`)
