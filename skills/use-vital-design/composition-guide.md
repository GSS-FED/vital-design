# Composition Guide: Intent to Component Mapping

Recipes and registry ids for consumer assembly.

## Component Matrix

| Primitive       | Registry id      | Role                                      | Typical Use                                              |
| :-------------- | :--------------- | :---------------------------------------- | :------------------------------------------------------- |
| `Button`        | `button`         | Action. `LinkButton` is the styled link   | CTAs. Nav links use `LinkButton`                         |
| `ButtonGroup`   | `button-group`   | Grouped button container                  | Toolbars, segmented actions                              |
| `SplitButton`   | `split-button`   | Action + toggle segment, no built-in menu | Primary action with a caller-owned popup                 |
| `Avatar`        | `avatar`         | User identity display                     | Navbars, user cards                                      |
| `SearchBar`     | `search-bar`     | Search input with icon                    | Navbars, filter bars, toolbars                           |
| `Select`        | `select`         | Bound value picker                        | Filter bars, forms                                       |
| `Combobox`      | `combobox`       | Searchable bound picker                   | Dense search pickers                                     |
| `Popover`       | `popover`        | Anchored floating panel                   | Hierarchical path picker (with `Command`)                |
| `DropdownMenu`  | `dropdown-menu`  | Command menu (closes on pick)             | Language, account, row actions                           |
| `Chip`          | `chip`           | Filter pill, toggle option                | Active filter criteria pills                             |
| `Tag`           | `tag`            | Status indicator, role pill               | Data cards, list items                                   |
| `Switch`        | `switch`         | Boolean setting toggle                    | Settings panels                                          |
| `InputGroup`    | `input-group`    | Compound input container                  | Custom prefix/suffix/action fields                       |
| `Input`         | `input`          | Single-line text input                    | Forms, settings                                          |
| `Textarea`      | `textarea`       | Multi-line text input                     | Comment/description fields                               |
| `PasswordInput` | `password-input` | Masked password input                     | Login and auth forms                                     |
| `Checkbox`      | `checkbox`       | Multi-select toggle                       | Forms, tables, settings                                  |
| `RadioGroup`    | `radio-group`    | Single-select group                       | Settings, filter dialogs                                 |
| `Item`          | `item`           | Content row primitive                     | Detail lists, settings rows                              |
| `Field`         | `field`          | Form field layout                         | Labels, errors, grouped inputs                           |
| `Card`          | `card`           | Surface with header/content/footer        | Page sections, settings                                  |
| `Separator`     | `separator`      | Semantic divider                          | Section divisions, toolbars                              |
| `Command`       | `command`        | Command palette, searchable list          | Search palettes, hierarchical path picker (in `Popover`) |
| `Dialog`        | `dialog`         | Modal surface                             | Confirmations, focused edits                             |
| `Toast`         | `toast`          | Transient notification                    | Save / delete feedback                                   |
| `Alert`         | `alert`          | Inline status message                     | Load errors, tips                                        |
| `Tabs`          | `tabs`           | Switch between panels                     | Detail / activity views                                  |
| `Progress`      | `progress`       | Completion bar                            | Dashboards, uploads                                      |
| `Spinner`       | `spinner`        | Loading indicator                         | Pending lists, submit buttons                            |
| `Badge`         | `badge`          | Count or short status label               | Nav counts, list meta                                    |

The registry has no pagination or breadcrumb item: build pagination from `ButtonGroup` + `Button` (`aria-current="page"` on the active page), and a breadcrumb from `nav` + `ol` + router links styled with token utilities.

---

## Intent Recipes

### Navigation Bar (`Navbar`)

- **Structure**: `flex items-center justify-between h-14 px-6 border-b border-grayscale-opacity-200 bg-white`
- **Left**: Logo slot + navigation links. A button-styled link is `LinkButton` from `@/components/ui/Button` (`variant="text"`, `render={<Link href="…" />}`). A text link is the router `<Link>` with token utilities. Do not pass `nativeButton={false}` to `Button`.
- **Right**: `Avatar` for current user + action `Button`
- **Optional**: Inline `SearchBar`. Language/account overflow is `DropdownMenu` + `DropdownMenuItem` (commands).

### Filter Bar (`FilterBar`)

- **Structure**: `flex flex-wrap gap-2 items-center`
- **Primary**: `SearchBar` + `Select` or `Combobox` for filtering dimensions
- **Pills**: `Chip` list displaying currently active filter selections

### Page Header (`PageHeader`)

- **Structure**: `flex items-start justify-between mb-6`
- **Left**: `h1` title text + optional subtitle description and breadcrumbs
- **Right**: Primary action `Button`

### Table Toolbar (`DataTableToolbar`)

- **Structure**: `flex flex-wrap items-center justify-between gap-2 mb-4`
- **Left**: `SearchBar` + `Select` / `Combobox` filter dropdowns
- **Right**: Action buttons using `Button` or `ButtonGroup`

### Settings Card (`SettingsCard`)

- **Structure**: `flex items-center justify-between p-4 border border-grayscale-opacity-200 rounded-lg`
- **Left**: Title (`text-grayscale-opacity-900 font-medium`) + description (`text-xs text-grayscale-opacity-600`)
- **Right**: `Switch` toggle or action `Button` (`variant="text"`)

### Empty State (`EmptyState`)

- **Structure**: `flex flex-col items-center justify-center gap-4 py-16`
- **Center**: Feature icon + title + descriptive copy + primary CTA `Button`

### Login Form (`LoginForm`)

- **Structure**: `flex w-80 flex-col gap-4`
- **Fields**: `Input` (account/email) + `PasswordInput` (password) + `Checkbox` (remember me) + `Button` (submit CTA)

### User Profile Card (`UserProfileCard`)

- **Structure**: `flex items-center gap-4 rounded-lg p-4 border border-grayscale-opacity-200`
- **Content**: `Avatar` + name/role text + `Tag` (status or role badge) + edit action `Button` (`variant="text"`)
