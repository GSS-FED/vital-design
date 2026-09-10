import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function canUseMatchMedia() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
  );
}

function subscribe(callback: () => void) {
  if (!canUseMatchMedia()) {
    return () => {};
  }

  const mediaQueryList = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQueryList.addEventListener('change', callback);

  return () => {
    mediaQueryList.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  if (!canUseMatchMedia()) {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}
