'use client';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';

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
