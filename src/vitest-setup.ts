import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import { afterEach, beforeAll } from 'vitest';

beforeAll(() => {
  // 詳見：https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = ResizeObserver;
});

afterEach(() => {
  cleanup();
});
