import { describe, expect, it } from 'vitest';
import { getScrollMaskImage } from './useScrollMask';

describe('getScrollMaskImage', () => {
  it('returns no mask when content does not overflow', () => {
    expect(
      getScrollMaskImage({
        clientHeight: 100,
        scrollHeight: 100,
        scrollTop: 0,
      }),
    ).toBeUndefined();
  });

  it('fades only the bottom edge at the top', () => {
    expect(
      getScrollMaskImage({
        clientHeight: 100,
        scrollHeight: 200,
        scrollTop: 0,
      }),
    ).toBe(
      'linear-gradient(to bottom, black 0, black calc(100% - 40px), transparent 100%)',
    );
  });

  it('fades both edges in the middle', () => {
    expect(
      getScrollMaskImage({
        clientHeight: 100,
        scrollHeight: 200,
        scrollTop: 50,
      }),
    ).toBe(
      'linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 40px), transparent 100%)',
    );
  });

  it('fades only the top edge at the bottom', () => {
    expect(
      getScrollMaskImage({
        clientHeight: 100,
        scrollHeight: 200,
        scrollTop: 100,
      }),
    ).toBe(
      'linear-gradient(to bottom, transparent 0, black 40px, black 100%)',
    );
  });

  it('uses the edge threshold for subpixel bottom detection', () => {
    expect(
      getScrollMaskImage({
        clientHeight: 100,
        scrollHeight: 200,
        scrollTop: 99.5,
      }),
    ).toBe(
      'linear-gradient(to bottom, transparent 0, black 40px, black 100%)',
    );
  });
});
