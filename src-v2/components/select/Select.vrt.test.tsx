import {
  ScrollArea,
  ScrollAreaViewport,
} from '@/components/scroll-area/ScrollArea';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemText,
  SelectTrigger,
} from './Select';
import { SelectExample } from './examples/SelectExample';
import { SelectGroupedExample } from './examples/SelectGroupedExample';
import { SelectIconExample } from './examples/SelectIconExample';
import { SelectMultipleExample } from './examples/SelectMultipleExample';

async function open() {
  await screen.getByRole('combobox').click();
  await vi.waitFor(() => screen.getByRole('listbox').element());
}

describe('Select open', () => {
  test('selected item', async () => {
    await render(<SelectExample />);
    await open();
    await screen.getByRole('option', { name: 'Option 2' }).click();
    await open();
    await expect(await renderedRegion()).toMatchScreenshot(
      'select-open-selected',
    );
  });

  test('multiple', async () => {
    await render(<SelectMultipleExample />);
    await open();
    await screen.getByRole('option', { name: 'React' }).click();
    await screen.getByRole('option', { name: 'Angular' }).click();
    await expect(await renderedRegion()).toMatchScreenshot(
      'select-open-multiple',
    );
  });

  test('grouped', async () => {
    await render(<SelectGroupedExample />);
    await open();
    await expect(await renderedRegion()).toMatchScreenshot(
      'select-open-grouped',
    );
  });

  test('icons', async () => {
    await render(<SelectIconExample />);
    await open();
    await expect(await renderedRegion()).toMatchScreenshot(
      'select-open-icons',
    );
  });

  test('long list in a ScrollArea with fading edges', async () => {
    const items = Array.from({ length: 36 }, (_, index) => ({
      label: `Option ${index + 1}`,
      value: String(index + 1),
    }));
    await render(
      <div className="w-80">
        <Select items={items}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent
            className="h-75 py-0"
            listRender={
              <ScrollAreaViewport className="h-full py-2" fadeEdges />
            }
            listWrapper={(list) => (
              <ScrollArea
                className="h-full min-h-0"
                overflowEdgeThreshold={1}
              >
                {list}
              </ScrollArea>
            )}
            showScrollButtons={false}
          >
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,
    );
    await open();
    await expect(await renderedRegion()).toMatchScreenshot(
      'select-open-scroll-area-fade',
    );
  });
});
