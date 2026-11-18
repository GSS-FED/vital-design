// Setup for the `visual` Vitest project (browser mode).
import '@fontsource/noto-sans-tc/400.css';
import '@fontsource/noto-sans-tc/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { commands } from 'vitest/browser';
import './fixtures/fixtures.css';

declare module 'vitest/browser' {
  interface BrowserCommands {
    blockExternalRequests: () => Promise<void>;
    resetPointer: () => Promise<void>;
  }
}

// Same as Storybook's padded layout, so screenshots have room for a margin
// on every side (see visual/capture.ts).
document.body.style.margin = '0';
document.body.style.padding = '1rem';

// Fonts are bundled; remote assets such as avatar URLs fail on purpose so
// screenshots never depend on the network.
beforeAll(() => commands.blockExternalRequests());

// A fixed "now" keeps relative dates stable. Only Date is faked: real
// timers let delayed UI (e.g. AvatarFallback delay) settle before the
// screenshot stabilizes.
beforeEach(async () => {
  await commands.resetPointer();
  vi.useFakeTimers({
    now: new Date('2026-01-01T00:00:00Z'),
    toFake: ['Date'],
  });
});

afterEach(() => {
  vi.useRealTimers();
  for (const region of document.querySelectorAll(
    '[data-rendered-region]',
  )) {
    region.remove();
  }
});
