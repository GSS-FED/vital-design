import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  queryByAttribute,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CSSProperties } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from './Sidebar';

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}));

const mockedUseIsMobile = vi.mocked(useIsMobile);

function findSlot(container: HTMLElement, slot: string): HTMLElement {
  const el = queryByAttribute('data-slot', container, slot);
  if (!el) {
    throw new Error(`Could not find [data-slot="${slot}"]`);
  }
  return el;
}

function querySlot(
  container: HTMLElement,
  slot: string,
): HTMLElement | null {
  return queryByAttribute('data-slot', container, slot);
}

function SidebarProbe() {
  const { open, state, isMobile } = useSidebar();
  return (
    <div
      data-testid="probe"
      data-open={String(open)}
      data-state={state}
      data-mobile={String(isMobile)}
    />
  );
}

function renderSidebar(
  props: {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    collapsible?: 'offcanvas' | 'icon' | 'none';
  } = {},
) {
  const {
    defaultOpen,
    open,
    onOpenChange,
    collapsible = 'offcanvas',
  } = props;

  return render(
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Sidebar collapsible={collapsible}>
        <SidebarHeader>Brand</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Nav</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Home</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<a href="/docs" />}
                    tooltip="Docs"
                  >
                    Docs
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Account</SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <SidebarProbe />
      </SidebarInset>
    </SidebarProvider>,
  );
}

