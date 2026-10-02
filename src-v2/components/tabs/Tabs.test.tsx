import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from './Tabs';
import type { TabsProps } from './Tabs';

function BasicTabs({
  onValueChange,
  value,
}: {
  onValueChange?: TabsProps['onValueChange'];
  value?: string;
}) {
  return (
    <Tabs
      defaultValue={value ? undefined : 'account'}
      value={value}
      onValueChange={onValueChange}
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsIndicator data-testid="tabs-indicator" />
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="billing">Billing content</TabsContent>
    </Tabs>
  );
}

it('renders tabs and the active panel', () => {
  render(<BasicTabs />);

  expect(
    screen.getByRole('tab', { name: 'Account' }),
  ).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Account content')).toBeInTheDocument();
  expect(
    screen.queryByText('Billing content'),
  ).not.toBeInTheDocument();
});

it('calls onValueChange when a tab is clicked', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(<BasicTabs value="account" onValueChange={onValueChange} />);

  await user.click(screen.getByRole('tab', { name: 'Billing' }));

  expect(onValueChange).toHaveBeenCalledWith(
    'billing',
    expect.any(Object),
  );
});

it('supports vertical bordered tabs', () => {
  render(
    <Tabs defaultValue="one" orientation="vertical">
      <TabsList bordered data-testid="tabs-list">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsIndicator data-testid="tabs-indicator" />
      </TabsList>
      <TabsContent value="one">One content</TabsContent>
    </Tabs>,
  );

  expect(screen.getByTestId('tabs-list')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  expect(screen.getByTestId('tabs-list')).toHaveAttribute(
    'data-bordered',
  );
  expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
    'data-active',
  );
});

it('exposes data-slot hooks on each part', () => {
  render(
    <Tabs defaultValue="one" data-testid="tabs">
      <TabsList data-testid="tabs-list">
        <TabsTrigger value="one" data-testid="tabs-trigger">
          One
        </TabsTrigger>
        <TabsIndicator data-testid="tabs-indicator" />
      </TabsList>
      <TabsContent value="one" data-testid="tabs-content">
        One content
      </TabsContent>
    </Tabs>,
  );

  expect(screen.getByTestId('tabs')).toHaveAttribute(
    'data-slot',
    'tabs',
  );
  expect(screen.getByTestId('tabs-list')).toHaveAttribute(
    'data-slot',
    'tabs-list',
  );
  expect(screen.getByTestId('tabs-trigger')).toHaveAttribute(
    'data-slot',
    'tabs-trigger',
  );
  expect(screen.getByTestId('tabs-indicator')).toHaveAttribute(
    'data-slot',
    'tabs-indicator',
  );
  expect(screen.getByTestId('tabs-content')).toHaveAttribute(
    'data-slot',
    'tabs-content',
  );
});

it('renders pill tabs', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();

  render(
    <Tabs variant="pill" value="one" onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
    </Tabs>,
  );

  await user.click(screen.getByRole('tab', { name: 'Two' }));

  expect(screen.getByRole('tablist')).toHaveAttribute(
    'data-slot',
    'tabs-list',
  );
  expect(screen.getByRole('tab', { name: 'One' })).toHaveClass(
    'group-data-[variant=pill]/tabs:data-[active]:bg-primary-50',
  );
  expect(onValueChange).toHaveBeenCalledWith(
    'two',
    expect.any(Object),
  );
});
