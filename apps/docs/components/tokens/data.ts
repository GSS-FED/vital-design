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

export const grayscaleTokens = palette(
  'grayscale',
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

export const alarmTokens = palette('alarm', [
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

export const borderToken: ColorEntry[] = [
  {
    name: '--border',
    value: '#DEDEE2',
    utility: 'border-(--border)',
  },
];

export const semanticTextTokens: ColorEntry[] = [
  {
    name: '--text-primary',
    value: '#232332',
    utility: 'text-(--text-primary)',
  },
  { name: '--text-secondary', value: 'rgba(35,35,50,0.70)' },
  { name: '--text-tertiary', value: 'rgba(35,35,50,0.55)' },
  { name: '--text-disabled', value: 'rgba(35,35,50,0.25)' },
  { name: '--text-on-accent', value: '#FFFFFF' },
];

export const semanticInteractiveTokens: ColorEntry[] = [
  { name: '--interactive-default', value: '#0E86FE' },
  { name: '--interactive-hover', value: '#016DD8' },
  { name: '--interactive-pressed', value: '#0153A5' },
  { name: '--interactive-subtle', value: '#EBF5FF' },
];

export const semanticFeedbackTokens: ColorEntry[] = [
  { name: '--feedback-success', value: '#2BCD86' },
  { name: '--feedback-info', value: '#00C3FF' },
  { name: '--feedback-warning', value: '#FFA700' },
  { name: '--feedback-error', value: '#EB5000' },
];

export const semanticSurfaceTokens: ColorEntry[] = [
  { name: '--surface-default', value: '#FFFFFF' },
  { name: '--surface-subtle', value: 'rgba(35,35,50,0.03)' },
  { name: '--surface-muted', value: 'rgba(35,35,50,0.08)' },
];

export const avatarTokens = [
  {
    name: 'tiffany',
    color: '--avatar-tiffany-color',
    border: '--avatar-tiffany-border',
    bg: '--avatar-tiffany-bg',
  },
  {
    name: 'green',
    color: '--avatar-green-color',
    border: '--avatar-green-border',
    bg: '--avatar-green-bg',
  },
  {
    name: 'orange',
    color: '--avatar-orange-color',
    border: '--avatar-orange-border',
    bg: '--avatar-orange-bg',
  },
  {
    name: 'pink',
    color: '--avatar-pink-color',
    border: '--avatar-pink-border',
    bg: '--avatar-pink-bg',
  },
  {
    name: 'blue',
    color: '--avatar-blue-color',
    border: '--avatar-blue-border',
    bg: '--avatar-blue-bg',
  },
  {
    name: 'sky',
    color: '--avatar-sky-color',
    border: '--avatar-sky-border',
    bg: '--avatar-sky-bg',
  },
  {
    name: 'purple',
    color: '--avatar-purple-color',
    border: '--avatar-purple-border',
    bg: '--avatar-purple-bg',
  },
  {
    name: 'light-gold',
    color: '--avatar-light-gold-color',
    border: '--avatar-light-gold-border',
    bg: '--avatar-light-gold-bg',
  },
  {
    name: 'salmon',
    color: '--avatar-salmon-color',
    border: '--avatar-salmon-border',
    bg: '--avatar-salmon-bg',
  },
  {
    name: 'ice',
    color: '--avatar-ice-color',
    border: '--avatar-ice-border',
    bg: '--avatar-ice-bg',
  },
  {
    name: 'lavender',
    color: '--avatar-lavender-color',
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
  { name: '--shadow-focus-alarm' },
  { name: '--shadow-focus-ring-primary' },
  { name: '--shadow-focus-ring-alarm' },
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
  { name: '--shadow-button-alarm' },
  { name: '--shadow-button-alarm-active' },
];

export const gradientTokens = [
  { name: '--gradient-primary' },
  { name: '--gradient-primary-button' },
];
