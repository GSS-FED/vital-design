import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

// Read the theme the way consumers install it. Importing
// registry/vital-theme-vars.ts would pull a tsconfig.node file into the root
// project and fail `tsc` with TS6305.
const registry = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../registry.json'),
    'utf8',
  ),
) as {
  items: {
    name: string;
    cssVars?: Record<'light' | 'dark', Record<string, string>>;
  }[];
};
const theme = registry.items.find(
  (item) => item.name === 'vital-theme',
);

describe('dark color tokens', () => {
  const { light, dark } = theme!.cssVars!;

  it('keeps light values and only overrides existing names', () => {
    expect(light['primary-500']).toBe('#0E86FE');
    expect(light.background).toBe('#FFFFFF');
    expect(dark['primary-500']).toBe('#33CFFF');

    for (const name of Object.keys(dark)) {
      expect(name.startsWith('dark-')).toBe(false);
      expect(light).toHaveProperty(name);
      expect(dark[name]).not.toBe(light[name]);
    }
  });

  it('applies the Figma primitive ramps and alias semantics', () => {
    expect(dark['grayscale-100']).toBe('#2A2A2D');
    expect(dark['grayscale-900']).toBe('#FFFFFF');
    expect(dark['grayscale-opacity-100']).toBe(
      'rgba(255, 255, 255, 0.03)',
    );
    expect(dark['grayscale-opacity-900']).toBe('#FFFFFF');
    expect(dark['destructive-100']).toBe('#593A35');
    expect(dark.foreground).toBe('#FFFFFF');
    expect(dark.background).toBe('#232327');
    expect(dark.card).toBe('#232327');
    expect(dark.popover).toBe('#232327');
    expect(dark.primary).toBe('#33CFFF');
    expect(dark['sidebar-accent']).toBe('#354151');
    expect(dark['text-tertiary']).toBe('rgba(255, 255, 255, 0.55)');
    expect(dark['grayscale-opacity-150']).toBe(
      'rgba(255, 255, 255, 0.05)',
    );
    expect(dark.border).toBe('rgba(255, 255, 255, 0.08)');
    expect(dark['border-overlap']).toBe('#444447');
    expect(dark.input).toBe('#444447');
  });

  it('leaves tokens without a dark source on the light value', () => {
    expect(dark['destructive-500']).toBeUndefined();
    expect(light['destructive-500']).toBe('#EB5000');
    expect(dark['success-500']).toBeUndefined();
    expect(dark['primary-foreground']).toBeUndefined();
    expect(dark['avatar-tiffany-fg']).toBeUndefined();
    expect(dark['tag-teal-solid']).toBeUndefined();
  });
});
