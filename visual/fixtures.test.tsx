import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { renderedRegion } from './capture';
import { fixtures, loadFixture } from './fixtures/load';

// One screenshot per src-v2 story and docs example, named by its
// Storybook-style ID (see visual/fixtures/manifest.ts).
for (const entry of fixtures) {
  test(entry.id, async () => {
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
    await expect(await renderedRegion()).toMatchScreenshot(entry.id);
  });
}
