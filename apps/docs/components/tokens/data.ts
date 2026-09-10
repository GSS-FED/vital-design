type ColorEntry = {
  name: string;
  value?: string;
  utility?: string;
};

const palette = (
  prefix: string,
  steps: { step: number | string; value: string }[],
  utilityPrefix = 'bg',
): ColorEntry[] =>
  steps.map(({ step, value }) => ({
    name: `--${prefix}-${step}`,
    value,
    utility: `${utilityPrefix}-${prefix}-${step}`,
  }));

export const primaryTokens = palette('primary', [
  { step: 900, value: '#002040' },
  { step: 800, value: '#003A73' },
  { step: 700, value: '#0153A5' },
  { step: 600, value: '#016DD8' },
  { step: 500, value: '#0E86FE' },
  { step: 400, value: '#419FFE' },
  { step: 300, value: '#73B9FE' },
  { step: 200, value: '#A6D2FF' },
  { step: 100, value: '#D9ECFF' },
  { step: 50, value: '#EBF5FF' },
]);

export const grayscaleTokens = palette('grayscale', [
  { step: 900, value: '#232327' },
  { step: 800, value: '#43434B' },
  { step: 700, value: '#63636F' },
  { step: 600, value: '#848492' },
  { step: 500, value: '#A8A8B2' },
  { step: 400, value: '#C8C8D0' },
  { step: 300, value: '#DEDEE2' },
  { step: 200, value: '#F0F0F2' },
  { step: 100, value: '#F9F9FA' },
]);

export const grayscaleOpacityTokens = palette(
  'grayscale-opacity',
  [
    { step: 900, value: '#232332 · 100%' },
    { step: 800, value: 'rgba(35,35,50,0.85)' },
    { step: 700, value: 'rgba(35,35,50,0.70)' },
    { step: 600, value: 'rgba(35,35,50,0.55)' },
    { step: 500, value: 'rgba(35,35,50,0.40)' },
    { step: 400, value: 'rgba(35,35,50,0.25)' },
    { step: 300, value: 'rgba(35,35,50,0.15)' },
    { step: 200, value: 'rgba(35,35,50,0.08)' },
    { step: 150, value: 'rgba(35,35,50,0.05)' },
    { step: 100, value: 'rgba(35,35,50,0.03)' },
  ],
  'text',
);

export const successTokens = palette('success', [
  { step: 900, value: '#082518' },
  { step: 800, value: '#104F33' },
  { step: 700, value: '#19794F' },
  { step: 600, value: '#22A36A' },
  { step: 500, value: '#2BCD86' },
  { step: 400, value: '#51DA9E' },
  { step: 300, value: '#7BE3B5' },
  { step: 200, value: '#A5ECCD' },
  { step: 100, value: '#CFF5E4' },
]);

export const infoTokens = palette('info', [
  { step: 900, value: '#002733' },
  { step: 800, value: '#004E66' },
  { step: 700, value: '#007599' },
  { step: 600, value: '#009CCC' },
  { step: 500, value: '#00C3FF' },
  { step: 400, value: '#33CFFF' },
  { step: 300, value: '#66DBFF' },
  { step: 200, value: '#99E7FF' },
  { step: 100, value: '#CCF3FF' },
]);

export const warningTokens = palette('warning', [
  { step: 900, value: '#332200' },
  { step: 800, value: '#664300' },
  { step: 700, value: '#996400' },
  { step: 600, value: '#CC8600' },
  { step: 500, value: '#FFA700' },
  { step: 400, value: '#FFB933' },
  { step: 300, value: '#FFCA66' },
  { step: 200, value: '#FFDC99' },
  { step: 100, value: '#FFEDCC' },
]);

export const destructiveTokens = palette('destructive', [
  { step: 900, value: '#1F0B00' },
  { step: 800, value: '#521C00' },
  { step: 700, value: '#852D00' },
  { step: 600, value: '#B83F00' },
  { step: 500, value: '#EB5000' },
  { step: 400, value: '#FF6B1F' },
  { step: 300, value: '#FF8D52' },
  { step: 200, value: '#FFAE85' },
  { step: 100, value: '#FFD0B8' },
]);

