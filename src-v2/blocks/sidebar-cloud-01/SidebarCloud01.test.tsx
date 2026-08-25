import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar/Sidebar';
import { useIsMobile } from '@/hooks/useIsMobile';
import '@testing-library/jest-dom/vitest';
import {
  queryAllByAttribute,
  render,
  screen,
  within,
} from '@testing-library/react';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import cloudImage from '../../public/images/cloud.jpg';
import { CloudSidebar } from './components/app-sidebar';

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}));

const mockedUseIsMobile = vi.mocked(useIsMobile);

function renderCloud(
  options: {
    sidebar?: ComponentProps<typeof CloudSidebar>;
    inset?: ReactNode;
    defaultOpen?: boolean;
  } = {},
) {
  const { sidebar, inset, defaultOpen = true } = options;

  return render(
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          '--sidebar-width': '180px',
          '--sidebar-width-icon': '56px',
        } as CSSProperties
      }
    >
      <CloudSidebar {...sidebar} />
      {inset ? (
        <SidebarInset className="bg-white">{inset}</SidebarInset>
      ) : null}
    </SidebarProvider>,
  );
}

function getCloudCollapseTrigger() {
  return screen
    .getAllByRole('button', { name: 'Toggle Sidebar' })
    .find((trigger) =>
      trigger.className.includes('bg-grayscale-600'),
    );
}

function querySlot(container: HTMLElement, slot: string) {
  return queryAllByAttribute('data-slot', container, slot)[0] ?? null;
}

describe('CloudSidebar 01', () => {
  beforeEach(() => {
    mockedUseIsMobile.mockReturnValue(false);
  });

  it('renders brand and nav without Add, Overview label, or footer', () => {
    renderCloud();

    expect(screen.getByAltText('Brand')).toHaveAttribute(
      'src',
      '/images/vital-logo-text-h.svg',
    );
    expect(
      screen.queryByRole('button', { name: 'Add' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('data-active', 'true');
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.queryByText('Ray')).not.toBeInTheDocument();
    expect(screen.queryByText('In progress')).not.toBeInTheDocument();
    expect(querySlot(document.body, 'sidebar-footer')).toBeNull();
  });

  it('keeps a 32px brand mark and icon-rail padding when collapsed', () => {
    const { baseElement } = renderCloud({
      defaultOpen: false,
      sidebar: { collapsible: 'icon' },
    });

    const brand = screen.getByAltText('Brand');
    expect(brand).toHaveAttribute('src', '/images/vital-logo.svg');
    expect(brand).toHaveClass('size-8', 'shrink-0');

    const header = querySlot(baseElement, 'sidebar-header');
    expect(header?.className).toMatch(
      /group-data-\[collapsible=icon\]:p-3!/,
    );

    const group = querySlot(baseElement, 'sidebar-group');
    expect(group?.className).toMatch(
      /group-data-\[collapsible=icon\]:p-3!/,
    );

    const item = querySlot(baseElement, 'sidebar-menu-item');
    expect(item?.className).toMatch(
      /group-data-\[state=expanded\]:group-data-\[side=left\]:-ml-3/,
    );
    expect(item?.className).not.toMatch(
      /(?:^|\s)group-data-\[side=left\]:-ml-3(?:\s|$)/,
    );
  });

  it('mounts the cloud frost layer and imported background image', () => {
    const { baseElement } = renderCloud({
      sidebar: { variant: 'floating' },
    });

    const panel = querySlot(baseElement, 'sidebar-container');
    const frost = querySlot(baseElement, 'sidebar-cloud-frost');

    expect(panel).not.toBeNull();
    expect(frost).toBeInTheDocument();
    expect(panel?.style.getPropertyValue('--cloud-bg-image')).toBe(
      `url(${cloudImage})`,
    );
  });

  it('renders the desktop collapse control in the footer dock', () => {
    renderCloud();

    expect(getCloudCollapseTrigger()).toBeInTheDocument();
    expect(getCloudCollapseTrigger()?.className).toContain(
      'bottom-4',
    );
  });

  it('hides the docked desktop collapse control on mobile', () => {
    mockedUseIsMobile.mockReturnValue(true);
    renderCloud({
      inset: (
        <>
          <header>
            <SidebarTrigger />
          </header>
          <div>Main content</div>
        </>
      ),
    });

    expect(
      within(screen.getByRole('main')).getByRole('button', {
        name: 'Toggle Sidebar',
      }),
    ).toBeInTheDocument();
    expect(getCloudCollapseTrigger()).toBeUndefined();
  });
});
