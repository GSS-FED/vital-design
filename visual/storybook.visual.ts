import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

declare global {
  interface Window {
    __STORYBOOK_PREVIEW__?: { storyRenders: { phase?: string }[] };
  }
}

type IndexEntry = {
  id: string;
  type: 'story' | 'docs';
  importPath: string;
};

const index = JSON.parse(
  readFileSync(
    new URL('../storybook-static/index.json', import.meta.url),
    'utf8',
  ),
) as { entries: Record<string, IndexEntry> };

const stories = Object.values(index.entries).filter(
  (entry) =>
    entry.type === 'story' &&
    entry.importPath.startsWith('./src-v2/'),
);

for (const { id } of stories) {
  test(id, async ({ page }) => {
    // Fake clock: a fixed "now" keeps relative dates stable, and runFor()
    // below flushes delayed UI (e.g. AvatarFallback delay={300}).
    await page.clock.install({
      time: new Date('2026-01-01T00:00:00Z'),
    });
    // Remote images (e.g. pravatar.cc) load nondeterministically; only
    // allow the local build and Google Fonts from preview-head.html.
    await page.route(
      (url) =>
        url.hostname !== '127.0.0.1' &&
        !url.hostname.endsWith('fonts.googleapis.com') &&
        !url.hostname.endsWith('fonts.gstatic.com'),
      (route) => route.abort(),
    );
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    // Wait until loaders, render and play functions have finished.
    await page.waitForFunction(
      () =>
        window.__STORYBOOK_PREVIEW__?.storyRenders.some(
          (render) =>
            render.phase === 'finished' || render.phase === 'errored',
        ) ?? false,
    );
    await expect(page.locator('body')).not.toHaveClass(
      /sb-show-errordisplay/,
    );
    await page.clock.runFor(1000);
    await page.evaluate(() =>
      document.fonts.ready.then(() => undefined),
    );

    await expect(page).toHaveScreenshot(`${id}.png`, {
      fullPage: true,
    });
  });
}
