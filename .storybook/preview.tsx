import type { Decorator, Preview } from '@storybook/react';
import { Agentation } from 'agentation';
import '../src-v2/styles/globals.css';

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
  decorators: [withAgentation],
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
