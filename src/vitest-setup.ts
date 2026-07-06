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

if (
  typeof window !== 'undefined' &&
  !window.HTMLElement.prototype.getAnimations
) {
  Object.defineProperty(
    window.HTMLElement.prototype,
    'getAnimations',
    {
      configurable: true,
      value: () => [],
    },
  );
}

if (
  typeof window !== 'undefined' &&
  !window.HTMLElement.prototype.scrollIntoView
) {
  Object.defineProperty(
    window.HTMLElement.prototype,
    'scrollIntoView',
    {
      configurable: true,
      writable: true,
      value: () => {},
    },
  );
}
