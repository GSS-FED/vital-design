import {
  DocsContainer,
  type DocsContainerProps,
} from '@storybook/blocks';
import { useEffect, useState } from 'react';
import { addons } from 'storybook/internal/preview-api';
import {
  storybookThemeVars,
  themeFromSearch,
} from './storybook-theme';

export function ThemedDocsContainer({
  children,
  context,
}: DocsContainerProps) {
  const [theme, setTheme] = useState(() =>
    storybookThemeVars(themeFromSearch(window.location.search)),
  );

  useEffect(() => {
    const channel = addons.getChannel();
    const onGlobals = (payload: {
      globals?: { theme?: unknown };
    }) => {
      if (!payload?.globals || !('theme' in payload.globals)) return;
      setTheme(storybookThemeVars(payload.globals.theme));
    };
    channel.on('globalsUpdated', onGlobals);
    return () => {
      channel.off('globalsUpdated', onGlobals);
    };
  }, []);

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
}
