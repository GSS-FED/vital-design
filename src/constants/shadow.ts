import colors from './colors';

const shadows = {
  ACCENT: `0 2px 8px 0 ${colors.grayscale300}` as const,
  BASE: `0 6px 10px 0 ${colors.grayscale200}` as const,
  EMPHASIS: `0 6px 20px -2px ${colors.grayscale400}` as const,
  TOP_LEVEL: `0 6px 32px -4px ${colors.grayscale400}` as const,
};

export default shadows;
