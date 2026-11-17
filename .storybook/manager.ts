import { addons } from 'storybook/internal/manager-api';
import {
  storybookThemeVars,
  themeFromSearch,
} from './storybook-theme';

const ADDON_ID = 'vital-design/manager-theme';

addons.setConfig({
  theme: storybookThemeVars(themeFromSearch(window.location.search)),
});

addons.register(ADDON_ID, (api) => {
  api.on(
    'globalsUpdated',
    (payload: { globals?: { theme?: unknown } }) => {
      if (!payload?.globals || !('theme' in payload.globals)) return;
      addons.setConfig({
        theme: storybookThemeVars(payload.globals.theme),
      });
    },
  );
});
