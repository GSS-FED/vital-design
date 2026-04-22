import type { Preview } from '@storybook/react';
import '../src-v2/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: { exclude: ['style', 'className'] },
    docs: {
      toc: true, //Enables the table of contents
    },
  },
  //Enable auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;
