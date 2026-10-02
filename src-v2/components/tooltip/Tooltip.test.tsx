import {
  queryByAttribute,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

function renderTooltip(props: { defaultOpen?: boolean } = {}) {
  return render(
    <TooltipProvider delay={0}>
      <Tooltip defaultOpen={props.defaultOpen}>
        <TooltipTrigger render={<Button>Trigger</Button>} />
        <TooltipContent>提示文字</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
}

describe('Tooltip', () => {
  it('keeps the tooltip closed by default', () => {
    renderTooltip();

    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('提示文字')).not.toBeInTheDocument();
  });

  it('exposes the shadcn slot on the trigger', () => {
    renderTooltip();

    expect(
      screen.getByRole('button', { name: 'Trigger' }),
    ).toHaveAttribute('data-slot', 'tooltip-trigger');
  });

  it('honors defaultOpen and renders the content slot', () => {
    const { baseElement } = renderTooltip({ defaultOpen: true });

    const content = queryByAttribute(
      'data-slot',
      baseElement,
      'tooltip-content',
    );

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass(
      'bg-grayscale-700',
      'text-white',
      'shadow-emphasis',
      'rounded',
      'max-w-[400px]',
      'origin-(--transform-origin)',
    );
  });

  it('renders an arrow by default', () => {
    const { baseElement } = renderTooltip({ defaultOpen: true });

    const arrow = queryByAttribute(
      'data-slot',
      baseElement,
      'tooltip-arrow',
    );

    expect(arrow).toBeInTheDocument();
  });

  it('omits the arrow when arrow={false}', () => {
    const { baseElement } = render(
      <TooltipProvider delay={0}>
        <Tooltip defaultOpen>
          <TooltipTrigger render={<Button>Trigger</Button>} />
          <TooltipContent arrow={false}>提示文字</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const arrow = queryByAttribute(
      'data-slot',
      baseElement,
      'tooltip-arrow',
    );

    expect(arrow).not.toBeInTheDocument();
  });

  it('renders the positioner slot for further composition', () => {
    const { baseElement } = renderTooltip({ defaultOpen: true });

    const positioner = queryByAttribute(
      'data-slot',
      baseElement,
      'tooltip-positioner',
    );

    expect(positioner).toBeInTheDocument();
    expect(positioner).toHaveClass('z-9999');
  });

  it('reflects the configured side onto the content element', () => {
    const { baseElement } = render(
      <TooltipProvider delay={0}>
        <Tooltip defaultOpen>
          <TooltipTrigger render={<Button>Trigger</Button>} />
          <TooltipContent side="bottom">提示文字</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const content = queryByAttribute(
      'data-slot',
      baseElement,
      'tooltip-content',
    );

    expect(content).toHaveAttribute('data-side', 'bottom');
  });
});
