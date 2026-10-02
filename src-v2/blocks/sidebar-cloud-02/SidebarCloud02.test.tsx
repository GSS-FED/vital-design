import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar/Sidebar';
import { useIsMobile } from '@/hooks/useIsMobile';
import '@testing-library/jest-dom/vitest';
import {
  queryAllByAttribute,
  queryByAttribute,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  const dock = queryByAttribute(
    'data-cloud-footer-dock',
    document.body,
    '',
  );

  return dock
    ? within(dock).queryByRole('button', {
        name: 'Toggle Sidebar',
      })
    : null;
}

function querySlot(container: HTMLElement, slot: string) {
  return queryAllByAttribute('data-slot', container, slot)[0] ?? null;
}

describe('CloudSidebar 02', () => {
  beforeEach(() => {
    mockedUseIsMobile.mockReturnValue(false);
  });

  it('renders the sample brand, nav, and user menu', () => {
    renderCloud();

    expect(screen.getByAltText('Brand')).toHaveAttribute(
      'src',
      '/images/vital-logo-text-h.svg',
    );
    expect(
      screen.getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('data-active', 'true');
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Ray')).toBeInTheDocument();
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(
      querySlot(document.body, 'sidebar-footer'),
    ).toBeInTheDocument();
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

  it('uses the brand mark when collapsed', () => {
    renderCloud({
      defaultOpen: false,
      sidebar: { collapsible: 'icon' },
    });

    const brand = screen.getByAltText('Brand');
    expect(brand).toHaveAttribute('src', '/images/vital-logo.svg');
    expect(
      screen.getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('data-active', 'true');
  });

  it('renders the desktop collapse control in the footer dock', () => {
    renderCloud();

    expect(getCloudCollapseTrigger()).toBeInTheDocument();
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
    expect(getCloudCollapseTrigger()).toBeNull();
  });

  it('exposes group and data-side on the mobile sheet for the active rail', async () => {
    const user = userEvent.setup();
    mockedUseIsMobile.mockReturnValue(true);
    renderCloud({
      inset: (
        <header>
          <SidebarTrigger />
        </header>
      ),
    });

    await user.click(
      screen.getByRole('button', { name: 'Toggle Sidebar' }),
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('data-side', 'left');
    expect(
      within(dialog).getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('data-active', 'true');
  });
});
