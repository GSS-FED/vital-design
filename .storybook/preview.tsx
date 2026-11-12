import '@fontsource/noto-sans-tc/400.css';
import '@fontsource/noto-sans-tc/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import type { Decorator, Preview } from '@storybook/react';
import { Agentation } from 'agentation';
import '../src-v2/styles/globals.css';

// Class on <html> so portaled layers inherit the same variables.
// Default stays light; visual baselines do not opt into dark.
const withColorTheme: Decorator = (Story, context) => {
  document.documentElement.classList.toggle(
    'dark',
    context.globals.theme === 'dark',
  );
  return <Story />;
};

// Show the Agentation toolbar in the story canvas during local dev only.
// Skip the `docs` view mode so autodocs pages (many stories at once) don't
// stack multiple toolbars.
const withAgentation: Decorator = (Story, context) => (
  <>
    <Story />
    {process.env.NODE_ENV === 'development' &&
      context.viewMode === 'story' && <Agentation />}
  </>
);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withColorTheme, withAgentation],
  parameters: {
    controls: { exclude: ['style', 'className'] },
    docs: {
      toc: true, //Enables the table of contents
    },
    options: {
      storySort: { method: 'alphabetical' },
    },
  },
  //Enable auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;
