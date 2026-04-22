import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined' && !window.PointerEvent) {
  class PointerEventPolyfill extends MouseEvent {}

  // Base UI relies on PointerEvent for interaction handling in jsdom.
  Object.defineProperty(window, 'PointerEvent', {
    configurable: true,
    value: PointerEventPolyfill,
  });
  Object.defineProperty(globalThis, 'PointerEvent', {
    configurable: true,
    value: PointerEventPolyfill,
  });
}
