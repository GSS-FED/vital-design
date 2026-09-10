import { base } from './base';
import { blocks } from './blocks';
import { hooks } from './hooks';
import { ui } from './ui';

export const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  $registry: 'https://vittal.design/r',
  name: 'vital-design',
  homepage: 'https://github.com/gss-fed/vital-design',
  items: [...base, ...hooks, ...ui, ...blocks],
};
