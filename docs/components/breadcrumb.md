# Breadcrumb

> A trail of links that shows where the current page sits in the site hierarchy.

## Preview

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <BreadcrumbLink
                  render={<button type="button" />}
                  aria-label="Show hidden pages"
                  className="inline-flex items-center data-[popup-open]:text-primary-400"
                />
              }
            >
              <BreadcrumbEllipsis className="text-inherit" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              <DropdownMenuItem render={<a href="#website" />}>
                Website
              </DropdownMenuItem>
              <DropdownMenuItem render={<a href="#analytics" />}>
                Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#reports">Reports</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Usage

Use `BreadcrumbPage` for the current page. It is not a link and sets `aria-current="page"`.

The hidden levels open in a [`DropdownMenu`](/docs/components/dropdown-menu), so add `dropdown-menu` from the registry too. On a short path, drop the ellipsis and list every level.

## Router Links

`BreadcrumbLink` renders `<a>` by default. Pass your router's link through `render`:

```tsx
import { Link } from 'react-router-dom';

<BreadcrumbLink render={<Link to="/projects" />}>
  Projects
</BreadcrumbLink>;
```

## Sizes

Set `size` on `BreadcrumbList`. The default is `sm`.

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

export function BreadcrumbSizesExample() {
  return (
    <div className="flex flex-col gap-6">
      {(['lg', 'sm'] as const).map((size) => (
        <Breadcrumb key={size}>
          <BreadcrumbList size={size}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#projects">
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#reports">Reports</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  );
}
```

## Collapsed Items

Use `BreadcrumbEllipsis` in place of the levels you hide on a deep path.

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

export function BreadcrumbCollapsedExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#reports">Reports</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Dropdown

Put `BreadcrumbEllipsis` inside a [`DropdownMenu`](/docs/components/dropdown-menu) trigger to open the levels you hid.

Render the trigger as a `BreadcrumbLink` with `render={<button type="button" />}`, so it keeps the link's color, hover, and focus styles. `BreadcrumbEllipsis` only announces "More", so give the trigger a name that says what it opens. Render each hidden level as a link.

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export function BreadcrumbDropdownExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <BreadcrumbLink
                  render={<button type="button" />}
                  aria-label="Show hidden pages"
                  className="inline-flex items-center data-[popup-open]:text-primary-400"
                />
              }
            >
              <BreadcrumbEllipsis className="text-inherit" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              <DropdownMenuItem render={<a href="#website" />}>
                Website
              </DropdownMenuItem>
              <DropdownMenuItem render={<a href="#analytics" />}>
                Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Parts

| Part                  | Element | Description                                                                                                       |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `Breadcrumb`          | `nav`   | Navigation landmark. `aria-label` defaults to `breadcrumb`                                                        |
| `BreadcrumbList`      | `ol`    | Ordered list of levels. Takes `size`: `'sm'` (default) or `'lg'`                                                  |
| `BreadcrumbItem`      | `li`    | One level                                                                                                         |
| `BreadcrumbLink`      | `a`     | Link to a parent level. Takes `render` for router links                                                           |
| `BreadcrumbPage`      | `span`  | Current page, with `aria-current="page"`                                                                          |
| `BreadcrumbSeparator` | `li`    | Divider between levels. Pass `children` to replace the chevron                                                    |
| `BreadcrumbEllipsis`  | `span`  | Marks hidden levels. Pass `children` to replace the icon. Put it in a `DropdownMenu` trigger to open those levels |

Each part also accepts the props of its element.
