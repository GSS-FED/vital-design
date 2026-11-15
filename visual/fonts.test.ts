import { expect, test } from 'vitest';

// visual/setup.ts imports the bundled fonts and blocks external requests,
// so a font that still came from a remote URL would fail to load here.
test.each([
  ['Roboto', 400, 'ABCabc0123'],
  ['Roboto', 500, 'ABCabc0123'],
  ['Noto Sans TC', 400, '繁體中文測試'],
  ['Noto Sans TC', 500, '繁體中文測試'],
])('bundled %s %i loads', async (family, weight, sample) => {
  const faces = await document.fonts.load(
    `${weight} 16px "${family}"`,
    sample,
  );
  expect(faces.length).toBeGreaterThan(0);
  expect(faces.every((face) => face.status === 'loaded')).toBe(true);
});
