// Named `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';

type Box = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const REPLACED = new Set([
  'IMG',
  'svg',
  'INPUT',
  'TEXTAREA',
  'SELECT',
  'CANVAS',
  'VIDEO',
  'IFRAME',
  'HR',
]);

function paintsBox(element: Element, style: CSSStyleDeclaration) {
  if (REPLACED.has(element.tagName)) return true;
  const sides = ['Top', 'Right', 'Bottom', 'Left'] as const;
  return (
    !/^(transparent|rgba\(.*,\s*0\))$/.test(style.backgroundColor) ||
    style.backgroundImage !== 'none' ||
    style.boxShadow !== 'none' ||
    sides.some(
      (side) =>
        style.getPropertyValue(
          `border-${side.toLowerCase()}-style`,
        ) !== 'none' && parseFloat(style[`border${side}Width`]) > 0,
    ) ||
    (style.outlineStyle !== 'none' &&
      parseFloat(style.outlineWidth) > 0)
  );
}

/**
 * Locator for the smallest page region that holds everything painted
 * (backgrounds, borders, shadows, text, images), including portaled popups,
 * plus a margin. Layout-only wrappers don't count, so a button in a
 * full-width story gives a button-sized image, and an open menu or tooltip
 * is never cut off the way a container screenshot would cut it.
 */
export async function renderedRegion(margin = 16) {
  // Measure the settled layout: images and fonts change sizes when they
  // load (failed remote images resolve too), and an open popup may still be
  // zooming in. Animations are handled like the screenshot's
  // animations: 'disabled' (finish finite, cancel infinite).
  await Promise.all(
    [...document.images].map((image) =>
      image.decode().catch(() => {}),
    ),
  );
  await document.fonts.ready;
  for (const animation of document.getAnimations()) {
    if (animation.effect?.getTiming().iterations === Infinity) {
      animation.cancel();
    } else {
      animation.finish();
    }
  }
  let ink: Box | undefined;
  const add = (rect: DOMRect | Box, clip: Box) => {
    const box = {
      left: Math.max(rect.left, clip.left),
      top: Math.max(rect.top, clip.top),
      right: Math.min(rect.right, clip.right),
      bottom: Math.min(rect.bottom, clip.bottom),
    };
    if (box.right <= box.left || box.bottom <= box.top) return;
    ink = ink
      ? {
          left: Math.min(ink.left, box.left),
          top: Math.min(ink.top, box.top),
          right: Math.max(ink.right, box.right),
          bottom: Math.max(ink.bottom, box.bottom),
        }
      : box;
  };
  const visit = (element: Element, clip: Box) => {
    if (element.hasAttribute('data-rendered-region')) return;
    const style = getComputedStyle(element);
    if (style.display === 'none') return;
    const rect = element.getBoundingClientRect();
    if (style.visibility !== 'hidden' && paintsBox(element, style)) {
      add(rect, clip);
    }
    if (element.tagName === 'svg') return;
    for (const node of element.childNodes) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent?.trim()
      ) {
        const range = document.createRange();
        range.selectNodeContents(node);
        add(range.getBoundingClientRect(), clip);
      }
    }
    // Children of a clipping box only show inside that box.
    const clips =
      style.overflowX !== 'visible' || style.overflowY !== 'visible';
    const childClip = clips
      ? {
          left: Math.max(clip.left, rect.left),
          top: Math.max(clip.top, rect.top),
          right: Math.min(clip.right, rect.right),
          bottom: Math.min(clip.bottom, rect.bottom),
        }
      : clip;
    for (const child of element.children) visit(child, childClip);
  };
  const unclipped = {
    left: -Infinity,
    top: -Infinity,
    right: Infinity,
    bottom: Infinity,
  };
  for (const child of document.body.children) visit(child, unclipped);
  if (!ink) return screen.elementLocator(document.body);

  const region = document.createElement('div');
  region.dataset.renderedRegion = '';
  region.dataset.testid = 'rendered-region';
  const x = Math.max(0, Math.floor(ink.left + scrollX - margin));
  const y = Math.max(0, Math.floor(ink.top + scrollY - margin));
  Object.assign(region.style, {
    position: 'absolute',
    pointerEvents: 'none',
    left: `${x}px`,
    top: `${y}px`,
    width: `${Math.ceil(ink.right + scrollX + margin) - x}px`,
    height: `${Math.ceil(ink.bottom + scrollY + margin) - y}px`,
  });
  document.body.append(region);
  // Not page.elementLocator(region): that becomes a positional selector
  // (body > div:nth-child(n)), which points at the wrong node once a popup
  // portal mounts or unmounts in <body> before the screenshot is taken.
  return screen.getByTestId('rendered-region');
}