describe('Sidebar', () => {
  beforeEach(() => {
    mockedUseIsMobile.mockReturnValue(false);
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  it('renders expanded by default with stable slots', () => {
    const { baseElement } = renderSidebar();

    expect(findSlot(baseElement, 'sidebar-wrapper')).toBeTruthy();
    expect(findSlot(baseElement, 'sidebar')).toHaveAttribute(
      'data-state',
      'expanded',
    );
    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Home' }),
    ).toHaveAttribute('data-active', 'true');
    expect(
      screen.getByRole('button', { name: 'Home' }),
    ).toHaveAttribute('data-slot', 'sidebar-menu-button');
    // Ensure baseElement still exposes the wrapper slot contract.
    expect(findSlot(baseElement, 'sidebar-wrapper')).toBeTruthy();
  });

  it('toggles open state from SidebarTrigger and writes cookie', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(
      screen.getByRole('button', { name: 'Toggle Sidebar' }),
    );

    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'false',
    );
    expect(document.cookie).toContain('sidebar_state=false');
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderSidebar({ open: true, onOpenChange });

    await user.click(
      screen.getByRole('button', { name: 'Toggle Sidebar' }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('toggles via keyboard shortcut ⌘B / Ctrl+B', async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.keyboard('{Control>}b{/Control}');

    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('does not toggle ⌘B when the shortcut is disabled', async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider enableKeyboardShortcut={false}>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarProbe />
        </SidebarInset>
      </SidebarProvider>,
    );

    await user.keyboard('{Control>}b{/Control}');

    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'true',
    );
  });

  it('ignores repeated ⌘B keydown', () => {
    renderSidebar();

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: true,
        repeat: true,
        bubbles: true,
      }),
    );

    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'true',
    );
  });

  it('toggles ⌘B while focus is in a form field', async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <label>
            Search
            <input aria-label="Search" />
          </label>
          <SidebarTrigger />
          <SidebarProbe />
        </SidebarInset>
      </SidebarProvider>,
    );

    await user.click(screen.getByRole('textbox', { name: 'Search' }));
    await user.keyboard('{Control>}b{/Control}');

    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('exposes aria-expanded on SidebarTrigger from open state', async () => {
    const user = userEvent.setup();
    renderSidebar();

    const trigger = screen.getByRole('button', {
      name: 'Toggle Sidebar',
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('merges consumer onClick on SidebarRail with toggle', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>Nav</SidebarContent>
          <SidebarRail onClick={onClick} />
        </Sidebar>
        <SidebarInset>
          <SidebarProbe />
        </SidebarInset>
      </SidebarProvider>,
    );

    const rail = findSlot(document.body, 'sidebar-rail');
    await user.click(rail);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('renders SidebarMenuSubButton as a button by default', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      Nested
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const nested = screen.getByRole('button', { name: 'Nested' });
    expect(nested).toHaveAttribute(
      'data-slot',
      'sidebar-menu-sub-button',
    );
  });

  it('renders SidebarMenuSubButton as a link when render is an anchor', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      render={<a href="/nested" />}
                    >
                      Nested link
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const link = screen.getByRole('link', { name: 'Nested link' });
    expect(link).toHaveAttribute('href', '/nested');
    expect(link).toHaveAttribute(
      'data-slot',
      'sidebar-menu-sub-button',
    );
  });

  it('throws when useSidebar is used outside the provider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    expect(() => render(<SidebarProbe />)).toThrow(
      /useSidebar must be used within a SidebarProvider/,
    );

    consoleError.mockRestore();
  });

  it('renders a non-collapsible sidebar without gap machinery', () => {
    const { baseElement } = renderSidebar({ collapsible: 'none' });

    expect(querySlot(baseElement, 'sidebar-gap')).toBeNull();
    const panel = findSlot(baseElement, 'sidebar');
    expect(panel).toHaveAttribute('data-side', 'left');
    expect(panel).toHaveAttribute('data-variant', 'sidebar');
    expect(panel).toHaveAttribute('data-collapsible', 'none');
    expect(querySlot(panel, 'sidebar-inner')).not.toBeNull();
  });

  it('marks a right sidebar with the matching side attribute', () => {
    const { baseElement } = render(
      <SidebarProvider>
        <Sidebar side="right">
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset />
      </SidebarProvider>,
    );

    const panel = findSlot(baseElement, 'sidebar');
    expect(panel).toHaveAttribute('data-side', 'right');
  });

  it('does not mount mobile sheet content while closed', () => {
    mockedUseIsMobile.mockReturnValue(true);
    renderSidebar({ defaultOpen: true });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('probe')).toHaveAttribute(
      'data-mobile',
      'true',
    );
  });

  it('opens mobile sheet from trigger', async () => {
    const user = userEvent.setup();
    mockedUseIsMobile.mockReturnValue(true);
    renderSidebar();

    await user.click(
      screen.getByRole('button', { name: 'Toggle Sidebar' }),
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Home')).toBeInTheDocument();
    expect(dialog).toHaveAttribute('data-mobile', 'true');
    expect(dialog).toHaveAttribute('data-side', 'left');
    expect(dialog).toHaveAttribute('data-variant', 'sidebar');
  });

  it('composes SidebarMenuButton tooltip with DropdownMenuTrigger', async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <SidebarMenuButton size="lg" tooltip="Ray" />
                    }
                  >
                    Account
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Account' });
    expect(trigger).toHaveAttribute('data-sidebar', 'menu-button');
    expect(trigger).toHaveAttribute('data-size', 'lg');

    await user.click(trigger);
    expect(
      await screen.findByRole('menuitem', { name: 'Profile' }),
    ).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('forwards skin className/style to the mobile sheet panel', async () => {
    const user = userEvent.setup();
    mockedUseIsMobile.mockReturnValue(true);

    render(
      <SidebarProvider>
        <Sidebar
          className="skin-panel"
          style={
            { '--skin-image': 'url(cloud.jpg)' } as CSSProperties
          }
        >
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
        </SidebarInset>
      </SidebarProvider>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Toggle Sidebar' }),
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveClass('skin-panel');
    expect(dialog.style.getPropertyValue('--skin-image')).toBe(
      'url(cloud.jpg)',
    );
    // Skin selectors targeting the inner surface must resolve on mobile too.
    expect(querySlot(dialog, 'sidebar-inner')).not.toBeNull();
  });

  it('supports render prop on menu button', () => {
    renderSidebar();
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveAttribute('data-slot', 'sidebar-menu-button');
  });
});
