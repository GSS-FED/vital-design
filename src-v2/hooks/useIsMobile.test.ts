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
  const listeners = new Set<() => void>();
  let matches = false;

  beforeEach(() => {
    listeners.clear();
    matches = false;
    window.matchMedia = vi
      .fn()
      .mockImplementation((query: string) => {
        return {
          matches,
          media: query,
          onchange: null,
          addEventListener: (_type: string, listener: () => void) => {
            listeners.add(listener);
          },
          removeEventListener: (
            _type: string,
            listener: () => void,
          ) => {
            listeners.delete(listener);
          },
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
    matches = false;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true on mobile widths', () => {
    matches = true;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    matches = false;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    matches = true;
    act(() => {
      listeners.forEach((listener) => listener());
    });
    expect(result.current).toBe(true);
  });
});
