import { afterEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { renderedRegion } from './capture';
import { fixtures, loadFixture } from './fixtures/load';

afterEach(() => {
  document.documentElement.classList.remove('dark');
});

// One screenshot per src-v2 story and docs example and per color mode, named
// by its Storybook-style ID (see visual/fixtures/manifest.ts). Light keeps the
// bare ID so existing baselines still match; dark adds a `--dark` suffix and
// renders under a `.dark` ancestor, as consumers switch it.
for (const mode of ['light', 'dark'] as const) {
  for (const entry of fixtures) {
    const name = mode === 'dark' ? `${entry.id}--dark` : entry.id;
    test(name, async () => {
      document.documentElement.classList.toggle(
        'dark',
        mode === 'dark',
      );
      const { Component } = await loadFixture(entry);
      // Fake timers too (Date is already fixed by visual/setup.ts), then
      // fast-forward so delayed UI such as AvatarFallback delay={300} shows.
      vi.useFakeTimers({
        now: Date.now(),
        toFake: [
          'Date',
          'setTimeout',
          'clearTimeout',
          'setInterval',
          'clearInterval',
        ],
      });
      await render(<Component />);
      await vi.advanceTimersByTimeAsync(1000);
      // In dark mode the avatar group edges in the data table block (light
      // avatar palettes on a dark ring) differ by 1–5 antialiased pixels
      // between runs.
      await expect(await renderedRegion()).toMatchScreenshot(
        name,
        mode === 'dark'
          ? { comparatorOptions: { allowedMismatchedPixels: 20 } }
          : undefined,
      );
    });
  }
}
