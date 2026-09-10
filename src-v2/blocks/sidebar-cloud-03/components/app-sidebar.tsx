'use client';

import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/sidebar/Sidebar';
import { CalendarIcon } from '@/icons/CalendarIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { UserIcon } from '@/icons/UserIcon';
import { cn } from '@/lib/utils';
import cloudImage from '@/public/images/cloud.jpg';
import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  forwardRef,
} from 'react';

type ImportedImage = string | { src: string };

function getImageSrc(image: ImportedImage) {
  return typeof image === 'string' ? image : image.src;
}

const cloudImageSrc = getImageSrc(cloudImage as ImportedImage);

const data = {
  logos: {
    expanded: '/images/vital-logo-text-h.svg',
    collapsed: '/images/vital-logo.svg',
  },
  navMain: [
    {
      items: [
        {
          title: 'Dashboard',
          icon: <PanelLeftIcon />,
          isActive: true,
        },
        { title: 'Inbox', icon: <SearchIcon /> },
        { title: 'Calendar', icon: <CalendarIcon /> },
        { title: 'Approvals', icon: <CheckIcon /> },
      ],
    },
    {
      label: 'Workspace',
      items: [
        {
          title: 'Projects',
          icon: <FlagIcon />,
          items: [
            { title: 'In progress' },
            { title: 'Completed' },
            { title: 'Archived' },
          ],
        },
        { title: 'Clients', icon: <UserIcon /> },
        { title: 'Reports', icon: <FlagIcon /> },
      ],
    },
  ] as {
    label?: string;
    items: {
      title: string;
      icon?: ReactNode;
      isActive?: boolean;
      items?: { title: string; isActive?: boolean }[];
    }[];
  }[],
};

function FrostLayer() {
  return (
    <div
      aria-hidden
      data-slot="sidebar-cloud-frost"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden group-data-[variant=floating]:rounded-lg before:absolute before:inset-0 before:origin-center before:bg-cover before:bg-center before:bg-no-repeat before:[background-image:var(--cloud-bg-image)] before:blur-md before:content-[''] after:absolute after:inset-0 after:bg-white/80 after:content-[''] group-data-[variant=sidebar]:after:shadow-[inset_-8px_0_16px_-8px_rgba(35,35,50,0.12)]"
    />
  );
}

function DefaultBrand() {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';
  const src = collapsed ? data.logos.collapsed : data.logos.expanded;

  return (
    <div
      className={cn(
        'flex items-center',
        'group-data-[collapsible=icon]:size-8',
        'group-data-[collapsible=icon]:shrink-0',
        'group-data-[collapsible=icon]:justify-center',
      )}
    >
      {collapsed ? (
        <img
          src={src}
          alt="Brand"
          className="size-8 shrink-0 object-contain"
        />
      ) : (
        <img
          src={src}
          alt="Brand"
          className="h-7 max-h-7 w-auto object-contain object-left"
        />
      )}
    </div>
  );
}

function CollapseControl({
  className,
  ...props
}: ComponentProps<typeof SidebarTrigger>) {
  const { isMobile } = useSidebar();
  if (isMobile) return null;

  return (
    <SidebarTrigger
      className={cn(
        'z-20 size-7.5 border-0',
        'group-data-[side=left]:right-0 group-data-[side=left]:rounded-l-lg group-data-[side=left]:rounded-r-none',
        'group-data-[side=right]:left-0 group-data-[side=right]:rounded-r-lg group-data-[side=right]:rounded-l-none',
        'bg-grayscale-600 text-white',
        'shadow-[0_2px_10px_0_rgba(67,67,75,0.30)]',
        'transition-[color,background-color,fill,stroke,box-shadow]',
        '[transition-duration:var(--motion-duration-fast)]',
        'ease-(--motion-easing-in)',
        'hover:bg-grayscale-500 hover:text-white',
        'group-data-[side=left]:[&>svg]:translate-x-0.5',
        'group-data-[side=right]:[&>svg]:-translate-x-0.5',
        className,
      )}
      {...props}
    />
  );
}

function AddButton() {
  const { isMobile, state } = useSidebar();
  const iconOnly = !isMobile && state === 'collapsed';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            theme="primary"
            size={iconOnly ? 'icon-lg' : 'lg'}
            aria-label="Add"
            className={cn(
              'w-full min-w-0 rounded-(--radius-sm)',
              iconOnly
                ? 'size-8 p-0! justify-center [&_[data-icon]]:m-0'
                : 'h-9',
            )}
          />
        }
      >
        <PlusIcon data-icon={iconOnly ? true : 'inline-start'} />
        {iconOnly ? null : 'Add'}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={iconOnly ? 22 : 26}
      >
        <DropdownMenuItem>New project</DropdownMenuItem>
        <DropdownMenuItem>New client</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>New task</DropdownMenuItem>
        <DropdownMenuItem>Invite member</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header({
  className,
  ...props
}: ComponentProps<typeof SidebarHeader>) {
  return (
    <SidebarHeader
      className={cn(
        'gap-4 p-4 group-data-[collapsible=icon]:p-3!',
        className,
      )}
      {...props}
    >
      <DefaultBrand />
      <AddButton />
    </SidebarHeader>
  );
}

