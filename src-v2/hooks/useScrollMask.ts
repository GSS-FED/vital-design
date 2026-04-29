import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, RefObject, UIEventHandler } from 'react';

const DEFAULT_FADE_SIZE = 40;
const DEFAULT_EDGE_THRESHOLD = 1;

export type ScrollMaskInfo = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

export type ScrollMaskOptions = {
  enabled?: boolean;
  fadeSize?: number | string;
  edgeThreshold?: number;
};

const emptyScrollInfo: ScrollMaskInfo = {
  scrollTop: 0,
  scrollHeight: 0,
  clientHeight: 0,
};

function formatFadeSize(fadeSize: number | string) {
  if (typeof fadeSize === 'number') {
    return `${Math.max(0, fadeSize)}px`;
  }

  return fadeSize;
}

function isSameScrollInfo(
  current: ScrollMaskInfo,
  next: ScrollMaskInfo,
) {
  return (
    current.scrollTop === next.scrollTop &&
    current.scrollHeight === next.scrollHeight &&
    current.clientHeight === next.clientHeight
  );
}

export function readScrollMaskInfo(
  element: HTMLElement,
): ScrollMaskInfo {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return { scrollTop, scrollHeight, clientHeight };
}

export function getScrollMaskImage(
  info: ScrollMaskInfo,
  {
    enabled = true,
    edgeThreshold = DEFAULT_EDGE_THRESHOLD,
    fadeSize = DEFAULT_FADE_SIZE,
  }: ScrollMaskOptions = {},
) {
  if (!enabled) return undefined;

  const overflowDistance = info.scrollHeight - info.clientHeight;

  if (overflowDistance <= edgeThreshold) return undefined;

  const fade = formatFadeSize(fadeSize);
  const isAtTop = info.scrollTop <= edgeThreshold;
  const isAtBottom =
    overflowDistance - info.scrollTop <= edgeThreshold;

  if (isAtTop) {
    return `linear-gradient(to bottom, black 0, black calc(100% - ${fade}), transparent 100%)`;
  }

  if (isAtBottom) {
    return `linear-gradient(to bottom, transparent 0, black ${fade}, black 100%)`;
  }

  return `linear-gradient(to bottom, transparent 0, black ${fade}, black calc(100% - ${fade}), transparent 100%)`;
}

export function getScrollMaskStyle(
  maskImage: string | undefined,
): CSSProperties {
  if (!maskImage) return {};

  return {
    maskImage,
    maskRepeat: 'no-repeat',
    WebkitMaskImage: maskImage,
    WebkitMaskRepeat: 'no-repeat',
  };
}

export function useScrollMask<TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  options: ScrollMaskOptions = {},
) {
  const [scrollInfo, setScrollInfo] =
    useState<ScrollMaskInfo>(emptyScrollInfo);

  const update = useCallback(
    (element: TElement | null = ref.current) => {
      if (!element) return;

      const nextInfo = readScrollMaskInfo(element);
      setScrollInfo((currentInfo) =>
        isSameScrollInfo(currentInfo, nextInfo)
          ? currentInfo
          : nextInfo,
      );
    },
    [ref],
  );

  const onScroll = useCallback<UIEventHandler<TElement>>(
    (event) => {
      update(event.currentTarget);
    },
    [update],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    update(element);

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => update(element));

    const observeScrollContent = () => {
      if (!resizeObserver) return;

      resizeObserver.disconnect();
      resizeObserver.observe(element);

      for (const child of Array.from(element.children)) {
        resizeObserver.observe(child);
      }
    };

    observeScrollContent();

    const mutationObserver =
      typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(() => {
            update(element);
            observeScrollContent();
          });

    mutationObserver?.observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [ref, update]);

  const {
    enabled = true,
    edgeThreshold = DEFAULT_EDGE_THRESHOLD,
    fadeSize = DEFAULT_FADE_SIZE,
  } = options;

  const maskImage = useMemo(
    () =>
      getScrollMaskImage(scrollInfo, {
        enabled,
        edgeThreshold,
        fadeSize,
      }),
    [edgeThreshold, enabled, fadeSize, scrollInfo],
  );

  const maskStyle = useMemo(
    () => getScrollMaskStyle(maskImage),
    [maskImage],
  );

  return {
    maskImage,
    maskStyle,
    onScroll,
    scrollInfo,
    update,
  };
}
