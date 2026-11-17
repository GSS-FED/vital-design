// Light and dark values come from registry/vital-theme-vars.ts, so the
// swatches stay in sync with the built tokens.
type ColorEntry = {
  name: string;
  utility?: string;
};

const palette = (
  prefix: string,
  steps: number[],
  utilityPrefix = 'bg',
): ColorEntry[] =>
  steps.map((step) => ({
    name: `--${prefix}-${step}`,
    utility: `${utilityPrefix}-${prefix}-${step}`,
  }));

export const primaryTokens = palette(
  'primary',
  [900, 800, 700, 600, 500, 400, 300, 200, 100, 50],
);

export const grayscaleTokens = palette(
  'grayscale',
  [900, 800, 700, 600, 500, 400, 300, 200, 100],
);

export const grayscaleOpacityTokens = palette(
  'grayscale-opacity',
  [900, 800, 700, 600, 500, 400, 300, 200, 150, 100],
  'text',
);

export const successTokens = palette(
  'success',
  [900, 800, 700, 600, 500, 400, 300, 200, 100],
);

export const infoTokens = palette(
  'info',
  [900, 800, 700, 600, 500, 400, 300, 200, 100],
);

export const warningTokens = palette(
  'warning',
  [900, 800, 700, 600, 500, 400, 300, 200, 100],
);

export const destructiveTokens = palette(
  'destructive',
  [900, 800, 700, 600, 500, 400, 300, 200, 100],
);

// Sidebar shell slots — shadcn-compatible app chrome (see theme.sidebar* in tokens).
export const semanticSidebarTokens: ColorEntry[] = [
  {
    name: '--sidebar',
    utility: 'bg-sidebar',
  },
  {
    name: '--sidebar-foreground',
    utility: 'text-sidebar-foreground',
  },
  {
    name: '--sidebar-primary',
    utility: 'bg-sidebar-primary',
  },
  {
    name: '--sidebar-primary-foreground',
    utility: 'text-sidebar-primary-foreground',
  },
  {
    name: '--sidebar-accent',
    utility: 'bg-sidebar-accent',
  },
  {
    name: '--sidebar-accent-foreground',
    utility: 'text-sidebar-accent-foreground',
  },
  {
    name: '--sidebar-border',
    utility: 'border-sidebar-border',
  },
  {
    name: '--sidebar-ring',
    utility: 'ring-sidebar-ring',
  },
];

// Surface/foreground pairs — page chrome, cards, popovers, muted/accent regions.
export const semanticSurfaceTokens: ColorEntry[] = [
  {
    name: '--background',
    utility: 'bg-background',
  },
  {
    name: '--foreground',
    utility: 'text-foreground',
  },
  { name: '--card', utility: 'bg-card' },
  {
    name: '--card-foreground',
    utility: 'text-card-foreground',
  },
  { name: '--popover', utility: 'bg-popover' },
  {
    name: '--popover-foreground',
    utility: 'text-popover-foreground',
  },
  {
    name: '--muted',
    utility: 'bg-muted',
  },
  {
    name: '--muted-foreground',
    utility: 'text-muted-foreground',
  },
  {
    name: '--accent',
    utility: 'bg-accent',
  },
  {
    name: '--accent-foreground',
    utility: 'text-accent-foreground',
  },
];

// Action surfaces — primary brand action and secondary alternative.
export const semanticActionTokens: ColorEntry[] = [
  { name: '--primary', utility: 'bg-primary' },
  {
    name: '--primary-foreground',
    utility: 'text-primary-foreground',
  },
  {
    name: '--secondary',
    utility: 'bg-secondary',
  },
  {
    name: '--secondary-foreground',
    utility: 'text-secondary-foreground',
  },
];

// Status colors — paired with foreground for legible content on the surface.
export const semanticStatusTokens: ColorEntry[] = [
  { name: '--success', utility: 'bg-success' },
  {
    name: '--success-foreground',
    utility: 'text-success-foreground',
  },
  { name: '--info', utility: 'bg-info' },
  {
    name: '--info-foreground',
    utility: 'text-info-foreground',
  },
  { name: '--warning', utility: 'bg-warning' },
  {
    name: '--warning-foreground',
    utility: 'text-warning-foreground',
  },
  {
    name: '--destructive',
    utility: 'bg-destructive',
  },
  {
    name: '--destructive-foreground',
    utility: 'text-destructive-foreground',
  },
];

// Form-related — borders, input strokes, focus rings.
export const semanticFormTokens: ColorEntry[] = [
  {
    name: '--border',
    utility: 'border-border',
  },
  {
    name: '--border-overlap',
    utility: 'border-border-overlap',
  },
  { name: '--input', utility: 'border-input' },
  { name: '--ring', utility: 'ring-ring' },
];

// Chart series — five-color palette for data visualization.
export const semanticChartTokens: ColorEntry[] = [
  { name: '--chart-1', utility: 'bg-chart-1' },
  { name: '--chart-2', utility: 'bg-chart-2' },
  { name: '--chart-3', utility: 'bg-chart-3' },
  { name: '--chart-4', utility: 'bg-chart-4' },
  { name: '--chart-5', utility: 'bg-chart-5' },
];

