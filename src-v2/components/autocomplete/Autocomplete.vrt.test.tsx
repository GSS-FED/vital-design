import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen, userEvent } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import { AutocompleteExample } from './examples/AutocompleteExample';
import { AutocompleteGroupedExample } from './examples/AutocompleteGroupedExample';
import { AutocompleteInlineAutocompleteExample } from './examples/AutocompleteInlineAutocompleteExample';
import { AutocompleteLimitedResultsExample } from './examples/AutocompleteLimitedResultsExample';

async function open(placeholder: string) {
  await screen.getByPlaceholder(placeholder).click();
  await vi.waitFor(() => screen.getByRole('listbox').element());
}

describe('Autocomplete', () => {
  test('open', async () => {
    await render(<AutocompleteExample />);
    await open('e.g. feature');
    await expect(await renderedRegion()).toMatchScreenshot(
      'autocomplete-open',
    );
  });

  test('inline completion after typing', async () => {
    await render(<AutocompleteInlineAutocompleteExample />);
    const input = screen.getByPlaceholder('Type com...');
    await input.fill('com');
    await vi.waitFor(() => screen.getByRole('listbox').element());
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => {
      if (
        (input.element() as HTMLInputElement).value !==
        'component: autocomplete'
      ) {
        throw new Error('inline completion not applied yet');
      }
    });
    await expect(await renderedRegion()).toMatchScreenshot(
      'autocomplete-inline-completion',
    );
  });

  test('grouped open', async () => {
    await render(<AutocompleteGroupedExample />);
    await open('e.g. autocomplete');
    await expect(await renderedRegion()).toMatchScreenshot(
      'autocomplete-open-grouped',
    );
  });

  test('limited results open', async () => {
    await render(<AutocompleteLimitedResultsExample />);
    await open('Search tags');
    await expect(await renderedRegion()).toMatchScreenshot(
      'autocomplete-open-limited',
    );
  });
});