// Sidebar shell slots — shadcn-compatible app chrome (see theme.sidebar* in tokens).
export const semanticSidebarTokens: ColorEntry[] = [
  {
    name: '--sidebar',
    value: '#F9F9FA',
    utility: 'bg-sidebar',
  },
  {
    name: '--sidebar-foreground',
    value: '#232327',
    utility: 'text-sidebar-foreground',
  },
  {
    name: '--sidebar-primary',
    value: '#0E86FE',
    utility: 'bg-sidebar-primary',
  },
  {
    name: '--sidebar-primary-foreground',
    value: '#FFFFFF',
    utility: 'text-sidebar-primary-foreground',
  },
  {
    name: '--sidebar-accent',
    value: '#EBF5FF',
    utility: 'bg-sidebar-accent',
  },
  {
    name: '--sidebar-accent-foreground',
    value: '#0153A5',
    utility: 'text-sidebar-accent-foreground',
  },
  {
    name: '--sidebar-border',
    value: 'rgba(35,35,50,0.08)',
    utility: 'border-sidebar-border',
  },
  {
    name: '--sidebar-ring',
    value: '#73B9FE',
    utility: 'ring-sidebar-ring',
  },
];

// Surface/foreground pairs — page chrome, cards, popovers, muted/accent regions.
export const semanticSurfaceTokens: ColorEntry[] = [
  {
    name: '--background',
    value: '#FFFFFF',
    utility: 'bg-background',
  },
  {
    name: '--foreground',
    value: '#232332',
    utility: 'text-foreground',
  },
  { name: '--card', value: '#FFFFFF', utility: 'bg-card' },
  {
    name: '--card-foreground',
    value: '#232332',
    utility: 'text-card-foreground',
  },
  { name: '--popover', value: '#FFFFFF', utility: 'bg-popover' },
  {
    name: '--popover-foreground',
    value: '#232332',
    utility: 'text-popover-foreground',
  },
  {
    name: '--muted',
    value: 'rgba(35,35,50,0.03)',
    utility: 'bg-muted',
  },
  {
    name: '--muted-foreground',
    value: 'rgba(35,35,50,0.70)',
    utility: 'text-muted-foreground',
  },
  {
    name: '--accent',
    value: 'rgba(35,35,50,0.08)',
    utility: 'bg-accent',
  },
  {
    name: '--accent-foreground',
    value: '#232332',
    utility: 'text-accent-foreground',
  },
];

// Action surfaces — primary brand action and secondary alternative.
export const semanticActionTokens: ColorEntry[] = [
  { name: '--primary', value: '#0E86FE', utility: 'bg-primary' },
  {
    name: '--primary-foreground',
    value: '#FFFFFF',
    utility: 'text-primary-foreground',
  },
  {
    name: '--secondary',
    value: 'rgba(35,35,50,0.03)',
    utility: 'bg-secondary',
  },
  {
    name: '--secondary-foreground',
    value: '#232332',
    utility: 'text-secondary-foreground',
  },
];

// Status colors — paired with foreground for legible content on the surface.
export const semanticStatusTokens: ColorEntry[] = [
  { name: '--success', value: '#2BCD86', utility: 'bg-success' },
  {
    name: '--success-foreground',
    value: '#FFFFFF',
    utility: 'text-success-foreground',
  },
  { name: '--info', value: '#00C3FF', utility: 'bg-info' },
  {
    name: '--info-foreground',
    value: '#FFFFFF',
    utility: 'text-info-foreground',
  },
  { name: '--warning', value: '#FFA700', utility: 'bg-warning' },
  {
    name: '--warning-foreground',
    value: '#232332',
    utility: 'text-warning-foreground',
  },
  {
    name: '--destructive',
    value: '#EB5000',
    utility: 'bg-destructive',
  },
  {
    name: '--destructive-foreground',
    value: '#FFFFFF',
    utility: 'text-destructive-foreground',
  },
];

// Form-related — borders, input strokes, focus rings.
export const semanticFormTokens: ColorEntry[] = [
  { name: '--border', value: '#DEDEE2', utility: 'border-border' },
  { name: '--input', value: '#DEDEE2', utility: 'border-input' },
  { name: '--ring', value: '#0E86FE', utility: 'ring-ring' },
];

// Chart series — five-color palette for data visualization.
export const semanticChartTokens: ColorEntry[] = [
  { name: '--chart-1', value: '#0E86FE', utility: 'bg-chart-1' },
  { name: '--chart-2', value: '#2BCD86', utility: 'bg-chart-2' },
  { name: '--chart-3', value: '#FFA700', utility: 'bg-chart-3' },
  { name: '--chart-4', value: '#00C3FF', utility: 'bg-chart-4' },
  { name: '--chart-5', value: '#EB5000', utility: 'bg-chart-5' },
];

// Vital-specific extensions — no shadcn equivalent. Kept unprefixed per Origin
// UI's pattern for ecosystem consistency.
export const semanticVitalTokens: ColorEntry[] = [
  { name: '--text-tertiary', value: 'rgba(35,35,50,0.55)' },
  { name: '--text-disabled', value: 'rgba(35,35,50,0.25)' },
  { name: '--interactive-hover', value: '#016DD8' },
  { name: '--interactive-pressed', value: '#0153A5' },
  { name: '--interactive-subtle', value: '#EBF5FF' },
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
