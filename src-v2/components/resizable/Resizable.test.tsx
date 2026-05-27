import { render, screen } from '@testing-library/react';
import { beforeAll, expect, it } from 'vitest';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizable';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value: ResizeObserverMock,
  });
});

it('renders a resizable panel group', () => {
  render(
    <ResizablePanelGroup
      id="group"
      orientation="horizontal"
      className="min-h-40"
    >
      <ResizablePanel id="panel-one" defaultSize="50%">
        One
      </ResizablePanel>
      <ResizableHandle id="handle" />
      <ResizablePanel id="panel-two" defaultSize="50%">
        Two
      </ResizablePanel>
    </ResizablePanelGroup>,
  );

  const group = screen.getByTestId('group');
  const handle = screen.getByTestId('handle');

  expect(group).toHaveAttribute('data-slot', 'resizable-panel-group');
  expect(group).toHaveClass('flex', 'h-full', 'w-full', 'min-h-40');
  expect(screen.getByTestId('panel-one')).toHaveAttribute(
    'data-slot',
    'resizable-panel',
  );
  expect(screen.getByTestId('panel-two')).toHaveAttribute(
    'data-slot',
    'resizable-panel',
  );
  expect(handle).toHaveAttribute('data-slot', 'resizable-handle');
  expect(handle).toHaveClass('bg-grayscale-opacity-300');
});

it('renders the visible handle indicator', () => {
  render(
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel defaultSize="50%">One</ResizablePanel>
      <ResizableHandle id="handle" withHandle />
      <ResizablePanel defaultSize="50%">Two</ResizablePanel>
    </ResizablePanelGroup>,
  );

  const handle = screen.getByTestId('handle');

  expect(handle).toContainHTML(
    'data-slot="resizable-handle-indicator"',
  );
  expect(handle).toContainHTML('aria-hidden="true"');
  expect(handle).toContainHTML('border-grayscale-opacity-300');
  expect(handle).toContainHTML('bg-white');
});

it('allows custom handle content', () => {
  render(
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel defaultSize="40%">Header</ResizablePanel>
      <ResizableHandle id="handle">
        <span data-testid="custom-handle" />
      </ResizableHandle>
      <ResizablePanel defaultSize="60%">Content</ResizablePanel>
    </ResizablePanelGroup>,
  );

  expect(screen.getByTestId('custom-handle')).toBeInTheDocument();
  expect(screen.getByTestId('handle')).not.toContainHTML(
    'data-slot="resizable-handle-indicator"',
  );
});