function Content({
  className,
  ...props
}: ComponentProps<typeof SidebarContent>) {
  return <SidebarContent className={className} {...props} />;
}

function Footer() {
  return (
    <div data-cloud-footer-dock="" className="relative z-1 shrink-0">
      <CollapseControl className="absolute bottom-4" />
    </div>
  );
}

function NavMain() {
  return (
    <>
      {data.navMain.map((group) => (
        <SidebarGroup
          key={group.label ?? group.items[0]?.title}
          className="px-3 py-2 group-data-[collapsible=icon]:p-3!"
        >
          {group.label ? (
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <MenuItem key={item.title}>
                  {item.items && item.items.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <MenuButton
                            isActive={item.isActive}
                            tooltip={item.title}
                          />
                        }
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        <span className="ml-auto shrink-0 group-data-[collapsible=icon]:hidden">
                          <EllipsisIcon className="size-5 text-grayscale-700 [&_path]:[fill-opacity:1]" />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={22}
                      >
                        {item.items.map((sub) => (
                          <DropdownMenuItem key={sub.title}>
                            {sub.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <MenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </MenuButton>
                  )}
                </MenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

const MenuButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof SidebarMenuButton>
>(function MenuButton({ className, ...props }, ref) {
  return (
    <SidebarMenuButton
      ref={ref}
      className={cn(
        'text-grayscale-700',
        'transition-[color,background-color,fill,stroke,box-shadow]',
        '[transition-duration:var(--motion-duration-fast)]',
        'ease-(--motion-easing-in)',
        'hover:bg-grayscale-opacity-200 hover:text-grayscale-700',
        'active:bg-grayscale-opacity-200',
        'data-[active=true]:bg-transparent data-[active=true]:font-medium',
        'data-[active=true]:text-primary-500',
        'data-[active=true]:hover:bg-transparent',
        'data-[active=true]:hover:text-primary-500',
        'data-[active=true]:active:bg-transparent',
        className,
      )}
      {...props}
    />
  );
});

function MenuItem({
  className,
  ...props
}: ComponentProps<typeof SidebarMenuItem>) {
  return (
    <SidebarMenuItem
      className={cn(
        'relative',
        'group-data-[state=expanded]:group-data-[side=left]:-ml-3',
        'group-data-[state=expanded]:group-data-[side=left]:pl-3',
        'group-data-[state=expanded]:group-data-[side=right]:-mr-3',
        'group-data-[state=expanded]:group-data-[side=right]:pr-3',
        'before:pointer-events-none before:absolute before:top-1/2 before:z-10',
        'group-data-[side=left]:before:left-0',
        'group-data-[side=right]:before:right-0 group-data-[side=right]:before:left-auto',
        "before:hidden before:h-5 before:w-1 before:-translate-y-1/2 before:bg-primary-500 before:content-['']",
        'has-[[data-sidebar=menu-button][data-active=true]]:before:block',
        'group-data-[collapsible=icon]:before:hidden!',
        className,
      )}
      {...props}
    />
  );
}

export const CloudSidebar = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Sidebar>
>(function CloudSidebar({ className, style, ...props }, ref) {
  return (
    <Sidebar
      ref={ref}
      className={cn(
        '[--sidebar:transparent]',
        'bg-transparent',
        'border-r-0 group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0',
        '**:data-[slot=sidebar-inner]:relative',
        '**:data-[slot=sidebar-inner]:isolate',
        'group-data-[variant=floating]:**:data-[slot=sidebar-inner]:overflow-hidden',
        'group-data-[variant=inset]:**:data-[slot=sidebar-inner]:overflow-hidden',
        'group-data-[variant=floating]:**:data-[slot=sidebar-inner]:border-0',
        '[&_[data-slot=sidebar-inner]>:not([data-slot=sidebar-trigger]):not([data-slot=sidebar-cloud-frost]):not([data-cloud-footer-dock])]:relative',
        '[&_[data-slot=sidebar-inner]>:not([data-slot=sidebar-trigger]):not([data-slot=sidebar-cloud-frost]):not([data-cloud-footer-dock])]:z-1',
        className,
      )}
      style={
        {
          ['--cloud-bg-image' as string]: `url(${cloudImageSrc})`,
          ['--sidebar-width-icon' as string]: '56px',
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <FrostLayer />
      <Header />
      <Content>
        <NavMain />
      </Content>
      <Footer />
    </Sidebar>
  );
});
