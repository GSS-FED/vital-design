import { act, renderHook } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useIsMobile } from './useIsMobile';

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;
  let changeHandler: ((event: MediaQueryListEvent) => void) | null =
    null;
  let matches = false;

  beforeEach(() => {
    changeHandler = null;
    matches = false;
    window.matchMedia = vi
      .fn()
      .mockImplementation((query: string) => {
        return {
          matches,
          media: query,
          onchange: null,
          addEventListener: (
            _type: string,
            listener: (event: MediaQueryListEvent) => void,
          ) => {
            changeHandler = listener;
          },
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('returns false on desktop widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true on mobile widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 500,
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 400,
    });
    act(() => {
      changeHandler?.({} as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);
  });
});
