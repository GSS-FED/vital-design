import { Button } from '@/components/button/Button';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';
import { TooltipAlignmentsExample } from './examples/TooltipAlignmentsExample';
import { TooltipLongContentExample } from './examples/TooltipLongContentExample';
import { TooltipSidePlacementExample } from './examples/TooltipSidePlacementExample';
import { TooltipWithIconExample } from './examples/TooltipWithIconExample';
import { TooltipWithoutArrowExample } from './examples/TooltipWithoutArrowExample';

// Room around the triggers so tooltips on every side stay in view.
function Frame({ children }: { children: ReactNode }) {
  return <div className="p-16">{children}</div>;
}

async function hover(name: string, text: string) {
  await screen.getByRole('button', { name }).hover();
  await vi.waitFor(() => screen.getByText(text).element());
}

describe('Tooltip open', () => {
  test('default open', async () => {
    await render(
      <Frame>
        <TooltipProvider>
          <Tooltip defaultOpen>
            <TooltipTrigger
              render={<Button>Open by default</Button>}
            />
            <TooltipContent>Always visible</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Frame>,
    );
    await vi.waitFor(() =>
      screen.getByText('Always visible').element(),
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'tooltip-default-open',
    );
  });

  test('with icon', async () => {
    await render(
      <Frame>
        <TooltipWithIconExample />
      </Frame>,
    );
    await hover('Help', 'Save your changes before leaving this page');
    await expect(await renderedRegion()).toMatchScreenshot(
      'tooltip-open-with-icon',
    );
  });

  test.each(['top', 'right', 'bottom', 'left'])(
    'side %s',
    async (side) => {
      await render(
        <Frame>
          <TooltipSidePlacementExample />
        </Frame>,
      );
      await hover(side, `Shown on the ${side}`);
      await expect(await renderedRegion()).toMatchScreenshot(
        `tooltip-open-side-${side}`,
      );
    },
  );

  test.each(['start', 'center', 'end'])('align %s', async (align) => {
    await render(
      <Frame>
        <TooltipAlignmentsExample />
      </Frame>,
    );
    await hover(align, `align: ${align}`);
    await expect(await renderedRegion()).toMatchScreenshot(
      `tooltip-open-align-${align}`,
    );
  });

  test('long content', async () => {
    await render(
      <Frame>
        <TooltipLongContentExample />
      </Frame>,
    );
    await hover(
      'Long content',
      'Tooltip text is capped at 400px wide. Longer content wraps onto new lines instead of stretching across the screen.',
    );
    await expect(await renderedRegion()).toMatchScreenshot(
      'tooltip-open-long-content',
    );
  });

  test('without arrow', async () => {
    await render(
      <Frame>
        <TooltipWithoutArrowExample />
      </Frame>,
    );
    await hover('No arrow', 'Tooltip text');
    await expect(await renderedRegion()).toMatchScreenshot(
      'tooltip-open-without-arrow',
    );
  });
});
