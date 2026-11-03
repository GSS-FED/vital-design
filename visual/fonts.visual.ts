import { expect, test } from '@playwright/test';

test('bundled fonts load without external requests', async ({
  page,
}) => {
  const externalRequests: string[] = [];
  await page.route(
    (url) => url.hostname !== '127.0.0.1',
    (route) => {
      externalRequests.push(route.request().url());
      return route.abort();
    },
  );
  await page.goto(
    '/iframe.html?id=v2-components-button--default&viewMode=story',
  );
  await page.waitForFunction(() =>
    window.__STORYBOOK_PREVIEW__?.storyRenders.some(
      (render) => render.phase === 'finished',
    ),
  );

  for (const family of ['Roboto', 'Noto Sans TC']) {
    for (const weight of [400, 500]) {
      const faces = await page.evaluate(
        async ({ family, weight }) => {
          const loaded = await document.fonts.load(
            `${weight} 16px "${family}"`,
            family === 'Roboto' ? 'ABCabc0123' : '繁體中文測試',
          );
          return loaded.map((face) => face.status);
        },
        { family, weight },
      );
      expect(
        faces.length,
        `${family} ${weight} must be available`,
      ).toBeGreaterThan(0);
      expect(faces.every((status) => status === 'loaded')).toBe(true);
    }
  }

  expect(externalRequests).toEqual([]);
});