// Vital-specific extensions — no shadcn equivalent. Kept unprefixed per Origin
// UI's pattern for ecosystem consistency.
export const semanticVitalTokens: ColorEntry[] = [
  { name: '--text-tertiary' },
  { name: '--text-disabled' },
  { name: '--interactive-hover' },
  { name: '--interactive-pressed' },
  { name: '--interactive-subtle' },
];

export const avatarTokens = [
  {
    name: 'tiffany',
    color: '--avatar-tiffany-fg',
    border: '--avatar-tiffany-border',
    bg: '--avatar-tiffany-bg',
  },
  {
    name: 'green',
    color: '--avatar-green-fg',
    border: '--avatar-green-border',
    bg: '--avatar-green-bg',
  },
  {
    name: 'orange',
    color: '--avatar-orange-fg',
    border: '--avatar-orange-border',
    bg: '--avatar-orange-bg',
  },
  {
    name: 'pink',
    color: '--avatar-pink-fg',
    border: '--avatar-pink-border',
    bg: '--avatar-pink-bg',
  },
  {
    name: 'blue',
    color: '--avatar-blue-fg',
    border: '--avatar-blue-border',
    bg: '--avatar-blue-bg',
  },
  {
    name: 'sky',
    color: '--avatar-sky-fg',
    border: '--avatar-sky-border',
    bg: '--avatar-sky-bg',
  },
  {
    name: 'purple',
    color: '--avatar-purple-fg',
    border: '--avatar-purple-border',
    bg: '--avatar-purple-bg',
  },
  {
    name: 'light-gold',
    color: '--avatar-light-gold-fg',
    border: '--avatar-light-gold-border',
    bg: '--avatar-light-gold-bg',
  },
  {
    name: 'salmon',
    color: '--avatar-salmon-fg',
    border: '--avatar-salmon-border',
    bg: '--avatar-salmon-bg',
  },
  {
    name: 'ice',
    color: '--avatar-ice-fg',
    border: '--avatar-ice-border',
    bg: '--avatar-ice-bg',
  },
  {
    name: 'lavender',
    color: '--avatar-lavender-fg',
    border: '--avatar-lavender-border',
    bg: '--avatar-lavender-bg',
  },
];

export const tagTokens = [
  {
    name: 'teal',
    solid: '--tag-teal-solid',
    tint: '--tag-teal-tint',
  },
  {
    name: 'olive',
    solid: '--tag-olive-solid',
    tint: '--tag-olive-tint',
  },
  {
    name: 'brown',
    solid: '--tag-brown-solid',
    tint: '--tag-brown-tint',
  },
  {
    name: 'rose',
    solid: '--tag-rose-solid',
    tint: '--tag-rose-tint',
  },
  {
    name: 'indigo',
    solid: '--tag-indigo-solid',
    tint: '--tag-indigo-tint',
  },
  {
    name: 'blue',
    solid: '--tag-blue-solid',
    tint: '--tag-blue-tint',
  },
  {
    name: 'green',
    solid: '--tag-green-solid',
    tint: '--tag-green-tint',
  },
  {
    name: 'gold',
    solid: '--tag-gold-solid',
    tint: '--tag-gold-tint',
  },
  { name: 'red', solid: '--tag-red-solid', tint: '--tag-red-tint' },
  {
    name: 'purple',
    solid: '--tag-purple-solid',
    tint: '--tag-purple-tint',
  },
  {
    name: 'navy',
    solid: '--tag-navy-solid',
    tint: '--tag-navy-tint',
  },
];

export const radiusTokens = [
  { name: '--radius-none', value: '0px', utility: 'rounded-none' },
  { name: '--radius-sm', value: '4px', utility: 'rounded-sm' },
  { name: '--radius-md', value: '8px', utility: 'rounded-md' },
  { name: '--radius-lg', value: '15px', utility: 'rounded-lg' },
  { name: '--radius-xl', value: '16px', utility: 'rounded-xl' },
  { name: '--radius-full', value: '9999px', utility: 'rounded-full' },
];

export const elevationShadowTokens = [
  { name: '--shadow-accent', utility: 'shadow-accent' },
  { name: '--shadow-base', utility: 'shadow-base' },
  { name: '--shadow-emphasis', utility: 'shadow-emphasis' },
  { name: '--shadow-top-level', utility: 'shadow-top-level' },
];

export const focusShadowTokens = [
  { name: '--shadow-focus-primary' },
  { name: '--shadow-focus-success' },
  { name: '--shadow-focus-info' },
  { name: '--shadow-focus-warning' },
  { name: '--shadow-focus-destructive' },
  { name: '--shadow-focus-ring-primary' },
  { name: '--shadow-focus-ring-destructive' },
];

export const buttonShadowTokens = [
  { name: '--shadow-button-primary' },
  { name: '--shadow-button-primary-active' },
  { name: '--shadow-button-success' },
  { name: '--shadow-button-success-active' },
  { name: '--shadow-button-info' },
  { name: '--shadow-button-info-active' },
  { name: '--shadow-button-warning' },
  { name: '--shadow-button-warning-active' },
  { name: '--shadow-button-destructive' },
  { name: '--shadow-button-destructive-active' },
];

export const gradientTokens = [
  { name: '--gradient-primary' },
  { name: '--gradient-primary-button' },
];
