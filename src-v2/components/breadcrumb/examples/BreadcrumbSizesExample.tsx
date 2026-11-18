'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb/Breadcrumb';

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
