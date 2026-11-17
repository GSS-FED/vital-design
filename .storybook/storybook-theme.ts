import { type ThemeVars, themes } from 'storybook/internal/theming';

export function storybookThemeVars(theme: unknown): ThemeVars {
  return theme === 'dark' ? themes.dark : themes.light;
}

export function themeFromSearch(search: string): 'light' | 'dark' {
  const globals = new URLSearchParams(search).get('globals') ?? '';
  return /(^|;)theme:dark(;|$)/.test(globals) ? 'dark' : 'light';
}
