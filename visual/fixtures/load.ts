/// <reference types="vite/client" />
// Shared by the fixture app (main.tsx) and the screenshot test
// (visual/fixtures.test.tsx): resolves a manifest entry to a component.
import { composeStories } from '@storybook/react';
import type { ComponentType } from 'react';
import type { FixtureEntry } from './manifest';
import manifestJson from './manifest.json';

export type Layout = 'padded' | 'centered' | 'fullscreen';

export const fixtures = manifestJson as FixtureEntry[];

// Keys match FixtureEntry.file (paths relative to this folder).
const modules = {
  ...import.meta.glob('../../src-v2/**/*.stories.tsx'),
  ...import.meta.glob('../../src-v2/**/examples/*.tsx'),
} as Record<string, () => Promise<Record<string, unknown>>>;

export async function loadFixture(
  entry: FixtureEntry,
): Promise<{ Component: ComponentType; layout: Layout }> {
  const mod = await modules[entry.file]();
  if (entry.kind === 'example') {
    return {
      Component: mod[entry.exportName] as ComponentType,
      layout: 'padded',
    };
  }
  // composeStories applies meta/story args, decorators and parameters.
  const stories = composeStories(
    mod as Parameters<typeof composeStories>[0],
  ) as unknown as Record<
    string,
    ComponentType & { parameters?: { layout?: Layout } }
  >;
  const Story = stories[entry.exportName];
  return {
    Component: Story,
    layout: Story.parameters?.layout ?? 'padded',
  };
}
